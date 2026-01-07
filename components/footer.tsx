"use client";

import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const siteNavigationItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/AboutUs" },
    { name: "Activities", href: "/Activities" },
    { name: "Gallery", href: "/gallery" },
    { name: "NewsLetter", href: "/newsletter" },
    { name: "Admissions", href: "/admissions" },
  ];

  return (
    <footer className="w-full bg-[#260e58]">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-8 md:pb-12">

        {/* GRID - Mobile: stacked columns, Tablet: 2 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* COLUMN 1 - Logo & Description */}
          <div className="w-full">
            <div className="flex items-center">
              <Image
                src="/arcl_logo.jpg"
                alt="Autism Resource Centre Lahore Logo"
                width={40}
                height={40}
                className="rounded-full object-contain"
                priority
              />
              <div className="ml-3">
                <h1 className="text-white text-sm md:text-[18px] font-bold">
                  Autism<span className="text-yellow-400">Resource</span>
                </h1>
                <p className="text-gray-300 text-xs md:text-[13px] mt-1">
                  Centre Lahore
                </p>
              </div>
            </div>

            <p className="text-gray-200 text-xs md:text-sm pt-4 md:pt-6 leading-relaxed">
              Autism Resource Center Lahore (ARCL) was established in 2015 as a Not
              for Profit Company under the Societies Registration Act 1860.
            </p>
          </div>

          {/* COLUMN 2 - Quick Links */}
          <div className="w-full">
            <h2 className="flex items-center gap-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4">
              <CirclePlus className="w-4 md:w-5 text-orange-300" />
              Quick Links
            </h2>

            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-200">
              {siteNavigationItems.map((item, index) => (
                <li key={index} className="flex">
                  <span className="mr-2 text-orange-300">•</span>
                  <Link
                    href={item.href}
                    className="hover:text-orange-300 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 - Get In Touch */}
          <div className="w-full">
            <h2 className="flex items-center gap-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4">
              <CirclePlus className="w-4 md:w-5 text-orange-300" />
              Get In Touch
            </h2>

            <div className="text-xs md:text-sm text-gray-300 space-y-4">
              <div>
                <p className="font-medium text-gray-200 mb-1">Address</p>
                <p className="text-white leading-relaxed">
                  74 C2 Sector A, Phase 1,<br />
                  Engineers Town, Lahore.
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-200 mb-1">Email:</p>
                <a href="mailto:info@arcl.org.pk" className="text-white hover:text-orange-300 transition">
                  info@arcl.org.pk
                </a>
              </div>

              <div>
                <p className="font-medium text-gray-200 mb-1">Phone:</p>
                <div className="text-white space-y-1">
                  <a href="tel:04235248222" className="block hover:text-orange-300 transition">
                    042-35248222
                  </a>
                  <a href="tel:03036655444" className="block hover:text-orange-300 transition">
                    0303-6655444
                  </a>
                  <a href="tel:03009575926" className="block hover:text-orange-300 transition">
                    0300-9575926
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 4 - Newsletter */}
          <div className="w-full">
            <h2 className="flex items-center gap-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4">
              <CirclePlus className="w-4 md:w-5 text-orange-300" />
              Newsletter
            </h2>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full bg-white text-black py-3 px-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full bg-white text-black py-3 px-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-medium py-3 text-sm rounded-md transition duration-200"
              >
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#1b0a3e] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">

            {/* Copyright */}
            <div className="text-center md:text-left order-2 md:order-1">
              Copyright © 2026 
              <span className="text-yellow-300 font-medium"></span> All Rights Reserved
              <span className="block md:inline md:ml-2">
                | Powered by{" "}
                <a
                  href="https://netrootstech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 font-semibold hover:underline hover:text-yellow-400 transition"
                >
                  NetRoots Technologies
                </a>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 order-1 md:order-2">
              <span className="text-sm">Follow Us</span>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors text-lg"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-600 transition-colors text-lg"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-600 transition-colors text-lg"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}