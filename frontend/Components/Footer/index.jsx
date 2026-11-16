"use client";

import { useAuthStore } from "@/Store/useAuthStore";

export default function Footer() {
  const { token } = useAuthStore();

  if (!token) return null;

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/60 py-6 text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="tracking-tight">
          &copy; {new Date().getFullYear()} <span className="text-zinc-400 font-medium">ExpenseTracker</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> API Connected
          </span>
          <span>•</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
