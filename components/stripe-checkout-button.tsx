"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

export function StripeCheckoutButton({ isPro }: { isPro: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout");
      }

      // 🚀 NEW STRIPE FLOW
      window.location.href = data.url;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to start checkout",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPro) {
    return (
      <Button type="button" variant="secondary" disabled>
        You are on Pro
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <Button type="button" onClick={handleCheckout} disabled={loading}>
        {loading ? "Starting checkout..." : "Upgrade to Pro"}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
