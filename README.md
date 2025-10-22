## Payment Configuration

This boilerplate supports both Stripe and Lemon Squeezy for payments.

### Step 1: Choose Your Payment Provider

You can use either Stripe, Lemon Squeezy, or both.

### Step 2: Create Your Products/Plans

#### For Stripe:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create Products for each plan:
   - **Free Plan:** No product needed
   - **Pro Plan:** Create product with monthly ($19) and annual ($190) prices
   - **Business Plan:** Create product with monthly ($49) and annual ($490) prices
   - **Credit Packs:** Create one-time payment products

3. Copy the Price IDs and add to `.env`:
```bash
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Plan Price IDs
STRIPE_PRICE_ID_PRO_MONTHLY=price_xxx
STRIPE_PRICE_ID_PRO_ANNUAL=price_xxx
STRIPE_PRICE_ID_BUSINESS_MONTHLY=price_xxx
STRIPE_PRICE_ID_BUSINESS_ANNUAL=price_xxx

# Credit Pack Price IDs
STRIPE_PRICE_ID_PACK_STARTER=price_xxx
STRIPE_PRICE_ID_PACK_POPULAR=price_xxx
STRIPE_PRICE_ID_PACK_PROFESSIONAL=price_xxx
```

#### For Lemon Squeezy:

1. Go to [Lemon Squeezy Dashboard](https://app.lemonsqueezy.com)
2. Create Products and Variants for each plan
3. Copy the Variant IDs and add to `.env`:
```bash
# Lemon Squeezy Configuration
LEMONSQUEEZY_API_KEY=xxx
LEMONSQUEEZY_STORE_ID=xxx
LEMONSQUEEZY_WEBHOOK_SECRET=xxx

# Plan Variant IDs
LS_VARIANT_ID_PRO_MONTHLY=variant_xxx
LS_VARIANT_ID_PRO_ANNUAL=variant_xxx
LS_VARIANT_ID_BUSINESS_MONTHLY=variant_xxx
LS_VARIANT_ID_BUSINESS_ANNUAL=variant_xxx

# Credit Pack Variant IDs
LS_VARIANT_ID_PACK_STARTER=variant_xxx
LS_VARIANT_ID_PACK_POPULAR=variant_xxx
LS_VARIANT_ID_PACK_PROFESSIONAL=variant_xxx
```

### Step 3: Customize Pricing (Optional)

You can customize prices and credit amounts via environment variables:
```bash
# Customize Plan Prices
PRO_PRICE_MONTHLY=29  # Change from default $19
PRO_CREDITS_MONTHLY=300  # Change from default 200 credits

BUSINESS_PRICE_MONTHLY=79
BUSINESS_CREDITS_MONTHLY=1000

# Customize Credit Costs per Feature
CREDIT_COST_LOGO=10  # Change from default 5
CREDIT_COST_AVATAR=5  # Change from default 3
```

### Step 4: Set Up Webhooks

#### Stripe Webhooks:
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

#### Lemon Squeezy Webhooks:
1. Go to Lemon Squeezy → Settings → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/lemonsqueezy`
3. Copy signing secret to `LEMONSQUEEZY_WEBHOOK_SECRET`

### Development Mode

During development, set:
```bash
PAYMENT_MODE=development
```

This will:
- Show pricing page but disable actual payments
- Allow testing the UI without real payment processing
- Show warnings that payments are disabled

### Production Mode

For production:
```bash
PAYMENT_MODE=production
NEXT_PUBLIC_PAYMENT_MODE=production
```

## Testing Payments

Use Stripe/Lemon Squeezy test mode during development:

**Stripe Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Common Issues

### "Plan not configured" error
- Make sure you've added all price/variant IDs to `.env`
- Restart your dev server after changing `.env`

### Webhooks not working
- Verify webhook URL is correct
- Check webhook secret is set
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`