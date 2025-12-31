"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const SpecializedEducation = () => {
  return (
    <main className="bg-white">
        <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-yellow-400/20 py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-extrabold text-white mb-4">
            Specialized Education
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto">
            Tailored learning programs designed to meet the unique needs of every student.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {/* What is Specialized Education */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
              What is Specialized Education?
            </h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Specialized education is tailored to meet the unique needs of students who require extra support in their learning journey. It involves customizing the curriculum and teaching methods to ensure students with various challenges can achieve their full potential.
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Benefits</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Individualized learning plans tailored to each student’s needs.</li>
              <li>Increased academic success and confidence.</li>
              <li>Development of social and emotional skills.</li>
              <li>Improved communication skills through specialized support.</li>
            </ul>
          </div>

          {/* Approaches */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Approaches</h2>
            <ul className="list-disc pl-6 text-gray-700 font-nunito text-lg space-y-2">
              <li>Behavioral interventions to help modify behaviors and support learning.</li>
              <li>Use of assistive technology to enhance learning opportunities.</li>
              <li>One-on-one tutoring and small group instruction for personalized attention.</li>
              <li>Collaborative planning with parents, teachers, and specialists to create customized learning plans.</li>
            </ul>
          </div>

          {/* Impact */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Impact on Students</h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Specialized education helps students overcome barriers to learning. It allows students to experience success in areas where they may have previously struggled, boosting self-esteem and fostering a love for learning.
            </p>
          </div>

          {/* Collaboration */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Parent and Teacher Collaboration</h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Collaboration between parents, teachers, and other educational professionals is essential for the success of specialized education. Regular communication ensures that the student’s progress is monitored, and adjustments can be made to their educational plan as needed.
            </p>
          </div>

          {/* Conclusion */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Conclusion</h2>
            <p className="text-gray-700 font-nunito text-lg leading-relaxed">
              Specialized education provides the foundation for students to thrive academically and socially. By meeting individual needs, it creates a more inclusive and supportive learning environment.
            </p>
          </div>

          {/* Back to Home */}
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

export default SpecializedEducation;
