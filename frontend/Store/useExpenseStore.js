import api from "@/api/axiosClient";
import notify from "@/Utils/notify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExpenseStore = create(
  persist((set, get) => ({
    expenses: [],
    summary: {
      totalCost: 0,
      totalCount: 0,
    },
    selectedMonth: "",
    isLoading: false,
    error: null,

    getExpenses: async () => {
      set({ isLoading: true, error: null });
      try {
        const result = await api.get("expenses");
        const list = result.data.data || result.data || [];
        set({
          expenses: list,
          isLoading: false,
        });
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to load expenses";
        notify("error", message);
        set({ isLoading: false, error: message });
      }
    },
    getSummary: async (month = null) => {
      set({ isLoading: true, error: null });
      try {
        const params = month ? { month } : {};
        const res = await api.get("/expenses/summary", { params });
        set({ summary: res.data.data,isLoading:false });
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to load summary";
        notify("error", message);
        set({ isLoading: false, error: message });
      }
    },
    addExpense: async (expenseData) => {
      set({ isLoading: true, error: null });
      try {
        const res = await api.post("/expenses", expenseData);
        const newExpense = res.data.data;

        set((state) => ({
          expenses: [newExpense, ...state.expenses],
          isLoading: false,
        }));

        get().getSummary(get().selectedMonth);

        notify("success", "Expense added successfully!");
        return { success: true };
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to add expense";
        set({ isLoading: false, error: message });
        notify("error", message);
        return { success: false };
      }
    },
    deleteExpense: async (id) => {
      set({ isLoading: true, error: null });
      try {
        await api.delete(`/expenses/${id}`);

        set((state) => ({
          expenses: state.expenses.filter((item) => item._id !== id),
          isLoading: false,
        }));

        get().getSummary(get().selectedMonth);

        notify("success", "Expense deleted!");
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to delete expense";
        set({ isLoading: false, error: message });
        notify("error", message);
      }
    },
    setSelectedMonth: (month) => {
      set({ selectedMonth: month });
      get().getSummary(month);
    },
  }),
  {name:"expense-storage"}
),
);
