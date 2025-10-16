"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
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



export function ForgotPassword({
  openSignInTab,
}: {
  openSignInTab: () => void
}) {
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
          <Button type="button" variant="outline" onClick={openSignInTab}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
            <LoadingSwap isLoading={isSubmitting}>Send Reset Email</LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Reset Password</h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your email to receive a password reset link
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <ForgotPassword openSignInTab={() => window.history.back()} />
        </div>
      </div>
    </div>
  )
}