import { stripe } from "@/lib/stripe";

interface CreateStripeCheckoutSessionArgs {
  userId: string;
  email?: string | null;
  origin: string;
}

export async function createStripeCheckoutSession({
  userId,
  email,
  origin,
}: CreateStripeCheckoutSessionArgs) {
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!priceId) {
    throw new Error("Missing STRIPE_PRICE_ID");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    metadata: {
      userId,
    },
    success_url: `${origin}/billing?success=true`,
    cancel_url: `${origin}/billing?canceled=true`,
    customer_email: email ?? undefined,
  });

  return session;
}
