"use client";

import type { Job } from "./types";

interface JobDetailsModalProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
}

export function JobDetailsModal({ job, open, onClose }: JobDetailsModalProps) {
  if (!open || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className=" w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className=" flex justify-end w-full text-slate-500 hover:text-slate-800"
        >
          ✕
        </button>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Job details
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {job.title}
            </h2>
            <p className="text-sm text-slate-600">{job.company}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Status
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {job.status}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Applied
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {new Date(job.dateApplied).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Notes
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Use the drag handle to move this card between stages. Click
              outside the handle to view job details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
