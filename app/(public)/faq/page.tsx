"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   FAQ — Questions fréquentes
   ═══════════════════════════════════════════════════════ */

const faqCategories = [
  {
    title: "Général",
    questions: [
      {
        q: "Qu'est-ce que Djaigai ?",
        a: "Djaigai est une application mobile qui numérise le circuit du linge et du ménage à Abidjan. Le client réserve, suit et paie. Le prestataire remplace son cahier par un outil simple. Chaque étape laisse une preuve.",
      },
      {
        q: "Que signifie « Djaigai » ?",
        a: "« Djaigai » signifie laver, rendre propre en nouchi, l'argot populaire d'Abidjan. On a choisi ce mot parce qu'il parle à tout le monde — du pressing de Cocody au blanchisseur de Yopougon.",
      },
      {
        q: "L'application est-elle déjà disponible ?",
        a: "Djaigai est en phase de bêta. Vous pouvez rejoindre les premiers utilisateurs en vous inscrivant sur cette page. Le lancement officiel est prévu à Abidjan.",
      },
      {
        q: "L'application fonctionne-t-elle sans connexion internet ?",
        a: "L'application est conçue pour être légère et fonctionner en mode dégradé. Les fonctions critiques (consultation des tickets, historique) sont disponibles hors ligne. La synchronisation se fait au retour du réseau.",
      },
    ],
  },
  {
    title: "Pour les clients",
    questions: [
      {
        q: "Comment je suis sûr de retrouver tous mes vêtements ?",
        a: "Au dépôt, le prestataire prend des photos et compte chaque article. Un ticket numéroté est généré. À la remise, un code PIN valide la restitution. S'il manque un article, les photos du dépôt font foi.",
      },
      {
        q: "Quels modes de paiement sont acceptés ?",
        a: "Orange Money, MTN MoMo et Wave seront intégrés via un agrégateur de paiement mobile. Le cash reste possible, mais le reçu est toujours numérique.",
      },
      {
        q: "Comment trouver un prestataire de confiance ?",
        a: "Chaque prestataire a un profil vérifié avec ses avis, son historique et ses tarifs affichés. Plus besoin de demander à une connaissance — les notes parlent d'elles-mêmes.",
      },
    ],
  },
  {
    title: "Pour les prestataires",
    questions: [
      {
        q: "Je suis blanchisseur, en quoi Djaigai m'aide ?",
        a: "Djaigai remplace votre cahier par un carnet digital. Vous suivez vos commandes, votre caisse du jour, vos clients. Plus d'oublis, plus d'impayés perdus. Et vos clients vous trouvent plus facilement.",
      },
      {
        q: "C'est gratuit ?",
        a: "Le modèle économique est en cours de définition. L'objectif est que l'outil soit accessible aux blanchisseurs de quartier et aux Fanico, pas seulement aux grands pressings.",
      },
      {
        q: "Je suis Fanico, comment ça marche pour moi ?",
        a: "Vous définissez vos zones (Cocody, Plateau, Marcory…), vos disponibilités et vos tarifs. Les clients de votre quartier vous trouvent et réservent directement. Vous recevez les missions, les acceptez, et vos gains sont suivis.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <section className="bg-hero-gradient py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-green-600">FAQ</span>
            <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl font-extrabold text-navy-800">
              Questions fréquentes
            </h1>
            <p className="mt-4 text-lg text-navy-500">
              Tout ce que vous devez savoir sur Djaigai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {faqCategories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-green-600 mb-5">
                {cat.title}
              </h2>

              <div className="space-y-2">
                {cat.questions.map((faq) => {
                  const id = `${cat.title}-${faq.q}`;
                  const isOpen = openItems.has(id);

                  return (
                    <div
                      key={id}
                      className="bg-white rounded-xl border border-neutral-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(id)}
                        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-cream-50 transition-colors cursor-pointer"
                      >
                        <span className="text-base font-semibold text-navy-800">{faq.q}</span>
                        <span
                          className={`text-navy-400 transition-transform duration-200 flex-shrink-0 text-xl leading-none ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="px-6 pb-5 text-sm text-navy-500 leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
