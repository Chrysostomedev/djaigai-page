"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { AlertCircle, Clock, MapPin, Receipt, Sparkles, UserX } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   PainSection — Le quotidien à Abidjan avec photos réelles
   et motion design épuré
   ═══════════════════════════════════════════════════════ */

const pains = [
  {
    number: "01",
    title: "Vêtements disparus ou échangés",
    description:
      "Pas de ticket, pas de photo, pas de comptage. Une chemise manque : c'est la parole du client contre celle du prestataire.",
    accent: "border-l-red-500",
    badge: "Litige fréquent",
    badgeColor: "bg-red-50 text-red-600",
  },
  {
    number: "02",
    title: "« Le tonton n'est pas là »",
    description:
      "On arrive, le repasseur est parti ou n'a pas fini. Aucune annonce, aucun délai tenu, aucun moyen de prévenir à distance.",
    accent: "border-l-amber-500",
    badge: "Temps perdu",
    badgeColor: "bg-amber-50 text-amber-700",
  },
  {
    number: "03",
    title: "Des déplacements pour rien",
    description:
      "Déposer, revenir, revenir encore. Dans les embouteillages d'Abidjan, le temps perdu vaut souvent plus que le tarif du lavage.",
    accent: "border-l-red-500",
    badge: "Embouteillages",
    badgeColor: "bg-red-50 text-red-600",
  },
  {
    number: "04",
    title: "La confiance repose sur le bouche à oreille",
    description:
      "Trouver une bonne Fanico ou une aide ménagère passe par une connaissance. Aucun avis vérifié, aucun historique, aucun recours.",
    accent: "border-l-amber-500",
    badge: "Zéro garantie",
    badgeColor: "bg-amber-50 text-amber-700",
  },
  {
    number: "05",
    title: "Des prix flous, du cash, un vieux cahier",
    description:
      "Tarif à la tête du client, pas de reçu. Côté prestataire : un cahier d'écolier, des oublis et aucune vision de ses finances.",
    accent: "border-l-red-500",
    badge: "100% informel",
    badgeColor: "bg-red-50 text-red-600",
  },
  {
    number: "06",
    title: "Le week-end, c'est la loterie",
    description:
      "Le samedi, tout le monde veut faire laver ou repasser. Aucune réservation possible, aucun créneau fiable garanti.",
    accent: "border-l-amber-500",
    badge: "Surcharge",
    badgeColor: "bg-amber-50 text-amber-700",
  },
];

export function PainSection() {
  return (
    <section id="probleme" className="py-20 md:py-28 bg-section-gradient relative overflow-hidden">
      {/* Texture d'arrière-plan légère */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="01"
          label="Le quotidien"
          title="Six douleurs que tout le monde connaît"
          subtitle="À Abidjan, tout un secteur fonctionne sans trace, et les clients comme les prestataires en paient le prix fort chaque semaine."
        />

        {/* ─── Spotlight Visuel Terrain avec Photo Réelle ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xl shadow-navy-950/5 overflow-hidden"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Image réelle de reportage */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-md group">
                <Image
                  src="/img/landing-2.jpg"
                  alt="Réalité du transport de linge à Abidjan"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/90 px-2 py-0.5 rounded text-white">
                    Photo terrain
                  </span>
                  <p className="text-xs font-medium text-white/95 mt-1">
                    Cocody, Yopougon, Treichville : le transport de linge sans preuve
                  </p>
                </div>
              </div>
            </div>

            {/* Texte d'analyse éditoriale */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Le constat indiscutable</span>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 font-[family-name:var(--font-plus-jakarta)] leading-snug">
                « C&apos;est la parole du client contre celle du prestataire. »
              </h3>
              <p className="text-sm text-navy-600 leading-relaxed">
                Quand une chemise de marque disparaît ou qu&apos;un pagne traditionnel est taché,
                il n&apos;existe ni photo avant dépôt, ni état des lieux, ni ticket horodaté.
                Le client soupçonne le blanchisseur ; le blanchisseur jure qu&apos;il n&apos;a jamais reçu la pièce.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-navy-700">
                <span className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
                  <Receipt className="w-4 h-4 text-red-500" /> 0 reçu numérique
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
                  <UserX className="w-4 h-4 text-amber-500" /> Aucun historique sauvegardé
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
                  <Clock className="w-4 h-4 text-navy-400" /> Retards imprévisibles
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Grille des 6 douleurs avec animations douces ─── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`
                group relative bg-white rounded-2xl p-6
                border border-neutral-200/70 border-l-4 ${pain.accent}
                shadow-sm hover:shadow-lg hover:shadow-navy-900/5 transition-all duration-300
              `}
            >
              {/* En-tête de carte */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${pain.badgeColor}`}>
                  {pain.badge}
                </span>
                <span className="text-3xl font-extrabold text-neutral-200 select-none font-[family-name:var(--font-plus-jakarta)]">
                  {pain.number}
                </span>
              </div>

              <h3 className="text-base font-bold text-navy-800 mb-2 leading-snug group-hover:text-green-700 transition-colors">
                {pain.title}
              </h3>
              <p className="text-sm text-navy-500 leading-relaxed">
                {pain.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
