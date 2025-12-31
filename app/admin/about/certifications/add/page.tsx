"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddCertificationPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const [form, setForm] = useState({ title: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🖼 Image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // 📄 PDF selection
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfFile(file);
  };

  // 🧹 Clean up object URLs
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // 📤 Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile || !pdfFile) {
      alert("Please select both an image and a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("image", imageFile);
    formData.append("pdf", pdfFile);

    setLoading(true);

    try {
      // 🔴 Replace with your backend API
      const res = await fetch(`${API_URL}/api/certifications`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add certification");

      setSuccess(true);

      // Reset form
      setForm({ title: "" });
      setImageFile(null);
      setPdfFile(null);
      setImagePreview(null);

      // Redirect after short delay
      setTimeout(() => router.push("/admin/about"), 1500);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Add Certification</h1>

      {/* ✅ Success Message */}
      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 font-medium">
          ✅ Certification added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Certification Title"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="font-medium">Certification Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
            required
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Image Preview"
              width={120}
              height={120}
              className="rounded border mt-2 object-cover"
            />
          )}
        </div>

        {/* PDF Upload */}
        <div className="space-y-2">
          <label className="font-medium">PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white transition ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Saving..." : "Save Certification"}
        </button>
      </form>
    </div>
  );
}
