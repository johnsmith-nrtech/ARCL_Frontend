"use client";

import { Book, HeartHandshake, Users, DollarSign, Home, Users2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Specialized Education",
    icon: <Book className="w-12 h-12 text-white" />,
    description:
      "Individualized learning programs designed to meet unique educational needs.",
    color: "bg-purple-700",
    link: "/services/specialized-education",
  },
  {
    title: "Therapeutic Support",
    icon: <HeartHandshake className="w-12 h-12 text-white" />,
    description:
      "Professional therapy services supporting emotional, behavioral, and developmental growth.",
    color: "bg-pink-500",
    link: "/services/therapeutic-support",
  },
  {
    title: "Parent Training",
    icon: <Users className="w-12 h-12 text-white" />,
    description:
      "Empowering parents with skills, strategies, and confidence to support their children.",
    color: "bg-indigo-600",
    link: "/services/parent-training",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-purple-700 mb-2 uppercase tracking-wide">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Our Specialized Services
          </h2>
          <p className="text-gray-600 text-lg">
            We provide comprehensive services designed to support children and families through every stage of care and development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-start gap-6 group"
            >
              {/* ICON */}
              <div
                className={`p-5 rounded-xl ${service.color} flex items-center justify-center text-white text-3xl transition-transform duration-300 group-hover:scale-110`}
              >
                {service.icon}
              </div>

              {/* TITLE & DESCRIPTION */}
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>

              {/* CTA Button */}
              <Link
                href={service.link}
                className="mt-auto px-5 py-2 rounded-xl bg-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:bg-purple-800 text-center w-full"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
