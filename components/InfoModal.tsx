'use client';

import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-40"
      >
        <Info className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>ℹ️ Comment utiliser AlcoTrack</CardTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-bold text-blue-600 mb-2">1️⃣ Créer votre profil</h4>
            <p className="text-sm text-gray-600">
              Entrez votre nom, poids et sexe. Ces informations sont nécessaires pour calculer
              votre alcoolémie selon la formule de Widmark.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-blue-600 mb-2">2️⃣ Créer ou rejoindre un événement</h4>
            <p className="text-sm text-gray-600">
              Créez un nouvel événement pour votre soirée, ou rejoignez un événement existant
              en entrant le code partagé par vos amis.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-blue-600 mb-2">3️⃣ Ajouter vos consommations</h4>
            <p className="text-sm text-gray-600">
              Chaque fois que vous prenez un verre, tapez sur le type de boisson correspondant.
              L&apos;heure sera enregistrée automatiquement.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-blue-600 mb-2">4️⃣ Suivre le classement</h4>
            <p className="text-sm text-gray-600">
              Voyez qui est en tête du classement ! Le leaderboard se met à jour automatiquement
              en tenant compte de l&apos;élimination de l&apos;alcool (0,15 g/L par heure).
            </p>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3">
            <h4 className="font-bold text-yellow-800 mb-1">⚠️ Important</h4>
            <p className="text-sm text-yellow-700">
              Cette application est destinée au divertissement uniquement. Les calculs sont des
              estimations théoriques. Ne conduisez jamais après avoir consommé de l&apos;alcool.
            </p>
          </div>

          <Button onClick={() => setIsOpen(false)} className="w-full">
            J&apos;ai compris
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
