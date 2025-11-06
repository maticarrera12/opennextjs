import { sendEmail } from "./sendEmail";
import WaitlistWelcomeEmail from "@/emails/waitlist-welcome-email";

export function sendWaitlistWelcomeEmail({
  user,
  referralCode,
  position,
  locale = "en",
}: {
  user: { email: string; name?: string | null };
  referralCode: string;
  position: number;
  locale?: string;
}) {
  const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const referralUrl = `${baseURL}/${locale}/waitlist?ref=${referralCode}`;

  return sendEmail({
    to: user.email,
    subject: "Welcome to the Waitlist! 🎉",
    react: WaitlistWelcomeEmail({
      userName: user.name || "there",
      referralCode,
      referralUrl,
      position,
    }),
  });
}
