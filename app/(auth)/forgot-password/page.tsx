"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/components/ui/loading-swap"

import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/schemas/auth.schema"
import { useRouter } from "next/navigation"
import ThemeToggle from "@/components/theme-toggle"

export function ForgotPassword() {
  const router = useRouter()
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const { isSubmitting } = form.formState

  async function handleForgotPassword(data: ForgotPasswordInput) {
    await authClient.requestPasswordReset(
      {
        ...data,
        redirectTo: "/reset-password",
      },
      {
        onError: error => {
          toast.error(
            error.error.message || "Failed to send password reset email"
          )
        },
        onSuccess: () => {
          toast.success("Password reset email sent")
        },
      }
    )
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="button" variant="outline" className="bg-indigo-50 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-50 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-900 dark:hover:text-indigo-50" onClick={() => router.push('/signin')}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
            <LoadingSwap isLoading={isSubmitting}>Send Reset Email</LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Reset Password</h1>
          <p className="mt-2 text-sm text-secondary">
            Enter your email to receive a password reset link
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-subtle p-8">
          <ForgotPassword />
        </div>
      </div>
    </div>
  )
}