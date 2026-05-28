"use client";

import { usePathname } from "next/navigation";
import { BarChart3, CreditCard, LayoutDashboard, Settings } from "lucide-react";

import SidebarItem from "@/components/navigation/SidebarItem";
import { LogoutButton } from "@/components/logout-button";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    Icon: LayoutDashboard,
  },
  {
    href: "/analytics",
    label: "Analytics",
    Icon: BarChart3,
  },
  {
    href: "/billing",
    label: "Billing",
    Icon: CreditCard,
  },
  {
    href: "/settings",
    label: "Settings",
    Icon: Settings,
  },
];

export default function FloatingSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-8 space-y-6 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
            Navigation
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Access your core dashboard sections quickly.
          </p>
        </div>

        <div className="space-y-2">
          {navItems.map(({ href, label, Icon }) => (
            <SidebarItem
              key={href}
              href={href}
              icon={Icon}
              active={pathname === href}
            >
              {label}
            </SidebarItem>
          ))}
        </div>

        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-medium text-slate-900">Pro tip</p>
          <p className="mt-2 text-sm leading-6">
            Use this sidebar to jump between analytics, billing, and settings
            without leaving your workflow.
          </p>
        </div>

        <div className="pt-2">
          <LogoutButton />
        </div>
      </nav>
    </aside>
  );
}
