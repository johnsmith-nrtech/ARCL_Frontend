"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function DonatePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, message }),
      });

      if (res.ok) {
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-white min-h-screen text-gray-900">
      <Navbar />

      {/* Hero */}
     <section className="relative bg-linear-to-b h-[75vh] from-[#3f1a7b] to-[#3f1a7b] py-48 text-center">

        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-bold text-white mb-4">
            Donate Now
          </h1>
          <p className="text-lg md:text-xl text-yellow-300">
            Support our mission to empower children with autism
          </p>
        </div>
      </section>


              {/* Info Section */}
      <section className="max-w-4xl mx-auto px-2 py-8">
        <h2 className="text-3xl font-bold text-[#3f1a7b] mb-6 text-center">
          How Your Donation Helps
        </h2>
        <p className="text-gray-700 mb-4">
          At the Autism Rehabilitation Center Lahore (ARCL), we empower children with autism through specialized care and therapies. Your support helps us create a brighter future for these children.
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Sponsor Therapy Programs: Fund speech therapy, physical therapy, and vocational training tailored to each child’s needs.</li>
          <li>Build a Residential Autism Village: Support our vision of a long-term care facility for adults with autism.</li>
          <li>Upgrade Our Facilities: Maintain sensory rooms, therapy spaces, and educational areas for optimal care.</li>
          <li>Raise Awareness: Fund campaigns to reduce stigma and promote inclusivity for individuals with autism.</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#3f1a7b] mb-2">Ways to Contribute</h3>
        <p className="text-gray-700 mb-2">Make a direct contribution via bank transfer:</p>
        <p className="text-gray-700 mb-1"><strong>Account Name:</strong> Autism Resource Centre Lahore</p>
        <p className="text-gray-700 mb-1"><strong>Account Number:</strong> 0000 0000 1478 4462</p>
        <p className="text-gray-700 mb-1"><strong>Bank:</strong> MCB Bank, Wapda Town Lahore</p>
        <p className="text-gray-700 mb-4"><strong>Branch Code:</strong> [Insert code if applicable]</p>
        <p className="text-gray-700 mb-4">Include your name as a reference when transferring funds.</p>
        <p className="text-gray-700">For questions or assistance, contact us:</p>
        <p className="text-gray-700 mb-2">Email: afbhatti1@yahoo.co.uk</p>
        <p className="text-gray-700 mb-6">Phone: 042 35248222 | 0300 9579526 | 0303 6655444</p>
      </section>

      {/* Donation Form */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-[#f8f8f8] p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-[#3f1a7b] mb-2 text-center">
            I Want to Donate
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Complete the form below, and we’ll get in touch with you soon.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your First Name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your Last Name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="03XXXXXXXXX"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your message..."
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-yellow-400 text-[#3f1a7b] font-semibold hover:bg-[#ffc107] transition"
            >
              Submit
            </button>
            {success && (
            <p className="text-green-600 mb-4 text-center font-semibold">
              Thank you! We received your donation request.
            </p>
          )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
