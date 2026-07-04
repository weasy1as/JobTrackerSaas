import { NextResponse } from "next/server";
import { createJob } from "@/lib/server/jobs";
import {
  jobServiceErrorStatus,
  safeJobServiceError,
} from "@/lib/server/job-errors";
import { parseJobFormValues } from "@/features/jobs/validation";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const parsed = parseJobFormValues(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error, fieldErrors: parsed.fieldErrors },
      { status: 400 },
    );
  }

  try {
    const job = await createJob(parsed.data);
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: safeJobServiceError(error, "Unable to create job.") },
      { status: jobServiceErrorStatus(error) },
    );
  }
}
