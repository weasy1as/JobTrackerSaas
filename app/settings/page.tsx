import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";

async function getProfile() {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/auth/login");
  }

  const user = userData.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw new Error("Unable to load profile data.");
  }

  return { user, profile };
}

async function updateProfile(formData: FormData) {
  "use server";

  const full_name = formData.get("full_name")?.toString() ?? "";
  const avatar_url = formData.get("avatar_url")?.toString() ?? "";

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/auth/login");
  }

  const user = userData.user;

  const updates = {
    id: user.id,
    full_name: full_name || null,
    avatar_url: avatar_url || null,
  };

  const { error } = await supabase.from("profiles").upsert(updates, {
    returning: "minimal",
  });

  if (error) {
    throw new Error("Failed to update profile.");
  }

  redirect("/settings?updated=1");
}

function getInitials(fullName: string | null, email: string | null) {
  if (fullName) {
    return fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  if (email) {
    return email.charAt(0).toUpperCase();
  }

  return "U";
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams?: { updated?: string };
}) {
  const updated = searchParams?.updated === "1";
  const { user, profile } = await getProfile();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-10 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
              Settings
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Manage your profile
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Update your basic profile information and keep your account
              details in sync.
            </p>
            <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-semibold text-indigo-700">
                  {getInitials(profile?.full_name ?? null, user.email)}
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {profile?.full_name ?? "No name set"}
                </p>
                <p className="mt-2 text-sm text-slate-500">{user.email}</p>
              </div>

              <div className="space-y-6">
                {updated && (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Profile updated successfully.
                  </div>
                )}

                <form action={updateProfile} className="space-y-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        defaultValue={profile?.full_name ?? ""}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="avatar_url">Avatar URL</Label>
                      <Input
                        id="avatar_url"
                        name="avatar_url"
                        defaultValue={profile?.avatar_url ?? ""}
                        placeholder="https://example.com/avatar.png"
                      />
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm font-semibold text-slate-900">
                      Account details
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <div>
                        <span className="font-medium text-slate-900">
                          User ID:
                        </span>{" "}
                        {user.id}
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">
                          Email:
                        </span>{" "}
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <Button type="submit">Save changes</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
