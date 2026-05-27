import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  active?: boolean;
  icon: ComponentType<{ className?: string; size?: number }>;
  children: ReactNode;
}

export default function SidebarItem({
  href,
  active = false,
  icon: Icon,
  children,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm font-medium transition-colors duration-150",
        active
          ? "border-indigo-200 bg-indigo-50 text-slate-900 shadow-sm"
          : "border-transparent bg-slate-50 text-slate-700 hover:border-slate-200 hover:bg-slate-100",
      )}
    >
      <span
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-150",
          active
            ? "bg-indigo-100 text-indigo-700"
            : "bg-slate-200 text-slate-600 group-hover:bg-slate-300",
        )}
      >
        <Icon size={18} />
      </span>
      {children}
    </Link>
  );
}
