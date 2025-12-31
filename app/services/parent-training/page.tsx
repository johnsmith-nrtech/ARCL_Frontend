"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const ParentTraining = () => {
  return (
    <main className="bg-white">
        <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-yellow-400/20 py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-extrabold text-white mb-4">
            Parent Training
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto">
            Empowering parents with strategies to support their child's growth and development.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {/* What is Parent Training? */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
              What is Parent Training?
            </h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Parent training provides guidance and support to parents in managing their child’s behavior, learning needs, and emotional challenges. It empowers parents with tools and strategies to promote positive development at home.
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Benefits</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Improved child behavior and learning outcomes.</li>
              <li>Stronger parent-child relationships.</li>
              <li>Better communication and conflict resolution skills.</li>
              <li>Increased parental confidence in handling challenges.</li>
            </ul>
          </div>

          {/* Approaches */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Approaches</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Positive reinforcement strategies.</li>
              <li>Setting clear expectations and boundaries.</li>
              <li>Effective discipline techniques.</li>
              <li>Parenting support groups for shared experiences.</li>
            </ul>
          </div>

          {/* Conclusion */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Conclusion</h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Parent training plays a crucial role in enhancing the development of children while
              promoting a positive family dynamic. It helps parents navigate the challenges of
              raising children in a supportive and effective way.
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
        <Footer />
    </main>
  );
};

export default ParentTraining;
