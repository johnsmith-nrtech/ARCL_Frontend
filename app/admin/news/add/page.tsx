"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormState {
  title: string;
  description: string;
  date: string; // replaced author with date
  type: "Event" | "Workshop";
  image: File | null;
}

export default function AddNewsPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    date: "",
    type: "Event",
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  // Cleanup preview URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setForm({ ...form, image: null });
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("type", form.type);
    formData.append("date", form.date?.toString() || "");
    if (form.image) formData.append("image", form.image);

    const res = await fetch(`${API_URL}/api/newsupdate`, {
      method: "POST",
      body: formData,
    });

    // Read response as text first
    const text = await res.text();

    // Try parsing JSON safely
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Non-JSON response:", text);
      throw new Error("Server returned invalid JSON");
    }

    if (!data.success) throw new Error(data.message || "Something went wrong");

    alert("News added successfully!");
    router.push("/admin/news");
  } catch (err: any) {
    alert(`Error: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#3f1a7b] mb-8">
        Add Event / Workshop
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mt-2 p-3 border rounded-lg"
            placeholder="Enter news title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            rows={4}
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full mt-2 p-3 border rounded-lg"
            placeholder="Enter a short description"
          />
        </div>

        {/* Date */}
        <div>
          <label className="font-semibold">Date</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full mt-2 p-3 border rounded-lg"
          />
        </div>

        {/* Type */}
        <div>
          <label className="font-semibold">Type</label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as "Event" | "Workshop" })
            }
            className="w-full mt-2 p-3 border rounded-lg"
          >
            <option value="Event">Event</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-2"
          />

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <div className="relative w-64 h-40 rounded-lg overflow-hidden border">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>

              <button
                type="button"
                onClick={removeImage}
                className="mt-2 text-sm text-red-600 font-semibold hover:underline"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#3f1a7b] text-white rounded-full font-semibold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border rounded-full font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
