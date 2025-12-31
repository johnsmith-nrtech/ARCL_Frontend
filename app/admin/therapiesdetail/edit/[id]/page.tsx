"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

// Updated list item type with unique ID
interface ListItem {
  id: string;
  text: string;
}

interface Section {
  id: string;
  header: string;
  description: string;
  hasList: boolean;
  listItems: ListItem[];
}

interface Therapy {
  _id?: string;
  mainTitle: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: "Admin" | "Therapist" | "Parent";
  url: string;
}

// Helper to generate unique section
const generateSection = (): Section => ({
  id: crypto.randomUUID(),
  header: "",
  description: "",
  hasList: false,
  listItems: [{ id: crypto.randomUUID(), text: "" }],
});

// Helper to generate unique list item
const generateListItem = (): ListItem => ({ id: crypto.randomUUID(), text: "" });

export default function EditTherapy() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Therapy>({
    mainTitle: "",
    sections: [generateSection()],
    status: "Active",
    role: "Admin",
    url: "",
  });

  // Fetch therapy data
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`${API_URL}/api/therapies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          mainTitle: data.mainTitle || "",
          sections:
            data.sections && data.sections.length > 0
              ? data.sections.map((s: any) => ({
                  ...s,
                  id: s.id || crypto.randomUUID(),
                  listItems:
                    s.listItems && s.listItems.length > 0
                      ? s.listItems.map((li: any) => ({ id: li.id || crypto.randomUUID(), text: li.text || li }))
                      : [generateListItem()],
                }))
              : [generateSection()],
          status: data.status || "Active",
          role: data.role || "Admin",
          url: data.url || "",
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // Section handlers
  const handleSectionChange = (sectionId: string, field: keyof Section, value: any) => {
    setForm({
      ...form,
      sections: form.sections.map((s) => (s.id === sectionId ? { ...s, [field]: value } : s)),
    });
  };

  const handleListItemChange = (sectionId: string, itemId: string, value: string) => {
    setForm({
      ...form,
      sections: form.sections.map((s) =>
        s.id === sectionId
          ? { ...s, listItems: s.listItems.map((li) => (li.id === itemId ? { ...li, text: value } : li)) }
          : s
      ),
    });
  };

  const addSection = () => {
    setForm({ ...form, sections: [...form.sections, generateSection()] });
  };

  const removeSection = (sectionId: string) => {
    setForm({ ...form, sections: form.sections.filter((s) => s.id !== sectionId) });
  };

  const addListItem = (sectionId: string) => {
    setForm({
      ...form,
      sections: form.sections.map((s) =>
        s.id === sectionId ? { ...s, listItems: [...s.listItems, generateListItem()] } : s
      ),
    });
  };

  const removeListItem = (sectionId: string, itemId: string) => {
    setForm({
      ...form,
      sections: form.sections.map((s) =>
        s.id === sectionId ? { ...s, listItems: s.listItems.filter((li) => li.id !== itemId) } : s
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/therapies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update therapy");
      alert("Therapy updated successfully");
      router.push("/admin/therapiesdetail");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading therapy data...</p>;

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Therapy</h1>
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
        {form.sections.map((section) => (
          <div key={section.id} className="border p-4 rounded mb-4 relative bg-gray-50">
            <button
              type="button"
              className="absolute top-2 right-2 text-red-600 font-bold"
              onClick={() => removeSection(section.id)}
            >
              X
            </button>

            <div className="mb-2">
              <label className="block mb-1 font-medium">Section Header</label>
              <input
                type="text"
                value={section.header}
                onChange={(e) => handleSectionChange(section.id, "header", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={section.description}
                onChange={(e) => handleSectionChange(section.id, "description", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                rows={3}
              />
            </div>

            <div className="mb-2 flex items-center gap-2">
              <label>Add List?</label>
              <input
                type="checkbox"
                checked={section.hasList}
                onChange={(e) => handleSectionChange(section.id, "hasList", e.target.checked)}
              />
            </div>

            {section.hasList &&
              section.listItems.map((item) => (
                <div key={item.id} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleListItemChange(section.id, item.id, e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem(section.id, item.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}

            {section.hasList && (
              <button
                type="button"
                onClick={() => addListItem(section.id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
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
            Update Therapy
          </button>
          <Link href="/admin/therapiesdetail" className="bg-gray-400 text-white px-6 py-2 rounded-full">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
