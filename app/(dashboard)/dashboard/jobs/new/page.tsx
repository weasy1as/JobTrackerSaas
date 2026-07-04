import { JobFormPage } from "@/features/jobs/job-pages/JobFormPage";
import { JobPageShell } from "@/features/jobs/job-pages/JobPageShell";
import { EMPTY_JOB_FORM } from "@/features/jobs/types/forms";

export default function NewJobPage() {
  return (
    <JobPageShell
      eyebrow="New opportunity"
      title="Add a job"
      description="Capture the essentials first, then add any useful context for later."
    >
      <JobFormPage
        mode="create"
        initialValues={EMPTY_JOB_FORM}
        cancelHref="/dashboard"
      />
    </JobPageShell>
  );
}
