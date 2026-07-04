"use client";

import { useDraggable } from "@dnd-kit/react";
import { CalendarDays, GripVertical, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JOB_SOURCE_LABELS } from "../constants";
import { Job } from "../types/domain";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const { handleRef, ref, isDragging } = useDraggable({
    id: job.id,
  });

  const appliedDate = new Date(job.dateApplied);
  const formattedDate = Number.isNaN(appliedDate.getTime())
    ? "No date added"
    : appliedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return (
    <div
      ref={ref}
      role="link"
      tabIndex={0}
      aria-label={`Open ${job.title} at ${job.company}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className={`relative w-full cursor-pointer rounded-xl border bg-white p-4 shadow-sm outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        isDragging
          ? "scale-[1.02] border-indigo-300 opacity-70 shadow-md ring-2 ring-indigo-200"
          : "border-slate-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        <Button
          type="button"
          ref={handleRef}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          aria-label={`Drag ${job.title}`}
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0 cursor-grab text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing"
        >
          <GripVertical className="size-4" />
        </Button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {job.company}
          </p>
          <p className="mt-1 truncate text-sm font-medium text-slate-700">
            {job.title}
          </p>

          <div className="mt-4">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {JOB_SOURCE_LABELS[job.source]}
            </span>
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-500">
            <p className="flex items-center gap-2">
              <CalendarDays className="size-3.5" />
              {formattedDate}
            </p>
            {job.location ? (
              <p className="flex min-w-0 items-center gap-2">
                <MapPin className="size-3.5 flex-none" />
                <span className="truncate">{job.location}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
