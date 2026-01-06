"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AddTestimonialPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    role: "Parent",
    message: "",
    img: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ================= HANDLERS =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData({ ...formData, img: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
      alert("Name and message are required.");
      return;
    }

    try {
      setLoading(true);

      // Prepare form data
      const data = new FormData();
      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("message", formData.message);
      if (formData.img) data.append("image", formData.img);

      const res = await fetch(`${API_URL}/api/testimonials`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Testimonial added successfully!");
        router.push("/admin/testimonials");
      } else {
        alert(result.message || "Failed to add testimonial.");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-[#2a1a7b]">
          Add Testimonial
        </h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-6"
      >
        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-medium mb-2">Photo</label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden relative">
              <Image
                src={preview || "/user.png"}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm"
            />
          </div>
        </div>

        {/* NAME */}
        <div>
          <label className="block font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2a1a7b]"
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="block font-medium mb-2">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Parent"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2a1a7b]"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block font-medium mb-2">Message</label>
          <textarea
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Write testimonial message..."
            className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#2a1a7b]"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.push("/admin/testimonials")}
            className="px-6 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg bg-[#2a1a7b] text-white hover:bg-[#1f145c] transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Testimonial"}
          </button>
        </div>
      </form>
    </div>
  );
}
