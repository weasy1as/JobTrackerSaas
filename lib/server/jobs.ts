import { Job } from "@/features/jobs/types/domain";
import { JobFormValues } from "@/features/jobs/types/forms";
import { createClient } from "../supabase/server";
import { mapJobRecord } from "@/lib/utils";
import { JobSelectRecord } from "@/features/jobs/types/db";

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
      "id, company, title, status, source, location, job_url, contact_name, contact_email, notes, date_applied, job_description",
    )
    .eq("user_id", user.id) // 🔥 THIS IS THE KEY FIX
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }

  return (data ?? []).map(mapJobRecord);
}

export async function getJobById(jobId: string): Promise<Job | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data, error } = await supabase
    .from("jobs")
    .select(
      "id, company, title, status, source, location, job_url, contact_name, contact_email, notes, date_applied, job_description",
    )
    .eq("id", jobId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapJobRecord(data as JobSelectRecord) : null;
}

export async function createJob(payload: JobFormValues): Promise<Job> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert({
      user_id: user.id,
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
      job_description: payload.jobDescription || null,
    })
    .select(
      "id, company, title, status, source, location, job_url, contact_name, contact_email, notes, date_applied, job_description",
    )
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create job");
  }

  return mapJobRecord(data as JobSelectRecord);
}

export async function updateJobStatus(
  jobId: string,
  payload: Pick<JobFormValues, "status">,
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
  payload: JobFormValues,
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
      job_description: payload.jobDescription || null,
    })
    .eq("id", jobId)
    .select(
      "id, company, title, status, source, location, job_url, contact_name, contact_email, notes, date_applied,job_description",
    )
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to update job");
  }

  return mapJobRecord(data as JobSelectRecord);
}
