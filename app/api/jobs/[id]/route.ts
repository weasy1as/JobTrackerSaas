import { NextResponse } from "next/server";
import { deleteJob, updateJob, updateJobStatus } from "@/lib/server/jobs";
import {
  jobServiceErrorStatus,
  safeJobServiceError,
} from "@/lib/server/job-errors";
import {
  isValidJobId,
  parseJobFormValues,
  parseJobStatusUpdate,
} from "@/features/jobs/validation";

type RouteContext = { params: Promise<{ id: string }> };

function invalidIdResponse() {
  return NextResponse.json(
    { error: "Invalid job ID." },
    { status: 400 },
  );
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params;
  if (!isValidJobId(id)) return invalidIdResponse();

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const isStatusOnly =
    typeof payload === "object" &&
    payload !== null &&
    !Array.isArray(payload) &&
    Object.keys(payload).length === 1 &&
    Object.hasOwn(payload, "status");

  try {
    if (isStatusOnly) {
      const parsed = parseJobStatusUpdate(payload);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error, fieldErrors: parsed.fieldErrors },
          { status: 400 },
        );
      }
      const job = await updateJobStatus(id, parsed.data);
      return NextResponse.json(job);
    }

    const parsed = parseJobFormValues(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error, fieldErrors: parsed.fieldErrors },
        { status: 400 },
      );
    }
    const job = await updateJob(id, parsed.data);
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: safeJobServiceError(error, "Unable to update job.") },
      { status: jobServiceErrorStatus(error) },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext,
) {
  const { id } = await params;
  if (!isValidJobId(id)) return invalidIdResponse();

  try {
    await deleteJob(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: safeJobServiceError(error, "Unable to delete job.") },
      { status: jobServiceErrorStatus(error) },
    );
  }
}
