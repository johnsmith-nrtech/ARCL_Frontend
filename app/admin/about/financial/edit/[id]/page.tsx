"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditFinancialReportPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    pdfUrl: "",
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const [newPdf, setNewPdf] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  useEffect(() => {
    // 🔴 Replace with API fetch by ID
    setForm({
      title: "Financial Report 2024",
      pdfUrl: "/reports/financial-report-2024.pdf",
    });
  }, [id]);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewPdf(file);
    setPdfPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Updated Financial Report:", id, form, newPdf);

    // 🔴 Logic:
    // If newPdf → upload and replace
    // Else → keep old pdfUrl (form.pdfUrl)

    router.push("/admin");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Financial Audit Report</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Report Title */}
        <input
          type="text"
          className="w-full border p-3 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        {/* Current PDF */}
        <div>
          <p className="font-medium mb-2">Current PDF</p>
          <a
            href={form.pdfUrl}
            target="_blank"
            className="text-purple-600 underline"
          >
            {form.pdfUrl.split("/").pop()}
          </a>
        </div>

        {/* Replace PDF */}
        <div className="space-y-2">
          <label className="font-medium">Replace PDF (Optional)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="w-full border p-2 rounded"
          />
          {pdfPreview && (
            <p className="text-gray-700 mt-2">
              Selected File: {newPdf?.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Update Report
        </button>
      </form>
    </div>
  );
}
