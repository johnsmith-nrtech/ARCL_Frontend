"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams(); // MongoDB _id

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("Active");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  const isAdmin = loggedInUser?.role.toLowerCase() === "admin";

  /* ================= FETCH CURRENT USER ================= */
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) return setError("Not authenticated");

      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setLoggedInUser(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchMe();
  }, [token]);

  /* ================= FETCH USER TO EDIT ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load user");

        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setStatus(data.status);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUser();
  }, [id, token]);

  /* ================= UPDATE USER ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload: any = { name };

      if (password.trim()) {
        payload.password = password;
      }

      // Only admins can update role/status
      if (isAdmin) {
        payload.role = role;
        payload.status = status;
      }

      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update user");

      router.push("/admin/users");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI STATES ================= */
  if (loading) return <p className="text-center py-20">Loading user...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#3f1a7b] mb-6">Edit User</h1>

      <form
        className="bg-white p-6 rounded-xl shadow space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-3 rounded w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="border p-3 rounded w-full bg-gray-100 cursor-not-allowed"
            placeholder="Email"
            value={email}
            disabled
          />

          {isAdmin && (
            <select
              className="border p-3 rounded w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          )}

          {isAdmin && (
            <select
              className="border p-3 rounded w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          )}
        </div>

        {/* Password (optional) */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password (optional)"
            className="border p-3 rounded w-full pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-4 flex items-center gap-2 bg-yellow-400 text-[#3f1a7b] px-6 py-2 rounded font-semibold
          hover:bg-[#3f1a7b] hover:text-white transition disabled:opacity-60"
        >
          {saving ? "Updating..." : "✎ Update User"}
        </button>
      </form>
    </div>
  );
}
