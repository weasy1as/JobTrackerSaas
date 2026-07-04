"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({
  error,
  reset,
}: DashboardErrorProps) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid w-full gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />
        <section className="flex min-h-[480px] items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="max-w-md text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <AlertTriangle className="size-6" />
            </div>
            <h1 className="mt-5 text-2xl font-semibold text-slate-900">
              We couldn&apos;t load your jobs
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Your data is safe. Retry the request, or return to the
              dashboard and try again.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button type="button" onClick={reset}>
                <RotateCcw className="size-4" />
                Retry
              </Button>
              <Button asChild variant="secondary">
                <Link href="/dashboard">Back to dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
