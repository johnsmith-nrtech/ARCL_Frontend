"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function EditCertificationPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    image: "", // existing image URL
    pdf: "",   // existing pdf URL
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newPdf, setNewPdf] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ================= FETCH CERTIFICATION ================= */
  const fetchCertification = async () => {
    try {
      const res = await fetch(`${API_URL}/api/certifications/${id}`);
      if (!res.ok) throw new Error("Failed to fetch certification");
      const data = await res.json();
      setForm({
        title: data.title,
        image: `${API_URL}${data.image}`,
        pdf: `${API_URL}${data.pdf}`,
      });
    } catch (err) {
      console.error(err);
      alert("Error fetching certification");
    }
  };

  useEffect(() => {
    fetchCertification();
  }, [id]);

  /* ================= HANDLE FILE CHANGES ================= */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewPdf(file);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  /* ================= HANDLE FORM SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return alert("Title is required");

    const fd = new FormData();
    fd.append("title", form.title);
    if (newImage) fd.append("image", newImage);
    if (newPdf) fd.append("pdf", newPdf);

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/certifications/${id}`, {
        method: "PUT",
        body: fd,
      });
      if (!res.ok) throw new Error("Update failed");

      setSuccess(true);
      setNewImage(null);
      setNewPdf(null);
      setImagePreview(null);

      setTimeout(() => router.push("/admin/about"), 1500);
    } catch (err) {
      console.error(err);
      alert("Error updating certification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Certification</h1>

      {/* ✅ Success Message */}
      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 font-medium">
          ✅ Certification updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Certification Title"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        {/* Current Image */}
        {form.image && (
          <div>
            <p className="font-medium mb-2">Current Image</p>
            <Image
              src={form.image}
              alt="Current Certification Image"
              width={120}
              height={120}
              className="rounded border"
              unoptimized
            />
          </div>
        )}

        {/* Change Image */}
        <div className="space-y-2">
          <label className="font-medium">Change Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="New Image Preview"
              width={120}
              height={120}
              className="rounded border mt-2"
              unoptimized
            />
          )}
        </div>

        {/* Current PDF */}
        {form.pdf && (
          <div>
            <p className="font-medium mb-2">Current PDF</p>
            <a
              href={form.pdf}
              target="_blank"
              className="text-red-600 underline"
            >
              {form.pdf.split("/").pop()}
            </a>
          </div>
        )}

        {/* Change PDF */}
        <div className="space-y-2">
          <label className="font-medium">Change PDF (Optional)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Certification"}
        </button>
      </form>
    </div>
  );
}
