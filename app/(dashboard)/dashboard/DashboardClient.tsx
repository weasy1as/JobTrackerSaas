"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import KanbanBoard from "@/features/jobs/kanban/KanbanBoard";
import { Job } from "@/features/jobs/types/domain";
import { Button } from "@/components/ui/button";

interface DashboardClientProps {
  jobs: Job[];
}

export default function DashboardClient({ jobs }: DashboardClientProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid w-full gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />
        <section className="min-w-0 w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <Toaster position="bottom-right" />
          <div className="w-full">
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
                  Dashboard
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  Job pipeline
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Track your applications through every stage with
                  drag-and-drop cards.
                </p>
              </div>

              <Button asChild>
                <Link href="/dashboard/jobs/new">Create job</Link>
              </Button>
            </div>

            <KanbanBoard
              jobs={jobs}
              onSelectJob={(job) =>
                router.push(`/dashboard/jobs/${job.id}`)
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
