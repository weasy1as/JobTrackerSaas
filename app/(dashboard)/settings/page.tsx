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

  const { error } = await supabase.from("profiles").upsert(updates);
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
      <div className=" grid gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
              Settings
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Manage your profile
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Update your account information and personalize your JobFlow
              experience.
            </p>
          </div>

          {updated && (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Profile updated successfully.
            </div>
          )}

          <form action={updateProfile} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              {/* PROFILE OVERVIEW */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  {/* AVATAR */}
                  <div className="mb-5 h-24 w-24 overflow-hidden rounded-full bg-indigo-100">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="User avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-indigo-700">
                        {getInitials(
                          profile?.full_name ?? null,
                          user.email ?? null,
                        )}
                      </div>
                    )}
                  </div>

                  {/* NAME */}
                  <h2 className="text-lg font-semibold text-slate-900">
                    {profile?.full_name ?? "No name set"}
                  </h2>

                  {/* EMAIL */}
                  <p className="mt-1 text-sm text-slate-500">{user.email}</p>

                  {/* BADGE */}
                  <div className="mt-4 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    JobFlow Account
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* PERSONAL INFORMATION */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Personal Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Update how your profile appears throughout JobFlow.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
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
                </div>

                {/* ACCOUNT INFORMATION */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Account Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Read-only account details.
                    </p>
                  </div>

                  <div className="divide-y divide-slate-200">
                    <div className="flex items-center justify-between py-4">
                      <span className="text-sm font-medium text-slate-500">
                        Email
                      </span>

                      <span className="text-sm text-slate-900">
                        {user.email}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <span className="text-sm font-medium text-slate-500">
                        User ID
                      </span>

                      <span className="max-w-[320px] truncate text-sm text-slate-900">
                        {user.id}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
