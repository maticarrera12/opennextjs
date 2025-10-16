import { sendEmail } from "./sendEmail";

interface EmailVerificationData {
  user: {
    name: string;
    email: string;
  };
  url: string;
}

export async function sendEmailVerificationEmail({
  user,
  url,
}: EmailVerificationData) {
  return sendEmail({
    to: user.email,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 500px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 12px;">
        <h2 style="color: #111; text-align: center;">Confirm your email</h2>
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${url}" 
            style="display: inline-block; background-color: #16a34a; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
            Verify Email
          </a>
        </div>

        <p>If you didn’t create an account, you can safely ignore this email.</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 32px 0;">
        <p style="font-size: 13px; color: #666; text-align: center;">
          © ${new Date().getFullYear()} Open_Next. All rights reserved.<br/>
          This is an automated message, please do not reply.
        </p>
      </div>
    `,
    text: `
Hi ${user.name},

Thank you for signing up! Please verify your email address by visiting the link below:
${url}

If you didn’t create an account, you can ignore this message.

— The Open_Next Team
    `,
  });
}
