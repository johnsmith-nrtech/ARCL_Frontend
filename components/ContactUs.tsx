// components/ContactUs.tsx
"use client";

import { useState } from "react";

export default function ContactUs({ id }: { id?: string })  {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form Data:", form);
  //   alert("Message sent successfully!");
  //   setForm({ name: "", email: "", phone: "", message: "" });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setStatusMessage("");

  try {
    const response = await fetch("http://localhost:5000/api/contact/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.success) {
      setStatusMessage(data.message || "Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatusMessage(data.message || "Failed to send message");
    }
  } catch (error) {
    console.error("Error:", error);
    setStatusMessage("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section id={id} className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 px-6">
        {/* Left Side - Contact Form */}
        <div className="lg:w-1/2 bg-[#3f1a7b] text-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-3 rounded bg-white text-[#3f1a7b] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-3 rounded bg-white text-[#3f1a7b] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-3 rounded bg-white text-[#3f1a7b] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              className="p-3 rounded bg-white text-[#3f1a7b] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-white text-[#3f1a7b] cursor-pointer font-semibold py-3 rounded hover:bg-gray-100 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>


        {/* Right Side - Map and Address */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-[#3f1a7b] mt-8 mb-4">Our Location</h2>
          <p className="text-[#3f1a7b] mb-4 leading-relaxed">
            Autism Resource Center Lahore<br />
            74 Defence Rd, Block C2, Engineers Town, Lahore, Pakistan
          </p>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCMtKh7m8CZ8VrNYCxvXzFabEfCkZxLKxs&q=Autism+Resource+Center+Lahore,74+Defence+Rd,Block+C2,Engineers+Town,Lahore,Pakistan&zoom=10"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        </div>
      </div>
    </section>
  );
}
