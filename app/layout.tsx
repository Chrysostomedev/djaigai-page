import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Djaigai — Votre linge, notre priorité | Abidjan",
  description:
    "Djaigai numérise le circuit du linge et du ménage à Abidjan. Réservez, suivez et payez vos pressings, blanchisseurs, Fanico et aides ménagères. Chaque étape laisse une preuve.",
  keywords: [
    "Djaigai",
    "pressing Abidjan",
    "blanchisserie",
    "Fanico",
    "linge",
    "ménage",
    "Côte d'Ivoire",
    "lavage",
    "repassage",
  ],
  openGraph: {
    title: "Djaigai — Votre linge, notre priorité",
    description:
      "L'application qui numérise le circuit du linge et du ménage à Abidjan. Fini les vêtements perdus et les prix flous.",
    type: "website",
    locale: "fr_CI",
    siteName: "Djaigai",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)] bg-cream-50 text-navy-800">
        {children}
      </body>
    </html>
  );
}
