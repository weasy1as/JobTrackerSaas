"use client";

import { useDraggable } from "@dnd-kit/react";
import { Job } from "./types";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const { handleRef, ref, isDragging } = useDraggable({
    id: job.id,
  });

  const style = {
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 ${
        isDragging
          ? "ring-2 ring-indigo-300"
          : "hover:-translate-y-0.5 hover:border-slate-300"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          ref={handleRef}
          onClick={(event) => event.stopPropagation()}
          aria-label="Drag job card"
          className="flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 text-slate-500 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <span className="text-lg">≡</span>
        </button>

        <div onClick={onClick} className="flex-1 cursor-pointer">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {job.company}
              </p>
              <p className="mt-1 text-base font-medium text-slate-700">
                {job.title}
              </p>
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              {new Date(job.dateApplied).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
