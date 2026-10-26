"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Users,
  Shirt,
  ClipboardList,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   AdminShell — Layout sidebar + topbar avec icônes Lucide
   ═══════════════════════════════════════════════════════ */

const sidebarLinks = [
  { label: "Tableau de bord", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Utilisateurs", href: "/admin/utilisateurs", icon: Users },
  { label: "Prestataires", href: "/admin/prestataires", icon: Shirt },
  { label: "Commandes", href: "/admin/commandes", icon: ClipboardList },
  { label: "Vérifications", href: "/admin/verifications", icon: ShieldCheck },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar Desktop & Mobile */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200
          flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo & Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Image
              src="/img/logo.jpeg"
              alt="Djaigai"
              width={38}
              height={38}
              className="rounded-xl shadow-sm ring-1 ring-neutral-200"
            />
            <div>
              <span className="text-base font-bold text-navy-900 font-[family-name:var(--font-plus-jakarta)] tracking-tight">
                Djaigai
              </span>
              <span className="block text-[10px] text-green-700 bg-green-50 px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider w-fit -mt-0.5">
                Admin Panel
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-navy-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs avec vraies icônes Lucide */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group
                  ${active
                    ? "bg-green-50 text-green-700 border border-green-200/80 shadow-sm shadow-green-500/5"
                    : "text-navy-600 hover:bg-neutral-100/70 hover:text-navy-900"
                  }
                `}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0 ${
                    active ? "text-green-600" : "text-navy-400 group-hover:text-navy-700"
                  }`}
                />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-navy-800 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-navy-800 truncate">{user?.name || "Admin Djaigai"}</p>
              <p className="text-[11px] text-navy-400 truncate">{user?.email || "admin@djaigai.ci"}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-red-100"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </aside>

      {/* Backdrop Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-navy-950/40 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white/90 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-neutral-200 text-navy-700 hover:bg-neutral-50 cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold text-navy-500">
                Plateforme de Supervision · Abidjan
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-navy-600 hover:text-navy-900 hover:bg-neutral-100 transition-colors border border-neutral-200/60"
            >
              <span>Voir la landing</span>
              <ExternalLink className="w-3.5 h-3.5 text-navy-400" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
