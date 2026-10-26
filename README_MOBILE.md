# Djaigai

> **Votre linge, notre priorité.**
> Application mobile (Expo / React Native) qui numérise le circuit du linge et du ménage à Abidjan : le client réserve, suit et paie ; le prestataire remplace son cahier par un outil simple. **Chaque étape laisse une preuve.**

---

## Sommaire

1. [Produit](#1-produit)
2. [Profils et parcours](#2-profils-et-parcours)
3. [Périmètre MVP](#3-périmètre-mvp)
4. [Stack technique](#4-stack-technique)
5. [Arborescence cible](#5-arborescence-cible)
6. [Routage (Expo Router)](#6-routage-expo-router)
7. [Correspondance maquettes → routes](#7-correspondance-maquettes--routes)
8. [Règles d'architecture](#8-règles-darchitecture)
9. [Gestion de l'état, des API et des erreurs](#9-gestion-de-létat-des-api-et-des-erreurs)
10. [Sécurité](#10-sécurité)
11. [Accessibilité, performance, hors-ligne](#11-accessibilité-performance-hors-ligne)
12. [Tests et qualité](#12-tests-et-qualité)
13. [Conventions de code](#13-conventions-de-code)
14. [Démarrage](#14-démarrage)
15. [Plan d'implémentation priorisé](#15-plan-dimplémentation-priorisé)
16. [Décisions ouvertes](#16-décisions-ouvertes)

---

## 1. Produit

### Problème (étude terrain, Abidjan)

| Douleur | Réponse Djaigai |
|---|---|
| Vêtements disparus ou échangés | Ticket numéroté, photos et comptage au dépôt, code PIN à la remise |
| « Le tonton n'est pas là », retards | Statuts horodatés en direct, notification, heure de fin annoncée |
| Déplacements pour rien | Notification « prêt à récupérer » (collecte/livraison à domicile en V2) |
| Confiance par bouche à oreille | Profils vérifiés, notes, historique, litige appuyé par les photos du dépôt |
| Prix flous, cash, cahier papier | Barème par article, Orange Money / MTN MoMo / Wave, reçu, caisse digitale |
| Le week-end, c'est la loterie | Réservation de créneaux, prestataire du quartier |
| Réseau instable, petit budget | Application légère, connexion par code SMS, mode hors-ligne (cible) |

### Principe directeur

Une **preuve à chaque geste** : Réserver → Déposer (ticket + photos) → Suivre (statut horodaté) → Récupérer (PIN) → Payer et noter (reçu + avis).

---

## 2. Profils et parcours

Trois profils sont visibles dans les maquettes (écran « Choix du profil »), plus un quatrième côté infrastructure.

| Profil | Libellé UI | Dossier de routes | Maquettes |
|---|---|---|---|
| Client | « Je fais laver mon linge » | `client/` | L1-05, L1-06 |
| Pressing | « Je suis blanchisseur ou pressing » | `pressing/` | L1-07 → L1-10, L2-01 → L2-10 |
| Blanchisseur de quartier | idem, sous-type d'activité | `blanchisseur/` | mêmes écrans que pressing |
| Fanico / aide ménagère | « Je suis Fanico ou aide ménagère » | `fanico/` | L3-01 → L3-10 |

> **Décision d'architecture :** `pressing/` et `blanchisseur/` partagent le même module métier (`features/establishment`). Les fichiers de route sont de fines façades qui réexportent les écrans partagés. Aucune duplication de logique.

### Parcours transverses

- **Onboarding** : Accueil → Choix du profil → Téléphone → Code SMS → complétion du profil selon le rôle.
- **Client** : Accueil (catégories) → Réservation → Suivi → Récupération (PIN) → Paiement/avis.
- **Pressing / blanchisseur** : Tableau de bord → Nouveau dépôt (client → articles → photos → récapitulatif) → Ticket (QR + WhatsApp) → Détail/chronologie → Remise (PIN + paiement) → Caisse → Profil établissement.
- **Fanico / ménage** : Zones et disponibilités → Tarifs → Vérification → Missions (accepter/refuser) → Mission en cours (photos de fin) → Gains.

---

## 3. Périmètre MVP

### Dans le MVP

- Authentification par téléphone + code SMS (OTP), sessions sécurisées
- Choix du profil et inscription pro en étapes (avec dossier de vérification)
- Pressing/blanchisseur : dépôt avec comptage et photos, ticket numéroté + QR, suivi de statuts, remise avec PIN, enregistrement du mode de paiement, caisse du jour/semaine, profil établissement
- Fanico/ménage : profil, zones, disponibilités, tarifs, missions, agenda, mission en cours, gains
- Client : profil, accueil par catégories, liste et suivi de ses commandes
- Notifications de changement de statut
- États de chargement, vides, d'erreur, hors connexion

### Hors MVP (à ne pas construire maintenant)

- Paiement mobile intégré en production (Orange Money, MTN MoMo, Wave) : on enregistre d'abord le **mode** de paiement, l'intégration passe par un agrégateur en V2
- Collecte et livraison à domicile avec géolocalisation temps réel
- Abonnement hebdomadaire
- Messagerie intégrée (l'onglet « Messages » client reste un emplacement tant que non spécifié)
- Back-office d'administration (la vérification des dossiers se fait côté serveur)

---

## 4. Stack technique

| Domaine | Choix | Justification |
|---|---|---|
| Framework | **Expo SDK 57** + Expo Go | Imposé ; itération rapide |
| Langage | **TypeScript strict** | Sécurité de typage de bout en bout |
| Navigation | **Expo Router** (fichiers dans `src/app`) | Standard Expo, deep links gratuits |
| Données serveur | **TanStack Query** | Cache, retry, états loading/error ; évite un store global pour l'API |
| État global léger | **React Context** (auth, toasts, préférences) | Demandé ; suffisant pour ces besoins |
| Formulaires | **react-hook-form** + **zod** | Validation déclarative, schémas réutilisés pour typer les réponses API |
| Stockage sécurisé | **expo-secure-store** | Jetons d'accès/rafraîchissement |
| Stockage non sensible | **@react-native-async-storage/async-storage** | Préférences, brouillons de dépôt (hors-ligne) |
| Photos | **expo-image-picker** / **expo-camera** + **expo-image** | Photos de dépôt et fin de mission |
| QR code | **react-native-qrcode-svg** | Ticket de dépôt |
| Notifications | **expo-notifications** | Statuts de commande |
| Tests | **jest-expo** + **@testing-library/react-native** | Outillage officiel Expo |
| Qualité | ESLint (config Expo), Prettier | Cohérence |

**Styling.** Le fichier `src/global.css` présent dans ton projet laisse penser que le template inclut déjà une couche de styles (probablement Tailwind via NativeWind/Uniwind). **À vérifier dans `package.json`** avant d'ajouter quoi que ce soit. Dans tous les cas, les valeurs de design vivent dans `src/theme/` (source unique), et les composants `ui/` sont la seule couche qui les consomme directement.

> Toute dépendance ci-dessus doit être installée via `npx expo install <paquet>` pour garantir la compatibilité avec le SDK 57.

---

## 5. Arborescence cible

Existant conservé : `.claude/`, `.vscode/`, `assets/`, `scripts/`, `src/app`, `src/components`, `src/constants`, `src/hooks`, `src/global.css`, `AGENTS.md`, `app.json`, `package.json`, `tsconfig.json`, `LICENSE`.
Tout le reste est à créer. `src/constants/` est **absorbé par `src/theme/`** (voir §8).

```
djaigai/
├── .claude/
├── .vscode/
├── assets/
│   ├── images/
│   │   ├── logo.png                      # Logo complet (cintre + wordmark)
│   │   ├── icon.png                      # Icône application
│   │   ├── splash-icon.png
│   │   ├── adaptive-icon.png             # Android
│   │   └── onboarding/                   # Illustrations
│   ├── icons/
│   │   └── payments/                     # orange-money, mtn-momo, wave
│   └── fonts/                            # Polices si non chargées via Expo Google Fonts
│
├── scripts/                              # Scripts utilitaires (reset-project, etc.)
│
├── src/
│   ├── app/                              # ROUTES UNIQUEMENT (fines, sans logique)
│   │   ├── _layout.tsx                   # Providers + garde d'authentification
│   │   ├── index.tsx                     # Redirection selon session/rôle
│   │   ├── +not-found.tsx
│   │   │
│   │   ├── (public)/                     # Non authentifié
│   │   │   ├── _layout.tsx
│   │   │   ├── welcome.tsx               # L1-01 Accueil
│   │   │   ├── choose-role.tsx           # L1-02 Choix du profil
│   │   │   ├── phone.tsx                 # L1-03 Numéro de téléphone
│   │   │   └── verify-otp.tsx            # L1-04 Code SMS
│   │   │
│   │   ├── client/                       # Particuliers et familles
│   │   │   ├── _layout.tsx               # Garde rôle = client
│   │   │   ├── onboarding.tsx            # L1-05 Profil client
│   │   │   ├── (tabs)/
│   │   │   │   ├── _layout.tsx           # Accueil | Commandes | Messages | Profil
│   │   │   │   ├── index.tsx             # L1-06 Accueil client (catégories)
│   │   │   │   ├── orders.tsx
│   │   │   │   ├── messages.tsx          # Emplacement (hors MVP)
│   │   │   │   └── profile.tsx
│   │   │   └── orders/
│   │   │       └── [orderId].tsx         # Suivi d'une commande
│   │   │
│   │   ├── pressing/                     # Pressing
│   │   │   ├── _layout.tsx               # Garde rôle = pressing
│   │   │   ├── onboarding/
│   │   │   │   ├── _layout.tsx           # Stepper 1/4 → 4/4
│   │   │   │   ├── activity.tsx          # L1-07 Type d'activité
│   │   │   │   ├── establishment.tsx     # L1-08 Informations établissement
│   │   │   │   ├── services.tsx          # L1-09 Services et tarifs
│   │   │   │   └── payments-kyc.tsx      # L1-10 Paiements et pièces
│   │   │   ├── (tabs)/
│   │   │   │   ├── _layout.tsx           # Commandes | Caisse | Clients | Profil
│   │   │   │   ├── index.tsx             # L2-01 Tableau de bord
│   │   │   │   ├── orders.tsx            # L2-02 Liste des commandes
│   │   │   │   ├── cash.tsx              # L2-09 Caisse
│   │   │   │   ├── clients.tsx
│   │   │   │   └── profile.tsx           # L2-10 Profil établissement
│   │   │   ├── deposit/
│   │   │   │   ├── _layout.tsx           # Stepper dépôt (état partagé)
│   │   │   │   ├── client.tsx            # L2-03 Étape client
│   │   │   │   ├── items.tsx             # L2-04 Articles
│   │   │   │   ├── photos.tsx            # L2-05 Photos et comptage
│   │   │   │   └── ticket/[orderId].tsx  # L2-06 Ticket généré
│   │   │   └── orders/
│   │   │       └── [orderId]/
│   │   │           ├── index.tsx         # L2-07 Détail d'une commande
│   │   │           └── handover.tsx      # L2-08 Remise au client
│   │   │
│   │   ├── blanchisseur/                 # Blanchisseur de quartier
│   │   │   └── …                         # Même structure que pressing/ ;
│   │   │                                 # chaque fichier réexporte l'écran
│   │   │                                 # de features/establishment
│   │   │
│   │   └── fanico/                       # Fanico, ménage, repassage à domicile
│   │       ├── _layout.tsx               # Garde rôle = fanico
│   │       ├── onboarding/
│   │       │   ├── _layout.tsx
│   │       │   ├── activity.tsx          # L3-01 Type d'activité
│   │       │   ├── presentation.tsx      # L3-02 Présentation
│   │       │   ├── zones.tsx             # L3-03 Zones et disponibilités
│   │       │   ├── pricing.tsx           # L3-04 Tarifs
│   │       │   └── verification.tsx      # L3-05 Vérification
│   │       ├── (tabs)/
│   │       │   ├── _layout.tsx           # Missions | Agenda | Gains | Profil
│   │       │   ├── index.tsx             # L3-06 Missions, accueil
│   │       │   ├── agenda.tsx            # L3-08 Agenda de la semaine
│   │       │   ├── earnings.tsx          # L3-10 Gains
│   │       │   └── profile.tsx
│   │       └── missions/
│   │           └── [missionId]/
│   │               ├── index.tsx         # L3-07 Détail d'une mission
│   │               └── in-progress.tsx   # L3-09 Mission en cours
│   │
│   ├── components/                       # UI RÉUTILISABLE, aucune logique métier
│   │   ├── ui/                           # Primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Icon.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx                 # Statuts : Nouveau, En cours, Prête…
│   │   │   ├── Chip.tsx                  # Filtres, quartiers, jours
│   │   │   ├── Divider.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Stepper.tsx               # 1/4 … 4/4
│   │   │   ├── Switch.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Screen.tsx                # SafeArea + scroll + clavier
│   │   │   ├── ScreenHeader.tsx
│   │   │   ├── Stack.tsx                 # Espacements cohérents
│   │   │   ├── Footer.tsx                # Barre d'action fixe en bas
│   │   │   └── TabBarIcon.tsx
│   │   ├── cards/
│   │   │   ├── OrderCard.tsx
│   │   │   ├── MissionCard.tsx
│   │   │   ├── StatCard.tsx              # 4 Nouvelles / 9 En cours / 3 À livrer
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── CategoryCard.tsx          # Pressing, Chaussures, Ménage…
│   │   │   ├── ProfileCard.tsx
│   │   │   └── TransactionCard.tsx
│   │   ├── sections/
│   │   │   ├── SectionHeader.tsx         # Titre + « Voir tout »
│   │   │   ├── OrderTimeline.tsx         # Chronologie dépôt → remis
│   │   │   ├── PriceSummary.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   └── OpeningHours.tsx
│   │   ├── form/
│   │   │   ├── FormField.tsx             # Label + erreur + a11y
│   │   │   ├── TextInput.tsx
│   │   │   ├── PhoneInput.tsx            # +225
│   │   │   ├── OtpInput.tsx              # 6 cases
│   │   │   ├── PinInput.tsx              # 4 cases
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── RadioCard.tsx             # Choix de profil / activité
│   │   │   ├── QuantityStepper.tsx       # − 1 +
│   │   │   ├── PhotoPicker.tsx
│   │   │   └── DayTimeSlotPicker.tsx
│   │   ├── modals/
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── BottomSheet.tsx
│   │   │   ├── PaymentMethodSheet.tsx
│   │   │   └── ImageViewer.tsx
│   │   ├── special/                      # Composants à identité Djaigai
│   │   │   ├── Logo.tsx
│   │   │   ├── TicketQr.tsx              # Ticket + QR du dépôt
│   │   │   ├── PaymentMethodBadge.tsx    # Orange Money, MTN MoMo, Wave
│   │   │   ├── PaymentDonut.tsx          # Répartition de la caisse
│   │   │   ├── RatingStars.tsx
│   │   │   ├── VerificationBanner.tsx    # « En vérification »
│   │   │   └── StatusPill.tsx
│   │   └── feedback/
│   │       ├── EmptyState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── OfflineBanner.tsx
│   │       ├── Toast.tsx
│   │       └── ErrorBoundary.tsx
│   │
│   ├── features/                         # LOGIQUE MÉTIER par domaine
│   │   ├── auth/
│   │   │   ├── api.ts                    # requestOtp, verifyOtp, refresh, logout
│   │   │   ├── schemas.ts                # zod : téléphone, OTP
│   │   │   ├── hooks.ts                  # useRequestOtp, useVerifyOtp
│   │   │   ├── screens/                  # WelcomeScreen, PhoneScreen…
│   │   │   └── types.ts
│   │   ├── profile/                      # Profil client / pro
│   │   ├── establishment/                # Pressing + blanchisseur (partagé)
│   │   │   ├── onboarding/               # Écrans et schémas des 4 étapes
│   │   │   ├── dashboard/
│   │   │   ├── cash/                     # Caisse
│   │   │   ├── clients/
│   │   │   └── screens/
│   │   ├── orders/                       # Cœur métier
│   │   │   ├── api.ts
│   │   │   ├── schemas.ts
│   │   │   ├── hooks.ts                  # useOrders, useCreateDeposit, useAdvanceStatus
│   │   │   ├── state-machine.ts          # Déposé → Lavage → Repassage → Prêt → Remis
│   │   │   ├── deposit/                  # Brouillon de dépôt (contexte + persistance)
│   │   │   ├── handover/                 # Validation PIN
│   │   │   ├── screens/
│   │   │   └── types.ts
│   │   ├── catalog/                      # Barème : articles, services, prix
│   │   ├── fanico/                       # Missions, agenda, zones, gains
│   │   │   ├── api.ts
│   │   │   ├── hooks.ts
│   │   │   ├── onboarding/
│   │   │   └── screens/
│   │   ├── payments/                     # Modes de paiement, reçu, retrait gains
│   │   ├── reviews/
│   │   └── notifications/
│   │
│   ├── context/                          # État global léger
│   │   ├── AuthContext.tsx               # Session, rôle, signIn/signOut
│   │   ├── ToastContext.tsx              # Feedback utilisateur centralisé
│   │   ├── NetworkContext.tsx            # En ligne / hors ligne
│   │   ├── PreferencesContext.tsx
│   │   └── AppProviders.tsx              # Composition de tous les providers
│   │
│   ├── theme/                            # Source unique du design
│   │   ├── colors.ts                     # Bleu marine, vert, fonds crème, statuts
│   │   ├── typography.ts                 # Familles, tailles, graisses, interlignes
│   │   ├── spacing.ts
│   │   ├── radius.ts
│   │   ├── shadows.ts
│   │   ├── layout.ts                     # Tailles de zone tactile, largeurs
│   │   ├── motion.ts                     # Durées d'animation
│   │   ├── fonts.ts                      # Chargement des polices
│   │   └── index.ts
│   │
│   ├── lib/                              # Infrastructure transverse
│   │   ├── api/
│   │   │   ├── client.ts                 # fetch typé, timeout, en-têtes
│   │   │   ├── interceptors.ts           # Refresh de jeton, 401
│   │   │   ├── errors.ts                 # AppError, mapping HTTP → message FR
│   │   │   └── query-client.ts           # Config TanStack Query
│   │   ├── storage/
│   │   │   ├── secure-storage.ts         # expo-secure-store
│   │   │   └── storage.ts                # AsyncStorage typé
│   │   ├── validation/
│   │   │   ├── phone.ts                  # Format ivoirien +225
│   │   │   └── common.ts
│   │   ├── format/
│   │   │   ├── currency.ts               # 5 400 FCFA
│   │   │   ├── date.ts                   # Locale fr-CI
│   │   │   └── phone.ts
│   │   ├── config/
│   │   │   └── env.ts                    # Lecture + validation de EXPO_PUBLIC_*
│   │   ├── logger.ts
│   │   ├── analytics.ts                  # Interface (implémentation décidée plus tard)
│   │   └── permissions.ts                # Caméra, notifications
│   │
│   ├── hooks/                            # Hooks génériques (pas métier)
│   │   ├── useDebounce.ts
│   │   ├── useKeyboard.ts
│   │   ├── useCountdown.ts               # « Renvoyer dans 0:45 »
│   │   ├── useRefreshOnFocus.ts
│   │   └── useColorScheme.ts
│   │
│   ├── data/                             # DONNÉES MOCKÉES (développement uniquement)
│   │   ├── README.md                     # Règles d'usage des mocks
│   │   ├── repositories.ts               # Choisit mock ou API selon l'env
│   │   ├── fixtures/
│   │   │   ├── orders.ts
│   │   │   ├── catalog.ts                # Chemise 1 000, Pantalon 1 000…
│   │   │   ├── missions.ts
│   │   │   ├── neighborhoods.ts          # Cocody, Plateau, Yopougon, Marcory…
│   │   │   ├── reviews.ts
│   │   │   └── users.ts
│   │   └── handlers/                     # Faux « serveur » en mémoire
│   │
│   ├── types/
│   │   ├── global.d.ts
│   │   └── env.d.ts
│   │
│   └── global.css                        # Existant (voir §4)
│
├── __tests__/                            # Tests transverses et utilitaires
│   ├── setup.ts
│   ├── test-utils.tsx                    # render avec providers
│   └── e2e/                              # Parcours critiques (plus tard)
│
├── .env.example                          # Variables publiques documentées
├── .gitignore
├── AGENTS.md
├── app.json                              # (ou app.config.ts si config dynamique)
├── babel.config.js                       # Si requis par la couche de styles
├── eslint.config.js
├── jest.config.js
├── LICENSE
├── package.json
├── README.md
└── tsconfig.json                         # strict + alias @/*
```

### Alias TypeScript

```jsonc
// tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "paths": { "@/*": ["./src/*"], "@/assets/*": ["./assets/*"] }
  }
}
```

---

## 6. Routage (Expo Router)

| Choix | Raison |
|---|---|
| `(public)` est un **groupe** (parenthèses) | N'ajoute pas de segment à l'URL ; `/welcome`, `/phone` |
| `client/`, `pressing/`, `blanchisseur/`, `fanico/` sont de **vrais segments** | Évite les collisions de `index.tsx` entre rôles ; URL lisibles (`/pressing/orders/DJ-2041`) |
| `(tabs)` dans chaque rôle | Barre d'onglets propre au rôle (4 onglets dans les maquettes) |
| `onboarding/` avec `_layout.tsx` | Stepper commun, navigation arrière cohérente |
| `app/index.tsx` | Unique point de redirection (non connecté → `/welcome`, sinon vers le dossier du rôle) |

### Gardes d'accès

- `app/_layout.tsx` lit `AuthContext` : tant que la session se charge, on garde le splash ; sinon `Stack.Protected` (ou redirection) selon `isAuthenticated`.
- Chaque `_layout.tsx` de rôle vérifie `session.role` et renvoie vers son dossier propre en cas de mauvais rôle.
- Les profils pro avec dossier non validé sont redirigés vers l'écran « En vérification » tant que `verificationStatus !== 'approved'`.

### Règle des fichiers de route

Un fichier dans `src/app/` fait **au maximum** : importer un écran depuis `features/*/screens` et l'exporter par défaut.

```tsx
// src/app/pressing/(tabs)/index.tsx
export { default } from '@/features/establishment/screens/DashboardScreen';
```

---

## 7. Correspondance maquettes → routes

### Série L1 : onboarding, client, inscription pro

| Maquette | Écran | Route |
|---|---|---|
| L1-01 | Accueil | `/welcome` |
| L1-02 | Choix du profil | `/choose-role` |
| L1-03 | Numéro de téléphone | `/phone` |
| L1-04 | Code SMS | `/verify-otp` |
| L1-05 | Profil client | `/client/onboarding` |
| L1-06 | Accueil client | `/client` |
| L1-07 | Inscription pro 1/4 | `/pressing/onboarding/activity` |
| L1-08 | Inscription pro 2/4 | `/pressing/onboarding/establishment` |
| L1-09 | Inscription pro 3/4 | `/pressing/onboarding/services` |
| L1-10 | Inscription pro 4/4 | `/pressing/onboarding/payments-kyc` |

### Série L2 : pressing / blanchisseur

| Maquette | Écran | Route |
|---|---|---|
| L2-01 | Tableau de bord du jour | `/pressing` |
| L2-02 | Liste des commandes | `/pressing/orders` |
| L2-03 | Nouveau dépôt, client | `/pressing/deposit/client` |
| L2-04 | Nouveau dépôt, articles | `/pressing/deposit/items` |
| L2-05 | Photos et comptage | `/pressing/deposit/photos` |
| L2-06 | Ticket généré | `/pressing/deposit/ticket/[orderId]` |
| L2-07 | Détail d'une commande | `/pressing/orders/[orderId]` |
| L2-08 | Remise au client | `/pressing/orders/[orderId]/handover` |
| L2-09 | Caisse | `/pressing/cash` |
| L2-10 | Profil de l'établissement | `/pressing/profile` |

### Série L3 : Fanico / ménage / repassage

| Maquette | Écran | Route |
|---|---|---|
| L3-01 | Type d'activité | `/fanico/onboarding/activity` |
| L3-02 | Présentation | `/fanico/onboarding/presentation` |
| L3-03 | Zones et disponibilités | `/fanico/onboarding/zones` |
| L3-04 | Tarifs | `/fanico/onboarding/pricing` |
| L3-05 | Vérification | `/fanico/onboarding/verification` |
| L3-06 | Missions, accueil | `/fanico` |
| L3-07 | Détail d'une mission | `/fanico/missions/[missionId]` |
| L3-08 | Agenda de la semaine | `/fanico/agenda` |
| L3-09 | Mission en cours | `/fanico/missions/[missionId]/in-progress` |
| L3-10 | Gains | `/fanico/earnings` |

### Incohérences relevées dans les maquettes (à corriger avant d'implémenter)

- **L1-09** est étiqueté « 2/4 » dans l'en-tête de la barre de progression ; ce devrait être « 3/4 ».
- **L2-06 / L2-05** : date « 25 octobre 2025 », alors que la date réelle est 2026. Les dates doivent venir des données, pas du texte figé.
- **L2-04** : « Sous-total 5 400 FCFA » avec 7 lignes dont les prix visibles sont 1 000, 1 000, 1 500, 800, 1 000, 1 100, 1 000 (= 7 400 FCFA). Le calcul doit être fait par `PriceSummary`, jamais saisi à la main.
- **L2-09** : 6 modes de paiement affichés totalisent 68 500 FCFA mais les pourcentages sont arrondis (47/27/18/9 = 101 %). Prévoir un arrondi cohérent.
- **L3-08** : le calendrier affiche samedi 25 et dimanche 26 octobre avec lundi 20 : cohérent avec 2025, pas avec 2026.

---

## 8. Règles d'architecture

1. **Séparation stricte en 3 couches**
   - **UI** (`components/`) : ne connaît ni API ni règles métier. Reçoit des props.
   - **Logique métier** (`features/*/hooks.ts`, `state-machine.ts`, `schemas.ts`) : testable sans rendu.
   - **Données** (`features/*/api.ts` + `lib/api`) : seule couche qui parle au réseau.
2. **Sens des dépendances** : `app → features → components / lib / theme`. `components` ne dépend jamais de `features`. `lib` ne dépend de rien d'applicatif.
3. **`constants/` est fusionné dans `theme/`** : un seul endroit pour le design, pas deux. Le code existant (`explore.tsx`, composants du template) est migré puis `constants/` est supprimé.
4. **Pas de mock permanent** : `data/` n'est utilisé que lorsque `EXPO_PUBLIC_USE_MOCKS=true`. `features/*/api.ts` appelle `data/repositories.ts`, qui bascule vers la vraie API. Les mocks sont exclus du chemin de production par construction.
5. **Pas de duplication entre pressing et blanchisseur** : un seul module `features/establishment`, deux façades de routes.
6. **Un composant, un rôle** : si un composant `ui/` a besoin de savoir ce qu'est une « commande », il appartient à `cards/` ou `special/`.
7. **Pas de sur-ingénierie** : pas de Redux, pas de couche « use-case » abstraite, pas de bibliothèque de composants tierce tant qu'un besoin réel ne l'impose pas.

---

## 9. Gestion de l'état, des API et des erreurs

| Type d'état | Outil | Exemple |
|---|---|---|
| Données serveur | TanStack Query | Commandes, missions, caisse |
| Session | `AuthContext` | Utilisateur, rôle, jetons |
| Brouillon multi-écrans | Contexte local au dossier `deposit/` + persistance | Dépôt en cours (client, articles, photos) |
| Formulaire | react-hook-form | Champs et erreurs d'un écran |
| UI éphémère | `useState` local | Onglet actif, modale ouverte |

### Appels API

- Un seul client (`lib/api/client.ts`) : base URL depuis `env.ts`, timeout, en-tête d'authentification, annulation.
- **Toute réponse est validée par un schéma zod** avant d'atteindre l'UI (pas de `as` aveugle).
- Les erreurs sont normalisées en `AppError { code, message, retryable }` avec des messages français explicites (« Pas de connexion », « Code incorrect », « Session expirée »).
- Mutations critiques (création de dépôt, remise) : **clé d'idempotence** pour éviter les doublons en cas de réseau instable.

### Chargements, vides, erreurs

Chaque écran de liste ou de détail gère explicitement **4 états** : chargement (`Skeleton`), vide (`EmptyState` avec action), erreur (`ErrorState` avec « Réessayer »), succès. Un `ErrorBoundary` racine capture les erreurs de rendu.

### Feedback utilisateur

`ToastContext` est le seul canal de confirmation/erreur éphémère (« Dépôt enregistré », « Ticket envoyé sur WhatsApp »). Actions destructrices ou irréversibles (remise, refus de mission) → `ConfirmDialog`.

---

## 10. Sécurité

- **Jetons** dans `expo-secure-store` uniquement ; jamais dans `AsyncStorage` ni dans les logs.
- **OTP** : limitation du renvoi côté UI (compte à rebours) **et** côté serveur ; code à usage unique, durée courte.
- **Code PIN de remise** : généré côté serveur, jamais stocké en clair sur l'appareil, comparé côté serveur.
- **Pièces d'identité** : envoi direct vers le serveur par URL signée, non conservées localement, non journalisées.
- **Variables d'environnement** : seules les valeurs `EXPO_PUBLIC_*` sont dans l'app ; **aucun secret** dans le binaire.
- **Validation** : toute donnée entrante et sortante passe par zod ; saisies normalisées (téléphone au format E.164 `+225…`).
- **Autorisation** : le rôle côté client sert à l'UX uniquement. Les droits sont appliqués par le serveur.
- **Données personnelles** : consentement et information à l'inscription (clients et prestataires). À cadrer avec la réglementation ivoirienne applicable. Ce README ne contient pas d'avis juridique.
- **Journalisation** : `logger.ts` masque téléphones, jetons et identifiants.

---

## 11. Accessibilité, performance, hors-ligne

### Accessibilité

- Zones tactiles ≥ 44 pt, contrastes conformes WCAG AA (vérifier le vert sur fond clair des badges).
- `accessibilityRole`, `accessibilityLabel`, `accessibilityState` fournis par les composants `ui/` ; icônes seules toujours étiquetées.
- Support de l'agrandissement de texte système (pas de hauteurs figées sur le texte).
- Pas de sens porté par la couleur seule : les statuts ont un libellé en plus de la pastille.
- Clavier numérique natif pour téléphone, OTP et PIN, avec remplissage automatique du SMS (`textContentType="oneTimeCode"`).

### Performance

- Listes en `FlatList`/`FlashList` avec `keyExtractor` stable ; cartes mémoïsées.
- Images via `expo-image` avec cache et redimensionnement ; photos de dépôt compressées avant envoi.
- Application légère : on ajoute une dépendance seulement si elle est justifiée (public à budget data limité).
- Hermes activé (défaut Expo) ; surveiller le temps de démarrage.

### Hors-ligne (progressif)

1. **MVP** : détection réseau, bannière, retry, cache de lecture TanStack Query persisté.
2. **V1.x** : file d'attente d'écritures pour le dépôt (créé localement, synchronisé au retour du réseau) : cas critique pour un pressing.

---

## 12. Tests et qualité

| Niveau | Cible | Outil |
|---|---|---|
| Unitaire | `state-machine`, schémas zod, formatage FCFA, calcul de prix | Jest |
| Composant | `ui/`, `form/` (états, accessibilité) | Testing Library |
| Intégration | Parcours dépôt complet, auth OTP | Testing Library + MSW (ou handlers `data/`) |
| E2E | Dépôt → remise ; réservation → suivi | À choisir plus tard (Maestro / Detox) |

**Contrôles avant chaque merge :**

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # expo lint
npm run test        # jest
npx expo-doctor     # cohérence des dépendances avec le SDK
```

---

## 13. Conventions de code

- **Fichiers** : composants en `PascalCase.tsx`, hooks en `useCamelCase.ts`, utilitaires en `kebab-case.ts`, routes selon Expo Router.
- **Exports** : un composant par fichier ; `index.ts` seulement dans `components/ui` et `theme`.
- **Imports** : toujours via l'alias `@/…` ; jamais de chemin relatif remontant (`../../..`).
- **Textes** : français, centralisés si réutilisés ; prévoir i18n seulement si une seconde langue est confirmée.
- **Montants** : entiers en FCFA (pas de décimales), formatés par `lib/format/currency.ts`.
- **Dates** : stockées en ISO UTC, affichées en `Africa/Abidjan`.
- **Commits** : Conventional Commits (`feat:`, `fix:`, `chore:`…).
- **`any` interdit** ; `unknown` + validation à la place.

---

## 14. Démarrage

```bash
npm install
cp .env.example .env            # puis renseigner les valeurs
npx expo start                  # scanner le QR avec Expo Go
```

`.env.example` (à créer) :

```env
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_USE_MOCKS=true
```

`package.json` : scripts attendus (`start`, `android`, `ios`, `lint`, `typecheck`, `test`).

> **Limite d'Expo Go** : les modules natifs non inclus dans Expo Go nécessiteront un *development build*. Les paiements mobiles et certaines notifications push en feront probablement partie. À anticiper dès que ces fonctions entrent en jeu.

---

## 15. Plan d'implémentation priorisé

Règle : **on ne passe à l'étape suivante que si la précédente tourne** (typecheck, lint, tests verts, app lancée dans Expo Go).

| # | Étape | Livrable vérifiable |
|---|---|---|
| 0 | **Socle** : alias, `strict`, scripts, ESLint, Jest, `.env.example` | `typecheck` + `lint` + `test` verts |
| 1 | **Design system** : `theme/`, `ui/`, `layout/`, `form/`, `feedback/` | Écran de démonstration des composants |
| 2 | **Infra** : `lib/api`, `lib/storage`, `env`, `AppProviders`, `ErrorBoundary`, `ToastContext` | Test d'un appel simulé + erreur normalisée |
| 3 | **Auth + routage** : (public), OTP, `AuthContext`, gardes, redirection par rôle | Connexion bout en bout (avec mocks) |
| 4 | **Onboarding pro** : pressing/blanchisseur (L1-07→10) puis Fanico (L3-01→05) | Dossier soumis → « En vérification » |
| 5 | **Cœur pressing** : catalogue, dépôt (L2-03→06), `state-machine`, liste et détail | Dépôt créé, ticket + QR, statut avancé |
| 6 | **Remise + caisse** : PIN, mode de paiement, caisse (L2-08, L2-09) | Remise validée, totaux cohérents |
| 7 | **Fanico** : missions, agenda, mission en cours, gains (L3-06→10) | Mission acceptée → terminée |
| 8 | **Client** : accueil, suivi de commande, avis (L1-05, L1-06) | Client suit un dépôt en direct |
| 9 | **Notifications**, hors-ligne progressif | Notification de statut reçue |
| 10 | **Bascule vers la vraie API**, retrait des mocks du chemin prod, durcissement sécurité | `USE_MOCKS=false` fonctionnel |

---

## 16. Décisions ouvertes

Ces points ne sont **pas** tranchés par les maquettes ni par l'étude. Il faut les décider, pas les deviner.

1. **Backend** : existe-t-il ? (API REST maison, Supabase, Firebase…) Impacte l'auth OTP, les URL signées et le temps réel.
2. **Fournisseur SMS/OTP** et coût par message en Côte d'Ivoire.
3. **Paiement mobile** : agrégateur retenu pour Orange Money, MTN MoMo, Wave ? (hors MVP, mais conditionne le modèle de données).
4. **Modèle économique** : commission, abonnement prestataire, gratuit ? Impacte la caisse et les gains.
5. **Réservation côté client** : l'étude promet « Réserver → Créneau confirmé », mais aucune maquette ne montre ce parcours (L1-06 ne montre que l'accueil). À maquetter.
6. **Onglet « Messages » client** : emplacement dans les maquettes sans écran associé.
7. **Onglet « Clients » du pressing** : idem.
8. **Couche de styles** : confirmer ce que `global.css` implique dans le template (NativeWind/Uniwind/autre).
9. **Cordonniers, repasseurs, lavage de chaussures** (sous-types de L1-07) : mêmes écrans que le pressing, ou parcours distinct ?
10. **Un même utilisateur, plusieurs rôles ?** (ex. un client qui devient Fanico) : conditionne le modèle de session.
11. **Langues** : français seul au lancement ? (le nouchi et le dioula apparaissent comme langues parlées côté Fanico, pas comme langues d'interface).
12. **Hébergement et conformité des données** (pièces d'identité) : à cadrer avant la mise en production.

---

*Djaigai : « laver, rendre propre » en nouchi. Rendre propre, mais surtout rendre fiable.*#