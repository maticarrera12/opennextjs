import { usePathname, useRouter } from "next/navigation";

import { LoadingSwap } from "@/components/ui/loading-swap";
import { useWaitlistForm } from "@/hooks/use-waitlist-form";

export default function CTAWaitlist() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1] || "en";
  const { form, onSubmit, isSubmitting } = useWaitlistForm({
    locale,
    onSuccess: () => {
      form.reset();
      router.push(`/${locale}/waitlist`);
    },
  });

  return (
    <section className="w-full border-y border-border">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Still here? You’re clearly serious about building cool stuff
        </h2>

        <form onSubmit={onSubmit} className="relative mx-auto mt-8 w-full max-w-lg space-y-2">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="w-full rounded-full border border-primary px-5 py-3 pr-36 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neutral-400"
              {...form.register("email")}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-neutral-900 bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-neutral-400 disabled:opacity-60"
            >
              <LoadingSwap isLoading={isSubmitting}>Join Waitlist</LoadingSwap>
            </button>
          </div>
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
