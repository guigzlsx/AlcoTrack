'use client';

import React from 'react';
import { DrinkConsumption, Drink } from '@/lib/types';

interface HistoryProps {
  userId: string;
  userName: string;
  consumptions: DrinkConsumption[];
  drinks: Drink[];
  onDelete: (consumptionId: string) => void;
  onClose: () => void;
}

export const History: React.FC<HistoryProps> = ({
  userId,
  userName,
  consumptions,
  drinks,
  onDelete,
  onClose,
}) => {
  const userConsumptions = consumptions.filter((c) => c.userId === userId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Historique de {userName}</h2>
        <ul className="space-y-3">
          {userConsumptions.map((consumption) => {
            const drink = drinks.find((d) => d.id === consumption.drinkId);
            return (
              <li
                key={consumption.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-black">
                  {drink?.icon} {drink?.name || 'Boisson inconnue'} - {new Date(consumption.timestamp).toLocaleTimeString()}
                </span>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(consumption.id)}
                >
                  Supprimer
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};
