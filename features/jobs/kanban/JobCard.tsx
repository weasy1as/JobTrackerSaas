"use client";

import { useDraggable } from "@dnd-kit/react";
import { Button } from "@/components/ui/button";
import { Job } from "../types/domain";

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

  const appliedDate = new Date(job.dateApplied);
  const formattedDate = isNaN(appliedDate.getTime())
    ? "No date"
    : appliedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return (
    <div
      ref={ref}
      style={style}
      onClick={onClick}
      className={`relative w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 cursor-pointer ${
        isDragging
          ? "ring-2 ring-indigo-300"
          : "hover:-translate-y-0.5 hover:border-slate-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <Button
          type="button"
          ref={handleRef}
          onClick={(event) => event.stopPropagation()}
          aria-label="Drag job card"
          variant="ghost"
          size="icon"
          className="flex-shrink-0 border border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <span className="text-lg">≡</span>
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {job.company}
              </p>
              <p className="mt-1 truncate text-base font-medium text-slate-700">
                {job.title}
              </p>
            </div>

            <p className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
