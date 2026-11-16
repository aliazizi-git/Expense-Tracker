"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useExpenseStore } from "@/Store/useExpenseStore";
import { useCategoryStore } from "@/Store/useCategoryStore";
import ExpenseCard from "./expenseCard";
import { DollarSign, Calendar, Plus, Tag, Receipt, ArrowUpRight, Filter } from "lucide-react";

const MONTHS = [
  { value: "", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function ExpensesPage() {
  const router = useRouter();

  const {
    expenses,
    summary,
    selectedMonth,
    isLoading,
    getExpenses,
    getSummary,
    addExpense,
    setSelectedMonth,
  } = useExpenseStore();

  const { categories, getCategories, addCategory } = useCategoryStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cost: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [newCatName, setNewCatName] = useState("");
  const [showCatInput, setShowCatInput] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    getExpenses();
    getSummary();
    getCategories();
  }, [router]);

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    if (!formData.category) return;

    const res = await addExpense({
      ...formData,
      cost: Number(formData.cost),
    });

    if (res?.success) {
      setFormData({
        title: "",
        description: "",
        cost: "",
        category: categories[0]?._id || "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  const handleQuickAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    await addCategory({ name: newCatName.trim() });
    setNewCatName("");
    setShowCatInput(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. TOP STATS CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900/90 to-zinc-900/40 border border-white/[0.08] rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Spent</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold font-mono tracking-tight text-white">
              ${summary?.totalCost?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
            </h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{selectedMonth ? `Month: ${MONTHS.find(m => m.value === selectedMonth)?.label}` : "All-time Total"}</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900/90 to-zinc-900/40 border border-white/[0.08] rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Transactions</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold font-mono tracking-tight text-white">
              {summary?.totalCount || 0}
            </h3>
            <p className="mt-2 text-xs text-zinc-400">Recorded payments</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900/90 to-zinc-900/40 border border-white/[0.08] rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-400" /> Filter Period
            </span>
            <span className="text-[10px] text-zinc-500 font-mono uppercase">Month</span>
          </div>
          <div className="mt-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-zinc-950/90 border border-white/[0.1] hover:border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500/80 transition-colors cursor-pointer"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value} className="bg-zinc-900">
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 2. ADD EXPENSE FORM */}
      <section className="bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 border border-white/[0.08] rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.05]">
          <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <span>New Transaction</span>
          </h2>
          <span className="text-xs text-zinc-500">Add an expense to your record</span>
        </div>

        <form onSubmit={handleSubmitExpense} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div>
            <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
              Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Groceries"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-zinc-950/80 border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
              Cost ($)
            </label>
            <input
              type="number"
              step="0.01"
              required
              min="0"
              placeholder="0.00"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              className="w-full bg-zinc-950/80 border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 font-mono transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Category
              </label>
              <button
                type="button"
                onClick={() => setShowCatInput(!showCatInput)}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
              >
                + New
              </button>
            </div>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-zinc-950/80 border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/80 transition-all cursor-pointer"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id} className="bg-zinc-900">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-zinc-950/80 border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/80 font-mono transition-all cursor-pointer"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-950 font-semibold py-2 rounded-xl text-sm transition-all duration-150 shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isLoading ? "Saving..." : "Add Expense"}</span>
            </button>
          </div>

          <div className="sm:col-span-2 lg:col-span-5 mt-1">
            <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
              Description / Notes
            </label>
            <input
              type="text"
              placeholder="What was this expense for?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-950/80 border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80 transition-all"
            />
          </div>
        </form>

        {showCatInput && (
          <div className="mt-4 pt-3.5 border-t border-white/[0.05] flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-400" />
            <input
              type="text"
              placeholder="New category name (e.g. Travel, Coffee)..."
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="bg-zinc-950 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 w-64"
            />
            <button
              type="button"
              onClick={handleQuickAddCategory}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
            >
              Save Category
            </button>
          </div>
        )}
      </section>

      {/* 3. EXPENSES LIST */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-semibold text-white tracking-tight">Recent Activity</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-white/[0.08] text-zinc-400">
              {expenses.length}
            </span>
          </div>
        </div>

        {expenses.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/30 border border-white/[0.05] rounded-2xl backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-zinc-800/80 text-zinc-500 mx-auto flex items-center justify-center mb-3">
              <Receipt className="w-6 h-6" />
            </div>
            <p className="text-zinc-300 text-sm font-medium">No transactions recorded yet</p>
            <p className="text-zinc-500 text-xs mt-1">Use the form above to log your first payment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {expenses.map((expense) => (
              <ExpenseCard key={expense._id} expense={expense} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
