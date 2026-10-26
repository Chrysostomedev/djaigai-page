"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════
   Navbar — Mise à jour avec pages publiques
   ═══════════════════════════════════════════════════════ */

const navLinks = [
  { label: "Problème", href: "/#probleme" },
  { label: "Solution", href: "/#solution" },
  { label: "Parcours", href: "/#parcours" },
  { label: "À propos", href: "/a-propos" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? "glass shadow-lg shadow-navy-500/5 py-3"
            : "bg-transparent py-5"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/img/logo.jpeg"
              alt="Djaigai"
              width={40}
              height={40}
              className="rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
            />
            <span className="text-xl font-extrabold text-navy-700 font-[family-name:var(--font-plus-jakarta)] hidden sm:block">
              Djaigai
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-navy-500 hover:text-navy-800 hover:bg-navy-50/50 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact">
              <Button size="sm" variant="outline">
                Nous contacter
              </Button>
            </Link>
            <Button size="sm">
              Rejoindre la bêta
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-navy-50 text-navy-600 transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 pt-20 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center gap-1 px-6 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3 text-lg font-semibold text-navy-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 w-full space-y-3">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <Button fullWidth variant="outline">Nous contacter</Button>
                </Link>
                <Button fullWidth onClick={() => setMobileOpen(false)}>
                  Rejoindre la bêta
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
