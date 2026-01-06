"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus, FaFilePdf } from "react-icons/fa";

interface Member {
  _id: string;
  name: string;
  position: string;
  image: string;
}

interface Certification {
  _id: string;
  title: string;
  image: string;
  pdf: string;
}

interface FinancialPDF {
  _id: string;
  title: string;
  pdf: string;
}

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function AdminPage() {
  const [governingBody, setGoverningBody] = useState<Member[]>([]);
  const [executiveTeam, setExecutiveTeam] = useState<Member[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [financialPDFs, setFinancialPDFs] = useState<FinancialPDF[]>([]);

  useEffect(() => {
    fetch(`${API}/api/governing`).then(r => r.json()).then(setGoverningBody);
    fetch(`${API}/api/executive`).then(r => r.json()).then(setExecutiveTeam);
    fetch(`${API}/api/certifications`).then(r => r.json()).then(setCertifications);
    fetch(`${API}/api/financial`).then(r => r.json()).then(setFinancialPDFs);
  }, []);

  const deleteItem = async (url: string, refresh: () => void) => {
    if (!confirm("Are you sure?")) return;
    await fetch(url, { method: "DELETE" });
    refresh();
  };

  const TableWrapper = ({ title, addLink, children }: any) => (
    <section className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link
          href={addLink}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <FaPlus /> Add
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse min-w-[500px] sm:min-w-full">{children}</table>
      </div>
    </section>
  );

  return (
    <div className="p-4 sm:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10">Manage About Us</h1>

      {/* Governing Body */}
      <TableWrapper title="Governing Body" addLink="/admin/about/governing/add">
        <thead className="bg-[#260e58] text-white">
          <tr>
            <th className="p-2 sm:p-4">Photo</th>
            <th className="p-2 sm:p-4 text-left">Name</th>
            <th className="p-2 sm:p-4 text-left">Position</th>
            <th className="p-2 sm:p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {governingBody.map(m => (
            <tr key={m._id} className="border-t">
              <td className="p-2 sm:p-4">
                <Image src={`${API}${m.image}`} alt={m.name} width={50} height={50} unoptimized className="rounded-full" />
              </td>
              <td className="p-2 sm:p-4">{m.name}</td>
              <td className="p-2 sm:p-4">{m.position}</td>
              <td className="p-2 sm:p-4">
                <div className="flex flex-col sm:flex-row justify-center sm:gap-2 gap-1">
                  <Link href={`/admin/about/governing/edit/${m._id}`} className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition">
                    <FaEdit size={14} /> Edit
                  </Link>
                  <button onClick={() => deleteItem(`${API}/api/governing/${m._id}`, () => fetch(`${API}/api/governing`).then(r => r.json()).then(setGoverningBody))} className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border border-red-400 text-red-600 rounded-md hover:bg-red-50 hover:border-red-500 transition">
                    <FaTrash size={14} /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>

      {/* Executive Team */}
      <TableWrapper title="Executive Team" addLink="/admin/about/executive/add">
        <thead className="bg-[#260e58] text-white">
          <tr>
            <th className="p-2 sm:p-4">Photo</th>
            <th className="p-2 sm:p-4 text-left">Name</th>
            <th className="p-2 sm:p-4 text-left">Position</th>
            <th className="p-2 sm:p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {executiveTeam.map(m => (
            <tr key={m._id} className="border-t">
              <td className="p-2 sm:p-4">
                <Image src={`${API}${m.image}`} alt={m.name} width={50} height={50} unoptimized className="rounded-full" />
              </td>
              <td className="p-2 sm:p-4">{m.name}</td>
              <td className="p-2 sm:p-4">{m.position}</td>
              <td className="p-2 sm:p-4">
                <div className="flex flex-col sm:flex-row justify-center sm:gap-2 gap-1">
                  <Link href={`/admin/about/executive/edit/${m._id}`} className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition">
                    <FaEdit size={14} /> Edit
                  </Link>
                  <button onClick={() => deleteItem(`${API}/api/executive/${m._id}`, () => fetch(`${API}/api/executive`).then(r => r.json()).then(setExecutiveTeam))} className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border border-red-400 text-red-600 rounded-md hover:bg-red-50 hover:border-red-500 transition">
                    <FaTrash size={14} /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>

      {/* Certifications */}
      <TableWrapper title="Certifications" addLink="/admin/about/certifications/add">
        <thead className="bg-[#260e58] text-white">
          <tr>
            <th className="p-2 sm:p-4">Image</th>
            <th className="p-2 sm:p-4 text-left">Title</th>
            <th className="p-2 sm:p-4 text-center">PDF</th>
            <th className="p-2 sm:p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map(c => (
            <tr key={c._id} className="border-t">
              <td className="p-2 sm:p-4">
                <Image src={`${API}${c.image}`} alt={c.title} width={50} height={50} unoptimized />
              </td>
              <td className="p-2 sm:p-4">{c.title}</td>
              <td className="p-2 sm:p-4 text-center">
                <a href={`${API}${c.pdf}`} target="_blank" className="text-red-600"><FaFilePdf /></a>
              </td>
              <td className="p-2 sm:p-4">
                <div className="flex flex-col sm:flex-row justify-center sm:gap-2 gap-1">
                  <Link href={`/admin/about/certifications/edit/${c._id}`} className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition">
                    <FaEdit size={14} /> Edit
                  </Link>
                  <button onClick={() => deleteItem(`${API}/api/certifications/${c._id}`, () => fetch(`${API}/api/certifications`).then(r => r.json()).then(setCertifications))} className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border border-red-400 text-red-600 rounded-md hover:bg-red-50 hover:border-red-500 transition">
                    <FaTrash size={14} /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>

      {/* Financial Reports */}
      <TableWrapper title="Financial Audit Reports" addLink="/admin/about/financial/add">
        <thead className="bg-[#260e58] text-white">
          <tr>
            <th className="p-2 sm:p-4 text-left">Title</th>
            <th className="p-2 sm:p-4 text-center">PDF</th>
            <th className="p-2 sm:p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {financialPDFs.map(f => (
            <tr key={f._id} className="border-t">
              <td className="p-2 sm:p-4">{f.title}</td>
              <td className="p-2 sm:p-4 text-center">
                <a href={`${API}${f.pdf}`} target="_blank" className="text-red-600"><FaFilePdf /></a>
              </td>
              <td className="p-2 sm:p-4">
                <div className="flex flex-col sm:flex-row justify-center sm:gap-2 gap-1">
                  <Link href={`/admin/about/financial/edit/${f._id}`} className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition">
                    <FaEdit size={14} /> Edit
                  </Link>
                  <button onClick={() => deleteItem(`${API}/api/financial/${f._id}`, () => fetch(`${API}/api/financial`).then(r => r.json()).then(setFinancialPDFs))} className="flex items-center gap-1 text-sm px-2 sm:px-3 py-1 border border-red-400 text-red-600 rounded-md hover:bg-red-50 hover:border-red-500 transition">
                    <FaTrash size={14} /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
}
