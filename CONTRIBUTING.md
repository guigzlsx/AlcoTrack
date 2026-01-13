# 🤝 Guide de Contribution - AlcoTrack

Merci de votre intérêt pour contribuer à AlcoTrack !

## 🎯 Comment Contribuer

### Signaler un Bug

1. Vérifier qu'il n'existe pas déjà dans les [Issues]
2. Créer une nouvelle issue avec :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Captures d'écran si pertinent
   - Navigateur/OS utilisé

### Proposer une Fonctionnalité

1. Consulter [ROADMAP.md](ROADMAP.md) pour voir si elle est déjà prévue
2. Créer une issue "Feature Request"
3. Décrire le besoin et le cas d'usage
4. Proposer une solution si possible

### Contribuer au Code

1. **Fork** le repository
2. **Clone** votre fork
   ```bash
   git clone https://github.com/votre-username/alcotrack-web.git
   ```
3. **Créer une branche**
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
4. **Développer** votre fonctionnalité
5. **Tester** localement
6. **Commit** avec un message clair
   ```bash
   git commit -m "feat: ajout de [fonctionnalité]"
   ```
7. **Push** vers votre fork
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
8. **Pull Request** vers la branche main

## 📋 Standards de Code

### Conventions de Nommage

```typescript
// Composants : PascalCase
export function UserProfile() { }

// Hooks : camelCase avec préfixe use
export function useLocalStorage() { }

// Constantes : UPPER_SNAKE_CASE
export const MAX_PARTICIPANTS = 50;

// Variables/Fonctions : camelCase
const userName = "John";
function calculateBAC() { }
```

### Structure des Fichiers

```typescript
// 1. Imports externes
import React from 'react';

// 2. Imports internes
import { User } from '@/lib/types';

// 3. Imports de composants
import { Button } from '@/components/ui/Button';

// 4. Types/Interfaces
interface Props {
  user: User;
}

// 5. Composant
export function Component({ user }: Props) {
  // ...
}
```

### Commit Messages

Utiliser [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajouter système de notifications push
fix: corriger calcul d'alcoolémie pour les femmes
docs: mettre à jour README avec exemples
style: formater le code avec Prettier
refactor: simplifier la logique du leaderboard
test: ajouter tests pour alcohol-calculator
chore: mettre à jour les dépendances
```

## 🧪 Tests

### Lancer les Tests

```bash
# Tests unitaires (à ajouter)
npm test

# Tests E2E (à ajouter)
npm run test:e2e

# Linter
npm run lint
```

### Écrire des Tests

```typescript
// lib/__tests__/alcohol-calculator.test.ts
import { calculateBAC } from '../alcohol-calculator';

describe('calculateBAC', () => {
  it('calcule correctement pour un homme', () => {
    const result = calculateBAC(20, 75, 'male');
    expect(result).toBeCloseTo(0.38, 2);
  });
});
```

## 📐 Architecture

### Principes

- **Component-based** : Composants réutilisables
- **Type-safe** : TypeScript strict
- **Mobile-first** : Design responsive
- **Performance** : Lazy loading, memoization
- **Accessibilité** : ARIA labels, keyboard navigation

### Dossiers

```
app/          # Pages Next.js (App Router)
components/   # Composants React
lib/          # Logique métier, types, utils
public/       # Assets statiques
```

## 🎨 Design System

### Couleurs

```css
Bleu principal : #2563eb (blue-600)
Bleu hover : #1d4ed8 (blue-700)
Vert succès : #16a34a (green-600)
Rouge danger : #dc2626 (red-600)
Gris texte : #4b5563 (gray-600)
```

### Composants UI

Utiliser les composants existants dans `components/ui/` :
- Button
- Card
- Input
- Select
- Toast

## 🔒 Sécurité

### Données Sensibles

- ❌ Ne jamais commit de clés API
- ❌ Ne jamais commit de .env avec données réelles
- ✅ Utiliser .env.local pour le développement
- ✅ Documenter les variables d'environnement nécessaires

### Validation

```typescript
// Toujours valider les entrées utilisateur
if (!weight || weight <= 0 || weight > 300) {
  setError('Poids invalide');
  return;
}
```

## 📚 Documentation

### Commenter le Code

```typescript
/**
 * Calcule l'alcoolémie théorique avec la formule de Widmark
 * @param alcoholMass - Masse d'alcool en grammes
 * @param weight - Poids de la personne en kg
 * @param sex - Sexe de la personne
 * @returns Alcoolémie en g/L
 */
export function calculateBAC(
  alcoholMass: number,
  weight: number,
  sex: Sex
): number {
  // ...
}
```

### Mettre à Jour la Doc

Quand vous ajoutez une fonctionnalité :
1. Mettre à jour README_ALCOTRACK.md
2. Ajouter dans ROADMAP.md si c'était prévu
3. Documenter les nouvelles API/fonctions

## 🐛 Debugging

### Outils Recommandés

- **React DevTools** : Inspecter les composants
- **Redux DevTools** : Si vous ajoutez Redux
- **Next.js DevTools** : Analyser les performances

### Logs

```typescript
// Development only
if (process.env.NODE_ENV === 'development') {
  console.log('Debug:', data);
}
```

## ✅ Checklist PR

Avant de soumettre une Pull Request :

- [ ] Le code compile sans erreurs
- [ ] Les tests passent
- [ ] Le linter ne retourne pas d'erreurs
- [ ] La fonctionnalité est testée manuellement
- [ ] La documentation est à jour
- [ ] Les commits suivent les conventions
- [ ] Le code est commenté si nécessaire
- [ ] Pas de console.log en production
- [ ] Responsive testé sur mobile

## 📞 Questions ?

- **Issues** : Pour les bugs et features
- **Discussions** : Pour les questions générales
- **Email** : Pour les questions privées

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous licence MIT.

---

**Merci de contribuer à AlcoTrack ! 🎉**
