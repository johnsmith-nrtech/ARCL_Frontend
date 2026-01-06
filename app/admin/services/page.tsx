"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Section {
  header: string;
  description: string;
  hasList: boolean;
  listItems: string[];
}

interface Service {
  _id: string;
  mainTitle: string;
  url: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_BASE_URL = `${API_URL}/api`;

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      setServices(services.filter((s) => s._id !== id));
      alert("Service deleted successfully");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to delete service");
    }
  };

  if (loading) return <p className="text-center py-10">Loading services...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (services.length === 0) return <p className="text-center py-10">No services found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-950">Services</h1>
        <Link
          href="/admin/services/add"
          className="flex items-center gap-2 bg-[#3f1a7b] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-800"
        >
          <FaPlus /> Add Service
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-[600px] sm:min-w-full w-full border-collapse">
          <thead className="bg-[#3f1a7b] text-white">
            <tr>
              <th className="p-2 sm:p-4 text-left">Title</th>
              <th className="p-2 sm:p-4">Status</th>
              <th className="p-2 sm:p-4">Role</th>
              <th className="p-2 sm:p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-t hover:bg-gray-50">
                <td className="p-2 sm:p-4 font-semibold">{service.mainTitle}</td>

                <td className="p-2 sm:p-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs sm:text-sm ${
                      service.status === "Active" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>

                <td className="p-2 sm:p-4">{service.role}</td>

                <td className="p-2 sm:p-4 text-center">
                  <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                    <Link
                      href={`/admin/services/edit/${service._id}`}
                      className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border rounded hover:bg-gray-50"
                    >
                      <FaEdit /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(service._id)}
                      className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border border-red-400 text-red-600 rounded hover:bg-red-50"
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
