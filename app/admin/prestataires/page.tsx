"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminShell } from "@/components/layout/AdminShell";
import { mockUsers } from "@/lib/mock-data";

/* ═══════════════════════════════════════════════════════
   Prestataires — Vue dédiée pressings / blanchisseurs / fanico
   ═══════════════════════════════════════════════════════ */

const typeLabels: Record<string, string> = {
  pressing: "Pressing",
  blanchisseur: "Blanchisseur",
  fanico: "Fanico / Ménage",
};

const typeColors: Record<string, string> = {
  pressing: "bg-purple-50 text-purple-700 border-purple-200",
  blanchisseur: "bg-amber-50 text-amber-700 border-amber-200",
  fanico: "bg-green-50 text-green-700 border-green-200",
};

const statusLabels: Record<string, string> = {
  actif: "Actif",
  en_verification: "En vérification",
  suspendu: "Suspendu",
};

const statusStyles: Record<string, string> = {
  actif: "bg-green-100 text-green-700",
  en_verification: "bg-amber-100 text-amber-700",
  suspendu: "bg-red-100 text-red-700",
};

function formatFCFA(n: number) {
  return new Intl.NumberFormat("fr-CI").format(n) + " FCFA";
}

export default function PrestatairesPage() {
  const [filterType, setFilterType] = useState<string>("all");
  const prestataires = mockUsers.filter((u) => u.type !== "client");
  const filtered = filterType === "all" ? prestataires : prestataires.filter((u) => u.type === filterType);

  // Stats
  const totalActif = prestataires.filter((u) => u.status === "actif").length;
  const totalVerif = prestataires.filter((u) => u.status === "en_verification").length;
  const totalRevenus = prestataires.reduce((sum, u) => sum + (u.revenus || 0), 0);

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-navy-800 font-[family-name:var(--font-plus-jakarta)]">
            Prestataires
          </h1>
          <p className="text-sm text-navy-400 mt-1">
            Pressings, blanchisseurs, Fanico et aides ménagères
          </p>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-2xl font-bold text-navy-800">{prestataires.length}</p>
            <p className="text-xs text-navy-400 mt-0.5">Total prestataires</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-2xl font-bold text-green-600">{totalActif}</p>
            <p className="text-xs text-navy-400 mt-0.5">Actifs</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-2xl font-bold text-amber-600">{totalVerif}</p>
            <p className="text-xs text-navy-400 mt-0.5">En vérification</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-2xl font-bold text-navy-800">{formatFCFA(totalRevenus)}</p>
            <p className="text-xs text-navy-400 mt-0.5">Revenus cumulés</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {[
            { key: "all", label: "Tous" },
            { key: "pressing", label: "Pressings" },
            { key: "blanchisseur", label: "Blanchisseurs" },
            { key: "fanico", label: "Fanico" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                filterType === tab.key
                  ? "bg-navy-800 text-white"
                  : "bg-white text-navy-500 border border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`rounded-xl border p-5 ${typeColors[user.type]}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-sm font-bold text-navy-700">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800">{user.name}</h3>
                    <p className="text-xs text-navy-500">{typeLabels[user.type]}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusStyles[user.status]}`}>
                  {statusLabels[user.status]}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-navy-600">
                <p>📍 {user.quartier}</p>
                <p>📞 {user.phone}</p>
                <p>📋 {user.commandesTotal} commandes</p>
                {user.revenus !== undefined && <p>💰 {formatFCFA(user.revenus)}</p>}
                {user.note !== undefined && <p>⭐ {user.note} / 5</p>}
              </div>

              <p className="mt-3 text-[10px] text-navy-400">
                Inscrit le {new Date(user.dateInscription).toLocaleDateString("fr-CI")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
