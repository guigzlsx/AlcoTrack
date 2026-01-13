import { Drink } from './types';

// Boissons prédéfinies
export const PRESET_DRINKS: Drink[] = [
  {
    id: 'beer-25',
    name: 'Bière 25cl',
    volume: 250,
    alcoholPercentage: 5,
    icon: '🍺',
  },
  {
    id: 'beer-50',
    name: 'Bière 50cl',
    volume: 500,
    alcoholPercentage: 5,
    icon: '🍺',
  },
  {
    id: 'wine',
    name: 'Vin 12cl',
    volume: 120,
    alcoholPercentage: 12,
    icon: '🍷',
  },
  {
    id: 'shot',
    name: 'Shot 4cl',
    volume: 40,
    alcoholPercentage: 40,
    icon: '🥃',
  },
  {
    id: 'cocktail',
    name: 'Cocktail',
    volume: 200,
    alcoholPercentage: 15,
    icon: '🍹',
  },
];

// Coefficients de diffusion pour la formule de Widmark
export const WIDMARK_COEFFICIENT = {
  male: 0.7,
  female: 0.6,
};

// Taux d'élimination de l'alcool (g/L par heure)
export const ELIMINATION_RATE = 0.15;

// Densité de l'alcool (g/ml)
export const ALCOHOL_DENSITY = 0.789;
