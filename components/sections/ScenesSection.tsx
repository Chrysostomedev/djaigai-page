"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Clock, MapPin, Tag } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   ScenesSection — Scènes types du terrain avec photos réelles
   et motion design
   ═══════════════════════════════════════════════════════ */

const scenes = [
  {
    time: "Samedi, 11 h",
    quartier: "Cocody Angré",
    name: "Awa",
    story:
      "Awa dépose 7 articles chez le blanchisseur du quartier. Le soir, il lui en rend 6. Aucun ticket, aucune photo : personne ne peut prouver quel vêtement manque.",
    issue: "Chemise manquante · 0 recours",
    image: "/img/landing-1.jpg",
    imageCaption: "Linge séché au quartier, sans inventaire",
  },
  {
    time: "Mardi, 18 h 30",
    quartier: "Yopougon Maroc",
    name: "Yao",
    story:
      "Yao traverse les embouteillages après le travail pour récupérer ses chemises. Le repasseur est absent depuis midi. Yao rentre les mains vides.",
    issue: "Déplacement inutile · Portes closes",
    image: "/img/landing-2.jpg",
    imageCaption: "Tournée des blanchisseurs sans horaire fixe",
  },
  {
    time: "Dimanche matin",
    quartier: "Marcory Zone 4",
    name: "Mme Traoré",
    story:
      "Mme Traoré cherche une aide ménagère pour le grand nettoyage. Elle n'a que deux numéros griffonnés sur un papier, aucun avis, aucune garantie tarifaire.",
    issue: "Contact aléatoire · Tarif non encadré",
    image: "/img/landing-3.jpg",
    imageCaption: null,
  },
];

export function ScenesSection() {
  return (
    <section className="py-20 md:py-28 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          label="Scènes du réel"
          title="Trois situations vécues chaque semaine à Abidjan"
          subtitle="Des histoires directement tirées de la vie courante entre clients, blanchisseurs et aides ménagères."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {scenes.map((scene, i) => (
            <motion.div
              key={scene.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-xl hover:shadow-navy-950/5 transition-all duration-300 flex flex-col group"
            >
              {/* Image d'illustration si disponible */}
              {scene.image ? (
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={scene.image}
                    alt={scene.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                    <span className="font-semibold bg-navy-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      {scene.quartier}
                    </span>
                    <span className="text-white/80 text-[10px] truncate">
                      {scene.imageCaption}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 w-full bg-gradient-to-br from-amber-50 to-orange-50/50 p-6 flex flex-col justify-between border-b border-neutral-100">
                  <span className="inline-flex self-start text-xs font-semibold bg-white/90 text-navy-700 px-2.5 py-1 rounded-full shadow-sm">
                    {scene.quartier}
                  </span>
                  <div>
                    <span className="text-3xl">🏠</span>
                    <p className="text-xs text-navy-400 mt-2 italic">Aide ménagère & entretien à domicile</p>
                  </div>
                </div>
              )}

              {/* Corps de la scène */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-navy-500 bg-navy-50 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-navy-400" />
                      {scene.time}
                    </span>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2.5 py-0.5 rounded-full">
                      Sans Djaigai
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-800 mb-2">
                    {scene.name}
                  </h3>

                  <p className="text-sm text-navy-600 leading-relaxed">
                    {scene.story}
                  </p>
                </div>

                {/* Tag de l'impact négatif */}
                <div className="mt-5 pt-3 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{scene.issue}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-navy-400 mt-10 italic">
          Scènes réelles relevées lors des entretiens terrain à Abidjan (Cocody, Yopougon, Marcory).
        </p>
      </div>
    </section>
  );
}
