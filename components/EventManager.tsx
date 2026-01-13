'use client';

import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { Event, User } from '@/lib/types';
import { generateId, generateEventCode } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface EventManagerProps {
  user: User;
  onEventCreated: (event: Event) => void;
  onEventJoined: (event: Event) => void;
}

export function EventManager({ user, onEventCreated, onEventJoined }: EventManagerProps) {
  const [mode, setMode] = useState<'choice' | 'create' | 'join'>('choice');
  const [eventName, setEventName] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [error, setError] = useState('');

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!eventName.trim()) {
      setError('Le nom de l\'événement est requis');
      return;
    }

    const newEvent: Event = {
      id: generateEventCode(),
      name: eventName.trim(),
      createdAt: Date.now(),
      participants: [user],
      consumptions: [],
    };

    onEventCreated(newEvent);
  };

  const handleJoinEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!eventCode.trim()) {
      setError('Le code de l\'événement est requis');
      return;
    }

    // Récupérer l'événement depuis le localStorage
    const storedEvents = localStorage.getItem('alcotrack_events');
    if (storedEvents) {
      const events: Event[] = JSON.parse(storedEvents);
      const event = events.find((e) => e.id === eventCode.toUpperCase());

      if (event) {
        // Vérifier si l'utilisateur n'est pas déjà dans l'événement
        const alreadyInEvent = event.participants.some((p) => p.id === user.id);
        if (!alreadyInEvent) {
          event.participants.push(user);
          // Sauvegarder l'événement mis à jour
          const updatedEvents = events.map((e) => (e.id === event.id ? event : e));
          localStorage.setItem('alcotrack_events', JSON.stringify(updatedEvents));
        }
        onEventJoined(event);
        return;
      }
    }

    setError('Événement non trouvé');
  };

  if (mode === 'choice') {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <Card onClick={() => setMode('create')}>
          <CardContent className="flex items-center gap-4 p-6 cursor-pointer hover:bg-gray-50">
            <div className="bg-blue-100 p-3 rounded-full">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Créer un événement</h3>
              <p className="text-sm text-gray-600">Organiser une nouvelle soirée</p>
            </div>
          </CardContent>
        </Card>

        <Card onClick={() => setMode('join')}>
          <CardContent className="flex items-center gap-4 p-6 cursor-pointer hover:bg-gray-50">
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Rejoindre un événement</h3>
              <p className="text-sm text-gray-600">Entrer un code d&apos;événement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Créer un événement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <Input
              label="Nom de l'événement"
              type="text"
              placeholder="Soirée du vendredi"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              error={error}
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setMode('choice')} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Créer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Rejoindre un événement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleJoinEvent} className="space-y-4">
          <Input
            label="Code de l'événement"
            type="text"
            placeholder="ABC123"
            value={eventCode}
            onChange={(e) => setEventCode(e.target.value.toUpperCase())}
            error={error}
            maxLength={6}
          />
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setMode('choice')} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1">
              Rejoindre
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
