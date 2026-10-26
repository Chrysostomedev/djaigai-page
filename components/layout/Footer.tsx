"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   Footer — Pied de page Djaigai
   ═══════════════════════════════════════════════════════ */

const footerLinks = {
  produit: [
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "Parcours", href: "#parcours" },
    { label: "Solution", href: "#solution" },
  ],
  profils: [
    { label: "Clients", href: "#" },
    { label: "Pressings", href: "#" },
    { label: "Fanico", href: "#" },
    { label: "Blanchisseurs", href: "#" },
  ],
  legal: [
    { label: "Mentions légales", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "CGU", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-gradient text-white mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/img/logo.jpeg"
                alt="Djaigai"
                width={44}
                height={44}
                className="rounded-xl"
              />
              <span className="text-xl font-extrabold font-[family-name:var(--font-plus-jakarta)]">
                Djaigai
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Votre linge, notre priorité. L&apos;application qui numérise le circuit du linge et du ménage à Abidjan.
            </p>
            <p className="text-xs text-white/40 italic">
              « Djaigai » signifie laver, rendre propre en nouchi.
            </p>
          </div>

          {/* Produit */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">
              Produit
            </h4>
            <ul className="space-y-3">
              {footerLinks.produit.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Profils */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">
              Profils
            </h4>
            <ul className="space-y-3">
              {footerLinks.profils.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">
              Légal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 Djaigai. Tous droits réservés. Abidjan, Côte d&apos;Ivoire.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Fait avec <Heart className="w-3 h-3 text-red-400 fill-red-400" /> à Abidjan
          </p>
        </div>
      </div>
    </footer>
  );
}
