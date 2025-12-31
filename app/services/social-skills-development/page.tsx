"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const SocialSkillsDevelopment = () => {
  return (
    <main className="bg-white">
        <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-yellow-400/20 py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-extrabold text-white mb-4">
            Social Skills Development
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto">
            Helping students build confidence, improve communication, and thrive socially.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {/* What is Social Skills Development? */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
              What is Social Skills Development?
            </h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Social skills development focuses on helping students improve their ability to interact and communicate effectively with others. It helps students build healthy relationships, manage emotions, and develop the confidence needed to engage in social settings.
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Benefits</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Improved communication and interpersonal skills.</li>
              <li>Enhanced emotional intelligence and self-awareness.</li>
              <li>Better conflict resolution abilities.</li>
              <li>Increased confidence in social situations.</li>
            </ul>
          </div>

          {/* Techniques Used */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Techniques Used</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Role-playing activities to practice communication.</li>
              <li>Group discussions and peer interactions.</li>
              <li>Behavior modeling and reinforcement strategies.</li>
              <li>Encouraging emotional expression through art or writing.</li>
            </ul>
          </div>

          {/* Conclusion */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Conclusion</h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Social skills development helps students not only succeed academically but also emotionally and socially. It lays the foundation for building positive relationships and adapting to various social environments.
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

export default SocialSkillsDevelopment;
