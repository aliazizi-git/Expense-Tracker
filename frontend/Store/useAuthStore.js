import api from "@/api/axiosClient";
import notify from "@/Utils/notify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const result = await api.post("/auth/login", { username, password });
          const { token, user } = result?.data?.data;
          localStorage.setItem("token", token);
          set({ user, token, isLoading: false });
          return notify("success", "Login successfully");
        } catch (error) {
          const message = error.response?.data?.message || "Login Failed";
          set({ isLoading: false, error: message });
          return notify("error", message);
        }
      },
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const result = await api.post("/auth/register", userData);
          set({ isLoading: false });
          notify("success", "Signed up successfully");
          return ({success:true})
        } catch (error) {
          const message =
            error.response?.data?.message || "Registration Failed";
          set({ isLoading: false, error: message });
          return notify("error", message);
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, error: null });
        notify("success", "Logged out successfully");
      },
    }),
    { name: "auth-storage" },
  ),
);
