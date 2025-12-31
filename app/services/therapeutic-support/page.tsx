"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const TherapeuticSupport = () => {
  return (
    <main className="bg-white">
        <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-yellow-400/20 py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-extrabold text-white mb-4">
            Therapeutic Support
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto">
            Evidence-based interventions to improve emotional, behavioral, and mental well-being.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-16">

          {/* What is Therapeutic Support */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
              What is Therapeutic Support?
            </h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Therapeutic support refers to interventions and therapies that focus on improving mental and emotional well-being. These services help individuals cope with stress, manage emotions, and address behavioral challenges.
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Benefits</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Reduction of stress and anxiety.</li>
              <li>Improved emotional regulation.</li>
              <li>Development of coping strategies for difficult situations.</li>
              <li>Better interpersonal relationships.</li>
            </ul>
          </div>

          {/* Therapeutic Approaches */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Therapeutic Approaches</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Cognitive Behavioral Therapy (CBT)</li>
              <li>Play Therapy</li>
              <li>Family Therapy</li>
              <li>Art Therapy</li>
            </ul>
          </div>

          {/* Conclusion */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Conclusion</h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Therapeutic support is essential for enhancing emotional and mental health. It empowers individuals to navigate challenges effectively, fostering a more balanced and fulfilling life.
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

export default TherapeuticSupport;
