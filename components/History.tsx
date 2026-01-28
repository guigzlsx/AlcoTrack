'use client';

import React, { useEffect } from 'react';
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
  useEffect(() => {
    const modal = document.querySelector('.history-modal');
    if (modal) {
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.9)';
      setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
      }, 10);
    }
  }, []);

  const userConsumptions = consumptions.filter((c) => c.userId === userId);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-md">
        <div className="absolute inset-0">
          <div className="event-background"></div>
        </div>
      </div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md history-modal">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Historique de {userName}</h2>
        <ul className="space-y-3">
          {userConsumptions.map((consumption) => {
            const drink = drinks.find((d) => d.id === consumption.drinkId);
            return (
              <li
                key={consumption.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-gray-900">
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
