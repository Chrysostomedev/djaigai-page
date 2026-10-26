"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroBackdrop } from "../ui/HeroBackDrop";
/* ═══════════════════════════════════════════════════════
   HeroSection — Avec images d'Abidjan en arrière-plan
   et motion design épuré
   ═══════════════════════════════════════════════════════ */

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-24 pb-16 lg:py-0"
    >
      <HeroBackdrop />   {/* ← première ligne dans la section */}


      {/* ─── Arrière-plan photographique immersif avec dégradés soyeux ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Photo de rue d'Abidjan (Fanico / transport de linge) en arrière-plan à droite */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.16, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-12 -right-16 sm:right-0 w-[550px] h-[550px] lg:w-[820px] lg:h-[820px] rounded-full overflow-hidden blur-[1px]"
        >
          <Image
            src="/img/landing-2.jpg"
            alt="Scène de linge à Abidjan"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cream-50/60 to-cream-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-transparent to-cream-50" />
        </motion.div>

        {/* Photo de linge au fil (Abidjan) en arrière-plan à gauche */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
          className="absolute -bottom-24 -left-20 w-[420px] h-[420px] lg:w-[600px] lg:h-[600px] rounded-full overflow-hidden blur-[1.5px]"
        >
          <Image
            src="/img/landing-1.jpg"
            alt="Linge étendu à Abidjan"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream-50/70 to-cream-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-50/50 to-cream-50" />
        </motion.div>

        {/* Halos de lumière de marque */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-navy-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-cream-50/40 backdrop-blur-[0.5px]" />
      </div>

      {/* ─── Contenu principal ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Colonne texte (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-left"
          >

            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 leading-[1.1] tracking-tight">
              Où est passé{" "}
              <span className="text-gradient-brand">mon habit</span>
              <span className="text-navy-300"> ?</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-navy-600 leading-relaxed max-w-2xl font-normal">
              À Abidjan, laver, repasser ou confier son linge repose sur la mémoire,
              le cash et le bouche à oreille. Pressings, blanchisseurs, Fanico, repasseurs&nbsp;:
              tout un secteur fonctionne sans aucune trace écrite.
            </p>

            <p className="mt-4 text-base font-medium text-navy-800">
              Djaigai numérise chaque étape.{" "}
              <span className="text-green-600 font-semibold underline decoration-green-400 decoration-2 underline-offset-4">
                Chaque vêtement laisse une preuve numérique.
              </span>
            </p>

            {/* Statistiques clés éditoriales */}
            <div className="mt-8 pt-6 border-t border-neutral-200/60 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-3xl font-extrabold text-navy-900 font-[family-name:var(--font-plus-jakarta)]">
                  6
                </div>
                <div className="text-xs text-navy-500 mt-1 font-medium">douleurs identifiées</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-green-600 font-[family-name:var(--font-plus-jakarta)]">
                  5
                </div>
                <div className="text-xs text-navy-500 mt-1 font-medium">gestes sécurisés</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-navy-900 font-[family-name:var(--font-plus-jakarta)]">
                  0
                </div>
                <div className="text-xs text-navy-500 mt-1 font-medium">vêtement égaré</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                href="#probleme"
                icon={<ArrowDown className="w-4 h-4" />}
                iconPosition="right"
                className="shadow-xl shadow-green-500/20"
              >
                Comprendre le problème
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                href="/admin"
                className="border-neutral-300 bg-white/80 hover:bg-white text-navy-700"
              >
                Accès Démo Espace Admin →
              </Button> */}
            </div>
          </motion.div>

          {/* Colonne visuelle avec photo réelle + composition motion (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[440px]">
              {/* Carte principale : Photo réelle d'Abidjan avec cadre premium */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/15 border-4 border-white bg-white group">
                <div className="relative h-[420px] w-full overflow-hidden">
                  <Image
                    src="/img/landing-2.jpg"
                    alt="Transport de linge à Abidjan"
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  {/* Voile dégradé */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />


                  {/* Légende basse */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-wider text-green-300 font-bold">
                      Sans Djaigai
                    </p>
                    <p className="text-sm font-semibold text-white/95 mt-0.5 leading-snug">
                      Des centaines de pièces transportées chaque jour sans aucun reçu.
                    </p>
                  </div>
                </div>
              </div>

              {/* ─── Carte flottante 1 : Photo de contrôle (landing-1) ─── */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -4 }}
                className="absolute -bottom-6 -left-6 sm:-left-10 w-52 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-neutral-100/80"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100">
                    <Image
                      src="/img/landing-1.jpg"
                      alt="Contrôle photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-green-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Photo certifiée</span>
                    </div>
                    <p className="text-xs font-bold text-navy-800 truncate">7 pièces comptées</p>
                    <p className="text-[10px] text-navy-400">Cocody Angré · 10h42</p>
                  </div>
                </div>
              </motion.div>

              {/* ─── Carte flottante 2 : Badge Digital Ticket ─── */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-neutral-100/80"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-navy-50 flex items-center justify-center">
                    <Image
                      src="/img/logo.jpeg"
                      alt="Logo"
                      width={28}
                      height={28}
                      className="rounded"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-800">Ticket #DJ-2041</p>
                    <p className="text-[10px] text-green-600 font-semibold">PIN Sécurisé : 4821</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicateur de défilement doux */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <a
          href="#probleme"
          className="flex flex-col items-center gap-1 text-[11px] font-medium text-navy-400 hover:text-navy-600 transition-colors"
        >
          <span>Découvrir</span>
          <div className="w-5 h-8 rounded-full border border-navy-300 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-green-500 animate-bounce" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
