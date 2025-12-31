"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddExecutiveMember() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", position: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  /* 🖼 Handle Image Change & Preview */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* 🧹 Revoke object URL on unmount to free memory */
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  /* 📤 Form Submission */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload a profile image");
      return;
    }

    try {
      setLoading(true);

      // Prepare FormData for API
      const data = new FormData();
      data.append("name", form.name);
      data.append("position", form.position);
      data.append("image", imageFile);

      // 🔴 Replace with your API endpoint
      const res = await fetch(`${API_URL}/api/executive`, {
        method: "POST",
        body: data,
        });

      if (!res.ok) throw new Error("Failed to add member");

      setSuccess(true);

      // Reset form
      setForm({ name: "", position: "" });
      setImageFile(null);
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
    <div className="max-w-xl mx-auto p-8 bg-white shadow rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6">Add Executive Member</h1>

      {/* ✅ Success Alert */}
      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 font-medium">
          ✅ Executive member added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        {/* Position */}
        <input
          type="text"
          placeholder="Position"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          required
        />

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="font-medium">Profile Image</label>
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
              alt="Preview"
              width={120}
              height={120}
              className="rounded-full border mt-2 object-cover"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Executive Member"}
        </button>
      </form>
    </div>
  );
}
