"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-green-600">À propos</span>
            <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl font-extrabold text-navy-800 leading-tight">
              L&apos;histoire derrière <span className="text-gradient-brand">Djaigai</span>
            </h1>
            <p className="mt-6 text-lg text-navy-500 leading-relaxed max-w-2xl mx-auto">
              « Djaigai » signifie laver, rendre propre en nouchi. Un mot simple pour un projet ambitieux : rendre fiable un secteur qui fonctionne à la confiance aveugle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Texte principal */}
            <div className="md:col-span-3 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-navy-800 mb-4">Le constat</h2>
                <p className="text-navy-600 leading-relaxed">
                  À Abidjan, faire laver son linge ou trouver une aide ménagère repose sur un réseau invisible. 
                  Des millions de transactions quotidiennes — sans ticket, sans reçu, sans preuve. 
                  Le pressing du quartier note dans un cahier. La Fanico se souvient de mémoire. 
                  Le client espère retrouver toutes ses chemises.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-navy-800 mb-4">Notre mission</h2>
                <p className="text-navy-600 leading-relaxed">
                  Djaigai ne remplace pas les pressings, les blanchisseurs ou les Fanico. 
                  Djaigai leur donne un outil. Un outil simple qui remplace le cahier par un carnet digital, 
                  le bouche à oreille par des avis vérifiés, le cash par Orange Money et le doute par une photo.
                </p>
                <p className="text-navy-600 leading-relaxed mt-4">
                  Notre conviction : la preuve règle la plupart des problèmes. 
                  Un ticket numéroté, une photo au dépôt, un code PIN à la remise — 
                  et soudain, tout le monde peut travailler sereinement.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-navy-800 mb-4">L&apos;équipe</h2>
                <p className="text-navy-600 leading-relaxed">
                  Djaigai est porté par une équipe qui connaît Abidjan de l&apos;intérieur. 
                  Des gens qui ont perdu des chemises, attendu le tonton repasseur, 
                  et cherché une aide ménagère de confiance. On construit ce qu&apos;on aurait aimé avoir.
                </p>
              </motion.div>
            </div>

            {/* Sidebar — valeurs */}
            <div className="md:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Image
                  src="/img/logo.jpeg"
                  alt="Djaigai"
                  width={200}
                  height={200}
                  className="rounded-2xl shadow-lg mx-auto md:mx-0"
                />
              </motion.div>

              <div className="bg-cream-100 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-navy-800 text-sm uppercase tracking-wider">Nos valeurs</h3>
                {[
                  { title: "Preuve avant tout", desc: "Chaque geste est tracé. La confiance se construit sur du concret." },
                  { title: "Simple d'abord", desc: "Si un blanchisseur ne peut pas l'utiliser en 2 minutes, on recommence." },
                  { title: "Local toujours", desc: "Pensé pour Abidjan, ses quartiers, son réseau, ses habitudes." },
                  { title: "Juste pour tous", desc: "Le client et le prestataire sont protégés de la même manière." },
                ].map((v) => (
                  <div key={v.title} className="border-l-2 border-green-400 pl-4">
                    <p className="text-sm font-semibold text-navy-700">{v.title}</p>
                    <p className="text-xs text-navy-500 mt-0.5 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="bg-navy-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6", label: "douleurs terrain" },
              { value: "4", label: "profils cibles" },
              { value: "5", label: "gestes tracés" },
              { value: "3", label: "modes de paiement" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-3xl md:text-4xl font-extrabold text-white font-[family-name:var(--font-plus-jakarta)]">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
