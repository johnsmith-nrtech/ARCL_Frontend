"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddNewsletterPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!pdfFile) {
      setError("PDF file is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("pdf", pdfFile);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`${API_URL}/api/newsletters`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add newsletter");
      }

      router.push("/admin/newsletters");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#3f1a7b] mb-6">
        Add Newsletter
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
            {error}
          </div>
        )}

        {/* Title + Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            className="border p-3 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            placeholder="Date (e.g. OCT–DEC, 2024)"
            className="border p-3 rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Upload PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            className="border p-2 rounded w-full"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            required
          />
          {pdfFile && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {pdfFile.name}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Cover Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded w-full"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div>
            <p className="text-sm font-semibold mb-1">Image Preview</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="h-32 rounded border object-cover"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-[#3f1a7b] px-6 py-2 rounded font-semibold
          hover:bg-[#3f1a7b] hover:text-white transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Newsletter"}
        </button>
      </form>
    </div>
  );
}
