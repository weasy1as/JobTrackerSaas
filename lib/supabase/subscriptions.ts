import { createClient } from "./server";

export interface UserSubscription {
  id: string;
  plan: string | null;
  status: string | null;
  user_id: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export async function getUserSubscription(
  userId: string,
): Promise<UserSubscription | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("id, plan, status, user_id, created_at, updated_at")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as UserSubscription;
}

export function isProSubscription(
  subscription: UserSubscription | null,
): boolean {
  return (
    !!subscription &&
    subscription.plan === "pro" &&
    subscription.status === "active"
  );
}
