import type { Job, JobStatus } from "@/features/jobs/kanban/types";
import { createClient } from "./server";
import { formatDate, normalizeStatus } from "@/lib/utils";

interface JobRecord {
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
}

export interface CreateJobPayload {
  id: string;
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

const statuses: JobStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Ghosted",
];

function mapJobRecord(job: JobRecord): Job {
  return {
    id: job.id,
    company: job.company ?? "",
    title: job.title ?? "",
    status: normalizeStatus(job.status, statuses, "Applied"),
    dateApplied: formatDate(job.date_applied),
  };
}

export async function getJobs(): Promise<Job[]> {
  const supabase = await createClient(); // ✅ move INSIDE function

  const { data } = await supabase
    .from<JobRecord>("jobs")
    .select("id, company, title, status, date_applied")
    .order("created_at", { ascending: false });

  return (data ?? []).map(mapJobRecord);
}

export async function createJob(payload: CreateJobPayload): Promise<Job> {
  const supabase = await createClient(); // ✅ inside function

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data, error } = await supabase
    .from<JobRecord>("jobs")
    .insert({
      user_id: userId,
      company: payload.company,
      title: payload.title,
      status: payload.status,
      source: payload.source,
      location: payload.location || null,
      job_url: payload.url || null,
      contact_name: payload.contactName || null,
      contact_email: payload.contactEmail || null,
      notes: payload.notes || null,
      date_applied: new Date().toISOString(),
    })
    .select("id, company, title, status, date_applied")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create job");
  }

  return mapJobRecord(data);
}
