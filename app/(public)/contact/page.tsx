"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════
   Contact — Formulaire et infos de contact
   ═══════════════════════════════════════════════════════ */

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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
            <span className="text-xs font-bold uppercase tracking-widest text-green-600">Contact</span>
            <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl font-extrabold text-navy-800">
              Parlons-en
            </h1>
            <p className="mt-4 text-lg text-navy-500">
              Une question, un partenariat, ou envie de rejoindre la bêta ? Écrivez-nous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-12">
          {/* Formulaire */}
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <p className="text-2xl mb-2">✓</p>
                <h2 className="text-xl font-bold text-navy-800">Message envoyé !</h2>
                <p className="text-sm text-navy-500 mt-2">
                  Nous reviendrons vers vous rapidement. Merci pour votre intérêt pour Djaigai.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">Nom complet</label>
                    <input
                      type="text"
                      required
                      placeholder="Awa Koné"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-navy-800 placeholder:text-navy-300 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">Téléphone</label>
                    <input
                      type="tel"
                      placeholder="+225 07 XX XX XX XX"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-navy-800 placeholder:text-navy-300 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="awa@exemple.ci"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-navy-800 placeholder:text-navy-300 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Vous êtes…</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-navy-800 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all text-sm cursor-pointer">
                    <option value="">Choisir…</option>
                    <option value="client">Un client potentiel</option>
                    <option value="pressing">Un pressing / blanchisseur</option>
                    <option value="fanico">Une Fanico / aide ménagère</option>
                    <option value="partenaire">Un partenaire potentiel</option>
                    <option value="investisseur">Un investisseur</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Dites-nous en plus…"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-navy-800 placeholder:text-navy-300 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all text-sm resize-none"
                  />
                </div>

                <Button type="submit" size="lg" fullWidth>
                  Envoyer le message
                </Button>
              </motion.form>
            )}
          </div>

          {/* Sidebar infos */}
          <div className="md:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-400 mb-3">Localisation</h3>
                <p className="text-navy-700 font-medium">Abidjan, Côte d&apos;Ivoire</p>
                <p className="text-sm text-navy-500 mt-1">Cocody, Riviera</p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-400 mb-3">Email</h3>
                <a href="mailto:contact@djaigai.ci" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                  contact@djaigai.ci
                </a>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-400 mb-3">Réseaux</h3>
                <div className="flex gap-3">
                  {["WhatsApp", "Instagram", "LinkedIn"].map((network) => (
                    <a
                      key={network}
                      href="#"
                      className="px-3 py-1.5 text-xs font-medium text-navy-600 bg-navy-50 rounded-full hover:bg-navy-100 transition-colors"
                    >
                      {network}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="bg-cream-100 rounded-2xl p-6">
              <h3 className="font-bold text-navy-800 mb-2">Vous êtes prestataire ?</h3>
              <p className="text-sm text-navy-500 leading-relaxed">
                Pressing, blanchisseur, Fanico ou aide ménagère à Abidjan — 
                rejoignez les premiers prestataires Djaigai et soyez parmi les premiers à bénéficier de l&apos;outil.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
