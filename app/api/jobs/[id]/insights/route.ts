import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select(
        "id, company, title, status, source, location, job_url, contact_name, contact_email, notes",
      )
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY;
    if (!OPENAI_KEY) {
      return NextResponse.json(
        { error: "Server missing OPENAI_API_KEY. Set env to enable AI." },
        { status: 500 },
      );
    }

    const prompt = `Analyze the following job posting and return a JSON object with the following keys: summary (string), key_skills (array of short strings), interview_questions (array of strings), preparation_plan (array of short steps), weak_areas_to_improve (array of short strings), difficulty (one-word string: easy|medium|hard). Only return valid JSON, nothing else.\n\nJob title: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}\nSource: ${job.source}\nJob URL: ${job.job_url}\nContact: ${job.contact_name} ${job.contact_email}\nNotes: ${job.notes || ""}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an assistant that outputs only JSON.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 700,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json(
        { error: `OpenAI error: ${txt}` },
        { status: 502 },
      );
    }

    const body = await res.json();
    const content = body?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No content from OpenAI" },
        { status: 502 },
      );
    }

    // Try to parse JSON from the model's response.
    try {
      const parsed = JSON.parse(content);
      return NextResponse.json(parsed);
    } catch (e) {
      return NextResponse.json(
        { error: "OpenAI returned non-JSON response" },
        { status: 502 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Unknown error" },
      { status: 500 },
    );
  }
}
