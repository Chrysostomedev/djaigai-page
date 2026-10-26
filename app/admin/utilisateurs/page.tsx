"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminShell } from "@/components/layout/AdminShell";
import { mockUsers } from "@/lib/mock-data";

/* ═══════════════════════════════════════════════════════
   Utilisateurs — Liste complète avec filtres
   ═══════════════════════════════════════════════════════ */

const typeLabels: Record<string, string> = {
  client: "Client",
  pressing: "Pressing",
  blanchisseur: "Blanchisseur",
  fanico: "Fanico",
};

const typeColors: Record<string, string> = {
  client: "bg-blue-100 text-blue-700",
  pressing: "bg-purple-100 text-purple-700",
  blanchisseur: "bg-amber-100 text-amber-700",
  fanico: "bg-green-100 text-green-700",
};

const statusColors: Record<string, string> = {
  actif: "bg-green-100 text-green-700",
  en_verification: "bg-amber-100 text-amber-700",
  suspendu: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  actif: "Actif",
  en_verification: "En vérification",
  suspendu: "Suspendu",
};

export default function UtilisateursPage() {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter((u) => {
    if (filterType !== "all" && u.type !== filterType) return false;
    if (filterStatus !== "all" && u.status !== filterStatus) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-800 font-[family-name:var(--font-plus-jakarta)]">
              Utilisateurs
            </h1>
            <p className="text-sm text-navy-400 mt-1">
              {mockUsers.length} utilisateurs enregistrés
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un nom ou ID…"
            className="px-4 py-2 rounded-lg border border-neutral-200 text-sm text-navy-800 placeholder:text-navy-300 focus:border-green-400 focus:ring-1 focus:ring-green-100 outline-none w-64"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-navy-600 cursor-pointer"
          >
            <option value="all">Tous les types</option>
            <option value="client">Clients</option>
            <option value="pressing">Pressings</option>
            <option value="blanchisseur">Blanchisseurs</option>
            <option value="fanico">Fanico</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-navy-600 cursor-pointer"
          >
            <option value="all">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="en_verification">En vérification</option>
            <option value="suspendu">Suspendu</option>
          </select>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50">
                <tr className="text-left text-xs font-medium text-navy-400 uppercase tracking-wider">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Nom</th>
                  <th className="px-5 py-3">Téléphone</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Quartier</th>
                  <th className="px-5 py-3">Statut</th>
                  <th className="px-5 py-3">Commandes</th>
                  <th className="px-5 py-3">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-navy-500">{user.id}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-xs font-bold text-navy-600">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-navy-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-navy-500 font-mono text-xs">{user.phone}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[user.type]}`}>
                        {typeLabels[user.type]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-navy-600">{user.quartier}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                        {statusLabels[user.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-navy-600">{user.commandesTotal}</td>
                    <td className="px-5 py-3 text-navy-600">
                      {user.note ? `${user.note} ★` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-navy-400">Aucun utilisateur trouvé</p>
            </div>
          )}
        </motion.div>
      </div>
    </AdminShell>
  );
}
