'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { Event } from '@/lib/types';
import { PRESET_DRINKS } from '@/lib/constants';
import { calculateLeaderboard } from '@/lib/alcohol-calculator';
import { formatBAC, formatAlcohol } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface LeaderboardProps {
  event: Event;
}

export function Leaderboard({ event }: LeaderboardProps) {
  const [sortBy, setSortBy] = useState<'bac' | 'alcohol'>('bac');
  const [leaderboard, setLeaderboard] = useState(() =>
    calculateLeaderboard(
      event.participants || [], 
      event.consumptions || [], 
      PRESET_DRINKS, 
      sortBy
    )
  );

  // Mettre à jour le leaderboard toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard(
        calculateLeaderboard(
          event.participants || [], 
          event.consumptions || [], 
          PRESET_DRINKS, 
          sortBy
        )
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [event, sortBy]);

  // Recalculer immédiatement quand le tri change
  useEffect(() => {
    setLeaderboard(
      calculateLeaderboard(
        event.participants || [], 
        event.consumptions || [], 
        PRESET_DRINKS, 
        sortBy
      )
    );
  }, [event, sortBy]);

  useEffect(() => {
    console.log('Tri par:', sortBy);
    console.log('Leaderboard recalculé:', leaderboard);
  }, [leaderboard, sortBy]);

  const getRankColor = (index: number) => {
    if (index === 0) return 'bg-yellow-100 border-yellow-400';
    if (index === 1) return 'bg-gray-100 border-gray-400';
    if (index === 2) return 'bg-orange-100 border-orange-400';
    return 'bg-white border-gray-200';
  };

  const getRankEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <CardTitle>Classement</CardTitle>
          </div>
          <div className="flex gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            <Button
              size="sm"
              className="flex-1 sm:flex-none"
              variant={sortBy === 'bac' ? 'primary' : 'outline'}
              onClick={() => setSortBy('bac')}
            >
              Alcoolémie
            </Button>
            <Button
              size="sm"
              className="flex-1 sm:flex-none"
              variant={sortBy === 'alcohol' ? 'primary' : 'outline'}
              onClick={() => setSortBy('alcohol')}
            >
              Quantité
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucune consommation pour le moment
            </p>
          ) : (
            leaderboard.map((entry, index) => (
              <div
                key={entry.userId}
                className={`border-2 rounded-lg p-4 transition-all ${getRankColor(index)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold w-10 text-center">
                      {getRankEmoji(index)}
                    </span>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {entry.userName}
                      </h4>
                      {entry.currentBAC > 0.5 && (
                        <span className="text-red-600 text-sm font-semibold">⚠️ Alcool volant &gt; Lim.</span>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>{formatAlcohol(entry.totalAlcohol)}g d&apos;alcool</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {sortBy === 'alcohol' ? entry.totalDrinks : formatBAC(entry.currentBAC)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {sortBy === 'alcohol' ? (entry.totalDrinks === 1 ? 'verre' : 'verres') : 'g/L'}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
