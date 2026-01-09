"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  message: string;
  image?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/api/testimonials`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Fetch failed");

      setTestimonials(data);
    } catch (err: any) {
      setError(err.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id?: string) => {
    if (!id || typeof id !== "string") return;

    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`${API_URL}/api/testimonials/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch (err: any) {
      alert(err.message || "Error deleting testimonial");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ================= STATES ================= */
  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">
        Loading testimonials...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold text-[#3f1a7b]">
          Testimonials
        </h1>

        <Link
          href="/admin/testimonials/add"
          className="flex items-center gap-2 bg-[#260e58] text-white
                     px-5 py-2 rounded font-semibold"
        >
          <Plus size={18} /> Add Testimonial
        </Link>
      </div>

      {/* TABLE */}
      {testimonials.length === 0 ? (
        <p className="text-gray-500">No testimonials found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse min-w-[700px] sm:min-w-full">
            <thead className="bg-[#260e58] text-white text-left">
              <tr>
                <th className="p-2 sm:p-4">Image</th>
                <th className="p-2 sm:p-4">Name</th>
                <th className="p-2 sm:p-4">Role</th>
                <th className="p-2 sm:p-4">Message</th>
                <th className="p-2 sm:p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {testimonials.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >
                  {/* IMAGE */}
                  <td className="p-2 sm:p-4">
                    <div className="w-14 h-14 relative rounded-full overflow-hidden">
                      <Image
                        src={item.image ? `${API_URL}${item.image}` : "/user.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </td>
                  {/* NAME */}
                  <td className="p-2 sm:p-4 font-medium text-[#3f1a7b]">
                    {item.name}
                  </td>

                  {/* ROLE */}
                  <td className="p-2 sm:p-4 text-sm text-gray-600">
                    {item.role}
                  </td>

                  {/* MESSAGE */}
                  <td className="p-2 sm:p-4 text-sm text-gray-600 max-w-md">
                    {item.message}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-2 sm:p-4">
                    <div className="flex flex-col sm:flex-row justify-center sm:gap-2 gap-1">
                      <Link
                        href={`/admin/testimonials/edit/${item._id}`}
                        className="flex items-center gap-1 text-sm
                                   px-2 sm:px-3 py-1 border rounded"
                      >
                        <Pencil size={14} /> Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center gap-1 text-sm
                                   px-2 sm:px-3 py-1
                                   border border-red-400 text-red-600 rounded"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
