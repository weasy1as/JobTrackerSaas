export type JobStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Ghosted";

export interface Job {
  id: string;
  company: string;
  title: string;
  status: JobStatus;
  dateApplied: string;
}
