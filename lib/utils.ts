import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Génère un ID unique
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Génère un code d'événement à 6 caractères
 */
export function generateEventCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/**
 * Formate l'alcoolémie pour l'affichage
 */
export function formatBAC(bac: number): string {
  return bac.toFixed(2);
}

/**
 * Formate la quantité d'alcool pour l'affichage
 */
export function formatAlcohol(grams: number): string {
  return grams.toFixed(1);
}
