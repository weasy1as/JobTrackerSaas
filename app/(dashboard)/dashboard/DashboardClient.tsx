"use client";

import { useEffect, useState } from "react";
import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import KanbanBoard from "@/features/jobs/kanban/KanbanBoard";
import { AddJobButton } from "@/features/jobs/create-job/AddJobButton";
import { CreateJobModal } from "@/features/jobs/create-job/CreateJobModal";
import { Job } from "@/features/jobs/types/domain";
import { JobDetailsModal } from "@/features/jobs/kanban/JobDetailsModal";
import { getUser } from "@/lib/utils";

interface DashboardClientProps {
  jobs: Job[];
}

export default function DashboardClient({ jobs }: DashboardClientProps) {
  const [open, setOpen] = useState(false);
  const [jobList, setJobList] = useState<Job[]>(jobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobCreated = (job: Job) => {
    setJobList((current) => [job, ...current]);
  };
  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid w-full gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />
        <section className="relative w-full flex flex-col-reverse md:flex-row rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          {/* BLUR LAYER WRAPPER */}
          <div
            className={`transition-all duration-200 w-full ${
              open || Boolean(selectedJob) ? "blur-sm" : ""
            }`}
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Dashboard
                </p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                  Job board
                </h1>
              </div>

              <AddJobButton onClick={() => setOpen(true)} />
            </div>

            <KanbanBoard jobs={jobList} onSelectJob={setSelectedJob} />
          </div>

          {/* MODAL (no blur) */}
          <CreateJobModal
            open={open}
            onOpenChange={setOpen}
            onJobCreated={handleJobCreated}
          />
          <JobDetailsModal
            job={selectedJob}
            open={Boolean(selectedJob)}
            onClose={() => setSelectedJob(null)}
            onUpdate={(updatedJob) => {
              setJobList((currentJobs) =>
                currentJobs.map((job) =>
                  job.id === updatedJob.id ? updatedJob : job,
                ),
              );

              setSelectedJob(updatedJob);
            }}
            onDelete={(jobId) => {
              setJobList((currentJobs) =>
                currentJobs.filter((job) => job.id !== jobId),
              );

              setSelectedJob(null);
            }}
          />
        </section>
      </div>
    </main>
  );
}
