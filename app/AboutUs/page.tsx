"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFilePdf } from "react-icons/fa";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

/* ================= TYPES ================= */
interface Member {
  _id: string;
  name: string;
  position: string;
  image: string;
}

interface Certification {
  _id: string;
  title: string;
  image: string;
  pdf: string;
}

interface FinancialPDF {
  _id: string;
  title: string;
  pdf: string;
}

/* ================= HELPERS ================= */
const resolveUrl = (url: string) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_URL}${url}`;
};

/* ================= PAGE ================= */
export default function AboutUsPage() {
  const [governingBodyMembers, setGoverningBodyMembers] = useState<Member[]>([]);
  const [executiveMembers, setExecutiveMembers] = useState<Member[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [financialPDFs, setFinancialPDFs] = useState<FinancialPDF[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [governingRes, executiveRes, certRes, financialRes] =
          await Promise.all([
            fetch(`${API_URL}/api/governing`),
            fetch(`${API_URL}/api/executive`),
            fetch(`${API_URL}/api/certifications`),
            fetch(`${API_URL}/api/financial`),
          ]);

        setGoverningBodyMembers(await governingRes.json());
        setExecutiveMembers(await executiveRes.json());
        setCertifications(await certRes.json());
        setFinancialPDFs(await financialRes.json());
      } catch (err) {
        console.error("Error fetching About Us data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[75vh]">
        <Image
          src="/centre-1.jpg"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About Our Organization
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-200">
              Dedicated to empowering children with autism through compassion and care.
            </p>
          </div>
        </div>
      </section>

      {/* GOVERNING BODY */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-12">
          Governing Body
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {governingBodyMembers.map((m) => (
            <div
              key={m._id}
              className="bg-[#3f1a7b] p-6 rounded-xl text-center hover:scale-105 transition"
            >
              <Image
                src={resolveUrl(m.image)}
                alt={m.name}
                width={140}
                height={140}
                className="rounded-full mx-auto border-2 border-yellow-400 mb-4"
                unoptimized
              />
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-yellow-300">{m.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXECUTIVE */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-12">
          Executive Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {executiveMembers.map((m) => (
            <div
              key={m._id}
              className="bg-[#3f1a7b] p-6 rounded-xl text-center hover:scale-105 transition"
            >
              <Image
                src={resolveUrl(m.image)}
                alt={m.name}
                width={120}
                height={120}
                className="rounded-full mx-auto border-2 border-yellow-400 mb-4"
                unoptimized
              />
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-yellow-300">{m.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-950 mb-12">
            Our Certifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <a
                key={cert._id}
                href={resolveUrl(cert.pdf)}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={resolveUrl(cert.image)}
                  alt={cert.title}
                  className="h-72 w-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-center mt-3 font-semibold text-blue-950">
                  {cert.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-4xl font-bold text-center text-blue-950 mb-8">
            Financial Audit Reports
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialPDFs.map((f) => (
              <Link
                key={f._id}
                href={resolveUrl(f.pdf)}
                target="_blank"
                className="flex items-center justify-between p-5 rounded-xl border hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <FaFilePdf className="text-red-500 text-2xl" />
                  <span className="font-semibold text-blue-950">
                    {f.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
