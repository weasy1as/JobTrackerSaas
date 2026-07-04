import type { Job } from "./domain";

export type JobFormValues = Omit<Job, "id">;

export const EMPTY_JOB_FORM: JobFormValues = {
  company: "",
  title: "",
  status: "Applied",
  source: "job_post",
  location: "",
  url: "",
  contactName: "",
  contactEmail: "",
  notes: "",
  dateApplied: "",
  jobDescription: "",
};

export function jobToFormValues(job: Job): JobFormValues {
  return {
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
  };
}
