"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function FinancialAssistancePage() {
  return (
    <main className="bg-white">
        <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-yellow-400/20 py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-extrabold text-white mb-4">
            Financial Assistance
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto">
            Empowering every child with the resources they need to succeed academically.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* What is Financial Assistance? */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
              What is Financial Assistance?
            </h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Financial assistance programs are designed to support students and families who are facing economic challenges. These programs provide financial support to ensure that every student has access to quality education, regardless of their financial background.
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
              Benefits
            </h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed mb-4">
              Financial assistance provides numerous advantages to students, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Increased access to education for families with limited resources.</li>
              <li>Reduction of financial stress for students and parents.</li>
              <li>Opportunity to focus on academic success rather than financial constraints.</li>
              <li>Increased participation in extracurricular activities and enrichment programs.</li>
            </ul>
          </div>

          {/* Types of Financial Assistance */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
              Types of Assistance
            </h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed mb-4">
              Financial assistance can take several forms, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Scholarships</li>
              <li>Grants</li>
              <li>Loans</li>
              <li>Work-study programs</li>
            </ul>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
              Conclusion
            </h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Financial assistance is a critical resource that ensures every student has the opportunity to succeed academically, regardless of their financial situation. This support helps create a more inclusive and equitable educational environment.
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
