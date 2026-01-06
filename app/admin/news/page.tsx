"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface NewsUpdateItem {
  _id: string;
  title: string;
  description: string;
  type: "Event" | "Workshop" | "Internship"; 
  date: string;
  image?: string;
}

export default function AdminNewsUpdatePage() {
  const router = useRouter();
  const [items, setItems] = useState<NewsUpdateItem[]>([]);
  const [filter, setFilter] = useState<"All" | "Event" | "Workshop" | "Internship">("All"); 
  const [loading, setLoading] = useState(true);

  const fetchNewsUpdates = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/newsupdate`);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsUpdates();
  }, []);

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`${API_URL}/api/newsupdate/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const filteredItems = filter === "All" ? items : items.filter((i) => i.type === filter);

  return (
    <div className="p-4 sm:p-8 max-w-full sm:max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#3f1a7b] mb-4 sm:mb-6">
        Manage Events, Workshops & Internships
      </h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-between items-start sm:items-center mb-4 sm:mb-6">
        <div className="flex flex-wrap gap-2">
          {["All", "Event", "Workshop", "Internship"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t as any)}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-semibold border
                ${
                  filter === t
                    ? "bg-[#3f1a7b] text-white"
                    : "bg-white text-[#3f1a7b] border-[#3f1a7b]"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push("/admin/news/add")}
          className="flex items-center gap-2 bg-[#3f1a7b] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-800 mt-2 sm:mt-0"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full min-w-[600px] sm:min-w-full text-left">
          <thead className="bg-[#3f1a7b] text-white">
            <tr>
              <th className="p-2 sm:p-4">Image</th>
              <th className="p-2 sm:p-4">Title</th>
              <th className="p-2 sm:p-4">Type</th>
              <th className="p-2 sm:p-4">Date</th>
              <th className="p-2 sm:p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredItems.length ? (
              filteredItems.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-4">
                    <Image
                      src={item.image ? `${API_URL}${item.image}` : "/newsletter-placeholder.jpg"}
                      alt={item.title}
                      width={80}
                      height={60}
                      className="rounded object-cover"
                      unoptimized
                    />
                  </td>

                  <td className="p-2 sm:p-4 font-semibold">{item.title}</td>

                  <td className="p-2 sm:p-4">
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-bold
                        ${
                          item.type === "Event"
                            ? "bg-green-100 text-green-700"
                            : item.type === "Workshop"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td className="p-2 sm:p-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td className="p-2 sm:p-4 text-center">
                    <div className="flex justify-center gap-2 sm:gap-4">
                      <button
                        onClick={() => router.push(`/admin/news/edit/${item._id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
