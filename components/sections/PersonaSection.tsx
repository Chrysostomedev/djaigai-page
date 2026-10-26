"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/sections/SectionHeader";

/* ═══════════════════════════════════════════════════════
   PersonaSection — Sans icônes, plus éditorial
   ═══════════════════════════════════════════════════════ */

export function PersonaSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          label="Qui est touché"
          title="Deux côtés d'un même problème"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-cream-100 p-8 border border-cream-300/30"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-navy-400">
              Ceux qui donnent leur linge
            </span>
            <h3 className="text-xl font-bold text-navy-800 mt-2 mb-5">Les clients</h3>

            <ul className="space-y-3">
              {[
                "Salariés et cadres sans temps le week-end",
                "Familles, étudiants, jeunes actifs",
                "Ménages qui cherchent une aide fiable",
                "Expatriés et logements meublés",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-navy-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Prestataires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-green-50 p-8 border border-green-200/30"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-green-600">
              Ceux qui lavent, repassent, nettoient
            </span>
            <h3 className="text-xl font-bold text-navy-800 mt-2 mb-5">Les prestataires</h3>

            <ul className="space-y-3">
              {[
                "Pressings et blanchisseurs de quartier",
                "Fanico, ces femmes qui lavent à la main",
                "Repasseurs, cordonniers, lavage de chaussures",
                "Aides ménagères recrutées de bouche à oreille",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
