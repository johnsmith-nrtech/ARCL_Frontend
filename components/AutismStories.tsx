"use client";

import Image from "next/image";

const helpItems = [
  {
    title: "Educate",
    desc: "We strive to improve the lives of our students through education of academic, behavioral, cognitive, and social skills.",
    image: "/help-1.jpg",
  },
  {
    title: "Engage",
    desc: "It is important to have teachers & therapists engaging students to learn and parents involved in both student programs and school activities.",
    image: "/help-2.jpg",
  },
  {
    title: "Inspire",
    desc: "We strive to improve the lives of our students through education of academic, behavioral, cognitive, and social skills.",
    image: "/help-3.jpg",
  },
];

export default function HowWeHelp() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2b1463]">
          How We Help
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Supporting children with autism through compassionate care, proven therapies, and family-focused solutions.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {helpItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#f3edf9] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="relative h-64 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-[#2b1463] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
