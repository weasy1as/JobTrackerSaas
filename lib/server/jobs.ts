import { Job } from "@/features/jobs/types/domain";
import { JobFormValues } from "@/features/jobs/types/forms";
import { JobSelectRecord } from "@/features/jobs/types/db";
import { mapJobRecord } from "@/lib/utils";
import { createClient } from "../supabase/server";
import { JobServiceError } from "./job-errors";

const JOB_SELECT =
  "id, company, title, status, source, location, job_url, contact_name, contact_email, notes, date_applied, job_description";

async function authenticatedClient() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new JobServiceError(
      "unauthorized",
      "You must be signed in to manage jobs.",
      { cause: error },
    );
  }

  return { supabase, userId: user.id };
}

function databaseError(message: string, error: unknown): JobServiceError {
  console.error(message, error);
  return new JobServiceError("database", message, { cause: error });
}

export async function getJobs(): Promise<Job[]> {
  const { supabase, userId } = await authenticatedClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw databaseError("Unable to load your jobs.", error);
  }

  return (data ?? []).map((record) =>
    mapJobRecord(record as JobSelectRecord),
  );
}

export async function getJobById(jobId: string): Promise<Job | null> {
  const { supabase, userId } = await authenticatedClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .eq("id", jobId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw databaseError("Unable to load this job.", error);
  }

  return data ? mapJobRecord(data as JobSelectRecord) : null;
}

export async function createJob(payload: JobFormValues): Promise<Job> {
  const { supabase, userId } = await authenticatedClient();
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
      date_applied: payload.dateApplied || null,
      job_description: payload.jobDescription || null,
    })
    .select(JOB_SELECT)
    .single();

  if (error || !data) {
    throw databaseError("Unable to create the job.", error);
  }

  return mapJobRecord(data as JobSelectRecord);
}

export async function updateJobStatus(
  jobId: string,
  payload: Pick<JobFormValues, "status">,
): Promise<Job> {
  const { supabase, userId } = await authenticatedClient();
  const { data, error } = await supabase
    .from("jobs")
    .update({ status: payload.status })
    .eq("id", jobId)
    .eq("user_id", userId)
    .select(JOB_SELECT)
    .maybeSingle();

  if (error) {
    throw databaseError("Unable to update the job status.", error);
  }
  if (!data) {
    throw new JobServiceError("not_found", "Job not found.");
  }

  return mapJobRecord(data as JobSelectRecord);
}

export async function deleteJob(jobId: string): Promise<void> {
  const { supabase, userId } = await authenticatedClient();
  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId)
    .eq("user_id", userId)
    .select("id")
    .maybeSingle();

  if (error) {
    throw databaseError("Unable to delete the job.", error);
  }
  if (!data) {
    throw new JobServiceError("not_found", "Job not found.");
  }
}

export async function updateJob(
  jobId: string,
  payload: JobFormValues,
): Promise<Job> {
  const { supabase, userId } = await authenticatedClient();
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
    .eq("user_id", userId)
    .select(JOB_SELECT)
    .maybeSingle();

  if (error) {
    throw databaseError("Unable to update the job.", error);
  }
  if (!data) {
    throw new JobServiceError("not_found", "Job not found.");
  }

  return mapJobRecord(data as JobSelectRecord);
}
