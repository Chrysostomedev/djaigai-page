"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/sections/SectionHeader";

/* ═══════════════════════════════════════════════════════
   SolutionSection — Tableau problème → réponse
   Sans icônes, format éditorial propre
   ═══════════════════════════════════════════════════════ */

const solutions = [
  {
    problem: "Vêtements disparus ou échangés",
    solution: "Ticket numéroté, photos et comptage au dépôt, code PIN à la remise",
  },
  {
    problem: "« Le tonton n'est pas là », retards",
    solution: "Statuts en direct, alerte WhatsApp ou SMS, heure de fin annoncée",
  },
  {
    problem: "Déplacements pour rien",
    solution: "Notification « prêt à récupérer », collecte et livraison à domicile",
  },
  {
    problem: "Confiance par bouche à oreille",
    solution: "Profils vérifiés, notes, historique, litige appuyé par les photos du dépôt",
  },
  {
    problem: "Prix flous, cash, cahier papier",
    solution: "Barème par article, Orange Money / MTN MoMo / Wave, reçu numérique",
  },
  {
    problem: "Le week-end, c'est la loterie",
    solution: "Réservation de créneaux, abonnement hebdomadaire, prestataire du quartier",
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 md:py-28 bg-section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="07"
          label="La réponse"
          title="Chaque douleur a sa fonctionnalité"
          subtitle="« Djaigai » signifie laver, rendre propre en nouchi. Rendre propre, mais surtout rendre fiable."
        >
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-sm font-medium text-green-700">
              ✦ Chaque étape laisse une preuve
            </span>
          </div>
        </SectionHeader>

        {/* Tableau responsive */}
        <div className="max-w-4xl mx-auto">
          {/* En-tête desktop */}
          <div className="hidden md:grid grid-cols-2 gap-4 px-6 py-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-400">Problème</span>
            <span className="text-xs font-bold uppercase tracking-wider text-green-600">Réponse Djaigai</span>
          </div>

          {/* Lignes */}
          <div className="space-y-3">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.problem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-xl border border-neutral-100 p-5 md:p-6 hover:border-green-200 hover:shadow-sm transition-all duration-300"
              >
                <div className="md:grid md:grid-cols-2 md:gap-6">
                  <p className="text-sm text-red-400 line-through decoration-red-200/60 mb-2 md:mb-0">
                    {sol.problem}
                  </p>
                  <p className="text-sm font-medium text-navy-700 leading-relaxed">
                    → {sol.solution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
