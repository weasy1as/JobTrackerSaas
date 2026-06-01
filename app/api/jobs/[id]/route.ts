import { NextResponse } from "next/server";
import { deleteJob, updateJob, updateJobStatus } from "@/lib/supabase/jobs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await request.json();

    const job =
      payload &&
      typeof payload === "object" &&
      "status" in payload &&
      Object.keys(payload).length === 1
        ? await updateJobStatus(id, payload)
        : await updateJob(id, payload);

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to update job" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteJob(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to delete job" },
      { status: 500 },
    );
  }
}
