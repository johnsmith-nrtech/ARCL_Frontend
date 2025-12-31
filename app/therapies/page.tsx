"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { FaHandHoldingHeart, FaBrain, FaWalking, FaUserFriends } from "react-icons/fa";
import { MdSchool } from "react-icons/md"; 
import { IoIosPeople } from "react-icons/io";

interface Section {
  id: number;
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
  url: string;
}

export default function TherapiesSection() {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  const icons = [
    <FaHandHoldingHeart size={40} />,
    <FaBrain size={40} />,
    <FaWalking size={40} />,
    <MdSchool size={40} />,
    <IoIosPeople size={40} />,
    <FaUserFriends size={40} />,
  ];

  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const res = await fetch(`${API_URL}/api/therapies`);
        const data = await res.json();
        // Filter only active therapies
        const activeTherapies = data.filter((t: Therapy) => t.status === "Active");
        setTherapies(activeTherapies);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTherapies();
  }, []);

  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-yellow-400/20 py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-extrabold text-white mb-4">
            Our Therapies
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto">
            Explore our specialized programs designed to enhance learning, independence, and personal growth.
          </p>
        </div>
      </section>

      {/* Therapies Grid */}
      <section className="py-20 px-6 md:px-20 bg-[#f4effa]">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {therapies.map((therapy, i) => (
            <Link key={therapy._id} href={`/therapies/${therapy._id}`} className="relative group">
              {/* Gradient Edge */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2a1d7a] to-[#6a5acd] rounded-2xl shadow-lg" />

              {/* Card */}
              <div className="relative bg-white p-8 flex flex-col items-center justify-center gap-4 rounded-2xl shadow-lg h-72 w-full
                              transition-transform duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl">
                <div className="bg-[#fbd46d] p-5 rounded-full shadow-md flex items-center justify-center">
                  {icons[i] || <FaHandHoldingHeart size={40} />}
                </div>
                <h3 className="text-xl font-bold text-[#2a1d7a] text-center">{therapy.mainTitle}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
