"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   Admin Login — Connexion instantanée 1-clic
   ═══════════════════════════════════════════════════════ */

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@djaigai.ci");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const handleConnect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    login(email, password);
    // Redirection immédiate et fluide
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-neutral-100">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3">
              <Image
                src="/img/logo.jpeg"
                alt="Djaigai"
                width={64}
                height={64}
                className="rounded-2xl shadow-lg ring-4 ring-green-50"
                priority
              />
              <span className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-navy-800 font-[family-name:var(--font-plus-jakarta)]">
              Espace Administration
            </h1>
            <p className="text-xs text-navy-400 mt-1">
              Supervision des pressings, blanchisseurs et flux Abidjan
            </p>
          </div>


          {/* Form */}
          <form onSubmit={handleConnect} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-1.5">
                Identifiant
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@djaigai.ci"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-navy-800 text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-navy-800 text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"
              />
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              className="mt-2 text-base font-semibold shadow-lg shadow-green-500/20"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          {/* Navigation retour */}
          <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
            <Link
              href="/"
              className="text-xs text-navy-400 hover:text-navy-700 transition-colors inline-flex items-center gap-1 font-medium"
            >
              ← Retour au site public
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
