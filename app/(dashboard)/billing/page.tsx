import { createClient } from "@/lib/supabase/server";
import {
  getUserSubscription,
  isProSubscription,
} from "@/lib/supabase/subscriptions";
import { StripeCheckoutButton } from "@/components/stripe-checkout-button";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import FloatingSidebar from "@/components/navigation/FloatingSidebar";

interface BillingPageProps {
  searchParams?: {
    success?: string;
    canceled?: string;
  };
}

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-semibold text-slate-900">Billing</h1>
        <p className="mt-4 text-slate-600">
          Sign in to view your subscription status and upgrade to Pro.
        </p>
      </div>
    );
  }

  const subscription = await getUserSubscription(user.id);
  const isPro = isProSubscription(subscription);

  const statusMessage = searchParams?.success
    ? "Thank you! Your Pro subscription is now active."
    : searchParams?.canceled
      ? "Checkout canceled. You can try again anytime."
      : "This page will show billing actions once payment integration is available. For now, Pro access is gated through your subscription row in Supabase.";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid w-full gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
                Billing
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Subscription
              </h1>

              <p className="mt-3 text-sm text-slate-600">
                Manage your plan and unlock AI features.
              </p>
            </div>

            <StripeCheckoutButton isPro={isPro} />
          </div>

          {/* STATUS MESSAGE */}
          {(searchParams?.success || searchParams?.canceled) && (
            <div
              className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
                searchParams?.success
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {statusMessage}
            </div>
          )}

          {/* GRID */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* CURRENT PLAN CARD */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Current Plan
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your active subscription status.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p
                    className={`text-3xl font-semibold tracking-tight ${
                      subscription?.plan === "pro"
                        ? "text-indigo-600"
                        : "text-slate-900"
                    }`}
                  >
                    {subscription?.plan?.toUpperCase() ?? "FREE"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {subscription?.status === "active"
                      ? "Active subscription"
                      : "Free plan"}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      subscription?.plan === "pro"
                        ? "bg-indigo-50 text-indigo-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {subscription?.plan === "pro" ? "PRO PLAN" : "FREE PLAN"}
                  </span>
                </div>
              </div>
            </div>

            {/* BENEFITS CARD */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Pro Benefits
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Everything you unlock with Pro.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  AI-powered job insights for every application
                </li>

                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  Personalized interview preparation plans
                </li>

                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  Skill gap analysis and improvement suggestions
                </li>
              </ul>
            </div>
          </div>

          {/* FOOTER INFO CARD */}
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Next step</p>

            <p className="mt-2 text-sm text-slate-600">{statusMessage}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
