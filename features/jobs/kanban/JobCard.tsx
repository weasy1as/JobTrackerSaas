"use client";

import { useDraggable } from "@dnd-kit/react";
import { Job } from "./types";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { attributes, listeners, ref, transform, isDragging } = useDraggable({
    id: job.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={ref}
      style={style}
      {...listeners}
      {...attributes}
      className={`group cursor-grab rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 ${
        isDragging
          ? "ring-2 ring-indigo-300"
          : "hover:-translate-y-0.5 hover:border-slate-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{job.company}</p>
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
  );
}
