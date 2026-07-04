"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JobSource, JobStatus } from "../types/domain";
import { JobFormValues } from "../types/forms";
import { JOB_SOURCE_OPTIONS, JOB_STATUSES } from "../constants";
import {
  JobFieldErrors,
  parseJobFormValues,
} from "../validation";

interface JobFormProps {
  initialValues: JobFormValues;
  mode: "create" | "edit";
  onSubmit: (values: JobFormValues) => Promise<void>;
  onCancel: () => void;
  onDirtyChange: (dirty: boolean) => void;
  isSubmitting?: boolean;
  serverFieldErrors?: JobFieldErrors;
}

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="text-xs text-red-600" role="alert">
      {message}
    </p>
  ) : null;
}

export function JobForm({
  initialValues,
  mode,
  onSubmit,
  onCancel,
  onDirtyChange,
  isSubmitting = false,
  serverFieldErrors = {},
}: JobFormProps) {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] =
    useState<JobFieldErrors>(serverFieldErrors);

  useEffect(() => {
    setValues(initialValues);
    setFieldErrors({});
  }, [initialValues]);

  useEffect(() => {
    setFieldErrors(serverFieldErrors);
  }, [serverFieldErrors]);

  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initialValues),
    [initialValues, values],
  );

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  function updateField<K extends keyof JobFormValues>(
    field: K,
    value: JobFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseJobFormValues(values);
    if (!parsed.success) {
      setFieldErrors(parsed.fieldErrors);
      return;
    }
    setFieldErrors({});
    await onSubmit(parsed.data);
  }

  const selectClass =
    "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";
  const textareaClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Essentials</h3>
          <p className="mt-1 text-sm text-slate-500">
            The core information for this opportunity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="job-company">Company *</Label>
            <Input
              id="job-company"
              autoFocus
              value={values.company}
              onChange={(event) =>
                updateField("company", event.target.value)
              }
              placeholder="Google"
              aria-invalid={Boolean(fieldErrors.company)}
            />
            <FieldError message={fieldErrors.company} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-title">Job title *</Label>
            <Input
              id="job-title"
              value={values.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Frontend Engineer"
              aria-invalid={Boolean(fieldErrors.title)}
            />
            <FieldError message={fieldErrors.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-status">Status</Label>
            <select
              id="job-status"
              className={selectClass}
              value={values.status}
              aria-invalid={Boolean(fieldErrors.status)}
              onChange={(event) =>
                updateField("status", event.target.value as JobStatus)
              }
            >
              {JOB_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <FieldError message={fieldErrors.status} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-source">Source</Label>
            <select
              id="job-source"
              className={selectClass}
              value={values.source}
              aria-invalid={Boolean(fieldErrors.source)}
              onChange={(event) =>
                updateField("source", event.target.value as JobSource)
              }
            >
              {JOB_SOURCE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <FieldError message={fieldErrors.source} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="job-date">Date applied</Label>
            <Input
              id="job-date"
              type="date"
              value={values.dateApplied}
              aria-invalid={Boolean(fieldErrors.dateApplied)}
              onChange={(event) =>
                updateField("dateApplied", event.target.value)
              }
            />
            <FieldError message={fieldErrors.dateApplied} />
          </div>
        </div>
      </section>

      <section className="space-y-4 border-t border-slate-100 pt-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Opportunity details
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Optional context you may want later.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="job-location">Location</Label>
            <Input
              id="job-location"
              value={values.location}
              onChange={(event) =>
                updateField("location", event.target.value)
              }
              placeholder="Remote / Berlin"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-url">Job URL</Label>
            <Input
              id="job-url"
              type="url"
              value={values.url}
              aria-invalid={Boolean(fieldErrors.url)}
              onChange={(event) => updateField("url", event.target.value)}
              placeholder="https://..."
            />
            <FieldError message={fieldErrors.url} />
          </div>
        </div>
      </section>

      <section className="space-y-4 border-t border-slate-100 pt-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
          <p className="mt-1 text-sm text-slate-500">
            Optional recruiter or hiring contact.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="job-contact-name">Name</Label>
            <Input
              id="job-contact-name"
              value={values.contactName}
              onChange={(event) =>
                updateField("contactName", event.target.value)
              }
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-contact-email">Email</Label>
            <Input
              id="job-contact-email"
              type="email"
              value={values.contactEmail}
              aria-invalid={Boolean(fieldErrors.contactEmail)}
              onChange={(event) =>
                updateField("contactEmail", event.target.value)
              }
              placeholder="jane@company.com"
            />
            <FieldError message={fieldErrors.contactEmail} />
          </div>
        </div>
      </section>

      <section className="space-y-4 border-t border-slate-100 pt-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Description and notes
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Keep the posting and your private notes together.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-description">Job description</Label>
            <textarea
              id="job-description"
              value={values.jobDescription}
              onChange={(event) =>
                updateField("jobDescription", event.target.value)
              }
              rows={6}
              className={textareaClass}
              placeholder="Paste or write the job description..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-notes">Notes</Label>
            <textarea
              id="job-notes"
              value={values.notes}
              onChange={(event) =>
                updateField("notes", event.target.value)
              }
              rows={4}
              className={textareaClass}
              placeholder="Anything important about this role..."
            />
          </div>
        </div>
      </section>

      <div className="sticky bottom-0 -mx-6 flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create job"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
