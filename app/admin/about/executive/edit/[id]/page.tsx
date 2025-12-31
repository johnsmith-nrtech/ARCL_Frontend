"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function EditExecutiveMember() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    position: "",
    image: "", // existing image URL
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH MEMBER ================= */
  const fetchMember = async () => {
    try {
      const res = await fetch(`${API_URL}/api/executive/${id}`);
      if (!res.ok) throw new Error("Failed to fetch member");

      const data = await res.json();
      setForm({
        name: data.name,
        position: data.position,
        image: `${API_URL}${data.image}`,
      });
    } catch (err) {
      console.error(err);
      alert("Error fetching member data");
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  /* ================= HANDLE IMAGE CHANGE ================= */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.position) return alert("Name & Position required");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("position", form.position);
    if (newImage) fd.append("image", newImage);

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/executive/${id}`, {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Executive member updated successfully!");
      router.push("/admin/about");
    } catch (err) {
      console.error(err);
      alert("Error updating member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Executive Member</h1>

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

        {/* Current Image */}
        <div>
          <p className="font-medium mb-2">Current Image</p>
          {form.image && (
            <Image
              src={form.image}
              alt={form.name}
              width={120}
              height={120}
              className="rounded-full border"
              unoptimized
            />
          )}
        </div>

        {/* New Image Upload */}
        <div className="space-y-2">
          <label className="font-medium">Change Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
          {preview && (
            <Image
              src={preview}
              alt="New Preview"
              width={120}
              height={120}
              className="rounded-full border mt-2 object-cover"
              unoptimized
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Member"}
        </button>
      </form>
    </div>
  );
}
