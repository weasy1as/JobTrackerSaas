import { NextResponse } from "next/server";
import { createJob } from "@/lib/server/jobs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const job = await createJob(payload);
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to create job" },
      { status: 500 },
    );
  }
}
