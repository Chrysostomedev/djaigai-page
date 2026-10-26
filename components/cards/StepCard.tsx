"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   StepCard — Carte d'étape du parcours utilisateur
   (Réserver → Déposer → Suivre → Récupérer → Payer)
   ═══════════════════════════════════════════════════════ */

interface StepCardProps {
  number: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  index?: number;
  isLast?: boolean;
}

export function StepCard({
  number,
  title,
  subtitle,
  icon: Icon,
  index = 0,
  isLast = false,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex flex-col items-center"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="hidden md:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px]">
          <div className="h-full bg-gradient-to-r from-green-300 to-green-200 rounded-full" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            className="absolute inset-0 h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full origin-left"
          />
        </div>
      )}

      {/* Circle with number */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="
          relative w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500
          flex items-center justify-center shadow-lg shadow-green-500/20
          mb-4
        "
      >
        <Icon className="w-8 h-8 text-white" />
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-navy-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
          {number}
        </span>
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-bold text-navy-800 mb-1">{title}</h3>
      <p className="text-sm text-navy-400 text-center max-w-[180px]">{subtitle}</p>
    </motion.div>
  );
}
