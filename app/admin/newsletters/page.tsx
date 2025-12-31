"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Pencil, Plus, FileText } from "lucide-react";
import { useEffect, useState } from "react";

interface Newsletter {
  _id: string;
  title: string;
  date: string;
  pdfUrl: string;
  imageUrl?: string | null;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL!;



export default function NewsletterListPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNewsletters = async () => {
    try {
      const res = await fetch(`${API_URL}/api/newsletters`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setNewsletters(data.data);
    } catch (err: any) {
      setError(err.message || "Failed to load newsletters");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this newsletter?")) return;
    try {
      const res = await fetch(`${API_URL}/api/newsletters/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setNewsletters((prev) => prev.filter((n) => n._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading newsletters...</div>;

  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#3f1a7b]">Newsletters</h1>

        <Link
          href="/admin/newsletters/add"
          className="flex items-center gap-2 bg-yellow-400 text-[#3f1a7b]
                     px-5 py-2 rounded font-semibold"
        >
          <Plus size={18} /> Add Newsletter
        </Link>
      </div>

      {newsletters.length === 0 ? (
        <p className="text-gray-500">No newsletters found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Date</th>
                <th className="p-4">PDF</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {newsletters.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <Image
                      src={
                        item.imageUrl
                          ? `${API_URL}${item.imageUrl}`
                          : "/newsletter-placeholder.jpg"
                      }
                      alt={item.title}
                      width={80}
                      height={60}
                      unoptimized
                      className="rounded object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium text-[#3f1a7b]">
                    {item.title}
                  </td>

                  <td className="p-4 text-sm text-gray-600">
                    {item.date}
                  </td>

                  <td className="p-4">
                    <a
                      href={`${API_URL}${item.pdfUrl}`}
                      target="_blank"
                      className="flex items-center gap-1 text-blue-600 text-sm"
                    >
                      <FileText size={16} /> View
                    </a>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/newsletters/edit/${item._id}`}
                        className="flex items-center gap-1 text-sm px-3 py-1 border rounded"
                      >
                        <Pencil size={14} /> Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center gap-1 text-sm px-3 py-1
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
