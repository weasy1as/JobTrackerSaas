import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";

import { hasEnvVars } from "@/lib/utils";
import Image from "next/image";
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
      {/* NAVBAR (RESTORED OLD VERSION) */}
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 text-sm font-medium text-slate-700">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-900"
          >
            <img
              src="/Jobflow-Icon.png"
              alt="JobFlow logo"
              className="h-8 w-8 rounded-xl border border-slate-200 bg-white"
            />
            JobFlow
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="hover:text-slate-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-slate-900 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              className="hover:text-slate-900 transition-colors"
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

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="text-center mb-12 max-w-2xl mx-auto animate-fade-in">
          <h1 className="text-[2.4rem] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Organize. Track. Prepare. Offer.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-500 leading-7 max-w-md mx-auto">
            The modern job application tracker SaaS for tech professionals.
            <br />
            Plan your search from Applied to Hired.
          </p>

          <div className="mt-7">
            <Link
              href="/auth/sign-up"
              className="inline-block bg-indigo-600 text-white rounded-xl px-7 py-3 text-sm font-semibold shadow-sm
             transition-all duration-200
             hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg
             active:translate-y-0 active:shadow-sm"
            >
              Start Tracking for Free
            </Link>
          </div>
        </div>

        <div className="relative mt-16 mx-auto max-w-5xl">
          <div className="absolute -inset-10 bg-indigo-500/10 blur-3xl rounded-full" />

          <div className="relative overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-2xl">
            <Image
              alt=""
              height={1000}
              width={1000}
              src="/dashboard-screenshot.png"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
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
              Everything you need in one place.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
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
                className="rounded-3xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 font-semibold text-indigo-700">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="border-t border-slate-200 bg-slate-50 py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
              Pricing
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Simple pricing for every job seeker.
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-7">
              Start free, upgrade when you need AI-powered insights and deeper
              analytics.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* FREE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm flex flex-col justify-between min-h-[360px]">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Free Plan
                </h3>

                <p className="mt-3 text-base text-slate-600 leading-7">
                  Basic job tracking and Kanban board to organize your
                  applications.
                </p>

                <div className="mt-6 text-4xl font-semibold text-slate-900">
                  $0
                  <span className="text-sm font-normal text-slate-500 ml-2">
                    / month
                  </span>
                </div>

                <ul className="mt-8 space-y-3 text-sm text-slate-600">
                  <li>• Kanban job tracking</li>
                  <li>• Unlimited job cards</li>
                  <li>• Basic dashboard</li>
                </ul>
              </div>

              <button className="mt-10 w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                Get Started Free
              </button>
            </div>

            {/* PRO (highlighted) */}
            <div className="relative rounded-3xl border border-indigo-200 bg-gradient-to-b from-indigo-50 to-white p-10 shadow-md flex flex-col justify-between min-h-[420px]">
              {/* badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700">
                  JobFlow Pro
                </h3>

                <p className="mt-3 text-base text-slate-600 leading-7">
                  Everything in Free + AI interview prep, insights, and smarter
                  tracking.
                </p>

                <div className="mt-6 text-4xl font-semibold text-slate-900">
                  $12
                  <span className="text-sm font-normal text-slate-500 ml-2">
                    / month
                  </span>
                </div>

                <ul className="mt-8 space-y-3 text-sm text-slate-700">
                  <li>• Unlimited AI interview prep</li>
                  <li>• Application insights & analytics</li>
                  <li>• Follow-up reminders</li>
                  <li>• Ghosted detection</li>
                  <li>• Priority updates</li>
                </ul>
              </div>

              <Link
                href="/auth/sign-up"
                className="mt-10 block w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto flex max-w-7xl justify-between px-6 text-sm text-slate-500">
          <p>JobFlow — built for job seekers</p>
          <div className="flex gap-4">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
