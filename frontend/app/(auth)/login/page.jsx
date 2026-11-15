"use client";
import { useAuthStore } from "@/Store/useAuthStore";
import notify from "@/Utils/notify";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const { login, register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData.username, formData.password);
      if (localStorage.getItem("token")) {
        router.push("/expenses");
        notify("success","login successfully")
      }
    } catch (error) {
      notify("error",error.message)
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({...formData,username:e.target.value})}
          required
          placeholder="Username..."
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData,password:e.target.value})}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
