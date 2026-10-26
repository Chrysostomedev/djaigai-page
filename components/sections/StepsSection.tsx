"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/sections/SectionHeader";

/* ═══════════════════════════════════════════════════════
   StepsSection — Parcours Djaigai
   Format minimal : numéro + texte, pas d'icônes
   ═══════════════════════════════════════════════════════ */

const steps = [
  { number: 1, title: "Réserver", proof: "Créneau confirmé" },
  { number: 2, title: "Déposer", proof: "Ticket + photos" },
  { number: 3, title: "Suivre", proof: "Statut horodaté" },
  { number: 4, title: "Récupérer", proof: "Code PIN validé" },
  { number: 5, title: "Payer & noter", proof: "Reçu + avis" },
];

export function StepsSection() {
  return (
    <section id="parcours" className="py-20 md:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="08"
          label="Le parcours avec Djaigai"
          title="Cinq gestes, chacun laisse une preuve"
        />

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:justify-between gap-6 md:gap-2">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex md:flex-col items-center md:items-center gap-4 md:gap-2 md:text-center flex-1"
            >
              {/* Numéro */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-green-500/15 flex-shrink-0">
                {step.number}
              </div>

              {/* Connecteur desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute" />
              )}

              <div className="md:mt-1">
                <h3 className="font-bold text-navy-800 text-base">{step.title}</h3>
                <p className="text-xs text-navy-400 mt-0.5">{step.proof}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecteurs horizontaux desktop */}
        <div className="hidden md:flex justify-center mt-[-72px] mb-[40px] max-w-3xl mx-auto px-12">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex-1 flex items-center justify-center">
              <div className="w-full h-[2px] bg-gradient-to-r from-green-300 to-green-200 rounded-full mx-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
