import { NextResponse } from "next/server";
import { createJob } from "@/lib/server/jobs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (
      !payload ||
      typeof payload.company !== "string" ||
      !payload.company.trim() ||
      typeof payload.title !== "string" ||
      !payload.title.trim()
    ) {
      return NextResponse.json(
        { error: "Company and job title are required." },
        { status: 400 },
      );
    }
    const job = await createJob(payload);
    return NextResponse.json(job);
  } catch (error) {
    const message = (error as Error).message ?? "Unable to create job";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 },
    );
  }
}
