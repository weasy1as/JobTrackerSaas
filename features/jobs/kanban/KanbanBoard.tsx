"use client";

import { useEffect, useMemo, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Job, JobStatus } from "./types";
import { KanbanColumn } from "./KanbanColumn";
import { JobCard } from "./JobCard";
import { JobDetailsModal } from "./JobDetailsModal";

const statuses: JobStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Ghosted",
];

interface KanbanBoardProps {
  jobs: Job[];
}

function isStatusId(id: string): id is JobStatus {
  return statuses.includes(id as JobStatus);
}

export default function KanbanBoard({ jobs: initialJobs }: KanbanBoardProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  const groupedJobs = useMemo(
    () =>
      statuses.reduce(
        (acc, status) => {
          acc[status] = jobs.filter((job) => job.status === status);
          return acc;
        },
        {} as Record<JobStatus, Job[]>,
      ),
    [jobs],
  );

  const handleDragEnd = (event: any) => {
    if (event.canceled) return;

    const jobId = event.operation?.source?.id as string | undefined;
    const targetId = event.operation?.target?.id as string | undefined;
    if (!jobId || !targetId || jobId === targetId) return;

    const sourceJob = jobs.find((job) => job.id === jobId);
    if (!sourceJob) return;

    const targetJob = jobs.find((job) => job.id === targetId);
    const targetStatus = targetJob
      ? targetJob.status
      : isStatusId(targetId)
        ? targetId
        : undefined;
    if (!targetStatus) return;

    // Don't update if status hasn't changed
    if (sourceJob.status === targetStatus) return;

    // Optimistic UI update
    setJobs((currentJobs) => {
      const nextJobs = currentJobs.filter((job) => job.id !== jobId);
      const movedJob = { ...sourceJob, status: targetStatus };

      if (targetJob) {
        const insertIndex = nextJobs.findIndex(
          (job) => job.id === targetJob.id,
        );
        if (insertIndex === -1) {
          return [...nextJobs, movedJob];
        }
        return [
          ...nextJobs.slice(0, insertIndex),
          movedJob,
          ...nextJobs.slice(insertIndex),
        ];
      }

      return [...nextJobs, movedJob];
    });

    // Persist to Supabase
    fetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: targetStatus }),
    }).catch((error) => {
      console.error("Failed to update job status:", error);
      // Revert UI on failure
      setJobs(jobs);
    });
  };

  return (
    <div className="flex space-y-8">
      <div>
        {" "}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Job pipeline
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Track your applications through every stage with drag-and-drop
            cards.
          </p>
        </div>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className="grid w-full max-w-full gap-6 pb-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
            {statuses.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                jobs={groupedJobs[status]}
              >
                {groupedJobs[status].map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onClick={() => setSelectedJob(job)}
                  />
                ))}
              </KanbanColumn>
            ))}
          </div>
        </DragDropProvider>
      </div>

      <JobDetailsModal
        job={selectedJob}
        open={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}
