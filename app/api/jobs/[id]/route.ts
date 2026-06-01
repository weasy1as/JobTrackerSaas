import { NextResponse } from "next/server";
import { updateJobStatus } from "@/lib/supabase/jobs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await request.json();
    const job = await updateJobStatus(id, payload);
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to update job" },
      { status: 500 },
    );
  }
}
