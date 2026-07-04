import { JobSelectRecord } from "@/features/jobs/types/db";
import {
  Job,
} from "@/features/jobs/types/domain";
import {
  JOB_SOURCES,
  JOB_STATUSES,
} from "@/features/jobs/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "./supabase/client";
import { AppUser } from "@/features/jobs/types/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeStatus<T extends string>(
  value: string | null,
  allowedValues: readonly T[],
  fallback: T,
): T {
  if (allowedValues.includes(value as T)) {
    return value as T;
  }
  return fallback;
}

export function formatDate(date: string | null) {
  if (!date) return "";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toISOString().split("T")[0];
}

export function mapJobRecord(job: JobSelectRecord): Job {
  return {
    id: job.id,
    company: job.company ?? "",
    title: job.title ?? "",
    status: normalizeStatus(job.status, JOB_STATUSES, "Applied"),
    source: normalizeStatus(job.source, JOB_SOURCES, "job_post"),
    location: job.location ?? "",
    url: job.job_url ?? "",
    contactName: job.contact_name ?? "",
    contactEmail: job.contact_email ?? "",
    notes: job.notes ?? "",
    dateApplied: formatDate(job.date_applied),
    jobDescription: job.job_description ?? "",
  };
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function getUser(): Promise<AppUser | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return null;
  }

  return data.user as AppUser;
}
