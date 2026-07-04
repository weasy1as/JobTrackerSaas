"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { JobForm } from "../create-job/JobForm";
import { JobFormValues } from "../types/forms";
import { JobFieldErrors } from "../validation";

interface JobFormPageProps {
  mode: "create" | "edit";
  initialValues: JobFormValues;
  jobId?: string;
  cancelHref: string;
}

export function JobFormPage({
  mode,
  initialValues,
  jobId,
  cancelHref,
}: JobFormPageProps) {
  const router = useRouter();
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<JobFieldErrors>({});

  useEffect(() => {
    function warnBeforeUnload(event: BeforeUnloadEvent) {
      if (!isDirty) return;
      event.preventDefault();
    }

    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isDirty]);

  const cancel = useCallback(() => {
    if (isDirty && !window.confirm("Discard your unsaved changes?")) return;
    router.push(cancelHref);
  }, [cancelHref, isDirty, router]);

  async function submit(values: JobFormValues) {
    setIsSubmitting(true);
    setFieldErrors({});
    try {
      const response = await fetch(
        mode === "create" ? "/api/jobs" : `/api/jobs/${jobId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
          fieldErrors?: JobFieldErrors;
        } | null;
        if (body?.fieldErrors) setFieldErrors(body.fieldErrors);
        throw new Error(body?.error || "Unable to save job.");
      }

      setIsDirty(false);
      toast.success(mode === "create" ? "Job created." : "Job updated.");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to save job.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <JobForm
        mode={mode}
        initialValues={initialValues}
        onSubmit={submit}
        onCancel={cancel}
        onDirtyChange={setIsDirty}
        isSubmitting={isSubmitting}
        serverFieldErrors={fieldErrors}
      />
    </>
  );
}
