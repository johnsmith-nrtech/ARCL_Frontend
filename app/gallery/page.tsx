"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

/* ================= TYPES ================= */
interface Therapy {
  _id: string;
  mainTitle: string;
  status: "Active" | "Inactive";
}

interface GalleryImage {
  _id: string;
  imageUrl: string;
  therapyId: string;
  therapyTitle: string;
}

/* ================= PAGE ================= */
export default function GalleryPage() {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  /* ================= FETCH DATA ================= */
  const fetchTherapies = async () => {
    try {
      const res = await fetch(`${API_URL}/api/therapies`);
      const data: Therapy[] = await res.json();

      // Filter only Active therapies
      setTherapies(data.filter((t) => t.status === "Active"));
    } catch (err) {
      console.error("Error fetching therapies:", err);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      const data: GalleryImage[] = await res.json();
      setGallery(data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  useEffect(() => {
    fetchTherapies();
    fetchGallery();
  }, []);

  /* ================= FILTERED IMAGES ================= */
  const filteredImages =
    activeCategory === "All"
      ? gallery
      : gallery.filter((img) => img.therapyId === activeCategory);

  return (
    <div className="bg-white text-gray-800">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[75vh]">
        <div className="absolute inset-0 bg-[#3f1a7b]" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Our Gallery
            </h1>
            <p className="text-lg md:text-xl text-yellow-200 max-w-3xl mx-auto">
              A glimpse into our therapeutic environment, compassionate care, and
              the developmental journeys of our children.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* All Category */}
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-6 py-3 rounded-full font-semibold transition shadow
              ${
                activeCategory === "All"
                  ? "bg-[#3f1a7b] text-white"
                  : "bg-gray-100 hover:bg-[#3f1a7b] hover:text-white"
              }`}
          >
            All Therapies
          </button>

          {/* Therapy Categories */}
          {therapies.map((therapy) => (
            <button
              key={therapy._id}
              onClick={() => setActiveCategory(therapy._id)}
              className={`px-6 py-3 rounded-full font-semibold transition shadow
                ${
                  activeCategory === therapy._id
                    ? "bg-[#3f1a7b] text-white"
                    : "bg-gray-100 hover:bg-[#3f1a7b] hover:text-white"
                }`}
            >
              {therapy.mainTitle}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={`${API_URL}${img.imageUrl}`}
                  alt={img.therapyTitle}
                  width={600}
                  height={400}
                  unoptimized
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#3f1a7b]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-semibold text-sm">
                    {img.therapyTitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
