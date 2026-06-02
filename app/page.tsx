import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { Button } from "@/components/ui/button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

const features = [
  {
    title: "Kanban Job Tracking",
    description:
      "Organize applications by stage and keep every opportunity moving forward with a clear visual workflow.",
  },
  {
    title: "AI Interview Preparation",
    description:
      "Generate tailored practice questions and confidence-building talking points for every role.",
  },
  {
    title: "Application Insights",
    description:
      "See where your jobs are in the pipeline and spot opportunities that need follow-up.",
  },
  {
    title: "Ghosted Detection",
    description:
      "Know which applications are stalled so you can follow up with confidence and timing.",
  },
];

const steps = [
  {
    title: "Add job applications",
    description:
      "Capture each opportunity with company details, role, and status so nothing slips through the cracks.",
  },
  {
    title: "Track progress visually",
    description:
      "Move cards across stages, see your pipeline at a glance, and focus on what matters next.",
  },
  {
    title: "Prepare with AI",
    description:
      "Use smart interview prompts and notes to get ready for the next conversation.",
  },
];

export default async function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 text-sm font-medium text-slate-700">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-slate-900"
          >
            JobFlow
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="hover:text-slate-900 transition-colors duration-150"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-slate-900 transition-colors duration-150"
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              className="hover:text-slate-900 transition-colors duration-150"
            >
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
              Job search made simple
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Track your job applications with clarity and AI insights.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              JobFlow helps you manage every opportunity, stay ahead of
              deadlines, and prepare for interviews with a modern Kanban
              dashboard built for job seekers.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="/auth/sign-up">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  JobFlow dashboard
                </p>
                <p className="text-xs text-slate-400">Kanban overview</p>
              </div>
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                Preview
              </span>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-800/10 bg-slate-950 p-5 text-slate-100">
              <div className="mb-5 flex flex-wrap gap-3">
                {["Applied", "Interview", "Offer", "Ghosted"].map((status) => (
                  <span
                    key={status}
                    className="rounded-full bg-slate-800/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300"
                  >
                    {status}
                  </span>
                ))}
              </div>
              <div className="space-y-4">
                {["Applied", "Interview", "Offer", "Ghosted"].map((column) => (
                  <div key={column} className="rounded-3xl bg-slate-900/90 p-4">
                    <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
                      <span>{column}</span>
                      <span>2</span>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-3xl bg-slate-800 p-4 shadow-inner shadow-slate-950/30">
                        <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-100">
                          <span>Acme · Product Designer</span>
                          <span className="rounded-full bg-slate-700 px-2 py-1 text-[11px] text-slate-300">
                            Remote
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">
                          Follow up on recruiter note
                        </p>
                      </div>
                      <div className="rounded-3xl bg-slate-800 p-4 shadow-inner shadow-slate-950/20">
                        <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-100">
                          <span>Stellar · Frontend</span>
                          <span className="rounded-full bg-slate-700 px-2 py-1 text-[11px] text-slate-300">
                            Hybrid
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">
                          Interview prep due
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-t border-slate-200 bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
              Features
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to manage your search in one place.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              JobFlow combines job tracking, process visibility, and AI support
              so your next opportunity never gets lost.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A simple workflow that keeps your search moving.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-semibold text-indigo-700">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-t border-slate-200 bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
              Pricing
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Simple pricing for every job seeker.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Start for free with core tracking features, then upgrade for
              AI-powered prep and analytics.
            </p>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Free
              </p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-slate-900">
                  $0
                </span>
                <span className="text-sm text-slate-500">/ month</span>
              </div>
              <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
                <li>Kanban job tracking</li>
                <li>Unlimited job cards</li>
                <li>Basic usage dashboard</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-indigo-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
                Pro
              </p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-slate-900">
                  $12
                </span>
                <span className="text-sm text-slate-500">/ month</span>
              </div>
              <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
                <li>AI interview preparation</li>
                <li>Performance insights</li>
                <li>Priority follow-up reminders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
              Ready to get moving?
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Start tracking your job search today.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Sign up now and turn your job hunt into a reliable, organized
              process with one clean dashboard.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/auth/sign-up">Sign up free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            Built for job seekers who want one place to manage applications,
            interviews, and follow-ups.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="https://github.com"
              className="hover:text-slate-900 transition-colors duration-150"
            >
              GitHub
            </Link>
            <Link
              href="#"
              className="hover:text-slate-900 transition-colors duration-150"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-slate-900 transition-colors duration-150"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
