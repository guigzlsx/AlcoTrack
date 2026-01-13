# 🍻 AlcoTrack

Application web mobile-first de gamification sociale pour suivre la consommation d'alcool lors d'événements.

## 📱 Fonctionnalités

### ✅ Implémenté

- **Profil Utilisateur**
  - Création et modification du profil (nom, poids, sexe)
  - Stockage local des données
  
- **Gestion d'Événements**
  - Création d'événement avec code unique
  - Partage du code pour rejoindre
  - Multi-participants en temps réel
  
- **Suivi de Consommation**
  - Interface rapide d'ajout de boissons
  - 5 types prédéfinis : Bière 25cl/50cl, Vin 12cl, Shot 4cl, Cocktail
  - Timestamp automatique pour chaque consommation
  
- **Calcul d'Alcoolémie**
  - Formule de Widmark : $A = \frac{\text{Masse d'alcool}}{\text{Poids} \times \text{Coefficient}}$
  - Coefficients : 0,7 (homme) / 0,6 (femme)
  - Décroissance temporelle : 0,15 g/L par heure
  - Mise à jour automatique toutes les 10 secondes
  
- **Classement (Leaderboard)**
  - Tri par alcoolémie actuelle ou quantité totale
  - Podium avec médailles 🥇🥈🥉
  - Affichage en temps réel

## 🏗️ Architecture

```
alcotrack-web/
├── app/
│   ├── globals.css          # Styles globaux
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Page principale avec gestion d'état
├── components/
│   ├── ui/                  # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── DrinkSelector.tsx    # Sélection de boissons
│   ├── EventHeader.tsx      # En-tête d'événement
│   ├── EventManager.tsx     # Création/Jonction d'événements
│   ├── Leaderboard.tsx      # Classement
│   └── UserProfile.tsx      # Profil utilisateur
└── lib/
    ├── alcohol-calculator.ts # Algorithme de Widmark
    ├── constants.ts          # Boissons & constantes
    ├── types.ts              # Types TypeScript
    └── utils.ts              # Utilitaires
```

## 🧮 Algorithme de Calcul

### Formule de Widmark

1. **Masse d'alcool pur** :
   ```
   Masse (g) = Volume (ml) × Degré (%) × Densité (0,789 g/ml)
   ```

2. **Alcoolémie théorique** :
   ```
   BAC (g/L) = Masse d'alcool / (Poids × Coefficient)
   ```

3. **Décroissance temporelle** :
   ```
   BAC actuel = BAC initial - (0,15 × heures écoulées)
   ```

## 🚀 Installation et Lancement

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Build pour production
npm run build

# Lancement en production
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 💾 Stockage des Données

Les données sont stockées dans le **localStorage** du navigateur :
- `alcotrack_user` : Profil utilisateur
- `alcotrack_current_event` : ID de l'événement actif
- `alcotrack_events` : Liste de tous les événements

## 🎨 Technologies

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styles** : Tailwind CSS
- **Icônes** : Lucide React
- **Utilitaires** : clsx, tailwind-merge

## 📊 Exemple de Calcul

**Utilisateur** : Homme, 75kg  
**Boisson** : Bière 50cl (5%)

1. Masse d'alcool : `500 × 0,05 × 0,789 = 19,725g`
2. BAC initial : `19,725 / (75 × 0,7) = 0,376 g/L`
3. Après 1h : `0,376 - 0,15 = 0,226 g/L`

## ⚠️ Avertissement

Cette application est conçue à des fins de **divertissement uniquement**. Les calculs d'alcoolémie sont des **estimations théoriques** et ne doivent pas être utilisés pour des décisions concernant la conduite ou d'autres activités nécessitant vigilance. En cas de consommation d'alcool, ne prenez jamais le volant.

## 📝 Licence

MIT
