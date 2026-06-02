"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Job, JobStatus } from "../types/domain";
import { JobFormValues } from "../types/forms";

interface JobDetailsModalProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (job: Job) => void;
  onDelete: (jobId: string) => void;
}

const statusOptions: JobStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Ghosted",
];

export function JobDetailsModal({
  job,
  open,
  onClose,
  onUpdate,
  onDelete,
}: JobDetailsModalProps) {
  const [values, setValues] = useState<JobFormValues | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    if (!job) return;
    setAiError(null);
    setAiLoading(true);
    try {
      const res = await fetch(`/api/jobs/${job.id}/insights`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data?.error || "Failed to generate insights");
      } else {
        setAiResult(data);
      }
    } catch (e) {
      setAiError((e as Error).message);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!job) {
      setValues(null);
      setAiResult(null);
      setAiError(null);
      return;
    }

    setValues({
      company: job.company,
      title: job.title,
      status: job.status,
      source: job.source,
      location: job.location,
      url: job.url,
      contactName: job.contactName,
      contactEmail: job.contactEmail,
      notes: job.notes,
      dateApplied: job.dateApplied,
      jobDescription: job.jobDescription,
    });
  }, [job]);

  const isDirty = useMemo(() => {
    if (!job || !values) return false;
    return (
      job.company !== values.company ||
      job.title !== values.title ||
      job.status !== values.status ||
      job.source !== values.source ||
      job.location !== values.location ||
      job.url !== values.url ||
      job.contactName !== values.contactName ||
      job.contactEmail !== values.contactEmail ||
      job.notes !== values.notes ||
      job.dateApplied !== values.dateApplied ||
      job?.jobDescription !== values.jobDescription
    );
  }, [job, values]);

  const handleFieldChange = (field: keyof JobFormValues, value: string) => {
    setValues((current) =>
      current
        ? { ...current, [field]: value as JobFormValues[typeof field] }
        : current,
    );
  };

  const handleCancel = () => {
    if (job) {
      setValues({
        company: job.company,
        title: job.title,
        status: job.status,
        source: job.source,
        location: job.location,
        url: job.url,
        contactName: job.contactName,
        contactEmail: job.contactEmail,
        notes: job.notes,
        dateApplied: job.dateApplied,
        jobDescription: job.jobDescription,
      });
    }
    onClose();
  };

  const handleUpdate = async () => {
    if (!job || !values) return;
    setIsSaving(true);

    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error("Failed to update job", await response.text());
        return;
      }

      const updatedJob: Job = await response.json();
      onUpdate(updatedJob);
      onClose();
    } catch (error) {
      console.error("Unable to update job", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!job) return;
    const confirmed = window.confirm(
      "Delete this job? This action cannot be undone.",
    );
    if (!confirmed) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete job", await response.text());
        return;
      }

      onDelete(job.id);
      onClose();
    } catch (error) {
      console.error("Unable to delete job", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!open || !job || !values) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 w-auto">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleCancel}
      />

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Job details
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {job.title}
            </h2>
            <p className="text-sm text-slate-600">{job.company}</p>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="text-slate-500 transition hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex gap-8 flex-col md:flex-row">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={values.company}
                onChange={(event) =>
                  handleFieldChange("company", event.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="title">Job title</Label>
              <Input
                id="title"
                value={values.title}
                onChange={(event) =>
                  handleFieldChange("title", event.target.value)
                }
              />
            </div>
          </div>

          <div className="flex gap-8 flex-col md:flex-row">
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={values.status}
                onChange={(event) =>
                  handleFieldChange("status", event.target.value)
                }
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="source">Source</Label>
              <select
                id="source"
                value={values.source}
                onChange={(e) => handleFieldChange("source", e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option value="job_post">Job post</option>
                <option value="networking">Networking</option>
                <option value="recruiter">Recruiter</option>
                <option value="email">Email</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex gap-8 flex-col md:flex-row">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={values.location}
                onChange={(event) =>
                  handleFieldChange("location", event.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="url">Job URL</Label>
              <Input
                id="url"
                type="url"
                value={values.url}
                onChange={(event) =>
                  handleFieldChange("url", event.target.value)
                }
              />
            </div>
          </div>

          <div className="flex gap-8 flex-col md:flex-row">
            <div>
              <Label htmlFor="contactName">Contact name</Label>
              <Input
                id="contactName"
                value={values.contactName}
                onChange={(event) =>
                  handleFieldChange("contactName", event.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={values.contactEmail}
                onChange={(event) =>
                  handleFieldChange("contactEmail", event.target.value)
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="dateApplied">Applied date</Label>
              <Input
                id="dateApplied"
                type="date"
                value={values.dateApplied}
                onChange={(event) =>
                  handleFieldChange("dateApplied", event.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="jobDescription">Job Description</Label>
              <textarea
                id="jobDescription"
                value={values.jobDescription ?? ""}
                onChange={(event) =>
                  handleFieldChange("jobDescription", event.target.value)
                }
                rows={4}
                className="h-full min-h-[112px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Add job description about this role"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                value={values.notes}
                onChange={(event) =>
                  handleFieldChange("notes", event.target.value)
                }
                rows={4}
                className="h-full min-h-[112px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Add notes about this role"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">
              AI Insights
            </h3>
            <div>
              <Button
                type="button"
                onClick={handleGenerateAI}
                disabled={aiLoading}
              >
                {aiLoading ? "Analyzing..." : "Generate AI Insights"}
              </Button>
            </div>
          </div>

          {aiError ? (
            <p className="text-sm text-destructive">{aiError}</p>
          ) : null}

          {aiResult ? (
            <div className="space-y-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
              {aiResult.summary ? (
                <div>
                  <p className="text-sm font-semibold">Summary</p>
                  <p className="text-sm text-slate-700">{aiResult.summary}</p>
                </div>
              ) : null}

              {aiResult.key_skills ? (
                <div>
                  <p className="text-sm font-semibold">Key skills</p>
                  <ul className="ml-4 list-disc text-sm text-slate-700">
                    {aiResult.key_skills.map((s: string) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {aiResult.interview_questions ? (
                <div>
                  <p className="text-sm font-semibold">Interview questions</p>
                  <ol className="ml-4 list-decimal text-sm text-slate-700">
                    {aiResult.interview_questions.map(
                      (q: string, i: number) => (
                        <li key={i}>{q}</li>
                      ),
                    )}
                  </ol>
                </div>
              ) : null}

              {aiResult.preparation_plan ? (
                <div>
                  <p className="text-sm font-semibold">Preparation plan</p>
                  <ol className="ml-4 list-decimal text-sm text-slate-700">
                    {aiResult.preparation_plan.map((p: string, i: number) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {aiResult.weak_areas_to_improve ? (
                <div>
                  <p className="text-sm font-semibold">Areas to improve</p>
                  <ul className="ml-4 list-disc text-sm text-slate-700">
                    {aiResult.weak_areas_to_improve.map((w: string) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {aiResult.difficulty ? (
                <div>
                  <p className="text-sm font-semibold">Difficulty</p>
                  <p className="text-sm text-slate-700">
                    {aiResult.difficulty}
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No insights yet.</p>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Button
              variant="destructive"
              type="button"
              onClick={handleDelete}
              disabled={isSaving}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </div>

          <div>
            {isDirty ? (
              <Button
                type="button"
                onClick={handleUpdate}
                disabled={!isDirty || isSaving}
              >
                {isSaving ? "Updating..." : "Update"}
              </Button>
            ) : (
              <p className="text-sm text-slate-500">
                Edit any field to enable update.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
