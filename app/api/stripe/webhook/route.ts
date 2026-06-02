import { NextResponse } from "next/server";
import { stripe, stripeWebhookSecret } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const stripeSignature = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!stripeSignature) {
    return NextResponse.json(
      { error: "Missing Stripe signature header" },
      { status: 400 },
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      stripeWebhookSecret,
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = session.metadata?.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId in session metadata" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("subscriptions")
      .update({
        plan: "pro",
        status: "active",
        stripe_customer_id: session.customer ?? null,
        stripe_subscription_id: session.subscription ?? null,
      })
      .eq("user_id", userId);

    if (error) {
      return NextResponse.json(
        { error: error.message || "Unable to update subscription" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
