"use client";

import { ClipboardList, ShieldPlus, User } from "lucide-react";
import { motion } from "framer-motion";

export default function CareHighlights() {
  const items = [
    {
      title: "Treatment & Cure",
      desc: "Adipiscing elit sed dole there eiusmod tempor aliqua denim ads minim venia nostrud.",
      icon: <ClipboardList className="w-10 h-10 text-white" />,
    },
    {
      title: "Rehabilitative Care",
      desc: "Adipiscing elit sed dole there eiusmod tempor aliqua denim ads minim venia nostrud.",
      icon: <ShieldPlus className="w-10 h-10 text-white" />,
    },
    {
      title: "Qualified Therapist",
      desc: "Adipiscing elit sed dole there eiusmod tempor aliqua denim ads minim venia nostrud.",
      icon: <User className="w-10 h-10 text-white" />,
    },
  ];

  return (
    <section className="w-full bg-[#3f1a7b] py-24 px-6 overflow-hidden relative">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 animate-gradient-bg -z-10"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">

        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center px-6 py-10 rounded-lg cursor-pointer transition-all"
            whileHover={{ backgroundColor: "#f59e0b", transition: { duration: 0.5 } }}
          >
            {/* Icon */}
            <div className="mb-6">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-4">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              {item.desc}
            </p>

            {/* Vertical Divider (not last item, outside card) */}
            {index !== items.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-10 transform -translate-y-1/2 flex-col items-center h-full">
                <span className="w-3 h-3 bg-white rounded-full mb-2" />
                <span className="flex-1 border-r border-dashed border-white/40" />
              </div>
            )}
          </motion.div>
        ))}

      </div>

      <style jsx>{`
        /* Gradient background animation */
        @keyframes gradientBG {
          0% { background-position: 0% 0%; }
          25% { background-position: 50% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 50% 50%; }
          100% { background-position: 0% 0%; }
        }
        .animate-gradient-bg {
          background-size: 300% 300%;
          animation: gradientBG 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
