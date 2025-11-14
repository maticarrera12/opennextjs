import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { LoadingSwap } from "@/components/ui/loading-swap";
import { useWaitlistForm } from "@/hooks/use-waitlist-form";

const CtaButton = () => {
  const t = useTranslations("ctaWaitlist");
  const waitlistT = useTranslations("waitlist");
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1] || "en";
  const { form, onSubmit, isSubmitting } = useWaitlistForm({
    locale,
    onSuccess: result => {
      // Guardar el referral code en localStorage para que se muestre la página de referrals
      if (typeof window !== "undefined") {
        window.localStorage.setItem("waitlist_referral_code", result.referralCode);
      }
      form.reset();
      router.push(`/${locale}/waitlist`);
    },
    messages: {
      success: waitlistT("form.joinSuccess"),
      error: waitlistT("form.joinError"),
    },
  });
  return (
    <form onSubmit={onSubmit} className="relative mx-auto mt-8 w-full max-w-lg space-y-2">
      <div className="relative">
        <input
          type="email"
          placeholder={t("placeholder")}
          aria-label={t("placeholder")}
          className="w-full rounded-full border border-primary px-5 py-3 pr-36 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neutral-400"
          {...form.register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-neutral-900 bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-neutral-400 disabled:opacity-60"
        >
          <LoadingSwap isLoading={isSubmitting}>{t("button")}</LoadingSwap>
        </button>
      </div>
      {form.formState.errors.email && (
        <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
      )}
    </form>
  );
};

export default CtaButton;
