import { useEffect, useState } from "react";

export interface SubscriptionState {
  subscription: {
    plan: string | null;
    status: string | null;
  } | null;
  isPro: boolean;
  loading: boolean;
  error: string | null;
}

export function useAiAccess(open: boolean) {
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [subscription, setSubscription] =
    useState<SubscriptionState["subscription"]>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    let active = true;
    setLoading(true);
    setError(null);

    fetch("/api/subscription")
      .then(async (res) => {
        const data = await res.json();
        if (!active) return;
        if (!res.ok) {
          setError(data?.error || "Unable to load subscription");
          setIsPro(false);
          setSubscription(null);
          return;
        }

        setSubscription(data.subscription ?? null);
        setIsPro(Boolean(data.isPro));
      })
      .catch((err) => {
        if (!active) return;
        setError(err?.message || "Unable to load subscription");
        setIsPro(false);
        setSubscription(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [open]);

  return { isPro, subscription, loading, error };
}
