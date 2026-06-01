export type JobStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Saved";

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
