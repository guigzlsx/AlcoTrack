'use client';

import React from 'react';
import { ArrowLeft, Calendar, Wine } from 'lucide-react';
import { User, Event } from '@/lib/types';
import { PRESET_DRINKS } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface HistoryProps {
  user: User;
  onClose: () => void;
}

interface EventHistory {
  event: Event;
  participatedAt: number;
}

export function History({ user, onClose }: HistoryProps) {
  // Récupérer l'historique depuis localStorage
  const getEventHistory = (): EventHistory[] => {
    const stored = localStorage.getItem(`alcotrack_history_${user.id}`);
    return stored ? JSON.parse(stored) : [];
  };

  const history = getEventHistory();

  // Calculer la consommation pour un événement
  const getEventConsumption = (event: Event) => {
    const userConsumptions = (event.consumptions || []).filter(c => c.userId === user.id);
    let totalAlcohol = 0;
    let totalDrinks = userConsumptions.length;

    userConsumptions.forEach(consumption => {
      const drink = PRESET_DRINKS.find(d => d.id === consumption.drinkId);
      if (drink) {
        totalAlcohol += drink.alcoholMass;
      }
    });

    return { totalAlcohol, totalDrinks };
  };

  // Calculer le total global
  const getTotalConsumption = () => {
    let totalAlcohol = 0;
    let totalDrinks = 0;

    history.forEach(({ event }) => {
      const { totalAlcohol: eventAlcohol, totalDrinks: eventDrinks } = getEventConsumption(event);
      totalAlcohol += eventAlcohol;
      totalDrinks += eventDrinks;
    });

    return { totalAlcohol, totalDrinks };
  };

  const totalStats = getTotalConsumption();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📊 Historique</h1>
            <p className="text-gray-600">Vos événements passés</p>
          </div>
        </div>

        {/* Liste des événements */}
        {history.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun événement dans l'historique</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map(({ event, participatedAt }) => {
              const { totalAlcohol, totalDrinks } = getEventConsumption(event);
              
              return (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{event.name}</span>
                      <span className="text-sm font-normal text-gray-500">
                        {new Date(participatedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{totalDrinks}</div>
                        <div className="text-sm text-gray-600">Boissons</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600">
                          {totalAlcohol.toFixed(1)}g
                        </div>
                        <div className="text-sm text-gray-600">Alcool pur</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Total global */}
        {history.length > 0 && (
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wine className="w-6 h-6" />
                Total Global
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{totalStats.totalDrinks}</div>
                  <div className="text-blue-100">Boissons au total</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">{totalStats.totalAlcohol.toFixed(1)}g</div>
                  <div className="text-purple-100">Alcool pur total</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bouton retour */}
        <Button onClick={onClose} className="w-full" size="lg">
          Retour
        </Button>
      </div>
    </div>
  );
}
