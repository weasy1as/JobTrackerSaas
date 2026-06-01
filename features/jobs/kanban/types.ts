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
  source: string;
  location: string;
  url: string;
  contactName: string;
  contactEmail: string;
  notes: string;
  dateApplied: string;
}
