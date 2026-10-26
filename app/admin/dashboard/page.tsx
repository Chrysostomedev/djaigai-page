"use client";

import { motion } from "framer-motion";
import { AdminShell } from "@/components/layout/AdminShell";
import { mockStats, mockOrders, mockUsers } from "@/lib/mock-data";

/* ═══════════════════════════════════════════════════════
   Dashboard — Vue d'ensemble admin
   ═══════════════════════════════════════════════════════ */

const statCards = [
  { label: "Utilisateurs total", value: mockStats.totalUsers, sub: `${mockStats.totalClients} clients`, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Pressings", value: mockStats.totalPressings, sub: "actifs sur la plateforme", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Blanchisseurs", value: mockStats.totalBlanchisseurs, sub: "blanchisseurs de quartier", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Fanico / Ménage", value: mockStats.totalFanico, sub: "prestataires à domicile", color: "bg-green-50 text-green-700 border-green-200" },
  { label: "Commandes du jour", value: mockStats.commandesAujourdhui, sub: `${mockStats.commandesEnCours} en cours`, color: "bg-teal-50 text-teal-700 border-teal-200" },
  { label: "En vérification", value: mockStats.enVerification, sub: "dossiers en attente", color: "bg-red-50 text-red-700 border-red-200" },
];

function formatFCFA(n: number) {
  return new Intl.NumberFormat("fr-CI").format(n) + " FCFA";
}

const statusLabels: Record<string, { label: string; style: string }> = {
  deposé: { label: "Déposé", style: "bg-blue-100 text-blue-700" },
  en_cours: { label: "En cours", style: "bg-amber-100 text-amber-700" },
  prêt: { label: "Prêt", style: "bg-green-100 text-green-700" },
  remis: { label: "Remis", style: "bg-purple-100 text-purple-700" },
  annulé: { label: "Annulé", style: "bg-red-100 text-red-700" },
};

export default function DashboardPage() {
  const recentOrders = mockOrders.slice(0, 5);
  const recentUsers = mockUsers.filter((u) => u.status === "en_verification").slice(0, 3);

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-navy-800 font-[family-name:var(--font-plus-jakarta)]">
            Tableau de bord
          </h1>
          <p className="text-sm text-navy-400 mt-1">
            Vue d&apos;ensemble de l&apos;activité Djaigai · Abidjan
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`rounded-xl border p-4 ${stat.color}`}
            >
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm font-medium mt-0.5">{stat.label}</p>
              <p className="text-xs opacity-60 mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue bar */}
        <div className="bg-navy-gradient rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-white/60">Revenus plateforme (total)</p>
              <p className="text-3xl font-extrabold font-[family-name:var(--font-plus-jakarta)] mt-1">
                {formatFCFA(mockStats.revenusTotal)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/60">Cette semaine</p>
              <p className="text-xl font-bold mt-1">{formatFCFA(mockStats.revenusSemaine)}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {mockStats.quartiersActifs.map((q) => (
              <span key={q} className="px-2.5 py-1 text-xs bg-white/10 rounded-full text-white/70">
                {q}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent orders */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="font-bold text-navy-800">Dernières commandes</h2>
              <a href="/admin/commandes" className="text-xs text-green-600 hover:text-green-700 font-medium">
                Tout voir →
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50">
                  <tr className="text-left text-xs font-medium text-navy-400 uppercase tracking-wider">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Client</th>
                    <th className="px-5 py-3">Prestataire</th>
                    <th className="px-5 py-3">Montant</th>
                    <th className="px-5 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {recentOrders.map((order) => {
                    const st = statusLabels[order.status] || statusLabels.deposé;
                    return (
                      <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-5 py-3 font-mono font-medium text-navy-700">{order.id}</td>
                        <td className="px-5 py-3 text-navy-600">{order.clientName}</td>
                        <td className="px-5 py-3 text-navy-600">{order.prestataireName}</td>
                        <td className="px-5 py-3 font-medium text-navy-700">{formatFCFA(order.montant)}</td>
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
          </div>

          {/* Pending verifications */}
          <div className="bg-white rounded-xl border border-neutral-200">
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="font-bold text-navy-800">En vérification</h2>
              <a href="/admin/verifications" className="text-xs text-green-600 hover:text-green-700 font-medium">
                Tout voir →
              </a>
            </div>
            <div className="p-4 space-y-3">
              {recentUsers.length === 0 ? (
                <p className="text-sm text-navy-400 text-center py-8">Aucun dossier en attente</p>
              ) : (
                recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                    <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-sm font-bold text-amber-700">
                      {u.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy-800 truncate">{u.name}</p>
                      <p className="text-xs text-navy-400">{u.type} · {u.quartier}</p>
                    </div>
                    <span className="text-xs text-amber-600 font-medium flex-shrink-0">En attente</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
