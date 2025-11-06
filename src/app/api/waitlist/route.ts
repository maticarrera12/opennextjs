import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

import { sendWaitlistWelcomeEmail } from "@/lib/emails/sendWaitlistWelcomeEmail";
import { prisma } from "@/lib/prisma";
import { waitlistSchema } from "@/lib/schemas/waitlist.schema";

const generateReferralCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 8);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar datos
    const parsed = waitlistSchema.parse(body);

    const { email, name, referral } = parsed;
    const existing = await prisma.waitlistUser.findUnique({ where: { email } });
    if (existing) {
      // Si ya existe, devolver su referral code
      return NextResponse.json(
        {
          message: "You're already on the waitlist!",
          referralCode: existing.referralCode,
          alreadyJoined: true,
        },
        { status: 200 }
      );
    }

    const referredBy = referral
      ? await prisma.waitlistUser.findUnique({
          where: { referralCode: referral },
        })
      : null;

    // Crear nuevo usuario
    const newUser = await prisma.waitlistUser.create({
      data: {
        email,
        name,
        referralCode: generateReferralCode(),
        referredById: referredBy?.id,
      },
    });

    // Calcular posición en la lista (count de usuarios antes de este)
    const position = await prisma.waitlistUser.count({
      where: {
        createdAt: {
          lte: newUser.createdAt,
        },
      },
    });

    // Enviar email de bienvenida
    let emailError: Error | null = null;
    try {
      const emailResult = await sendWaitlistWelcomeEmail({
        user: { email: newUser.email, name: newUser.name },
        referralCode: newUser.referralCode,
        position,
      });
      
      // Verificar que el email se haya enviado correctamente
      if (!emailResult?.data?.id) {
        throw new Error("Email was not sent - no ID returned from Resend");
      }
    } catch (err) {
      emailError = err instanceof Error ? err : new Error(String(err));
      // Log el error para debugging (también en producción)
      console.error("[WAITLIST] Email sending failed:", {
        email: newUser.email,
        error: emailError.message,
        stack: emailError.stack,
      });
      // No fallar la request si el email falla
    }

    return NextResponse.json({
      message: "Successfully joined the waitlist! 🎉",
      referralCode: newUser.referralCode,
      position,
      emailSent: !emailError,
      emailError: emailError
        ? {
            message: emailError.message,
            // Incluir detalles del error en producción también para debugging
            ...(emailError.stack && {
              details: emailError.stack,
            }),
          }
        : null,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
