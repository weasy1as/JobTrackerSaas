"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Menu,
  Settings,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    href: "/billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="mb-6 flex items-center justify-between rounded-[1.75rem] border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
            Navigation
          </p>
          <p className="text-sm text-slate-600">Tap to open the mobile menu.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <nav className="mb-6 space-y-2 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition-colors duration-150",
                pathname === href
                  ? "bg-indigo-50 text-slate-900"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100",
              )}
              onClick={() => setIsOpen(false)}
            >
              <span
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                  pathname === href
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-slate-200 text-slate-600",
                )}
              >
                <Icon size={18} />
              </span>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
