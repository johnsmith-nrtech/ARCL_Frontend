"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Section {
  id: number;
  header: string;
  description: string;
  hasList: boolean;
  listItems: string[];
}

interface Therapy {
  _id: string;
  mainTitle: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: "Admin" | "Therapist" | "Parent";
  url: string;
}

export default function AdminTherapies() {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const fetchTherapies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/api/therapies`);
      if (!res.ok) throw new Error("Failed to fetch therapies");
      const data = await res.json();
      setTherapies(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapies();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this therapy?")) return;
    try {
      const res = await fetch(`${API_URL}/api/therapies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete therapy");
      setTherapies(therapies.filter((t) => t._id !== id));
      alert("Therapy deleted successfully");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to delete therapy");
    }
  };

  if (loading) return <p className="text-center py-10">Loading therapies...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (therapies.length === 0) return <p className="text-center py-10">No therapies found.</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-950">Therapies</h1>
        <Link
          href="/admin/therapiesdetail/add"
          className="flex items-center gap-2 bg-[#3f1a7b] text-white px-4 py-2 rounded-lg hover:bg-purple-800"
        >
          <FaPlus /> Add New Therapy
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#3f1a7b] text-white">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Role</th>
              {/* <th className="p-4">URL</th> */}
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {therapies.map((therapy) => (
              <tr key={therapy._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">{therapy.mainTitle}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      therapy.status === "Active" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {therapy.status}
                  </span>
                </td>
                <td className="p-4">{therapy.role}</td>
                {/* <td className="p-4 text-blue-600">{therapy.url || "-"}</td> */}
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-4">
                    <Link
                      href={`/admin/therapiesdetail/edit/${therapy._id}`}
                      className="flex items-center gap-1 text-sm px-3 py-1 border rounded hover:bg-gray-50"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(therapy._id)}
                      className="flex items-center gap-1 text-sm px-3 py-1 border border-red-400 text-red-600 rounded hover:bg-red-50"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
