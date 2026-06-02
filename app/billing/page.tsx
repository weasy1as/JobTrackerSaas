import { createClient } from "@/lib/supabase/server";
import {
  getUserSubscription,
  isProSubscription,
} from "@/lib/supabase/subscriptions";
import { Button } from "@/components/ui/button";

export default async function BillingPage() {
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

  return (
    <div className="mx-auto max-w-3xl p-6">
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
          <Button type="button" variant={isPro ? "secondary" : "default"}>
            {isPro ? "You are on Pro" : "Upgrade to Pro"}
          </Button>
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
          <p className="mt-2 text-sm text-slate-600">
            This page will show billing actions once payment integration is
            available. For now, Pro access is gated through your subscription
            row in Supabase.
          </p>
        </div>
      </div>
    </div>
  );
}
