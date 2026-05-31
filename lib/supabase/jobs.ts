import type { Job, JobStatus } from "@/features/jobs/kanban/types";
import { createClient } from "./server";
import { formatDate, normalizeStatus } from "@/lib/utils";

interface JobRecord {
  id: string;
  company: string | null;
  title: string | null;
  status: string | null;
  date_applied: string | null;
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
  const supabase = await createClient();
  const { data } = await supabase
    .from<JobRecord>("jobs")
    .select("id, company, title, status, date_applied")
    .order("created_at", { ascending: false });

  return (data ?? []).map(mapJobRecord);
}
