"use client";

import { useExpenseStore } from "@/Store/useExpenseStore";
import { Trash2, Calendar, Tag } from "lucide-react";

export default function ExpenseCard({ expense }) {
  const { deleteExpense } = useExpenseStore();

  const formattedDate = expense.date
    ? new Date(expense.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No Date";

  return (
    <div className="group relative bg-zinc-900/70 hover:bg-zinc-900/90 border border-white/[0.08] hover:border-emerald-500/30 rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-md shadow-black/30 flex justify-between items-start gap-4">
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-zinc-100 tracking-tight truncate">
            {expense.title}
          </h3>
          {expense.category && (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              <Tag className="w-2.5 h-2.5" />
              {expense.category?.name || "General"}
            </span>
          )}
        </div>

        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {expense.description}
        </p>

        <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono pt-0.5">
          <Calendar className="w-3 h-3 text-zinc-500" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between self-stretch shrink-0">
        <span className="text-base sm:text-lg font-bold font-mono text-emerald-400 tracking-tight">
          ${Number(expense.cost).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>

        <button
          onClick={() => deleteExpense(expense._id)}
          className="text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 p-1.5 rounded-lg transition-colors cursor-pointer"
          title="Delete entry"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
