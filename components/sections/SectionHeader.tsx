"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════
   SectionHeader — En-tête de section avec numéro,
   titre, sous-titre et trait décoratif
   ═══════════════════════════════════════════════════════ */

interface SectionHeaderProps {
  number?: string;
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  children?: ReactNode;
}

export function SectionHeader({
  number,
  label,
  title,
  subtitle,
  centered = true,
  light = false,
  children,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      {/* Numéro + label */}
      {(number || label) && (
        <div className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}>
          {number && (
            <span
              className={`
                text-xs font-bold tracking-widest uppercase
                px-3 py-1 rounded-full
                ${light
                  ? "bg-white/10 text-white/80"
                  : "bg-green-50 text-green-600 border border-green-200"
                }
              `}
            >
              {number}
            </span>
          )}
          {label && (
            <span
              className={`
                text-xs font-semibold tracking-widest uppercase
                ${light ? "text-white/70" : "text-navy-400"}
              `}
            >
              {label}
            </span>
          )}
        </div>
      )}

      {/* Titre */}
      <h2
        className={`
          font-[family-name:var(--font-plus-jakarta)] font-extrabold tracking-tight
          text-3xl md:text-4xl lg:text-5xl leading-tight
          ${light ? "text-white" : "text-navy-800"}
        `}
      >
        {title}
      </h2>

      {/* Sous-titre */}
      {subtitle && (
        <p
          className={`
            mt-4 text-lg md:text-xl max-w-2xl leading-relaxed
            ${centered ? "mx-auto" : ""}
            ${light ? "text-white/70" : "text-navy-500"}
          `}
        >
          {subtitle}
        </p>
      )}

      {/* Trait décoratif */}
      <div className={`mt-6 flex ${centered ? "justify-center" : ""}`}>
        <div className="flex items-center gap-1.5">
          <div className={`h-1 w-8 rounded-full ${light ? "bg-green-400" : "bg-green-500"}`} />
          <div className={`h-1 w-3 rounded-full ${light ? "bg-green-400/50" : "bg-green-300"}`} />
          <div className={`h-1 w-1.5 rounded-full ${light ? "bg-green-400/30" : "bg-green-200"}`} />
        </div>
      </div>

      {children}
    </motion.div>
  );
}
