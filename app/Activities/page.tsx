"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import GetInTouch from "@/components/GetInTouch";
import Image from "next/image";
import { X } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  type: "Event" | "Workshop" | "Internship"; // <-- Added Internship
  date: string;
  image?: string;
}

export default function HomePage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Disable background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
  }, [selected]);

  // Fetch data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_URL}/api/newsupdate`);
        const data = await res.json();
        if (data.success) setItems(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const events = items.filter((i) => i.type === "Event");
  const workshops = items.filter((i) => i.type === "Workshop");
  const internships = items.filter((i) => i.type === "Internship"); // <-- NEW

  const Card = ({ item }: { item: NewsItem }) => (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition">
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
        <Image
          src={
            item.image
              ? `${API_URL}${item.image}`
              : "/newsletter-placeholder.jpg"
          }
          alt={item.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="p-5 flex flex-col h-[230px]">
        <h3 className="text-lg font-bold text-[#260e58] mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-gray-600 text-justify text-sm mb-3 line-clamp-3 flex-grow">
          {item.description}
        </p>

        <p className="text-xs font-semibold text-[#3f1a7b] mb-3">
          {new Date(item.date).toLocaleDateString()}
        </p>
          <button
            onClick={() => setSelected(item)}
            className="
              mt-auto
              px-4 py-2
              text-sm font-semibold
              text-white
              bg-[#3f1a7b]
              rounded-full
              hover:bg-[#2e145c]
              transition
              shadow-sm
              self-end
              cursor-pointer
            "
          >
            Read More
          </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] w-full bg-[#3f1a7b]">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            News & Updates
          </h1>
        </div>
      </section>

      {/* Events */}
      <section className="max-w-7xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-bold text-[#3f1a7b] mb-10 text-center">
          Events
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {events.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* Workshops */}
      <section className="max-w-7xl mx-auto mt-24 px-4 mb-20">
        <h2 className="text-3xl font-bold text-[#3f1a7b] mb-10 text-center">
          Workshops
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {workshops.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </section>

      {/* Internships */}
      <section className="max-w-7xl mx-auto mt-24 px-4 mb-20">
        <h2 className="text-3xl font-bold text-[#3f1a7b] mb-10 text-center">
          Internships
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {internships.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      <GetInTouch />
      <Footer />

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] rounded-xl relative overflow-hidden flex flex-col">
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 text-gray-600 hover:text-black"
            >
              <X size={22} />
            </button>

            {/* Image */}
            <div className="relative w-full h-64 flex-shrink-0">
              <Image
                src={
                  selected.image
                    ? `${API_URL}${selected.image}`
                    : "/newsletter-placeholder.jpg"
                }
                alt={selected.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto">
              <h3 className="text-2xl font-bold text-[#260e58] mb-2">
                {selected.title}
              </h3>

              <p className="text-sm font-semibold text-[#3f1a7b] mb-4">
                {new Date(selected.date).toLocaleDateString()}
              </p>

              <p className="text-gray-700 text-justify leading-relaxed whitespace-pre-line">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
