"use client";

import { useEffect, useState } from "react";

interface Donation {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: string;
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [selected, setSelected] = useState<Donation | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    fetch(`${API_URL}/api/donations`)
      .then((res) => res.json())
      .then((data) => setDonations(data.donations || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-[#3f1a7b] mb-6">Donation Requests</h1>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-[600px] sm:min-w-full border">
          <thead className="bg-[#3f1a7b] text-white">
            <tr>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Name</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Email</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Phone</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Date</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {donations.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No donation requests found
                </td>
              </tr>
            )}

            {donations.map((donation) => (
              <tr key={donation._id} className="border-b hover:bg-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3">
                  {donation.firstName} {donation.lastName}
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3">{donation.email}</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3">{donation.phone}</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3">
                  {new Date(donation.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-center">
                  <button
                    onClick={() => setSelected(donation)}
                    className="px-3 sm:px-4 py-1 sm:py-2 text-sm bg-[#3f1a7b] text-white rounded hover:opacity-90"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90 p-4 sm:p-0">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#3f1a7b] text-white px-4 sm:px-6 py-3 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Donation Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-3 text-gray-700">
              <p>
                <strong>Name:</strong> {selected.firstName} {selected.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selected.email}
              </p>
              <p>
                <strong>Phone:</strong> {selected.phone}
              </p>
              <p>
                <strong>Message:</strong> {selected.message || "—"}
              </p>
              <p>
                <strong>Submitted On:</strong>{" "}
                {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3 bg-gray-100 text-right">
              <button
                onClick={() => setSelected(null)}
                className="px-4 sm:px-6 py-2 bg-[#3f1a7b] text-white rounded hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
