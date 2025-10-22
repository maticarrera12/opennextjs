import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { CreditService } from "@/lib/credits";
import { PLANS, CREDIT_PACKS } from "@/lib/credits/constants";
import { PlanStatus } from "@prisma/client";

// Extend Stripe types with missing properties
interface StripeSubscriptionExtended extends Stripe.Subscription {
  current_period_start: number;
  current_period_end: number;
}

interface StripeInvoiceExtended extends Stripe.Invoice {
  subscription: string | null;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature")!;

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle different event types
    switch (event.type) {
      // ============================================
      // SUBSCRIPTIONS
      // ============================================

      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(
          event.data.object as StripeSubscriptionExtended
        );
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionCanceled(
          event.data.object as StripeSubscriptionExtended
        );
        break;

      // ============================================
      // ONE-TIME PAYMENTS (Credit Packs)
      // ============================================

      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      // ============================================
      // INVOICE EVENTS
      // ============================================

      case "invoice.paid":
        await handleInvoicePaid(event.data.object as StripeInvoiceExtended);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_succeeded":
        // Already handled by invoice.paid
        break;

      default:
        // Silently ignore unhandled events
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "Unknown"
    );
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

async function handleSubscriptionUpdate(
  subscription: StripeSubscriptionExtended
) {
  console.log("📅 [handleSubscriptionUpdate] Starting...");
  const customerId = subscription.customer as string;
  const priceId = subscription.items.data[0].price.id;
  console.log("   Customer:", customerId, "Price:", priceId);

  // Find user by Stripe customer ID
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error("❌ User not found for customer:", customerId);
    return;
  }

  console.log("✅ User found:", user.id);

  // Determine plan from price ID
  const plan = getPlanFromPriceId(priceId);

  if (!plan) {
    console.error("❌ Unknown price ID:", priceId);
    return;
  }

  console.log("✅ Plan identified:", plan);

  const planConfig = PLANS[plan];
  const isNewSubscription =
    subscription.status === "active" && user.subscriptionId !== subscription.id;

  console.log("💾 Updating user in database...");

  // Use available date fields from Stripe subscription
  const subscriptionAny = subscription as any;

  // Stripe subscriptions have these fields:
  // - billing_cycle_anchor: timestamp for billing cycle
  // - start_date: when subscription started
  // - created: when subscription was created
  const billingAnchor =
    subscriptionAny.billing_cycle_anchor ||
    subscriptionAny.created ||
    subscriptionAny.start_date;

  // Determine interval from price (check if annual or monthly)
  const priceInterval =
    subscription.items.data[0]?.price?.recurring?.interval || "month";
  const isAnnual = priceInterval === "year";
  const periodInSeconds = isAnnual ? 365 * 24 * 60 * 60 : 30 * 24 * 60 * 60;

  const periodStart = billingAnchor;
  const periodEnd = billingAnchor ? billingAnchor + periodInSeconds : undefined;
  const cancelAtPeriod = subscriptionAny.cancel_at_period_end || false;

  console.log(
    "   Billing anchor (period start):",
    periodStart,
    new Date(periodStart * 1000)
  );
  console.log("   Price interval:", priceInterval, "- isAnnual:", isAnnual);
  console.log(
    "   Calculated period end:",
    periodEnd,
    periodEnd ? new Date(periodEnd * 1000) : null
  );
  console.log("   Cancel at period end:", cancelAtPeriod);

  // Build update data object, only including valid dates
  const updateData: any = {
    plan,
    planStatus: mapStripeStatus(subscription.status),
    subscriptionProvider: "STRIPE",
    subscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    stripePriceId: priceId,
    cancelAtPeriodEnd: cancelAtPeriod,
  };

  // Only add dates if they're valid numbers
  if (typeof periodStart === "number" && !isNaN(periodStart)) {
    updateData.currentPeriodStart = new Date(periodStart * 1000);
    console.log(
      "   ✓ Added currentPeriodStart:",
      updateData.currentPeriodStart
    );
  } else {
    console.log("   ⚠️ Skipping currentPeriodStart (invalid)");
  }

  if (typeof periodEnd === "number" && !isNaN(periodEnd)) {
    updateData.currentPeriodEnd = new Date(periodEnd * 1000);
    console.log("   ✓ Added currentPeriodEnd:", updateData.currentPeriodEnd);
  } else {
    console.log("   ⚠️ Skipping currentPeriodEnd (invalid)");
  }

  // Update user
  await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });
  console.log("✅ User updated");

  // Add monthly credits if new subscription or renewal
  if (isNewSubscription) {
    console.log("💰 Adding subscription credits...");
    await CreditService.add({
      userId: user.id,
      amount: planConfig.credits.monthly,
      type: "SUBSCRIPTION",
      reason: "subscription_activated",
      description: `${plan} plan activated - ${planConfig.credits.monthly} credits`,
    });
    console.log("✅ Credits added");
  }

  console.log("📝 Creating purchase record...");
  // Create purchase record
  await prisma.purchase.create({
    data: {
      userId: user.id,
      type: "SUBSCRIPTION",
      provider: "STRIPE",
      plan,
      amount: subscription.items.data[0].price.unit_amount || 0,
      currency: subscription.currency,
      providerCustomerId: customerId,
      providerPaymentId: subscription.latest_invoice as string,
      providerSubscriptionId: subscription.id,
      providerProductId: priceId,
      status: "COMPLETED",
    },
  });
  console.log("✅ Purchase record created");
}

async function handleSubscriptionCanceled(
  subscription: StripeSubscriptionExtended
) {
  const customerId = subscription.customer as string;

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: "FREE",
      planStatus: PlanStatus.CANCELED,
      subscriptionStatus: "canceled",
      cancelAtPeriodEnd: false,
    },
  });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const metadata = session.metadata;

  // Find user
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error("User not found for customer:", customerId);
    return;
  }

  // Check if it's a credit pack purchase
  if (metadata?.type === "credit_pack") {
    const packId = metadata.packId;
    const pack = Object.values(CREDIT_PACKS).find((p) => p.id === packId);

    if (!pack) {
      console.error("Unknown credit pack:", packId);
      return;
    }

    // Add credits
    await CreditService.add({
      userId: user.id,
      amount: pack.credits,
      type: "PURCHASE",
      reason: "credit_pack_purchase",
      description: `Purchased ${pack.name} - ${pack.credits} credits`,
    });

    // Create purchase record
    await prisma.purchase.create({
      data: {
        userId: user.id,
        type: "CREDIT_PACK",
        provider: "STRIPE",
        credits: pack.credits,
        amount: pack.price * 100, // Convert to cents
        currency: "usd",
        providerCustomerId: customerId,
        providerPaymentId: session.payment_intent as string,
        providerProductId: metadata.priceId || "",
        status: "COMPLETED",
        metadata: { packId },
      },
    });
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Update purchase status if exists
  await prisma.purchase.updateMany({
    where: { providerPaymentId: paymentIntent.id },
    data: { status: "COMPLETED" },
  });
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  await prisma.purchase.updateMany({
    where: { providerPaymentId: paymentIntent.id },
    data: { status: "FAILED" },
  });
}

async function handleInvoicePaid(invoice: StripeInvoiceExtended) {
  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription;

  if (!subscriptionId) return; // Not a subscription invoice

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user || user.plan === "FREE") return;

  // This is a renewal - add monthly credits
  await CreditService.monthlyReset(user.id);
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      planStatus: PlanStatus.PAST_DUE,
      subscriptionStatus: "past_due",
    },
  });

  // TODO: Send email notification
}

// Helper: Map Stripe status to our enum
function mapStripeStatus(status: Stripe.Subscription.Status): PlanStatus {
  const mapping: Record<string, PlanStatus> = {
    active: PlanStatus.ACTIVE,
    past_due: PlanStatus.PAST_DUE,
    canceled: PlanStatus.CANCELED,
    incomplete: PlanStatus.PAST_DUE,
    incomplete_expired: PlanStatus.CANCELED,
    trialing: PlanStatus.TRIALING,
    unpaid: PlanStatus.PAST_DUE,
  };

  return mapping[status] || PlanStatus.ACTIVE;
}

// Helper: Get plan from Stripe price ID
function getPlanFromPriceId(priceId: string): keyof typeof PLANS | null {
  for (const [planName, config] of Object.entries(PLANS)) {
    if (
      config.stripe?.monthly === priceId ||
      config.stripe?.annual === priceId
    ) {
      return planName as keyof typeof PLANS;
    }
  }
  return null;
}
