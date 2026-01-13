'use client';

import { useState, useEffect } from 'react';
import { User, Event, DrinkConsumption } from '@/lib/types';
import { UserProfile } from '@/components/UserProfile';
import { EventManager } from '@/components/EventManager';
import { EventHeader } from '@/components/EventHeader';
import { DrinkSelector } from '@/components/DrinkSelector';
import { Leaderboard } from '@/components/Leaderboard';
import { Toast } from '@/components/ui/Toast';
import { InfoModal } from '@/components/InfoModal';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // Charger les données depuis le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('alcotrack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedEventId = localStorage.getItem('alcotrack_current_event');
    if (storedEventId) {
      const storedEvents = localStorage.getItem('alcotrack_events');
      if (storedEvents) {
        const events: Event[] = JSON.parse(storedEvents);
        const event = events.find((e) => e.id === storedEventId);
        if (event) {
          setCurrentEvent(event);
        }
      }
    }

    setIsLoading(false);
  }, []);

  // Sauvegarder l'utilisateur
  const handleUserSave = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('alcotrack_user', JSON.stringify(newUser));
    setToast('Profil enregistré !');
  };

  // Créer un événement
  const handleEventCreated = (event: Event) => {
    setCurrentEvent(event);
    localStorage.setItem('alcotrack_current_event', event.id);
    
    // Sauvegarder l'événement
    const storedEvents = localStorage.getItem('alcotrack_events');
    const events: Event[] = storedEvents ? JSON.parse(storedEvents) : [];
    events.push(event);
    localStorage.setItem('alcotrack_events', JSON.stringify(events));
    setToast(`Événement créé ! Code: ${event.id}`);
  };

  // Rejoindre un événement
  const handleEventJoined = (event: Event) => {
    setCurrentEvent(event);
    localStorage.setItem('alcotrack_current_event', event.id);
    setToast(`Rejoint ${event.name} !`);
  };

  // Quitter l'événement
  const handleLeaveEvent = () => {
    setCurrentEvent(null);
    localStorage.removeItem('alcotrack_current_event');
  };

  // Ajouter une boisson
  const handleDrinkAdded = (consumption: DrinkConsumption) => {
    if (!currentEvent) return;

    const updatedEvent = {
      ...currentEvent,
      consumptions: [...currentEvent.consumptions, consumption],
    };

    setCurrentEvent(updatedEvent);

    // Mettre à jour dans le localStorage
    const storedEvents = localStorage.getItem('alcotrack_events');
    if (storedEvents) {
      const events: Event[] = JSON.parse(storedEvents);
      const updatedEvents = events.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      );
      localStorage.setItem('alcotrack_events', JSON.stringify(updatedEvents));
    }

    setToast('Boisson ajoutée !');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-2xl font-bold text-blue-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <InfoModal />
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🍻 AlcoTrack</h1>
          <p className="text-gray-600">Suivi de consommation en soirée</p>
        </div>

        {/* Étape 1: Profil utilisateur */}
        {!user && (
          <UserProfile user={user} onSave={handleUserSave} />
        )}

        {/* Étape 2: Événement */}
        {user && !currentEvent && (
          <EventManager
            user={user}
            onEventCreated={handleEventCreated}
            onEventJoined={handleEventJoined}
          />
        )}

        {/* Étape 3: Événement actif */}
        {user && currentEvent && (
          <>
            <EventHeader event={currentEvent} onLeaveEvent={handleLeaveEvent} />
            <DrinkSelector user={user} onDrinkAdded={handleDrinkAdded} />
            <Leaderboard event={currentEvent} />
          </>
        )}

        {/* Toast notifications */}
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}
