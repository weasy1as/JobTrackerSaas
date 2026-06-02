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

type JobSelectRecord = Pick<
  JobRecord,
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
>;

export interface CreateJobPayload {
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

export interface UpdateJobPayload {
  company: string;
  title: string;
  source: string;
  status: JobStatus;
  location: string;
  url: string;
  contactName: string;
  contactEmail: string;
  notes: string;
  dateApplied: string;
}

export interface UpdateJobStatusPayload {
  status: JobStatus;
}

const statuses: JobStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Ghosted",
];

function mapJobRecord(job: JobSelectRecord): Job {
  return {
    id: job.id,
    company: job.company ?? "",
    title: job.title ?? "",
    status: normalizeStatus(job.status, statuses, "Applied"),
    source: job.source ?? "",
    location: job.location ?? "",
    url: job.job_url ?? "",
    contactName: job.contact_name ?? "",
    contactEmail: job.contact_email ?? "",
    notes: job.notes ?? "",
    dateApplied: formatDate(job.date_applied),
  };
}

export async function getJobs(): Promise<Job[]> {
  const supabase = await createClient();

  // 1. Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("No authenticated user found");
    return [];
  }

  // 2. Fetch only this user's jobs
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "id, company, title, status, source, location, job_url, contact_name, contact_email, notes, date_applied",
    )
    .eq("user_id", user.id) // 🔥 THIS IS THE KEY FIX
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }

  return (data ?? []).map(mapJobRecord);
}

export async function createJob(payload: CreateJobPayload): Promise<Job> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data, error } = await supabase
    .from("jobs")
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
    .select(
      "id, company, title, status, source, location, job_url, contact_name, contact_email, notes, date_applied",
    )
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create job");
  }

  return mapJobRecord(data as JobSelectRecord);
}

export async function updateJobStatus(
  jobId: string,
  payload: UpdateJobStatusPayload,
): Promise<Job> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .update({
      status: payload.status,
    })
    .eq("id", jobId)
    .select(
      "id, company, title, status, source, location, job_url, contact_name, contact_email, notes, date_applied",
    )
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to update job status");
  }

  return mapJobRecord(data as JobSelectRecord);
}

export async function deleteJob(jobId: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("jobs").delete().eq("id", jobId);

  if (error) {
    throw new Error(error.message ?? "Failed to delete job");
  }
}

export async function updateJob(
  jobId: string,
  payload: UpdateJobPayload,
): Promise<Job> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .update({
      company: payload.company,
      title: payload.title,
      status: payload.status,
      source: payload.source,
      location: payload.location || null,
      job_url: payload.url || null,
      contact_name: payload.contactName || null,
      contact_email: payload.contactEmail || null,
      notes: payload.notes || null,
      date_applied: payload.dateApplied || null,
    })
    .eq("id", jobId)
    .select(
      "id, company, title, status, source, location, job_url, contact_name, contact_email, notes, date_applied",
    )
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to update job");
  }

  return mapJobRecord(data as JobSelectRecord);
}
