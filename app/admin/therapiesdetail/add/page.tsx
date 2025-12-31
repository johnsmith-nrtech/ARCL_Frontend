"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Section {
  id: number;
  header: string;
  description: string;
  hasList: boolean;
  listItems: string[];
}

interface Therapy {
  mainTitle: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: "Admin" | "Therapist" | "Parent";
  url: string;
}

export default function AddTherapy() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Therapy>({
    mainTitle: "",
    sections: [{ id: Date.now(), header: "", description: "", hasList: false, listItems: [""] }],
    status: "Active",
    role: "Admin",
    url: "",
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const handleSectionChange = (index: number, field: keyof Section, value: any) => {
    const sections = [...form.sections];
    sections[index] = { ...sections[index], [field]: value };
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
      sections: [...form.sections, { id: Date.now(), header: "", description: "", hasList: false, listItems: [""] }],
    });
  };

  const addListItem = (sectionIndex: number) => {
    const sections = [...form.sections];
    sections[sectionIndex].listItems.push("");
    setForm({ ...form, sections });
  };

  const removeSection = (index: number) => {
    const sections = [...form.sections];
    sections.splice(index, 1);
    setForm({ ...form, sections });
  };

  const removeListItem = (sectionIndex: number, itemIndex: number) => {
    const sections = [...form.sections];
    sections[sectionIndex].listItems.splice(itemIndex, 1);
    setForm({ ...form, sections });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/therapies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add therapy");
      alert("Therapy added successfully");
      router.push("/admin/therapiesdetail");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Therapy</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
        {/* Main Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Main Title</label>
          <input
            type="text"
            value={form.mainTitle}
            onChange={(e) => setForm({ ...form, mainTitle: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* URL */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">URL Link</label>
          <input
            type="text"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as any })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Therapist">Therapist</option>
            <option value="Parent">Parent</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-6 flex gap-3 items-center">
          <span className="font-medium">Status:</span>
          <button
            type="button"
            className={`px-3 py-1 rounded ${form.status === "Active" ? "bg-green-600 text-white" : "bg-gray-300"}`}
            onClick={() => setForm({ ...form, status: "Active" })}
          >
            Active
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded ${form.status === "Inactive" ? "bg-red-600 text-white" : "bg-gray-300"}`}
            onClick={() => setForm({ ...form, status: "Inactive" })}
          >
            Inactive
          </button>
        </div>

        {/* Sections */}
        {form.sections.map((section, idx) => (
          <div key={section.id} className="border p-4 rounded mb-4 relative bg-gray-50">
            <button
              type="button"
              className="absolute top-2 right-2 text-red-600 font-bold"
              onClick={() => removeSection(idx)}
            >
              X
            </button>

            <div className="mb-2">
              <label className="block mb-1 font-medium">Section Header</label>
              <input
                type="text"
                value={section.header}
                onChange={(e) => handleSectionChange(idx, "header", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={section.description}
                onChange={(e) => handleSectionChange(idx, "description", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                rows={3}
              ></textarea>
            </div>

            <div className="mb-2 flex items-center gap-2">
              <label>Add List?</label>
              <input
                type="checkbox"
                checked={section.hasList}
                onChange={(e) => handleSectionChange(idx, "hasList", e.target.checked)}
              />
            </div>

            {section.hasList &&
              section.listItems.map((item, itemIdx) => (
                <div key={itemIdx} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleListItemChange(idx, itemIdx, e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <button type="button" onClick={() => removeListItem(idx, itemIdx)} className="bg-red-600 text-white px-2 py-1 rounded">
                    X
                  </button>
                </div>
              ))}

            {section.hasList && (
              <button type="button" onClick={() => addListItem(idx)} className="bg-green-600 text-white px-3 py-1 rounded">
                + Add List Item
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addSection} className="bg-blue-600 text-white px-3 py-1 rounded mb-4">
          + Add Section
        </button>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-800 text-white px-6 py-2 rounded-full">
            Add Therapy
          </button>
          <Link href="/admin/therapiesdetail" className="bg-gray-400 text-white px-6 py-2 rounded-full">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
