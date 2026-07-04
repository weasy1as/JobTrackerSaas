"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteJobButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteJob() {
    if (!window.confirm("Delete this job? This cannot be undone.")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Unable to delete job.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete job.",
      );
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <Button
        type="button"
        variant="ghost"
        className="text-red-600 hover:bg-red-50 hover:text-red-700"
        onClick={deleteJob}
        disabled={isDeleting}
      >
        <Trash2 className="size-4" />
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
}
