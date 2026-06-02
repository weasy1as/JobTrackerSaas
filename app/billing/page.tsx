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
    <div className=" grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
      <MobileNavigation />
      <FloatingSidebar />

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Billing
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Subscription
            </h1>
          </div>
          <StripeCheckoutButton isPro={isPro} />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-700">Current plan</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {subscription?.plan ? subscription.plan.toUpperCase() : "FREE"}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {subscription?.status === "active"
                ? "Active"
                : "No active subscription"}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-700">Pro benefits</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Unlock AI job insights</li>
              <li>Priority interview prep guidance</li>
              <li>Job insights for every saved application</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-700">Next step</p>
          <p className="mt-2 text-sm text-slate-600">{statusMessage}</p>
        </div>
      </div>
    </div>
  );
}
