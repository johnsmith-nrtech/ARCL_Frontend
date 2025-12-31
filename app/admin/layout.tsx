"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [email, setEmail] = useState("Loading..."); // fallback until fetch completes

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.replace("/login");
      return;
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await res.json();
        setEmail(userData.email || "admin@arcl.org");
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("adminToken");
        router.replace("/login");
      }
    };

    // Optional: check token expiration before fetching
    try {
      const payloadBase64 = token.split(".")[1];
      const decoded = JSON.parse(atob(payloadBase64));
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("adminToken");
        router.replace("/login");
      } else {
        fetchUser();
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("adminToken");
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="ml-64 flex flex-col flex-1 h-screen overflow-hidden">

        {/* Top Bar */}
        <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold">Admin Panel</h2>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">{email}</span>
            <div className="w-9 h-9 rounded-full bg-[#3f1a7b] text-white flex items-center justify-center">
              <User size={18} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
