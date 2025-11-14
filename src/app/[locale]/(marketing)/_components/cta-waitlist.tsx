import { useTranslations } from "next-intl";

import CtaButton from "@/components/ui/cta-button";

export default function CTAWaitlist() {
  const t = useTranslations("ctaWaitlist");
  return (
    <section className="w-full border-y border-border">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>

        <CtaButton />
      </div>
    </section>
  );
}
