"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center  px-6",
        className,
      )}
      {...props}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        {!success ? (
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Reset your password
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              We’ll send you a link to reset your password
            </p>
          </div>
        ) : (
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Check your email
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Password reset instructions sent
            </p>
          </div>
        )}

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* SUCCESS STATE */}
          {success ? (
            <div className="space-y-4 text-center">
              <div className="rounded-2xl bg-indigo-50 p-4 text-sm text-indigo-700">
                If an account exists with this email, we’ve sent a reset link.
              </div>

              <p className="text-sm text-slate-600 leading-6">
                Please check your inbox and follow the instructions to reset
                your password.
              </p>

              <Link
                href="/auth/login"
                className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Back to login
              </Link>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleForgotPassword} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-200"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>

              {/* Footer link */}
              <p className="text-center text-sm text-slate-600">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
