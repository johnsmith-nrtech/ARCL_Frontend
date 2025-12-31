"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const HomeService = () => {
  return (
    <main className="bg-white">
        <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-yellow-400/20 py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-extrabold text-white mb-4">
            Home Service
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto">
            Bringing personalized education and support directly to your home.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {/* What is Home Service? */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
              What is Home Service?
            </h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Home services offer in-home support to students who require additional care, learning assistance, or other educational needs. This service brings the classroom experience into the home environment, ensuring students continue their educational journey.
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Benefits</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Personalized education in the comfort of home.</li>
              <li>Assistance for students with disabilities or special needs.</li>
              <li>Convenient and flexible scheduling for families.</li>
              <li>Continued support without the need for travel.</li>
            </ul>
          </div>

          {/* Services Provided */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Services Offered</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>One-on-one tutoring sessions.</li>
              <li>Behavioral therapy and emotional support.</li>
              <li>Assistance with homework and projects.</li>
              <li>Customized learning plans for individual needs.</li>
            </ul>
          </div>

          {/* Conclusion */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Conclusion</h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Home services provide a supportive and adaptable learning environment that allows students to thrive while staying in their home. It ensures that they do not miss out on essential learning opportunities.
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
};

export default HomeService;
