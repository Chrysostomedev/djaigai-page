"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/sections/SectionHeader";

/* ═══════════════════════════════════════════════════════
   JourneySection — Parcours actuel (avec zones d'ombre)
   Un linge, cinq étapes, deux zones d'ombre
   ═══════════════════════════════════════════════════════ */

const steps = [
  {
    label: "Dépose",
    problem: "Aucune preuve de l'état ni du nombre d'articles",
    status: "danger",
  },
  {
    label: "Attente",
    problem: "Aucune nouvelle, délai inconnu",
    status: "warning",
  },
  {
    label: "Lavage ou repassage",
    problem: "Qui lave ? Où est le linge ?",
    status: "danger",
  },
  {
    label: "Retour",
    problem: null,
    status: "neutral",
  },
  {
    label: "Paiement",
    problem: "Prix et reçu à la tête du client",
    status: "danger",
  },
];

const statusColors: Record<string, { dot: string; line: string; bg: string }> = {
  danger: {
    dot: "bg-red-500",
    line: "border-red-300",
    bg: "bg-red-50",
  },
  warning: {
    dot: "bg-amber-500",
    line: "border-amber-300",
    bg: "bg-amber-50",
  },
  neutral: {
    dot: "bg-navy-400",
    line: "border-navy-200",
    bg: "bg-navy-50",
  },
};

export function JourneySection() {
  return (
    <section className="py-20 md:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          label="Le parcours"
          title="Un linge, cinq étapes, deux zones d'ombre"
          subtitle="Les pointillés marquent les moments où la confiance, l'argent ou le temps se perdent."
        />

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {steps.map((step, i) => {
            const colors = statusColors[step.status];
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-start gap-6 mb-8 last:mb-0"
              >
                {/* Timeline connector */}
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full ${colors.dot} ring-4 ring-white shadow-md flex-shrink-0 z-10`} />
                  {i < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-16 border-l-2 ${
                        step.status === "danger" ? "border-dashed border-red-300" : `${colors.line}`
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 -mt-1 p-4 rounded-xl ${step.problem ? colors.bg : "bg-transparent"}`}>
                  <h3 className="text-lg font-bold text-navy-800">{step.label}</h3>
                  {step.problem && (
                    <p className="text-sm text-navy-500 mt-1 italic">
                      ⚠️ {step.problem}
                    </p>
                  )}
                </div>

                {/* Step number */}
                <span className="text-3xl font-extrabold text-navy-100 font-[family-name:var(--font-plus-jakarta)] select-none hidden sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
