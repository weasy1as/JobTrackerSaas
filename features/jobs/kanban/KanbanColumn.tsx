"use client";

import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";
import { Job, JobStatus } from "./types";

interface KanbanColumnProps {
  status: JobStatus;
  jobs: Job[];
  children: ReactNode;
}

const badgeStyles: Record<JobStatus, string> = {
  Applied: "bg-slate-100 text-slate-700",
  Interview: "bg-sky-100 text-sky-700",
  Offer: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
  Ghosted: "bg-amber-100 text-amber-700",
};

export function KanbanColumn({ status, jobs, children }: KanbanColumnProps) {
  const { ref, isDropTarget: isOver } = useDroppable({ id: status });

  return (
    <div className="min-w-[300px] shrink-0">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            {status}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {jobs.length}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[status]}`}
        >
          {jobs.length}
        </span>
      </div>

      <div
        ref={ref}
        className={
          `min-h-[360px] rounded-[2rem] border border-slate-200/80 bg-slate-50 p-4 transition duration-200 ` +
          (isOver ? "border-indigo-300/80 bg-indigo-50" : "")
        }
      >
        <div className="flex flex-col gap-4">{children}</div>
        {jobs.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-500">
            No jobs in this stage yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
