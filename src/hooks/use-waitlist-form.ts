import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { waitlistSchema } from "@/lib/schemas/waitlist.schema";

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

interface UseWaitlistFormOptions {
  locale: string;
  referralParam?: string | null;
  onSuccess?: (result: {
    referralCode: string;
    position?: number | null;
    message?: string;
  }) => void;
  onError?: (error: Error) => void;
}

export function useWaitlistForm({
  locale,
  referralParam,
  onSuccess,
  onError,
}: UseWaitlistFormOptions) {
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "" },
  });

  const submitHandler = form.handleSubmit(async data => {
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          referral: referralParam || undefined,
          locale,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      toast.success(result.message || "Successfully joined!");
      onSuccess?.({
        referralCode: result.referralCode,
        position: result.position,
        message: result.message,
      });
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Failed to join waitlist");
      toast.error(err.message);
      onError?.(err);
    }
  });

  return {
    form,
    onSubmit: submitHandler,
    isSubmitting: form.formState.isSubmitting,
  };
}


