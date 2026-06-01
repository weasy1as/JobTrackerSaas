"use client";

import { ReactNode } from "react";

interface JobModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function JobModal({ open, onClose, children }: JobModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-800"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
