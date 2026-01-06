"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Brain,
  Settings,
  HeartHandshake,
  LogOut,
  User,
  ShieldCheck,
  ArrowLeft,
  Info,
  Camera,
  Megaphone,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  // Logout function
  const handleLogout = async () => {
    const sessionId = localStorage.getItem("sessionId");
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;
    try {
      if (sessionId) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
      }
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("sessionId");
      router.replace("/login");
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-purple-700 text-white p-2 rounded-lg shadow"
      >
        <Menu size={20} />
      </button>

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#3f1a7b] to-[#2b1257] text-white flex flex-col shadow-xl z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Mobile Close */}
        <div className="absolute top-4 right-4 md:hidden">
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Logo */}
        <div className="p-6 border-b border-purple-900 shrink-0">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/arcl_logo.jpg"
              alt="ARCL Logo"
              width={64}
              height={64}
              priority
              className="rounded-full bg-white p-1"
            />
            <h1 className="text-lg font-bold">ARCL Admin</h1>
            <span className="text-xs text-purple-200 flex items-center gap-1">
              <ShieldCheck size={14} /> Secure Panel
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1 text-sm">
          <NavItem href="/admin" icon={<LayoutDashboard size={18} />} active={pathname === "/admin"}>
            Dashboard
          </NavItem>

          <NavItem href="/admin/therapiesdetail" icon={<Brain size={18} />} active={pathname.startsWith("/admin/therapiesdetail")}>
            Therapy Details
          </NavItem>

          <NavItem href="/admin/services" icon={<Settings size={18} />} active={pathname.startsWith("/admin/services")}>
            Services
          </NavItem>

          <NavItem href="/admin/news" icon={<Megaphone size={18} />} active={pathname.startsWith("/admin/news")}>
            News&Updates
          </NavItem>

          <NavItem href="/admin/donations" icon={<HeartHandshake size={18} />} active={pathname.startsWith("/admin/donations")}>
            Donations
          </NavItem>

          <NavItem href="/admin/about" icon={<Info size={18} />} active={pathname.startsWith("/admin/about")}>
            About Us
          </NavItem>

          <NavItem href="/admin/gallery" icon={<Camera size={18} />} active={pathname.startsWith("/admin/gallery")}>
            Gallery
          </NavItem>

          <NavItem href="/admin/newsletters" icon={<Megaphone size={18} />} active={pathname.startsWith("/admin/newsletters")}>
            Newsletters
          </NavItem>

          <NavItem href="/admin/users" icon={<User size={18} />} active={pathname.startsWith("/admin/users")}>
            Users
          </NavItem>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-purple-900 space-y-2 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 p-3 rounded-lg bg-yellow-400 text-[#2b1257] font-semibold hover:bg-yellow-300 transition"
          >
            <ArrowLeft size={16} /> Back to Website
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 p-3 rounded-lg text-red-300 hover:bg-red-500/20 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* Nav Item Component */
function NavItem({
  href,
  icon,
  children,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${active ? "bg-white/20 ring-1 ring-white/30" : "hover:bg-white/10"}`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
