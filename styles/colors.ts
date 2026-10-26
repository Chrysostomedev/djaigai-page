// Djaigai — Design Tokens : Couleurs
// Source unique pour toutes les couleurs du site

export const colors = {
  // Primaires — Bleu marine profond (confiance, sérieux)
  navy: {
    50: '#E8EDF5',
    100: '#C5D0E6',
    200: '#9FAED4',
    300: '#7A8DC2',
    400: '#5E74B5',
    500: '#1B2E5A', // Couleur principale du logo
    600: '#162648',
    700: '#111D37',
    800: '#0B1325',
    900: '#060A14',
  },

  // Secondaires — Vert Djaigai (propreté, fraîcheur, nature)
  green: {
    50: '#E6F7F0',
    100: '#C0ECD9',
    200: '#96E0C0',
    300: '#6CD4A7',
    400: '#4DCA94',
    500: '#0FA968', // Couleur verte du logo
    600: '#0D9159',
    700: '#0A7849',
    800: '#075E3A',
    900: '#04452B',
  },

  // Accent — Teal (variante pour badges, hover)
  teal: {
    50: '#E0F5F2',
    100: '#B3E6DD',
    200: '#80D6C8',
    300: '#4DC6B2',
    400: '#26BAA2',
    500: '#00AE92',
    600: '#009A82',
    700: '#00826E',
    800: '#006A5A',
    900: '#004F43',
  },

  // Neutres
  neutral: {
    0: '#FFFFFF',
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },

  // Fond crème (chaleur africaine)
  cream: {
    50: '#FFFDF8',
    100: '#FFF9ED',
    200: '#FFF3DB',
    300: '#FFEDC9',
    400: '#FFE4B0',
  },

  // Statuts
  status: {
    new: '#3B82F6',        // Bleu
    inProgress: '#F59E0B', // Ambre
    ready: '#10B981',      // Vert
    delivered: '#6366F1',  // Indigo
    cancelled: '#EF4444',  // Rouge
  },

  // Paiement mobile
  payment: {
    orangeMoney: '#FF6600',
    mtnMomo: '#FFCC00',
    wave: '#1DC3E3',
    cash: '#6B7280',
  },
} as const;

export type ColorToken = typeof colors;
