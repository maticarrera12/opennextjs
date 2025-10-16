"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { useRouter} from "next/navigation";
import { signUpSchema, type SignUpInput } from "@/lib/schemas";
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
import SocialAuthButtons from "@/components/social-auth-buttons";
import { authClient } from "@/lib/auth-client";
import PasswordInput from "@/components/password-input";

export default function SignUpPage() {

  const [error, setError] = useState("");

  const router = useRouter();


  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSignUp = async (data: SignUpInput) => {
    setError("");

    try {
      const result = await signUp(data.email, data.password, data.name);

      if (!result.user) {
        setError("Failed to create account. Please try again.");
      } else {
        // Redirect to verification page on success
        router.push(
          `/verificationEmail?email=${encodeURIComponent(data.email)}`
        );
      }
    } catch (err) {
      setError(
        `Authentication error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data != null) router.push("/");
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign up to get started with better-auth
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <SocialAuthButtons />
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <PasswordInput form={form} />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <LoadingSwap isLoading={isSubmitting}>Sign Up</LoadingSwap>
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
