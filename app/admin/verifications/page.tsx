"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminShell } from "@/components/layout/AdminShell";
import { mockUsers } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════
   Vérifications — Dossiers en attente de validation
   ═══════════════════════════════════════════════════════ */

const typeLabels: Record<string, string> = {
  pressing: "Pressing",
  blanchisseur: "Blanchisseur",
  fanico: "Fanico / Ménage",
};

export default function VerificationsPage() {
  const pending = mockUsers.filter((u) => u.status === "en_verification");
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});

  const handleDecision = (id: string, decision: "approved" | "rejected") => {
    setDecisions((prev) => ({ ...prev, [id]: decision }));
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-navy-800 font-[family-name:var(--font-plus-jakarta)]">
            Vérifications
          </h1>
          <p className="text-sm text-navy-400 mt-1">
            {pending.length} dossier{pending.length > 1 ? "s" : ""} en attente de validation
          </p>
        </div>

        {/* Dossiers */}
        <div className="space-y-4 max-w-3xl">
          {pending.map((user, i) => {
            const decision = decisions[user.id];

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={`bg-white rounded-xl border p-6 transition-all duration-300 ${
                  decision === "approved"
                    ? "border-green-300 bg-green-50/30"
                    : decision === "rejected"
                    ? "border-red-200 bg-red-50/30 opacity-60"
                    : "border-neutral-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Avatar + info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-lg font-bold text-amber-700 flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-800">{user.name}</h3>
                      <p className="text-sm text-navy-500">
                        {typeLabels[user.type]} · {user.quartier}
                      </p>
                      <p className="text-xs text-navy-400 mt-1">
                        📞 {user.phone} · Inscrit le {new Date(user.dateInscription).toLocaleDateString("fr-CI")}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    {decision ? (
                      <span
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          decision === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {decision === "approved" ? "✓ Approuvé" : "✗ Refusé"}
                      </span>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleDecision(user.id, "approved")}
                        >
                          Approuver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="!border-red-200 !text-red-500 hover:!bg-red-50"
                          onClick={() => handleDecision(user.id, "rejected")}
                        >
                          Refuser
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Checklist */}
                {!decision && (
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">
                      Pièces à vérifier
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Pièce d'identité", "Photo du local", "Registre de commerce", "Certificat de résidence"].map((doc) => (
                        <label key={doc} className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-lg text-xs text-navy-600 cursor-pointer hover:bg-neutral-100 transition-colors">
                          <input type="checkbox" className="rounded border-neutral-300 text-green-500 focus:ring-green-200" />
                          {doc}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {pending.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-neutral-200">
              <p className="text-navy-400">Aucun dossier en attente de vérification</p>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
