"use client";

import { useState } from "react";
import { toast } from "sonner";
import { JobForm } from "./JobForm";
import { Job } from "../types/domain";

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

  const handleSubmit = async (values: Job) => {
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
        const errorText = await response.text();
        console.error("Failed to create job", errorText);
        toast.error("Unable to create job. Please try again.");
        return;
      }

      const createdJob: Job = await response.json();
      onJobCreated(createdJob);
      toast.success("Job created successfully.");
      onOpenChange(false);
    } catch (error) {
      console.error("Create job error", error);
      toast.error("Unable to create job. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) return null;
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
