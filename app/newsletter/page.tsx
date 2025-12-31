"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import GetInTouch from "@/components/GetInTouch";
import { useEffect, useState } from "react";

interface Newsletter {
  _id: string;
  title: string;
  date: string;
  pdfUrl: string;
  imageUrl?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;


export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await fetch(`${API_URL}/api/newsletters`);
        const data = await res.json();
        setNewsletters(data.data || []);
      } catch (err) {
        console.error("Failed to load newsletters");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[75vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#3f1a7b]" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Our Newsletters
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-yellow-300 max-w-2xl mx-auto"
          >
            Stay updated with ARCL’s activities, achievements, and community
            impact through our quarterly newsletters.
          </motion.p>
        </div>
      </section>

      {/* NEWSLETTER GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <p className="text-center text-gray-500">
            Loading newsletters...
          </p>
        ) : newsletters.length === 0 ? (
          <p className="text-center text-gray-500">
            No newsletters available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {newsletters.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border 
                           hover:shadow-2xl transition"
              >
                <Image
                  src={
                    item.imageUrl
                      ? `${API_URL}${item.imageUrl}`
                      : "/newsletter-placeholder.jpg"
                  }
                  alt={item.title}
                  width={600}
                  height={400}
                  unoptimized
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3f1a7b]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.date}
                  </p>

                  <a
                    href={`${API_URL}${item.pdfUrl}`}
                    target="_blank"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2 
                               rounded-full bg-yellow-400 text-[#3f1a7b] 
                               font-semibold hover:bg-[#3f1a7b] hover:text-white 
                               transition"
                  >
                    <FileText size={18} />
                    View Newsletter
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* GET IN TOUCH */}
      <GetInTouch />

      <Footer />
    </div>
  );
}
