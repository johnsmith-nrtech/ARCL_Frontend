"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddFinancialReportPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* Handle PDF file selection */
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPdfFile(file);
    setPdfPreview(URL.createObjectURL(file));
  };
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  /* Submit form */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pdfFile) {
      alert("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("pdf", pdfFile);

      const res = await fetch(`${API_URL}/api/financial`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload report");

      setSuccess(true);
      setTitle("");
      setPdfFile(null);
      setPdfPreview(null);

      // Redirect after short delay
      setTimeout(() => router.push("/admin/about"), 1500);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Upload Financial Audit Report</h1>

      {/* Success message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          ✅ Financial report uploaded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Report Title"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* PDF Upload */}
        <div className="space-y-2">
          <label className="font-medium">Select PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="w-full border p-2 rounded"
            required
          />
          {pdfPreview && (
            <p className="text-gray-700 mt-2">
              Selected File: {pdfFile?.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>
    </div>
  );
}
