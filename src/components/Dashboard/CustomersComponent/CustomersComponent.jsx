"use client";

import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';

export default function CustomersComponent({ customers = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer =>
    (customer.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.phone || "").includes(searchTerm)
  );

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-accent-content font-serif">
            Customer <span className="text-[#d4af37]">Directory</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">আপনার রেজিস্ট্রিকৃত কাস্টমারদের তালিকা এবং তাদের কেনাকাটার ইতিহাস।</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by name, email or phone..."
          className="w-full bg-[#11151c] border border-accent-content/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-[#d4af37]/50 outline-none transition-all text-accent-content"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Customers Table */}
      <div className="bg-[#11151c] border border-accent-content/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0a0c12] text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-accent-content/5">
              <tr>
                <th className="px-8 py-6">Customer Info</th>
                <th className="px-8 py-6">Contact</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6 text-center">Orders</th>
                <th className="px-8 py-6">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent-content/5">
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-accent-content/2 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#d4af37]/20 to-transparent flex items-center justify-center text-primary-color font-bold border border-[#d4af37]/20">
                        {customer.name ? customer.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-accent-content">{customer.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono">ID: {customer._id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Mail size={12} className="text-[#d4af37]" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Phone size={12} className="text-[#d4af37]" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={14} /> {customer.location}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="bg-accent-content/5 px-3 py-1 rounded-lg text-xs font-bold text-accent-content">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-primary-color">
                    ৳{customer.spent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
              No customers found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
