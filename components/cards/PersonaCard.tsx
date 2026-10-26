"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   PersonaCard — Carte pour profils d'utilisateurs cibles
   ═══════════════════════════════════════════════════════ */

interface PersonaCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  variant: "client" | "prestataire";
  index?: number;
}

export function PersonaCard({
  title,
  items,
  icon: Icon,
  variant,
  index = 0,
}: PersonaCardProps) {
  const isClient = variant === "client";

  return (
    <motion.div
      initial={{ opacity: 0, x: isClient ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative overflow-hidden rounded-2xl p-8"
    >
      {/* Background */}
      <div
        className={`
          absolute inset-0
          ${isClient
            ? "bg-gradient-to-br from-cream-100 to-cream-200"
            : "bg-gradient-to-br from-green-50 to-teal-50"
          }
        `}
      />

      {/* Decorative circles */}
      <div
        className={`
          absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-10
          ${isClient ? "bg-navy-500" : "bg-green-500"}
        `}
      />

      <div className="relative z-10">
        {/* Icon + Title */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`
              w-14 h-14 rounded-2xl flex items-center justify-center
              ${isClient
                ? "bg-navy-500 text-white"
                : "bg-green-500 text-white"
              }
            `}
          >
            <Icon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-navy-800">{title}</h3>
        </div>

        {/* Items */}
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className={`
                  mt-1.5 w-2 h-2 rounded-full flex-shrink-0
                  ${isClient ? "bg-navy-400" : "bg-green-500"}
                `}
              />
              <span className="text-sm text-navy-600 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
