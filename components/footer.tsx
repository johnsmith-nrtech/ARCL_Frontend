"use client";
import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const siteNavigationItems = [
    "Home",
    "About Us",
    "Activities",
    "Gallery",
    "NewsLetter",
    "Admissions",
  ];

  return (
    <footer className="w-full bg-[#260e58]">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-start">

          {/* COLUMN 1 */}
          <div className="max-w-[280px]">
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
              Autism Resource Center lahore (ARCL) was established in 2015 as a Not
              for Profit Company under the Societies Registration Act 1860.
            </p>
          </div>

          {/* COLUMN 2 */}
          <div className="max-w-[280px]">
            <h2 className="flex items-center gap-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4">
              <CirclePlus className="w-4 md:w-5 text-orange-300" />
              Quick Links
            </h2>

            <ul className="list-disc pl-5 text-xs md:text-sm text-gray-200 space-y-2 md:space-y-3 font-semibold">
              {siteNavigationItems.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-orange-300 transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="max-w-[280px]">
            <h2 className="flex items-center gap-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4">
              <CirclePlus className="w-4 md:w-5 text-orange-300" />
              Get In Touch
            </h2>

            <div className="text-xs md:text-sm text-gray-300 space-y-3 font-semibold">
              <div>
                <p>Address</p>
                <p className="text-white text-xs">
                  74 C2 Sector A, Phase 1, Engineers Town, Lahore.
                </p>
              </div>

              <div>
                <p>Email:</p>
                <p className="text-white">info@arcl.com</p>
              </div>

              <div>
                <p>Phone:</p>
                <p className="text-white">042-35248222</p>
                <p className="text-white">0303-6655444</p>
                <p className="text-white">0300-9575926</p>
              </div>
            </div>
          </div>

          {/* COLUMN 4 */}
          <div className="max-w-[280px] w-full">
            <h2 className="flex items-center gap-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4">
              <CirclePlus className="w-4 md:w-5 text-orange-300" />
              Newsletter
            </h2>

            <input
              className="w-full bg-white text-black py-2 px-2 text-sm border border-gray-300 rounded-sm"
              placeholder="Your Name"
              required
            />
            <input
              className="w-full bg-white text-black py-2 px-2 mt-3 text-sm border border-gray-300 rounded-sm"
              placeholder="Your Email"
              type="email"
              required
            />
            <button className="w-full bg-red-600 hover:bg-red-400 text-white py-2 mt-3 text-sm rounded-sm transition">
              Submit Now
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#1b0a3e] mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div>
              Copyright © 2025 -
              <span className="text-yellow-300"> Autism</span> - All Rights
              Reserved
            </div>

            <div className="flex items-center gap-3">
              <span>Follow Us</span>
              <FaTwitter className="cursor-pointer hover:text-blue-400" />
              <FaFacebookF className="cursor-pointer hover:text-blue-600" />
              <FaYoutube className="cursor-pointer hover:text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
