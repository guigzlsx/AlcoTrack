export type Sex = 'male' | 'female';

export interface User {
  id: string;
  name: string;
  weight: number; // en kg
  sex: Sex;
}

export interface Drink {
  id: string;
  name: string;
  volume: number; // en ml
  alcoholPercentage: number; // en %
  icon: string;
}

export interface DrinkConsumption {
  id: string;
  userId: string;
  drinkId: string;
  timestamp: number; // timestamp en ms
}

export interface Event {
  id: string;
  name: string;
  createdAt: number;
  participants: User[];
  consumptions: DrinkConsumption[];
}

export interface BAC {
  userId: string;
  userName: string;
  currentBAC: number; // g/L
  totalAlcohol: number; // grammes
  totalDrinks?: number; // Ajout de la propriété facultative totalDrinks
  lastDrinkTime?: number;
}
