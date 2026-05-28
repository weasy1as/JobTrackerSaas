import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Suspense } from "react";
import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="w-full">
            <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
              <InfoIcon size="16" strokeWidth={2} />
              This is a protected page that you can only see as an authenticated
              user
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 items-start">
            <h2 className="font-bold text-2xl mb-4">Your user details</h2>
            <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
              <Suspense>
                <UserDetails />
              </Suspense>
            </pre>
          </div>
          <div className="mt-8">
            <h2 className="font-bold text-2xl mb-4">Next steps</h2>
            <FetchDataSteps />
          </div>
        </section>
      </div>
    </main>
  );
}
