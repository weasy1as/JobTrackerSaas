export interface JobRow {
  id: string;
  company: string | null;
  title: string | null;
  status: string | null;
  source: string | null;
  location: string | null;
  job_url: string | null;
  contact_name: string | null;
  contact_email: string | null;
  notes: string | null;
  date_applied: string | null;
  job_description: string | null;
}

export type JobSelectRecord = Pick<
  JobRow,
  | "id"
  | "company"
  | "title"
  | "status"
  | "source"
  | "location"
  | "job_url"
  | "contact_name"
  | "contact_email"
  | "notes"
  | "date_applied"
  | "job_description"
>;
