import { Sex, DrinkConsumption, User, BAC, Drink } from './types';
import { WIDMARK_COEFFICIENT, ELIMINATION_RATE, ALCOHOL_DENSITY } from './constants';

/**
 * Calcule la masse d'alcool pur en grammes
 * @param volumeMl - Volume de la boisson en ml
 * @param alcoholPercentage - Pourcentage d'alcool
 * @returns Masse d'alcool en grammes
 */
export function calculateAlcoholMass(volumeMl: number, alcoholPercentage: number): number {
  // Masse = Volume (ml) × Degré (%) × Densité (g/ml)
  return volumeMl * (alcoholPercentage / 100) * ALCOHOL_DENSITY;
}

/**
 * Calcule l'alcoolémie théorique avec la formule de Widmark
 * @param alcoholMass - Masse d'alcool en grammes
 * @param weight - Poids de la personne en kg
 * @param sex - Sexe de la personne
 * @returns Alcoolémie en g/L
 */
export function calculateBAC(alcoholMass: number, weight: number, sex: Sex): number {
  const coefficient = WIDMARK_COEFFICIENT[sex];
  return alcoholMass / (weight * coefficient);
}

/**
 * Calcule l'alcoolémie actuelle en prenant compte de l'élimination au fil du temps
 * @param initialBAC - Alcoolémie initiale en g/L
 * @param hoursElapsed - Heures écoulées depuis la consommation
 * @returns Alcoolémie actuelle en g/L
 */
export function calculateCurrentBAC(initialBAC: number, hoursElapsed: number): number {
  const eliminated = ELIMINATION_RATE * hoursElapsed;
  return Math.max(0, initialBAC - eliminated);
}

/**
 * Calcule l'alcoolémie totale d'un utilisateur pour un événement
 * @param user - L'utilisateur
 * @param consumptions - Les consommations de l'utilisateur
 * @param drinks - La liste des boissons disponibles
 * @param currentTime - Le timestamp actuel (optionnel, par défaut Date.now())
 * @returns Objet contenant l'alcoolémie actuelle et le total d'alcool consommé
 */
export function calculateUserBAC(
  user: User,
  consumptions: DrinkConsumption[],
  drinks: Drink[],
  currentTime: number = Date.now()
): BAC {
  let totalBAC = 0;
  let totalAlcohol = 0;
  let lastDrinkTime: number | undefined;

  consumptions.forEach((consumption) => {
    const drink = drinks.find((d) => d.id === consumption.drinkId);
    if (!drink) return;

    const alcoholMass = calculateAlcoholMass(drink.volume, drink.alcoholPercentage);
    totalAlcohol += alcoholMass;

    // Calculer l'alcoolémie pour cette boisson
    const initialBAC = calculateBAC(alcoholMass, user.weight, user.sex);

    // Calculer le temps écoulé en heures
    const hoursElapsed = (currentTime - consumption.timestamp) / (1000 * 60 * 60);

    // Alcoolémie actuelle pour cette boisson
    const currentDrinkBAC = calculateCurrentBAC(initialBAC, hoursElapsed);
    totalBAC += currentDrinkBAC;

    // Garder le timestamp du dernier verre
    if (!lastDrinkTime || consumption.timestamp > lastDrinkTime) {
      lastDrinkTime = consumption.timestamp;
    }
  });

  return {
    userId: user.id,
    userName: user.name,
    currentBAC: totalBAC,
    totalAlcohol,
    lastDrinkTime,
  };
}

/**
 * Calcule l'alcoolémie de tous les participants et les trie
 * @param users - Liste des utilisateurs
 * @param consumptions - Liste de toutes les consommations
 * @param drinks - Liste des boissons disponibles
 * @param sortBy - Critère de tri ('bac' ou 'alcohol')
 * @returns Liste triée des alcoolémies
 */
export function calculateLeaderboard(
  users: User[],
  consumptions: DrinkConsumption[],
  drinks: Drink[],
  sortBy: 'bac' | 'alcohol' = 'bac'
): BAC[] {
  const currentTime = Date.now();
  
  const leaderboard = users.map((user) => {
    const userConsumptions = consumptions.filter((c) => c.userId === user.id);
    return calculateUserBAC(user, userConsumptions, drinks, currentTime);
  });

  // Trier par alcoolémie ou par quantité totale
  return leaderboard.sort((a, b) => {
    if (sortBy === 'bac') {
      return b.currentBAC - a.currentBAC;
    }
    return b.totalAlcohol - a.totalAlcohol;
  });
}
