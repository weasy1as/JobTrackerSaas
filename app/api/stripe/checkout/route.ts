import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createStripeCheckoutSession } from "@/services/stripe/checkout";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const host = request.headers.get("host");
  const origin =
    request.headers.get("origin") ?? (host ? `https://${host}` : null);

  if (!origin) {
    return NextResponse.json(
      { error: "Unable to determine request origin" },
      { status: 400 },
    );
  }

  try {
    const session = await createStripeCheckoutSession({
      userId: user.id,
      email: user.email,
      origin,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create checkout session",
      },
      { status: 500 },
    );
  }
}
