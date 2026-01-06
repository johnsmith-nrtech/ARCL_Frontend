"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams(); // string id
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    existingImage: "",
  });

  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // ================= FETCH EXISTING TESTIMONIAL =================
  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!id) return;

      try {
        const res = await fetch(`${API_URL}/api/testimonials/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch testimonial");

        setFormData({
          name: data.name,
          role: data.role,
          message: data.message,
          existingImage: data.image || "",
        });

        setImagePreview(data.image ? `${API_URL}${data.image}` : "/user.png");
      } catch (err: any) {
        setError(err.message || "Failed to load testimonial");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id, API_URL]);

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

    setNewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setNewImage(null);
    setFormData({ ...formData, existingImage: "" });
    setImagePreview("/user.png");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.message) {
      setError("Name and message are required.");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("message", formData.message);
      if (newImage) data.append("image", newImage);

      const res = await fetch(`${API_URL}/api/testimonials/${id}`, {
        method: "PUT",
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to update testimonial");

      router.push("/admin/testimonials");
    } catch (err: any) {
      setError(err.message || "Error updating testimonial");
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING STATE =================
  if (loading) {
    return <p className="p-8 text-gray-500 text-center">Loading testimonial...</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#3f1a7b] mb-6">Edit Testimonial</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>
        )}

        {/* IMAGE */}
        <div>
          <label className="block text-sm font-semibold mb-1">Photo</label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 relative">
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block text-sm"
              />
              {(formData.existingImage || newImage) && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-sm text-red-600 font-semibold hover:underline"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>

        {/* NAME */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3f1a7b]"
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3f1a7b]"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#3f1a7b]"
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
            disabled={saving}
            className={`px-6 py-2 rounded-lg bg-[#3f1a7b] text-white hover:bg-[#2a1a7b] transition ${
              saving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Updating..." : "Update Testimonial"}
          </button>
        </div>
      </form>
    </div>
  );
}
