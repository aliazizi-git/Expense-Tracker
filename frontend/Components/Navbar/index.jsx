"use client";

import { useAuthStore } from "@/Store/useAuthStore";
import { useRouter } from "next/navigation";
import { Wallet, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();

  if (!token) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#09090b]/80 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
        <Link href="/expenses" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-zinc-950 shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-200">
            <Wallet className="w-5 h-5 text-zinc-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1">
              Expense<span className="text-emerald-400 font-extrabold">Tracker</span>
            </span>
            <span className="text-[10px] text-zinc-500 tracking-wider font-mono">FINANCE DASHBOARD</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.08] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <User className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-medium text-zinc-200">{user?.username || "Account"}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
