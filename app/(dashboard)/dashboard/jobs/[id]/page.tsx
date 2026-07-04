import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteJobButton } from "@/features/jobs/job-pages/DeleteJobButton";
import { JobPageShell } from "@/features/jobs/job-pages/JobPageShell";
import { Job } from "@/features/jobs/types/domain";
import { getJobById } from "@/lib/server/jobs";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const sourceLabels: Record<Job["source"], string> = {
  job_post: "Job post",
  networking: "Networking",
  recruiter: "Recruiter",
  email: "Email",
  other: "Other",
};

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-900">
        {value || "Not added"}
      </dd>
    </div>
  );
}

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) notFound();

  return (
    <JobPageShell
      eyebrow="Job details"
      title={job.title}
      description={job.company}
    >
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild variant="secondary">
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <DeleteJobButton jobId={job.id} />
          <Button asChild>
            <Link href={`/dashboard/jobs/${job.id}/edit`}>
              <Pencil className="size-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {job.status}
          </span>
          <span className="text-sm text-slate-500">
            {sourceLabels[job.source]}
          </span>
        </div>

        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Detail label="Company" value={job.company} />
          <Detail label="Job title" value={job.title} />
          <Detail label="Date applied" value={job.dateApplied} />
          <Detail label="Location" value={job.location} />
          <Detail label="Contact" value={job.contactName} />
          <Detail label="Contact email" value={job.contactEmail} />
        </dl>

        {job.url ? (
          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Open job posting <ExternalLink className="size-4" />
          </a>
        ) : null}

        <dl className="grid gap-8 border-t border-slate-100 pt-8 lg:grid-cols-2">
          <Detail label="Job description" value={job.jobDescription} />
          <Detail label="Notes" value={job.notes} />
        </dl>
      </div>
    </JobPageShell>
  );
}
