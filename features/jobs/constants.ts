import { JobSource, JobStatus } from "./types/domain";

export const JOB_STATUSES: readonly JobStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Ghosted",
];

export const JOB_SOURCE_OPTIONS: ReadonlyArray<{
  value: JobSource;
  label: string;
}> = [
  { value: "job_post", label: "Job post" },
  { value: "networking", label: "Networking" },
  { value: "recruiter", label: "Recruiter" },
  { value: "email", label: "Email" },
  { value: "other", label: "Other" },
];

export const JOB_SOURCES: readonly JobSource[] = JOB_SOURCE_OPTIONS.map(
  ({ value }) => value,
);

export const JOB_SOURCE_LABELS: Record<JobSource, string> =
  Object.fromEntries(
    JOB_SOURCE_OPTIONS.map(({ value, label }) => [value, label]),
  ) as Record<JobSource, string>;

export const JOB_STATUS_BADGE_STYLES: Record<JobStatus, string> = {
  Applied: "bg-slate-100 text-slate-700",
  Interview: "bg-blue-100 text-blue-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Ghosted: "bg-amber-100 text-amber-700",
};
