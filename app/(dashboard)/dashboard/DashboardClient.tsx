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
        <section className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <Toaster position="bottom-right" />
          <div className="w-full">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Dashboard
                </p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                  Job board
                </h1>
              </div>

              <Button asChild>
                <Link href="/dashboard/jobs/new">Create Job</Link>
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
