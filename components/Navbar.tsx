"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trirong } from "next/font/google";

const trirong = Trirong({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const menuItems = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/AboutUs",
    submenu: [
      { title: "Services", href: "/services" },
      { title: "Therapies", href: "/therapies" },
    ],
  },
  { title: "News&Updates", href: "/Activities" },
  { title: "Gallery", href: "/gallery" },
  { title: "Newsletter", href: "/newsletter" },
  { title: "Admissions", href: "/admissions" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all text-white duration-500 ${trirong.className} ${
        scrolled ? "bg-[#3f1a7b] shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Full Name */}
          <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition">
            <Image
              src="/arcl_logo.jpg"
              alt="Autism Resource Centre Lahore Logo"
              width={60}
              height={60}
              className="rounded-full border-2 border-yellow-400 shadow-md"
              priority
            />
            <div className="leading-tight">
              <h1 className="text-xl font-bold tracking-wide">Autism Resource</h1>
              <p className="text-sm font-medium text-yellow-300 -mt-1">Centre Lahore</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-md font-medium">
            {menuItems.map((item) => (
              <li
                key={item.title}
                className="relative"
                onMouseEnter={() => item.submenu && setAboutOpen(true)}
                onMouseLeave={() => item.submenu && setAboutOpen(false)}
              >
                <Link href={item.href} className="relative group">
                  <span className="transition-colors duration-300 hover:text-yellow-400">{item.title}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </Link>
                {/* Desktop Dropdown */}
                {item.submenu && aboutOpen && (
                  <ul className="absolute top-full left-0 mt-2 w-48 bg-[#3f1a7b] rounded-md shadow-lg overflow-hidden z-50">
                    {item.submenu.map((sub) => (
                      <li key={sub.title}>
                        <Link
                          href={sub.href}
                          className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black transition"
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Donate Button */}
          <div className="hidden md:block">
            <Link
              href="/donate"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white focus:outline-none z-50"
          >
            {open ? (
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="md:hidden overflow-hidden bg-[#341560] border-t-2 border-yellow-400"
        >
          <ul className="py-6 px-8 space-y-5 text-lg font-medium">
            {menuItems.map((item) => (
              <li key={item.title} className="space-y-2">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-white hover:text-yellow-300 transition"
                >
                  {item.title}
                </Link>
                {/* Mobile submenu */}
                {item.submenu &&
                  item.submenu.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      className="block pl-6 py-2 text-white hover:text-yellow-300 transition text-base"
                    >
                      {sub.title}
                    </Link>
                  ))}
              </li>
            ))}
            <li className="pt-6">
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-full shadow-lg transform hover:scale-105 transition"
              >
                Donate Now
              </Link>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.nav>
  );
}
