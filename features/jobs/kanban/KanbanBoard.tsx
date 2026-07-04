"use client";

import { useEffect, useMemo, useState } from "react";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { toast } from "sonner";

import { KanbanColumn } from "./KanbanColumn";
import { JobCard } from "./JobCard";
import { Job, JobStatus } from "../types/domain";
import { JOB_STATUSES } from "../constants";

interface KanbanBoardProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

function isStatusId(id: string): id is JobStatus {
  return JOB_STATUSES.includes(id as JobStatus);
}

export default function KanbanBoard({
  jobs: initialJobs,
  onSelectJob,
}: KanbanBoardProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  const groupedJobs = useMemo(
    () =>
      JOB_STATUSES.reduce(
        (acc, status) => {
          acc[status] = jobs.filter((job) => job.status === status);
          return acc;
        },
        {} as Record<JobStatus, Job[]>,
      ),
    [jobs],
  );

  const handleDragEnd = (event: DragEndEvent) => {
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

    const previousJobs = jobs;

    // Persist to Supabase
    fetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: targetStatus }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(body?.error || "Unable to update job status.");
        }

        toast.success(`Job moved to ${targetStatus}.`);
      })
      .catch((error) => {
        console.error("Failed to update job status:", error);
        setJobs(previousJobs);
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to move job. Please try again.",
        );
      });
  };

  return (
    <div className="min-w-0">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div
          className="flex w-full flex-col gap-5 md:flex-row md:overflow-x-auto md:overscroll-x-contain md:pb-5"
          aria-label="Job pipeline board"
        >
          {JOB_STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              jobs={groupedJobs[status]}
            >
              {groupedJobs[status].map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => onSelectJob(job)}
                />
              ))}
            </KanbanColumn>
          ))}
        </div>
      </DragDropProvider>
    </div>
  );
}
