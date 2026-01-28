'use client';

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { User, Event, DrinkConsumption } from '@/lib/types';
import { isFirebaseConfigured } from '@/lib/firebase';
import { subscribeToEvent, addConsumption } from '@/lib/firebase-events';
import { UserProfile } from '@/components/UserProfile';
import { EventManager } from '@/components/EventManager';
import { EventHeader } from '@/components/EventHeader';
import { DrinkSelector } from '@/components/DrinkSelector';
import { Leaderboard } from '@/components/Leaderboard';
import { Toast } from '@/components/ui/Toast';
import { InfoModal } from '@/components/InfoModal';
import { FirebaseNotConfigured } from '@/components/FirebaseNotConfigured';
import { History } from '@/components/History';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Vérifier si Firebase est configuré
  if (!isFirebaseConfigured) {
    return <FirebaseNotConfigured />;
  }

  // Charger les données depuis le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('alcotrack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // S'abonner aux mises à jour temps réel de l'événement
  useEffect(() => {
    if (!currentEvent) return;

    const unsubscribe = subscribeToEvent(currentEvent.id, (updatedEvent) => {
      if (updatedEvent) {
        setCurrentEvent(updatedEvent);
      }
    });

    return () => unsubscribe();
  }, [currentEvent?.id]);

  // Sauvegarder l'utilisateur
  const handleUserSave = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('alcotrack_user', JSON.stringify(newUser));
    setToast('Profil enregistré !');
    setShowSettings(false);
  };

  // Créer un événement
  const handleEventCreated = (event: Event) => {
    setCurrentEvent(event);
    setToast(`Événement créé ! Code: ${event.id}`);
  };

  // Rejoindre un événement
  const handleEventJoined = (event: Event) => {
    setCurrentEvent(event);
    setToast(`Rejoint ${event.name} !`);
  };

  // Quitter l'événement
  const handleLeaveEvent = () => {
    if (currentEvent && user) {
      // Sauvegarder dans l'historique
      const historyKey = `alcotrack_history_${user.id}`;
      const stored = localStorage.getItem(historyKey);
      const history = stored ? JSON.parse(stored) : [];
      
      // Ajouter l'événement s'il n'existe pas déjà
      const exists = history.find((h: any) => h.event.id === currentEvent.id);
      if (!exists) {
        history.push({
          event: currentEvent,
          participatedAt: Date.now(),
        });
        localStorage.setItem(historyKey, JSON.stringify(history));
      }
    }
    
    setCurrentEvent(null);
    localStorage.removeItem('alcotrack_current_event');
  };

  // Ajouter une boisson
  const handleDrinkAdded = async (consumption: DrinkConsumption) => {
    if (!currentEvent) return;

    try {
      await addConsumption(currentEvent.id, consumption);
      setToast('Boisson ajoutée !');
      // L'événement sera mis à jour automatiquement via subscribeToEvent
    } catch (error) {
      console.error('Erreur ajout boisson:', error);
      setToast('Erreur lors de l\'ajout de la boisson');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-2xl font-bold text-blue-600">
          Chargement
          <span className="inline-flex">
            <span className="animate-bounce-dot-1">.</span>
            <span className="animate-bounce-dot-2">.</span>
            <span className="animate-bounce-dot-3">.</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <InfoModal />
      
      {/* Bouton paramètres en haut à gauche */}
      {user && !currentEvent && (
        <button
          onClick={() => setShowSettings(true)}
          className="fixed top-4 left-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          aria-label="Paramètres"
        >
          <Settings className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Modal paramètres */}
      {showSettings && user && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Paramètres du profil</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <UserProfile user={user} onSave={handleUserSave} />
              
              {/* Bouton Historique */}
              <button
                onClick={() => {
                  setShowSettings(false);
                  setShowHistory(true);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-colors"
              >
                📊 Voir mon historique
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Historique */}
      {showHistory && user && (
        <History
          userId={user.id}
          userName={user.name}
          consumptions={[] /* Ajoutez les consommations ici */}
          drinks={[] /* Ajoutez les boissons ici */}
          onClose={() => setShowHistory(false)}
          onDelete={(consumptionId) => {
            console.log(`Supprimer consommation: ${consumptionId}`);
          }}
        />
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <a href="/">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🍻 AlcoTrack</h1>
          </a>
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
