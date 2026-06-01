"use client";

import { useState } from "react";
import type { Job } from "@/features/jobs/kanban/types";
import { Button } from "@/components/ui/button";
import { JobForm, JobFormValues } from "./JobForm";

interface CreateJobModalProps {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  onJobCreated: (job: Job) => void;
}

export function CreateJobModal({
  open,
  onOpenChange,
  onJobCreated,
}: CreateJobModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  if (!open) return null;

  const handleSubmit = async (values: JobFormValues) => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error("Failed to create job", await response.text());
        return;
      }

      const createdJob: Job = await response.json();
      onJobCreated(createdJob);
      onOpenChange(false);
    } catch (error) {
      console.error("Create job error", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className=" flex items-center justify-center bg-slate-950/40 p-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full p-6 max-w-2xl rounded-[2rem] border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-semibold">Add New Job</h2>
          <p className="text-sm text-slate-500">Track a new opportunity</p>
        </div>

        <div className="p-6">
          <JobForm
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
            isSubmitting={isSaving}
          />
        </div>
      </div>
    </div>
  );
}
