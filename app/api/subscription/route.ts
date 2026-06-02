import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getUserSubscription,
  isProSubscription,
} from "@/lib/supabase/subscriptions";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscription = await getUserSubscription(user.id);
    return NextResponse.json({
      subscription,
      isPro: isProSubscription(subscription),
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Unable to fetch subscription" },
      { status: 500 },
    );
  }
}
