import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
                Dashboard
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                JobFlow dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                The Kanban board is not implemented yet. This dashboard will
                display your job pipeline and workflow once it is ready.
              </p>
            </div>

            <div className="flex min-h-[320px] items-center justify-center rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
              <p className="max-w-xl text-base leading-7">
                Empty state placeholder: your dashboard will load here when the
                Kanban board feature is available.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
