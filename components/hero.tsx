"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/banners/BANNER1.jpg",
    alt: "ARCL Image 1",
    buttonText: "Learn More About Us",
    link: "/AboutUs",
    sideImage: "/slides/kid1.jpg",
  },
  {
    src: "/banners/BANNER2.jpg",
    alt: "ARCL Image 2",
    buttonText: "Explore Our Activities",
    link: "/Activities",
    sideImage: "/slides/kid2.jpg",
  },
  {
    src: "/banners/hero-3.jpg",
    alt: "ARCL Image 3",
    buttonText: "See Our Kids in Action",
    link: "/gallery",
    sideImage: "/slides/kid3.jpg",
  },
  {
    src: "/banners/hero-4.jpg",
    alt: "ARCL Image 4",
    buttonText: "Subscribe for Updates",
    link: "/newsletter",
    sideImage: "/slides/kid1.jpg",
  },
  {
    src: "/banners/hero-5.JPG",
    alt: "ARCL Image 5",
    buttonText: "Apply for Admission",
    link: "/admissions",
    sideImage: "/slides/kid2.jpg",
  },
  {
    src: "/banners/hero-6.jpeg",
    alt: "ARCL Image 6",
    buttonText: "Make a Difference Today",
    link: "/donate",
    sideImage: "/slides/kid3.jpg",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = images[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#3f1a7b]">

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden lg:block h-full">

        {/* Background Slider */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.9,
                ease: [0.68, -0.55, 0.265, 1.55],
              }}
              className="absolute inset-0"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="relative z-10 ml-3 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Welcome to <br />
                <span className="text-yellow-400">ARCL</span>
              </h1>

              <p className="text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
                Autism Resource Centre Lahore – A safe, nurturing, and empowering space where every child with autism is celebrated, supported, and given the opportunity to shine.
              </p>

              <div className="flex gap-3 mt-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? "w-12 bg-yellow-400"
                        : "w-6 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="relative w-60 h-60 md:w-86 md:h-86 mt-15 ml-55">
                <Image
                  src={current.sideImage}
                  alt="Child at ARCL"
                  fill
                  className="rounded-full object-cover border-8 border-yellow-400 shadow-2xl"
                  priority
                />
              </div>

              <Link
                href={current.link}
                className="bg-yellow-400 hover:bg-yellow-500 ml-55 text-black font-bold text-md px-10 py-5 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                {current.buttonText}
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="block lg:hidden relative h-screen w-full">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 text-white">

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-4"
          >
            Welcome to <span className="text-yellow-400">ARCL</span>
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base leading-relaxed mb-6"
          >
            Autism Resource Centre Lahore – A nurturing place where every child shines.
          </motion.p>

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="relative w-40 h-40 mb-6"
          >
            <Image
              src={current.sideImage}
              alt="ARCL Child"
              fill
              className="rounded-full border-4 border-yellow-400 object-cover"
            />
          </motion.div>

          <Link
            href={current.link}
            className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg active:scale-95 transition"
          >
            {current.buttonText}
          </Link>

          <div className="flex gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full ${
                  index === currentIndex
                    ? "w-8 bg-yellow-400"
                    : "w-4 bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
