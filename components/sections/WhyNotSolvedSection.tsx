"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/sections/SectionHeader";

/* ═══════════════════════════════════════════════════════
   WhyNotSolvedSection — Plus éditorial, sans icônes
   ═══════════════════════════════════════════════════════ */

const reasons = [
  {
    number: "01",
    title: "Secteur informel",
    description: "Pas de système, pas de données, pas de caisse. Tout fonctionne à la confiance.",
  },
  {
    number: "02",
    title: "Marges faibles",
    description: "Les logiciels classiques coûtent trop cher pour un blanchisseur de quartier à Yopougon.",
  },
  {
    number: "03",
    title: "Habitudes ancrées",
    description: "Le bouche à oreille marche assez bien pour ne pas chercher mieux. Jusqu'au jour où ça ne marche plus.",
  },
  {
    number: "04",
    title: "Besoin de preuve, pas de promesse",
    description: "Il faut un outil qui rassure tout de suite — pas une appli de plus qui ne comprend pas le terrain.",
  },
];

export function WhyNotSolvedSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          label="Le blocage"
          title="Pourquoi personne ne l'a encore résolu"
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-5 items-start"
            >
              <span className="text-2xl font-extrabold text-green-300 font-[family-name:var(--font-plus-jakarta)] flex-shrink-0 w-8 mt-0.5">
                {reason.number}
              </span>
              <div>
                <h3 className="text-lg font-bold text-navy-800">{reason.title}</h3>
                <p className="text-sm text-navy-500 mt-1 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
