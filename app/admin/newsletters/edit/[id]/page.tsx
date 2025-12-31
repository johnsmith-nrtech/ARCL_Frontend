"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditNewsletterPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const [existingPdf, setExistingPdf] = useState("");
  const [existingImage, setExistingImage] = useState("");

  const [newPdf, setNewPdf] = useState<File | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  // FETCH EXISTING DATA
  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const res = await fetch(`${API_URL}/api/newsletters/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setTitle(data.data.title);
        setDate(data.data.date);
        setExistingPdf(data.data.pdfUrl);
        setExistingImage(data.data.imageUrl || "");
        setImagePreview(
          data.data.imageUrl
            ? `${API_URL}${data.data.imageUrl}`
            : "/newsletter-placeholder.jpg"
        );
      } catch (err: any) {
        setError(err.message || "Failed to load newsletter");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNewsletter();
  }, [id]);

  // SUBMIT UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);

      if (newPdf) formData.append("pdf", newPdf);
      if (newImage) formData.append("image", newImage);

      const res = await fetch(`${API_URL}/api/newsletters/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      router.push("/admin/newsletters");
    } catch (err: any) {
      setError(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading newsletter...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#3f1a7b] mb-6">
        Edit Newsletter
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
            className="border p-3 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="border p-3 rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Current PDF */}
        <div>
          <p className="text-sm font-semibold mb-1">Current PDF</p>
          <a
            href={`${API_URL}${existingPdf}`}
            target="_blank"
            className="text-blue-600 underline text-sm"
          >
            {existingPdf.split("/").pop()}
          </a>
        </div>

        {/* Replace PDF */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Replace PDF (optional)
          </label>
          <input
            type="file"
            accept="application/pdf"
            className="border p-2 rounded w-full"
            onChange={(e) => setNewPdf(e.target.files?.[0] || null)}
          />
          {newPdf && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {newPdf.name}
            </p>
          )}
        </div>

        {/* Replace Image */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Replace Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded w-full"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setNewImage(file);
              setImagePreview(URL.createObjectURL(file));
            }}
          />
        </div>

        {/* Image Preview */}
        <div>
          <p className="text-sm font-semibold mb-1">Image Preview</p>
          <img
            src={imagePreview}
            alt="Preview"
            className="h-32 rounded border object-cover"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="bg-yellow-400 text-[#3f1a7b] px-6 py-2 rounded font-semibold
                     hover:bg-[#3f1a7b] hover:text-white transition disabled:opacity-60"
        >
          {saving ? "Updating..." : "Update Newsletter"}
        </button>
      </form>
    </div>
  );
}
