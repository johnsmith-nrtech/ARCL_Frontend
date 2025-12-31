"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ================= TYPES ================= */
interface Section {
  id: number;
  header: string;
  description: string;
  hasList: boolean;
  listItems: string[];
}

interface Service {
  mainTitle: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: "Admin" | "Services" | "Parent";
  url: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AddServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Service>({
    mainTitle: "",
    sections: [{ id: Date.now(), header: "", description: "", hasList: false, listItems: [""] }],
    status: "Active",
    role: "Admin",
    url: "",
  });

  /* ================= HANDLERS ================= */
  const handleSectionChange = (i: number, field: keyof Section, value: any) => {
    const sections = [...form.sections];
    sections[i] = { ...sections[i], [field]: value };
    setForm({ ...form, sections });
  };

  const handleListItemChange = (sectionIndex: number, itemIndex: number, value: string) => {
    const sections = [...form.sections];
    sections[sectionIndex].listItems[itemIndex] = value;
    setForm({ ...form, sections });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        { id: Date.now(), header: "", description: "", hasList: false, listItems: [""] },
      ],
    });
  };

  const removeSection = (index: number) => {
    if (form.sections.length > 1) {
      const sections = [...form.sections];
      sections.splice(index, 1);
      setForm({ ...form, sections });
    } else {
      alert("At least one section is required");
    }
  };

  const addListItem = (sectionIndex: number) => {
    const sections = [...form.sections];
    sections[sectionIndex].listItems.push("");
    setForm({ ...form, sections });
  };

  const removeListItem = (sectionIndex: number, itemIndex: number) => {
    const sections = [...form.sections];
    const updatedList = [...sections[sectionIndex].listItems];
    if (updatedList.length > 1) {
      updatedList.splice(itemIndex, 1);
      sections[sectionIndex].listItems = updatedList;
      setForm({ ...form, sections });
    } else {
      alert("At least one list item is required");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.mainTitle.trim()) return alert("Main title is required");
    for (const section of form.sections) {
      if (!section.header.trim()) return alert("All section headers are required");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add service");

      alert("Service added successfully");
      router.push("/admin/services");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Add New Service</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        {/* Main Title */}
        <input
          type="text"
          placeholder="Main Title"
          className="w-full border p-3 rounded mb-4"
          value={form.mainTitle}
          onChange={(e) => setForm({ ...form, mainTitle: e.target.value })}
        />

        {/* URL */}
        <input
          type="text"
          placeholder="URL Slug"
          className="w-full border p-3 rounded mb-4"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />

        {/* Role Selector */}
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value as any })}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="Admin">Admin</option>
          <option value="Services">Services</option>
          <option value="Parent">Parent</option>
        </select>

        {/* Status */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            className={`px-6 py-2 rounded ${
              form.status === "Active" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setForm({ ...form, status: "Active" })}
          >
            Active
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded ${
              form.status === "Inactive" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setForm({ ...form, status: "Inactive" })}
          >
            Inactive
          </button>
        </div>

        {/* Sections */}
        {form.sections.map((section, i) => (
          <div key={section.id} className="border p-4 rounded mb-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Section {i + 1}</h3>
              <button
                type="button"
                className="text-red-600"
                onClick={() => removeSection(i)}
              >
                X
              </button>
            </div>

            <input
              type="text"
              placeholder="Section Header"
              value={section.header}
              onChange={(e) => handleSectionChange(i, "header", e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />

            <textarea
              placeholder="Description"
              value={section.description}
              onChange={(e) => handleSectionChange(i, "description", e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />

            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={section.hasList}
                onChange={(e) => handleSectionChange(i, "hasList", e.target.checked)}
              />
              Include List Items?
            </label>

            {section.hasList &&
              section.listItems.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleListItemChange(i, idx, e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() => removeListItem(i, idx)}
                  >
                    X
                  </button>
                </div>
              ))}

            {section.hasList && (
              <button
                type="button"
                onClick={() => addListItem(i)}
                className="text-green-600 text-sm"
              >
                + Add List Item
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="text-purple-700 mb-6"
        >
          + Add Section
        </button>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#3f1a7b] text-white px-6 py-2 rounded"
          >
            {loading ? "Saving..." : "Add Service"}
          </button>

          <Link href="/admin/services" className="px-6 py-2 bg-gray-300 rounded">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
