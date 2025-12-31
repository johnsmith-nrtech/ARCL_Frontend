"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const isAdmin = loggedInUser?.role.toLowerCase() === "admin";
  console.log("Logged-in user:", isAdmin);


  /* ================= FETCH CURRENT USER ================= */
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setLoggedInUser(data);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (token) fetchMe();
    else {
      setError("Not authenticated");
      setLoading(false);
    }
  }, [token]);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data); // admin → all, user → self (backend controlled)
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) fetchUsers();
  }, [loggedInUser, token]);

  /* ================= DELETE USER (ADMIN ONLY) ================= */
  const handleDelete = async (id: string) => {
    if (!isAdmin) return;

    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ================= UI ================= */
  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#3f1a7b]">Manage Users</h1>

        {isAdmin && (
          <Link
            href="/admin/users/add"
            className="flex items-center gap-2 bg-yellow-400 text-[#3f1a7b] px-4 py-2 rounded font-semibold hover:bg-[#3f1a7b] hover:text-white transition"
          >
            <Plus size={18} /> Add User
          </Link>
        )}
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-[#3f1a7b]">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm">Role: {user.role}</p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-medium ${
                    user.status.toLowerCase() === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </p>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/admin/users/edit/${user._id}`}
                  className="flex items-center gap-1 text-sm px-3 py-1 border rounded hover:bg-gray-100 transition"
                >
                  <Pencil size={14} /> Edit
                </Link>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 border border-red-400 text-red-600 rounded hover:bg-red-50 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
