"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   PainCard — Carte pour afficher une douleur utilisateur
   avec numéro, icône et description
   ═══════════════════════════════════════════════════════ */

interface PainCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  index?: number;
  accent?: "red" | "amber" | "navy";
}

const accentStyles = {
  red: {
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    number: "text-red-400",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    number: "text-amber-400",
  },
  navy: {
    bg: "bg-navy-50",
    border: "border-navy-100",
    iconBg: "bg-navy-100",
    iconColor: "text-navy-500",
    number: "text-navy-300",
  },
};

export function PainCard({
  number,
  title,
  description,
  icon: Icon,
  index = 0,
  accent = "red",
}: PainCardProps) {
  const s = accentStyles[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`
        group relative p-6 rounded-2xl border ${s.border} ${s.bg}
        hover:shadow-lg hover:shadow-${accent === "red" ? "red" : accent === "amber" ? "amber" : "navy"}-500/5
        transition-shadow duration-300
      `}
    >
      {/* Numéro en filigrane */}
      <span
        className={`absolute top-4 right-5 text-5xl font-extrabold ${s.number} opacity-30 select-none
          font-[family-name:var(--font-plus-jakarta)]`}
      >
        {number}
      </span>

      {/* Icône */}
      <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${s.iconColor}`} />
      </div>

      {/* Contenu */}
      <h3 className="text-lg font-bold text-navy-800 mb-2 pr-8">{title}</h3>
      <p className="text-sm text-navy-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   SolutionCard — Carte pour la réponse Djaigai
   ═══════════════════════════════════════════════════════ */

interface SolutionCardProps {
  problem: string;
  solution: string;
  icon: LucideIcon;
  index?: number;
}

export function SolutionCard({
  problem,
  solution,
  icon: Icon,
  index = 0,
}: SolutionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div
        className="
          relative p-6 rounded-2xl bg-white border border-green-100
          hover:border-green-300 hover:shadow-xl hover:shadow-green-500/10
          transition-all duration-300
          overflow-hidden
        "
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-50/0 group-hover:from-green-50/50 group-hover:to-teal-50/30 transition-all duration-500 rounded-2xl" />

        <div className="relative z-10">
          {/* Icône */}
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
            <Icon className="w-6 h-6 text-green-600" />
          </div>

          {/* Problème */}
          <p className="text-sm text-red-400 font-medium mb-2 line-through decoration-red-300/50">
            {problem}
          </p>

          {/* Solution */}
          <p className="text-base font-semibold text-navy-700 leading-snug">
            {solution}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   StatCard — Carte pour un chiffre / statistique
   ═══════════════════════════════════════════════════════ */

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ value, label, icon, className = "" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`text-center p-6 rounded-2xl glass ${className}`}
    >
      {icon && <div className="mb-3 flex justify-center">{icon}</div>}
      <div className="text-3xl md:text-4xl font-extrabold text-navy-700 font-[family-name:var(--font-plus-jakarta)]">
        {value}
      </div>
      <div className="text-sm text-navy-400 mt-1 font-medium">{label}</div>
    </motion.div>
  );
}
