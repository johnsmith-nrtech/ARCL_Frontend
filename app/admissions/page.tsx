"use client";

import React, { useState } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface Session {
  title: string;
  timing: string;
  points: string[];
}

interface AdmissionStep {
  title: string;
  content: (string | React.JSX.Element)[];
}

const sessions: Session[] = [
  {
    title: "Morning Session",
    timing: "8:00 AM - 11:30 AM",
    points: [
      "Ideal for early learners",
      "Focused morning energy",
      "Comprehensive morning curriculum",
    ],
  },
  {
    title: "Evening Session",
    timing: "12:00 PM - 3:00 PM",
    points: [
      "Flexible afternoon timings",
      "Suitable for working parents",
      "Comprehensive afternoon curriculum",
    ],
  },
];

const admissionSteps: AdmissionStep[] = [
  {
    title: "Registration",
    content: [
      <>
        Online registration is available via our{" "}
        <Link
          href="/Admissions/onlineEnrollment"
          className="text-yellow-400 underline"
        >
          registration page
        </Link>
        . Alternatively, you can visit the school office for in-person registration.
      </>,
    ],
  },
  {
    title: "Student Admission Policy",
    content: [
      "The application process begins as soon as parents approach for admission.",
      <strong key="assessment">Psychological Assessment:</strong>,
      "A certified psychologist will attend to the parents and assess the child. Based on the child’s situation, the psychologist will recommend the relevant therapist or head therapist for further support.",
      <strong key="admissionForm">Admission Form:</strong>,
      "If the parents agree to pay the full admission fee, they will receive the admission form from the accounts department and follow the necessary instructions.",
    ],
  },
  {
    title: "Subsidy On Admission Policy",
    content: [
      "Parents requesting a subsidy must provide copies of utility bills and any other relevant documents. Upon receipt of this information, one of our agents will visit the parent’s home to make an assessment report based on the visit and provided information.",
      "The case will then be discussed in the Board of Governors (BOG) meeting. The BOG will decide whether a subsidy can be granted, and if so, how much subsidy will be offered.",
    ],
  },
  {
    title: "Admission Requirements",
    content: [
      "Please ensure the following documents are submitted to complete the admission process:",
      <ul key="docs" className="list-disc pl-6 text-gray-700">
        <li>2 recent passport-sized photographs of the student with a white background.</li>
        <li>Copy of the student's Form-B or Birth Certificate issued by NADRA.</li>
        <li>Copy of the parent's/guardian's CNIC.</li>
        <li>Any medical records or special needs documentation (if applicable).</li>
      </ul>,
    ],
  },
];

export default function Admissions(): React.JSX.Element {
  // First step active by default
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <main className="bg-white min-h-screen text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b h-[75vh] from-[#3f1a7b] to-[#3f1a7b] py-48 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-6xl font-hand font-bold text-white mb-4">
            Admissions
          </h1>
          <p className="text-lg md:text-xl text-yellow-300">
            Start your child's journey with us – Take the first step today
          </p>
        </div>
      </section>

      {/* Admission Steps */}
      <section className="max-w-7xl mx-auto py-16 px-6 space-y-6">
        {admissionSteps.map((step, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <button
              className="w-full text-left px-6 cursor-pointer py-4 bg-[#3f1a7b] text-white font-semibold flex justify-between items-center hover:bg-[#51259b] transition"
              onClick={() =>
                setActiveStep(activeStep === index ? -1 : index)
              }
            >
              {step.title}
              <span className="text-xl">{activeStep === index ? "−" : "+"}</span>
            </button>
            <div
              className={`px-6 pb-6 pt-4 text-gray-700 transition-all duration-300 ${
                activeStep === index ? "max-h-[2000px]" : "max-h-0 overflow-hidden"
              }`}
            >
              {step.content.map((c, i) => (
                <div key={i} className="mb-2">
                  {c}
                </div>
              ))}

              {/* Example CTA for Registration */}
              {step.title === "Registration" && (
                <div className="mt-4 flex justify-center">
                  <Link
                    href="/Admissions/appointment"
                    className="px-8 py-3 rounded-full bg-yellow-400 text-[#3f1a7b] font-semibold hover:bg-[#ffc107] transition"
                  >
                    Book an Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Sessions Section */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-[#3f1a7b] mb-8 text-center">
          Session Timings
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {sessions.map((session, idx) => (
            <div
              key={idx}
              className="bg-[#f8f8f8] rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-[#3f1a7b] mb-2">
                {session.title}
              </h3>
              <p className="text-gray-700 mb-4">Timing: {session.timing}</p>
              <ul className="list-disc pl-6 text-gray-700">
                {session.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
