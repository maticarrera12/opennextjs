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
import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ResetPasswordInput, resetPasswordSchema } from "@/lib/schemas"
import { authClient } from "@/lib/auth-client"
import PasswordInput from "@/components/password-input"



export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const error = searchParams.get("error")

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  async function handleResetPassword(data: ResetPasswordInput) {
    if (token == null) return

    await authClient.resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onError: error => {
          toast.error(error.error.message || "Failed to reset password")
        },
        onSuccess: () => {
          toast.success("Password reset successful", {
            description: "Redirection to login...",
          })
          setTimeout(() => {
            router.push("/signin")
          }, 1000)
        },
      }
    )
  }

  if (token == null || error != null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Invalid Reset Link</CardTitle>
            <CardDescription>
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
              <Link href="/signin">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl fle1">Reset Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleResetPassword)}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput form={form} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="flex-1 w-full bg-indigo-600 hover:bg-indigo-700">
                <LoadingSwap isLoading={isSubmitting}>
                  Reset Password
                </LoadingSwap>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}