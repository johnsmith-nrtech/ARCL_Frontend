// app/Therapies/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { v4 as uuidv4 } from "uuid"; // For generating unique keys if id missing

/* ================= TYPES ================= */
interface Section {
  id?: string | number; // id optional
  header: string;
  description: string;
  hasList: boolean;
  listItems: string[];
}

interface Therapy {
  _id: string;
  mainTitle: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: "Admin" | "Therapist" | "Parent";
  url?: string;
}

/* ================= COMPONENT ================= */
export default function TherapyDetail() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [therapy, setTherapy] = useState<Therapy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  useEffect(() => {
    const fetchTherapy = async () => {
      try {
        const res = await fetch(`${API_URL}/api/therapies/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch therapy: ${res.status}`);
        const data: Therapy = await res.json();
        if (!data || !data._id) setError("Therapy not found.");
        else setTherapy(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching therapy details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTherapy();
  }, [id]);

  if (loading) return <p className="text-center py-20 text-lg">Loading therapy details...</p>;

  if (error)
    return (
      <div className="text-center py-20 text-lg text-red-600">
        {error}
        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="bg-[#3f1a7b] text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-yellow-400/20 py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-extrabold text-white mb-4">
            {therapy!.mainTitle}
          </h1>
        </div>
      </section>

      {/* Therapy Sections */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-20 space-y-10">
        {therapy!.sections.map((section) => (
          <div
            key={section.id ?? uuidv4()} // use section.id or generate UUID if missing
            className="bg-gray-50 p-6 rounded-xl shadow space-y-4"
          >
            <h2 className="text-2xl font-bold text-[#2a1d7a]">{section.header}</h2>
            <p className="text-gray-700">{section.description}</p>

            {section.hasList && section.listItems.length > 0 && (
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {section.listItems.map((item) => (
                  <li key={uuidv4()}>{item}</li> // generate unique key for list item
                ))}
              </ul>
            )}
          </div>
        ))}

        <button
          onClick={() => router.back()}
          className="bg-[#3f1a7b] text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
        >
          Go Back
        </button>
      </section>

      <Footer />
    </main>
  );
}
