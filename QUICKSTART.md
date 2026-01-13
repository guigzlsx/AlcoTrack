# 📋 Guide de Démarrage Rapide - AlcoTrack

## 🎯 Qu'est-ce qu'AlcoTrack ?

AlcoTrack est une application web mobile-first qui permet à des groupes d'amis de suivre leur consommation d'alcool lors de soirées et de créer un classement basé sur l'alcoolémie théorique calculée avec la formule de Widmark.

## 🚀 Démarrage Rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en mode développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:3000
```

## 📱 Utilisation

### Étape 1 : Créer votre profil
- Nom
- Poids (en kg)
- Sexe (homme/femme)

### Étape 2 : Créer ou rejoindre un événement
- **Créer** : Générez un code à partager avec vos amis
- **Rejoindre** : Entrez le code reçu

### Étape 3 : Ajouter vos consommations
Tapez sur le type de boisson :
- 🍺 Bière 25cl (5%)
- 🍺 Bière 50cl (5%)
- 🍷 Vin 12cl (12%)
- 🥃 Shot 4cl (40%)
- 🍹 Cocktail 20cl (15%)

### Étape 4 : Suivre le classement
Le leaderboard se met à jour automatiquement toutes les 10 secondes en tenant compte de l'élimination naturelle de l'alcool.

## 🧮 Comment ça marche ?

### Formule de Widmark

```
Alcoolémie (g/L) = Masse d'alcool (g) / (Poids (kg) × Coefficient)
```

**Coefficients** :
- Homme : 0,7
- Femme : 0,6

**Élimination** :
- 0,15 g/L par heure

### Exemple de calcul

**Profil** : Homme, 75kg  
**Boisson** : Bière 50cl (5%)

1. **Masse d'alcool** : 500ml × 5% × 0,789 = 19,725g
2. **Alcoolémie initiale** : 19,725 / (75 × 0,7) = 0,376 g/L
3. **Après 1h** : 0,376 - 0,15 = 0,226 g/L

## 📁 Structure du Projet

```
alcotrack-web/
├── app/                      # App Router Next.js
│   ├── globals.css          # Styles globaux
│   ├── layout.tsx           # Layout avec métadonnées
│   └── page.tsx             # Page principale avec état
│
├── components/              # Composants React
│   ├── ui/                  # Composants UI réutilisables
│   │   ├── Button.tsx       # Bouton avec variantes
│   │   ├── Card.tsx         # Cartes
│   │   ├── Input.tsx        # Champs de saisie
│   │   ├── Select.tsx       # Sélecteurs
│   │   └── Toast.tsx        # Notifications
│   ├── DrinkSelector.tsx    # Sélection rapide de boissons
│   ├── EventHeader.tsx      # Infos de l'événement
│   ├── EventManager.tsx     # Création/Jonction événements
│   ├── InfoModal.tsx        # Modal d'aide
│   ├── Leaderboard.tsx      # Classement en temps réel
│   └── UserProfile.tsx      # Profil utilisateur
│
├── lib/                     # Logique métier
│   ├── alcohol-calculator.ts # Algorithme de Widmark
│   ├── constants.ts          # Boissons & constantes
│   ├── types.ts              # Types TypeScript
│   └── utils.ts              # Fonctions utilitaires
│
├── public/                  # Fichiers statiques
│   └── manifest.json        # PWA manifest
│
├── DEPLOYMENT.md            # Guide de déploiement
├── README_ALCOTRACK.md      # Documentation complète
└── ROADMAP.md               # Fonctionnalités futures
```

## 🔑 Fonctionnalités Clés

✅ **Profil utilisateur** avec données personnalisées  
✅ **Système d'événements** avec codes uniques  
✅ **Ajout rapide** de boissons prédéfinies  
✅ **Calcul d'alcoolémie** avec formule de Widmark  
✅ **Décroissance temporelle** (0,15 g/L/h)  
✅ **Leaderboard** avec tri personnalisable  
✅ **Stockage local** avec localStorage  
✅ **Design mobile-first** responsive  
✅ **Notifications** toast pour les actions  
✅ **Modal d'aide** interactive  

## 🛠️ Technologies

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styles** : Tailwind CSS
- **Icônes** : Lucide React
- **Utilitaires** : clsx, tailwind-merge

## 📊 Commandes Disponibles

```bash
npm run dev          # Développement (port 3000)
npm run build        # Build de production
npm start            # Serveur de production
npm run lint         # Vérification ESLint
```

## ⚠️ Important

Cette application est **uniquement à but de divertissement**. Les calculs sont des **estimations théoriques** et ne doivent **jamais** servir à prendre des décisions concernant la conduite ou autres activités nécessitant vigilance.

**En cas de consommation d'alcool, ne conduisez JAMAIS.**

## 🚀 Prochaines Étapes

1. ✅ Tester l'application localement
2. 📱 Tester sur mobile
3. 🎨 Personnaliser les couleurs/styles si besoin
4. 🌐 Déployer sur Vercel (voir DEPLOYMENT.md)
5. 🔄 Ajouter un backend pour la synchronisation (voir ROADMAP.md)

## 📞 Support

Pour toute question ou amélioration :
1. Consulter [ROADMAP.md](ROADMAP.md) pour les fonctionnalités futures
2. Consulter [DEPLOYMENT.md](DEPLOYMENT.md) pour le déploiement
3. Consulter [README_ALCOTRACK.md](README_ALCOTRACK.md) pour la doc complète

---

**Bon développement ! 🍻**
