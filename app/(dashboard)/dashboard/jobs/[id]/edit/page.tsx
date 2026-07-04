import { notFound } from "next/navigation";
import { JobFormPage } from "@/features/jobs/job-pages/JobFormPage";
import { JobPageShell } from "@/features/jobs/job-pages/JobPageShell";
import { jobToFormValues } from "@/features/jobs/types/forms";
import { getJobById } from "@/lib/server/jobs";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) notFound();

  return (
    <JobPageShell
      eyebrow="Edit opportunity"
      title={`Edit ${job.title}`}
      description={`Update the details for ${job.company}.`}
    >
      <JobFormPage
        mode="edit"
        initialValues={jobToFormValues(job)}
        jobId={job.id}
        cancelHref={`/dashboard/jobs/${job.id}`}
      />
    </JobPageShell>
  );
}
