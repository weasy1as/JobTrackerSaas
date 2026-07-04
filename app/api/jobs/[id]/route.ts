import { NextResponse } from "next/server";
import { deleteJob, updateJob, updateJobStatus } from "@/lib/server/jobs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await request.json();
    const isStatusOnly =
      payload &&
      typeof payload === "object" &&
      "status" in payload &&
      Object.keys(payload).length === 1;

    if (
      !isStatusOnly &&
      (!payload ||
        typeof payload.company !== "string" ||
        !payload.company.trim() ||
        typeof payload.title !== "string" ||
        !payload.title.trim())
    ) {
      return NextResponse.json(
        { error: "Company and job title are required." },
        { status: 400 },
      );
    }

    const job = isStatusOnly
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
