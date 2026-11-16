"use client";
import { useAuthStore } from "@/Store/useAuthStore";
import notify from "@/Utils/notify";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function register() {
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      if (res.success) {
        router.push("/login");
      }
    } catch (error) {
      notify("error", error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
          placeholder="Username..."
        />
        <input
          type="email"
          placeholder="Email..."
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
}
