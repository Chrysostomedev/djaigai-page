/* ═══════════════════════════════════════════════════════
   Mock data — Données fictives pour le dashboard admin
   ═══════════════════════════════════════════════════════ */

export interface DjaigaiUser {
  id: string;
  name: string;
  phone: string;
  type: "client" | "pressing" | "blanchisseur" | "fanico";
  status: "actif" | "en_verification" | "suspendu";
  quartier: string;
  dateInscription: string;
  commandesTotal: number;
  revenus?: number;
  note?: number;
}

export const mockUsers: DjaigaiUser[] = [
  { id: "U-001", name: "Awa Koné", phone: "+225 07 12 34 56", type: "client", status: "actif", quartier: "Cocody", dateInscription: "2026-09-15", commandesTotal: 12, note: 4.5 },
  { id: "U-002", name: "Yao Kouassi", phone: "+225 05 98 76 54", type: "client", status: "actif", quartier: "Plateau", dateInscription: "2026-09-20", commandesTotal: 8, note: 4.8 },
  { id: "U-003", name: "Mme Traoré", phone: "+225 01 23 45 67", type: "client", status: "actif", quartier: "Marcory", dateInscription: "2026-10-01", commandesTotal: 3 },
  { id: "U-004", name: "Ibrahim Diallo", phone: "+225 07 55 44 33", type: "client", status: "actif", quartier: "Yopougon", dateInscription: "2026-10-10", commandesTotal: 5 },

  { id: "P-001", name: "Pressing Éclat", phone: "+225 27 22 33 44", type: "pressing", status: "actif", quartier: "Cocody", dateInscription: "2026-08-01", commandesTotal: 145, revenus: 1250000, note: 4.6 },
  { id: "P-002", name: "Net & Propre", phone: "+225 27 33 44 55", type: "pressing", status: "actif", quartier: "Plateau", dateInscription: "2026-08-15", commandesTotal: 89, revenus: 780000, note: 4.2 },
  { id: "P-003", name: "Pressing Lumière", phone: "+225 27 44 55 66", type: "pressing", status: "en_verification", quartier: "Treichville", dateInscription: "2026-10-20", commandesTotal: 0 },

  { id: "B-001", name: "Moussa le Blanc", phone: "+225 05 11 22 33", type: "blanchisseur", status: "actif", quartier: "Yopougon", dateInscription: "2026-09-01", commandesTotal: 67, revenus: 320000, note: 4.4 },
  { id: "B-002", name: "Blanchisserie du Marché", phone: "+225 07 66 77 88", type: "blanchisseur", status: "actif", quartier: "Adjamé", dateInscription: "2026-09-10", commandesTotal: 34, revenus: 185000, note: 3.9 },
  { id: "B-003", name: "Tonton Koffi", phone: "+225 05 44 33 22", type: "blanchisseur", status: "en_verification", quartier: "Abobo", dateInscription: "2026-10-18", commandesTotal: 0 },

  { id: "F-001", name: "Fatou Bamba", phone: "+225 01 99 88 77", type: "fanico", status: "actif", quartier: "Cocody", dateInscription: "2026-08-20", commandesTotal: 42, revenus: 210000, note: 4.7 },
  { id: "F-002", name: "Aminata Soro", phone: "+225 07 11 33 55", type: "fanico", status: "actif", quartier: "Riviera", dateInscription: "2026-09-05", commandesTotal: 28, revenus: 140000, note: 4.3 },
  { id: "F-003", name: "Marie-Claire N'Guessan", phone: "+225 01 22 44 66", type: "fanico", status: "suspendu", quartier: "Marcory", dateInscription: "2026-09-15", commandesTotal: 11, revenus: 55000, note: 3.2 },
  { id: "F-004", name: "Djénéba Coulibaly", phone: "+225 05 88 99 00", type: "fanico", status: "en_verification", quartier: "Plateau", dateInscription: "2026-10-22", commandesTotal: 0 },
];

export interface DjaigaiOrder {
  id: string;
  clientName: string;
  prestataireName: string;
  type: "lavage" | "repassage" | "menage" | "chaussures";
  status: "deposé" | "en_cours" | "prêt" | "remis" | "annulé";
  articles: number;
  montant: number;
  date: string;
  quartier: string;
}

export const mockOrders: DjaigaiOrder[] = [
  { id: "DJ-2041", clientName: "Awa Koné", prestataireName: "Pressing Éclat", type: "lavage", status: "remis", articles: 7, montant: 5400, date: "2026-10-25", quartier: "Cocody" },
  { id: "DJ-2042", clientName: "Yao Kouassi", prestataireName: "Net & Propre", type: "repassage", status: "prêt", articles: 5, montant: 3500, date: "2026-10-25", quartier: "Plateau" },
  { id: "DJ-2043", clientName: "Mme Traoré", prestataireName: "Fatou Bamba", type: "menage", status: "en_cours", articles: 0, montant: 8000, date: "2026-10-26", quartier: "Marcory" },
  { id: "DJ-2044", clientName: "Ibrahim Diallo", prestataireName: "Moussa le Blanc", type: "lavage", status: "deposé", articles: 12, montant: 9800, date: "2026-10-26", quartier: "Yopougon" },
  { id: "DJ-2045", clientName: "Awa Koné", prestataireName: "Aminata Soro", type: "menage", status: "en_cours", articles: 0, montant: 6000, date: "2026-10-26", quartier: "Cocody" },
  { id: "DJ-2046", clientName: "Yao Kouassi", prestataireName: "Pressing Éclat", type: "lavage", status: "deposé", articles: 4, montant: 3200, date: "2026-10-26", quartier: "Cocody" },
  { id: "DJ-2047", clientName: "Ibrahim Diallo", prestataireName: "Blanchisserie du Marché", type: "chaussures", status: "annulé", articles: 2, montant: 2000, date: "2026-10-24", quartier: "Adjamé" },
];

export const mockStats = {
  totalUsers: 14,
  totalClients: 4,
  totalPressings: 3,
  totalBlanchisseurs: 3,
  totalFanico: 4,
  totalCommandes: 7,
  commandesEnCours: 2,
  commandesAujourdhui: 4,
  revenusTotal: 2940000,
  revenusSemaine: 37900,
  enVerification: 3,
  quartiersActifs: ["Cocody", "Plateau", "Marcory", "Yopougon", "Adjamé", "Abobo", "Treichville", "Riviera"],
};
