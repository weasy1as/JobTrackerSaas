import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import KanbanBoard from "@/features/jobs/kanban/KanbanBoard";
import { getJobs } from "@/lib/supabase/jobs";

export default async function DashboardPage() {
  const jobs = await getJobs();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className=" grid w-full gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />

        <section className="rounded-[2rem] border w-full border-slate-200 bg-white p-8 shadow-sm">
          <KanbanBoard jobs={jobs} />
        </section>
      </div>
    </main>
  );
}
