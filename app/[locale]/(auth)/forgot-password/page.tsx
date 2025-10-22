"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  forgotPasswordSchema,
  ForgotPasswordInput,
} from "@/lib/schemas/auth.schema";
import { useRouter } from "next/navigation";

export function ForgotPassword() {
  const router = useRouter();
  const t = useTranslations("auth.forgotPassword");
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleForgotPassword(data: ForgotPasswordInput) {
    await authClient.requestPasswordReset(
      {
        ...data,
        redirectTo: "/reset-password",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || t("error"));
        },
        onSuccess: () => {
          toast.success(t("success"));
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleForgotPassword)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t("email")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="bg-indigo-50 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-50 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-900 dark:hover:text-indigo-50"
            onClick={() => router.push("/signin")}
          >
            {t("backToSignIn")}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <LoadingSwap isLoading={isSubmitting}>{t("submit")}</LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">{t("title")}</h1>
          <p className="mt-2 text-sm text-secondary">{t("subtitle")}</p>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-subtle p-8">
          <ForgotPassword />
        </div>
      </div>
    </div>
  );
}
