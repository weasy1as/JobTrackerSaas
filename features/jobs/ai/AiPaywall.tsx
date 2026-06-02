"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export function AiPaywall() {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <Lock className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">
            Unlock AI Job Insights with Pro
          </p>
          <p className="text-sm text-slate-600">
            Upgrade to Pro to generate personalized interview prep and skill
            guidance.
          </p>
          <Button type="button" onClick={() => router.push("/billing")}>
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
