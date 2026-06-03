import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Check your email
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Confirm your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Icon / visual indicator */}
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            ✉️
          </div>

          <div className="space-y-4 text-center">
            <p className="text-sm text-slate-600 leading-6">
              You’ve successfully signed up for{" "}
              <span className="font-medium text-slate-900">JobFlow</span>. We’ve
              sent you a confirmation email.
            </p>

            <p className="text-sm text-slate-600 leading-6">
              Please click the link in your inbox to activate your account
              before signing in.
            </p>

            {/* Optional highlight box */}
            <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
              Didn’t receive the email? Check your spam folder or try signing up
              again.
            </div>

            {/* Action */}
            <a
              href="/auth/login"
              className="inline-block pt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
