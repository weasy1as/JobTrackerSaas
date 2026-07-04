export type JobStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Ghosted";

export type JobSource =
  | "job_post"
  | "networking"
  | "recruiter"
  | "email"
  | "other";

export interface Job {
  id: string;
  company: string;
  title: string;
  status: JobStatus;
  source: JobSource;
  location: string;
  url: string;
  contactName: string;
  contactEmail: string;
  notes: string;
  dateApplied: string;
  jobDescription: string;
}
