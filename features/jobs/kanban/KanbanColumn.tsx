"use client";

import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";
import { Job, JobStatus } from "../types/domain";
import { JOB_STATUS_BADGE_STYLES } from "../constants";

interface KanbanColumnProps {
  status: JobStatus;
  jobs: Job[];
  children: ReactNode;
}

export function KanbanColumn({ status, jobs, children }: KanbanColumnProps) {
  const { ref, isDropTarget: isOver } = useDroppable({ id: status });

  return (
    <section
      className="w-full md:w-80 md:flex-none"
      aria-labelledby={`column-${status}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <h2
          id={`column-${status}`}
          className="text-sm font-semibold text-slate-800"
        >
          {status}
        </h2>
        <span
          className={`inline-flex min-w-7 items-center justify-center rounded-full px-2 py-1 text-xs font-semibold ${JOB_STATUS_BADGE_STYLES[status]}`}
          aria-label={`${jobs.length} jobs`}
        >
          {jobs.length}
        </span>
      </div>

      <div
        ref={ref}
        className={
          `min-h-48 rounded-2xl border bg-slate-50 p-3 transition duration-200 md:min-h-[440px] ` +
          (isOver
            ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-100"
            : "border-slate-200")
        }
      >
        <div className="flex flex-col gap-3">{children}</div>
        {jobs.length === 0 ? (
          <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 text-center text-sm text-slate-500">
            Drop a job here
          </div>
        ) : null}
      </div>
    </section>
  );
}
