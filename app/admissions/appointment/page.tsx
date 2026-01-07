"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function AppointmentPage(): React.JSX.Element {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1); // ❌ no today / past

  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1); // ❌ no after 1 month

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.parentName.trim())
      newErrors.parentName = "Parent name is required";

    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";

    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";

    if (!formData.preferredDate)
      newErrors.preferredDate = "Please select a valid date";

    if (!formData.preferredTime)
      newErrors.preferredTime = "Please select a time slot";

    if (formData.preferredDate) {
      const selected = new Date(formData.preferredDate);
      if (selected <= today)
        newErrors.preferredDate = "Date must be after today";

      if (selected > maxDate)
        newErrors.preferredDate = "Date cannot be more than 1 month ahead";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Appointment Data:", formData);
    alert("Appointment request submitted successfully!");

    setFormData({
      parentName: "",
      email: "",
      phone: "",
      childName: "",
      childAge: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    });
  };

  return (
    <main className="bg-white min-h-screen text-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#3f1a7b] py-32 text-center">
        <h1 className="text-5xl font-hand font-bold text-white mb-4">
          Book an Appointment
        </h1>
        <p className="text-yellow-300 text-lg">
          Schedule a meeting with our admission team
        </p>
      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-2xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-[#3f1a7b] text-center mb-6">
            Appointment Details
          </h2>

          {/* Parent Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                Parent / Guardian Name
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
              {errors.parentName && (
                <p className="text-red-500 text-sm">{errors.parentName}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Child Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Child Name</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Child Age</label>
              <input
                type="number"
                name="childAge"
                min={1}
                max={18}
                value={formData.childAge}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Appointment Date & Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                min={formatDate(minDate)}
                max={formatDate(maxDate)}
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
              {errors.preferredDate && (
                <p className="text-red-500 text-sm">
                  {errors.preferredDate}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Preferred Time
              </label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">Select Time</option>
                <option value="Morning">Morning (9:00–11:00)</option>
                <option value="Afternoon">Afternoon (12:00–3:00)</option>
              </select>
              {errors.preferredTime && (
                <p className="text-red-500 text-sm">
                  {errors.preferredTime}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium mb-1">
              Additional Information
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-10 py-3 rounded-full bg-yellow-400 text-[#3f1a7b] font-semibold hover:bg-[#ffc107]"
            >
              Submit Appointment Request
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}
