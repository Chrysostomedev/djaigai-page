"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════
   CTASection — Appel à l'action final
   ═══════════════════════════════════════════════════════ */

export function CTASection() {
  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,169,104,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,174,146,0.1),transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/img/logo.jpeg"
            alt="Djaigai"
            width={80}
            height={80}
            className="rounded-2xl shadow-2xl shadow-green-500/20"
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-[family-name:var(--font-plus-jakarta)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
        >
          Rendre propre,
          <br />
          mais surtout{" "}
          <span className="text-green-400">rendre fiable</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Djaigai est en préparation. Rejoignez les premiers utilisateurs à Abidjan
          et participez à construire le service qui changera la donne.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button
            size="lg"

          >
            Rejoindre la bêta
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="!text-white/80 hover:!text-white hover:!bg-white/10"
            iconPosition="right"
          >
            Nous contacter
          </Button>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-xs text-white/30"
        >
        </motion.p>
      </div>
    </section>
  );
}
