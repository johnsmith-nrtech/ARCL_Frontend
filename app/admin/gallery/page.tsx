"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Upload, Trash2, Filter } from "lucide-react";

/* ================= TYPES ================= */

interface Therapy {
  _id: string;
  mainTitle: string;
  status: "Active" | "Inactive";
}

interface GalleryImage {
  _id: string;
  imageUrl: string;
  therapyId: string;
  therapyTitle: string;
}

/* ================= PAGE ================= */

export default function AdminGalleryPage() {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);

  const [filterTherapy, setFilterTherapy] = useState("");
  const [search, setSearch] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  const [form, setForm] = useState<{
    files: File[];
    previews: string[];
    therapyId: string;
  }>({
    files: [],
    previews: [],
    therapyId: "",
  });

  /* ================= FETCH ================= */

  const fetchTherapies = async () => {
    const res = await fetch(`${API_URL}/api/therapies`);
    const data = await res.json();
    setTherapies(data.filter((t: Therapy) => t.status === "Active"));
  };

  const fetchGallery = async () => {
    const res = await fetch(`${API_URL}/api/gallery`);
    const data = await res.json();
    setGallery(data);
  };

  useEffect(() => {
    fetchTherapies();
    fetchGallery();
  }, []);

  /* ================= FILE ================= */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setForm({
      ...form,
      files,
      previews: files.map((f) => URL.createObjectURL(f)),
    });
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!form.files.length || !form.therapyId) {
      return alert("Select therapy & images");
    }

    const fd = new FormData();
    form.files.forEach((f) => fd.append("images", f));
    fd.append("therapyId", form.therapyId);

    setLoading(true);
    await fetch(`${API_URL}/api/gallery`, {
      method: "POST",
      body: fd,
    });

    await fetchGallery();
    setForm({ files: [], previews: [], therapyId: "" });
    setLoading(false);
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!confirm("Delete image?")) return;
    await fetch(`${API_URL}/api/gallery/${id}`, {
      method: "DELETE",
    });
    fetchGallery();
  };

  /* ================= FILTER ================= */

  const filteredGallery = gallery.filter((g) => {
    const therapyMatch = filterTherapy
      ? g.therapyId === filterTherapy
      : true;

    const searchMatch = g.therapyTitle
      .toLowerCase()
      .includes(search.toLowerCase());

    return therapyMatch && searchMatch;
  });

  return (
    <main className="px-6 py-12">
      <h1 className="text-4xl font-bold text-[#2a1d7a] mb-6">
        Gallery Management
      </h1>

      {/* ================= UPLOAD ================= */}
       <div className="bg-white p-8 rounded-2xl shadow-xl mb-16 max-w-6xl">
        <h2 className="text-2xl font-bold text-[#2a1d7a] mb-6 flex items-center gap-2">
          <Plus /> Add Gallery Images
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* IMAGE UPLOAD CARD */}
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 hover:border-[#3f1a7b] transition flex flex-col justify-center min-h-[260px]">
            <label className="flex flex-col items-center justify-center cursor-pointer text-center h-full">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#3f1a7b]/10 mb-4">
                <Upload className="text-[#3f1a7b]" size={28} />
              </div>

              <h4 className="font-semibold text-gray-800">
                Upload Gallery Images
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Click to select multiple images (JPG, PNG)
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* THERAPY SELECT CARD */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[260px]">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Assign to Therapy
              </label>

              <p className="text-xs text-gray-500">
                Only active therapies are shown
              </p>

              <select
                value={form.therapyId}
                onChange={(e) =>
                  setForm({ ...form, therapyId: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#3f1a7b] focus:ring-2 focus:ring-[#3f1a7b]/30 outline-none transition"
              >
                <option value="">-- Select Therapy --</option>
                {therapies.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.mainTitle}
                  </option>
                ))}
              </select>

              {form.therapyId && (
                <p className="text-sm text-gray-700">
                  Selected:{" "}
                  <span className="font-semibold">
                    {
                      therapies.find(
                        (t) => t._id === form.therapyId
                      )?.mainTitle
                    }
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* ACTION CARD */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[260px]">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Save Gallery
              </h4>
              <p className="text-sm text-gray-500">
                Upload all selected images at once
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-[#3f1a7b] text-white font-semibold rounded-xl py-3 hover:bg-[#2a1d7a] transition disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Save Images"}
            </button>
          </div>
        </div>

        {/* ================= PREVIEWS ================= */}
        {form.previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {form.previews.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="Preview"
                width={200}
                height={150}
                unoptimized
                className="rounded-xl object-cover h-32 w-full"
              />
            ))}
          </div>
        )}
      </div>
      {/* ================= FILTER ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter size={18} />
          <select
            value={filterTherapy}
            onChange={(e) => setFilterTherapy(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Therapies</option>
            {therapies.map((t) => (
              <option key={t._id} value={t._id}>
                {t.mainTitle}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Search therapy..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 flex-1"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Therapy</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredGallery.map((g) => (
              <tr
                key={g._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">
                  <Image
                    src={`${API_URL}${g.imageUrl}`}
                    alt=""
                    width={80}
                    height={60}
                    unoptimized
                    className="rounded-lg object-cover"
                  />
                </td>
                <td className="p-4 font-medium">
                  {g.therapyTitle}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(g._id)}
                    className="flex items-center gap-1 text-sm px-3 py-1
                        border border-red-400 text-red-600 rounded-md
                        hover:bg-red-50 hover:border-red-500 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredGallery.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="p-6 text-center text-gray-500"
                >
                  No images found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
