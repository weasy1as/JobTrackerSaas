"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { JobStatus } from "@/features/jobs/kanban/types";

export interface JobFormValues {
  company: string;
  title: string;
  source: string;
  status: JobStatus;
  location: string;
  url: string;
  contactName: string;
  contactEmail: string;
  notes: string;
}

const initialValues: JobFormValues = {
  company: "",
  title: "",
  source: "job_post",
  status: "Applied",
  location: "",
  url: "",
  contactName: "",
  contactEmail: "",
  notes: "",
};

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function JobForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: JobFormProps) {
  const [values, setValues] = useState<JobFormValues>(initialValues);
  const [touched, setTouched] = useState(false);

  const isInvalid = useMemo(() => {
    return !values.company.trim() || !values.title.trim();
  }, [values.company, values.title]);

  function updateField(field: keyof JobFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);

    if (isInvalid) return;

    onSubmit(values);
    setValues(initialValues);
    setTouched(false);
  }

  const inputClass =
    "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200";

  const selectClass =
    "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200";

  const sectionTitle =
    "text-xs font-semibold uppercase tracking-wider text-slate-500";

  return (
    <form onSubmit={handleSubmit} className="">
      {/* HEADER HINT */}
      <div className="space-y-">
        <h3 className="text-sm font-medium text-slate-900">
          Add a new job application
        </h3>
        <p className="text-xs text-slate-500">
          Fill in the details to track your progress
        </p>
      </div>

      {/* BASIC INFO */}
      <div className="space-y-4">
        <p className={sectionTitle}>Basic info</p>

        <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-2">
          <div>
            <Label>Company *</Label>
            <Input
              className={inputClass}
              value={values.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="Google"
            />
          </div>

          <div>
            <Label>Job Title *</Label>
            <Input
              className={inputClass}
              value={values.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Frontend Engineer"
            />
          </div>
        </div>
      </div>

      {/* STATUS */}
      <div className="space-y-4">
        <p className={sectionTitle}>Pipeline</p>

        <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-2">
          <div>
            <Label>Status</Label>
            <select
              className={selectClass}
              value={values.status}
              onChange={(e) => updateField("status", e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Ghosted">Ghosted</option>
            </select>
          </div>

          <div>
            <Label>Source</Label>
            <select
              className={selectClass}
              value={values.source}
              onChange={(e) => updateField("source", e.target.value)}
            >
              <option value="job_post">Job post</option>
              <option value="networking">Networking</option>
              <option value="recruiter">Recruiter</option>
              <option value="email">Email</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="space-y-4">
        <p className={sectionTitle}>Details</p>

        <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-2">
          <div>
            <Label>Location</Label>
            <Input
              className={inputClass}
              value={values.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Remote / Copenhagen"
            />
          </div>

          <div>
            <Label>Job URL</Label>
            <Input
              className={inputClass}
              type="url"
              value={values.url}
              onChange={(e) => updateField("url", e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="space-y-4">
        <p className={sectionTitle}>Contact</p>

        <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-2">
          <div>
            <Label>Name</Label>
            <Input
              className={inputClass}
              value={values.contactName}
              onChange={(e) => updateField("contactName", e.target.value)}
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              className={inputClass}
              type="email"
              value={values.contactEmail}
              onChange={(e) => updateField("contactEmail", e.target.value)}
              placeholder="jane@company.com"
            />
          </div>
        </div>
      </div>

      {/* NOTES */}
      <div className="space-y-">
        <p className={sectionTitle}>Notes</p>

        <textarea
          value={values.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="Anything important about this role..."
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-between pt-2">
        <div>
          {touched && isInvalid && (
            <p className="text-sm text-red-500">
              Company and Job Title are required
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting || isInvalid}>
            {isSubmitting ? "Creating…" : "Create Job"}
          </Button>
        </div>
      </div>
    </form>
  );
}
