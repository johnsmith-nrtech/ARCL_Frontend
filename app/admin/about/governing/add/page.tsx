"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddGoverningMember() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", position: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) return alert("Image is required");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("position", form.position);
    formData.append("image", imageFile);

    try {
      const res = await fetch(`${API_URL}/api/governing/add`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add member");
      alert("Member added successfully!");
      router.push("/admin/about");
    } catch (err) {
      console.error(err);
      alert("Error adding member");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6">Add Governing Member</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Position"
          className="w-full border p-3 rounded"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          required
        />

        <div className="space-y-2">
          <label className="block font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
            required
          />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={120}
              height={120}
              className="rounded-full border mt-3"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Save Member
        </button>
      </form>
    </div>
  );
}
