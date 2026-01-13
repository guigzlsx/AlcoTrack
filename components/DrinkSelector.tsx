'use client';

import React from 'react';
import { DrinkConsumption, User } from '@/lib/types';
import { PRESET_DRINKS } from '@/lib/constants';
import { generateId } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface DrinkSelectorProps {
  user: User;
  onDrinkAdded: (consumption: DrinkConsumption) => void;
}

export function DrinkSelector({ user, onDrinkAdded }: DrinkSelectorProps) {
  const handleDrinkClick = (drinkId: string) => {
    const consumption: DrinkConsumption = {
      id: generateId(),
      userId: user.id,
      drinkId,
      timestamp: Date.now(),
    };
    onDrinkAdded(consumption);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une boisson</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {PRESET_DRINKS.map((drink) => (
            <Button
              key={drink.id}
              onClick={() => handleDrinkClick(drink.id)}
              variant="outline"
              className="h-24 flex flex-col gap-2 text-center"
            >
              <span className="text-3xl">{drink.icon}</span>
              <span className="text-sm font-semibold">{drink.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
