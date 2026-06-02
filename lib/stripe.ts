import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecretValue = process.env.STRIPE_WEBHOOK_SECRET;
const stripePriceIdValue = process.env.STRIPE_PRICE_ID;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!stripeWebhookSecretValue) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET");
}

if (!stripePriceIdValue) {
  throw new Error("Missing STRIPE_PRICE_ID");
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-05-27.dahlia",
});

export const stripeWebhookSecret = stripeWebhookSecretValue;
export const stripePriceId = stripePriceIdValue;
