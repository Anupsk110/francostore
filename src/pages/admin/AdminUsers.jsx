import React, { useState } from "react";
import { Users, Shield, Bell, Ban, CheckCircle2, Search } from "lucide-react";
import { useData } from "../../context/DataContext";
import { formatDate } from "../../utils/formatters";

export default function AdminUsers() {
  const { users, toggleUserStatus } = useData();
  const [search, setSearch] = useState("");

  const filtered = (users || []).filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return u.email.toLowerCase().includes(q) || u.displayName.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">
            User Management
          </h1>
          <p className="text-xs text-slate-400">
            Registered buyers, notification preferences, and account sanctions
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search users by name/email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#131320] border border-[#1b1b2a] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
          />
        </div>
      </div>

      <div className="bg-[#0e0e18] rounded-3xl border border-[#1b1b2a] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111120] text-slate-400 uppercase font-black border-b border-[#1b1b2a] text-[10px] tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Listing Alerts</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1b2a]">
              {filtered.map((user) => (
                <tr key={user.uid} className="hover:bg-[#131320]/60 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover border border-[#7c5cfc]/30"
                      />
                      <div>
                        <span className="font-extrabold text-white block">
                          {user.displayName}
                        </span>
                        <span className="text-[10px] text-slate-500">{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        user.role === "admin"
                          ? "bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40 font-black"
                          : "bg-[#131320] text-slate-300 border border-[#1b1b2a]"
                      }`}
                    >
                      {user.role === "admin" ? "Administrator" : "Buyer"}
                    </span>
                  </td>

                  <td className="p-4">
                    {user.emailNotifications ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Opted In</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">Opted Out</span>
                    )}
                  </td>

                  <td className="p-4 text-slate-400">
                    {formatDate(user.registeredAt)}
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        user.status === "suspended"
                          ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                          : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {user.status === "suspended" ? "Suspended" : "Active"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleUserStatus(user.uid)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        user.status === "suspended"
                          ? "bg-emerald-600 text-white hover:bg-emerald-500"
                          : "bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30"
                      }`}
                    >
                      {user.status === "suspended" ? "Reactivate" : "Suspend"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
