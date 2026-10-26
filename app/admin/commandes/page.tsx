"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminShell } from "@/components/layout/AdminShell";
import { mockOrders } from "@/lib/mock-data";

/* ═══════════════════════════════════════════════════════
   Commandes — Liste avec filtres par statut
   ═══════════════════════════════════════════════════════ */

const statusLabels: Record<string, { label: string; style: string }> = {
  deposé: { label: "Déposé", style: "bg-blue-100 text-blue-700" },
  en_cours: { label: "En cours", style: "bg-amber-100 text-amber-700" },
  prêt: { label: "Prêt", style: "bg-green-100 text-green-700" },
  remis: { label: "Remis", style: "bg-purple-100 text-purple-700" },
  annulé: { label: "Annulé", style: "bg-red-100 text-red-700" },
};

const typeLabels: Record<string, string> = {
  lavage: "Lavage",
  repassage: "Repassage",
  menage: "Ménage",
  chaussures: "Chaussures",
};

function formatFCFA(n: number) {
  return new Intl.NumberFormat("fr-CI").format(n) + " FCFA";
}

export default function CommandesPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const filtered = filterStatus === "all" ? mockOrders : mockOrders.filter((o) => o.status === filterStatus);

  const totalMontant = filtered.reduce((sum, o) => sum + o.montant, 0);

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-800 font-[family-name:var(--font-plus-jakarta)]">
              Commandes
            </h1>
            <p className="text-sm text-navy-400 mt-1">
              {filtered.length} commande{filtered.length > 1 ? "s" : ""} · {formatFCFA(totalMontant)} total
            </p>
          </div>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              filterStatus === "all" ? "bg-navy-800 text-white" : "bg-white text-navy-500 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            Toutes ({mockOrders.length})
          </button>
          {Object.entries(statusLabels).map(([key, { label }]) => {
            const count = mockOrders.filter((o) => o.status === key).length;
            return (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  filterStatus === key ? "bg-navy-800 text-white" : "bg-white text-navy-500 border border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
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
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Prestataire</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Articles</th>
                  <th className="px-5 py-3">Montant</th>
                  <th className="px-5 py-3">Quartier</th>
                  <th className="px-5 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((order) => {
                  const st = statusLabels[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="px-5 py-3 font-mono font-semibold text-navy-700">{order.id}</td>
                      <td className="px-5 py-3 text-navy-500 text-xs">
                        {new Date(order.date).toLocaleDateString("fr-CI")}
                      </td>
                      <td className="px-5 py-3 text-navy-600">{order.clientName}</td>
                      <td className="px-5 py-3 text-navy-600">{order.prestataireName}</td>
                      <td className="px-5 py-3 text-navy-600">{typeLabels[order.type]}</td>
                      <td className="px-5 py-3 text-navy-600 text-center">
                        {order.articles > 0 ? order.articles : "—"}
                      </td>
                      <td className="px-5 py-3 font-medium text-navy-700">{formatFCFA(order.montant)}</td>
                      <td className="px-5 py-3 text-navy-500">{order.quartier}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${st.style}`}>
                          {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminShell>
  );
}
