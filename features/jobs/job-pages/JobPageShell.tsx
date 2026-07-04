import { ReactNode } from "react";
import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";

interface JobPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function JobPageShell({
  eyebrow,
  title,
  description,
  children,
}: JobPageShellProps) {
  return (
    <main className="min-h-screen pt-8 bg-slate-50">
      <div className="grid w-full gap-8 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />
        <section className="min-w-0 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <header className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              {description}
            </p>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
