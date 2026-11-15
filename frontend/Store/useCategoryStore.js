import api from "@/api/axiosClient";
import notify from "@/Utils/notify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCategoryStore = create(
  persist(
    (set) => ({
      categories: [],
      isLoading: false,
      error: null,

      getCategories: async () => {
        set({ isLoading: true, error: null });
        try {
          const result = await api.get("/categories");
          set({
            categories: result.data.data,
            isLoading: false,
          });
        } catch (error) {
          const message = error.response?.data?.message || "Failed to load categories";
          set({ isLoading: false, error: message });
          return notify("error", message);
        }
      },
      addCategory: async (categoryData) => {
        set({ isLoading: true, error: null });
        try {
          const result = await api.post("categories", categoryData);
          set((state) => ({
            categories: [...state.categories, result.data.data],
            isLoading: false,
          }));
          notify("success", "Category added");
        } catch (error) {
          const message = error.response?.data?.message || "adding category Failed";
          set({ isLoading: false, error: message });
          return notify("error", message);
        }
      },
      deleteCategory: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const result = await api.delete(`categories/${id}`);
          set((state) => ({
            categories: state.categories.filter((cat) => cat._id !== id),
          }));
          notify("success", "Category deleted");
          set({ isLoading: false });
        } catch (error) {
          const message = error.response?.data?.message || "delete Failed";
          set({ isLoading: false, error: message });
          return notify("error", message);
        }
      },
    }),

    { name: "category-storage" },
  ),
);
