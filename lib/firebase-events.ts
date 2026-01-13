import { ref, set, get, update, onValue, off } from 'firebase/database';
import { database } from './firebase';
import { Event, DrinkConsumption } from './types';

/**
 * Créer un nouvel événement dans Firebase
 */
export async function createEvent(event: Event): Promise<void> {
  const eventRef = ref(database, `events/${event.id}`);
  await set(eventRef, event);
}

/**
 * Récupérer un événement par son code
 */
export async function getEvent(eventId: string): Promise<Event | null> {
  const eventRef = ref(database, `events/${eventId}`);
  const snapshot = await get(eventRef);
  
  if (snapshot.exists()) {
    return snapshot.val() as Event;
  }
  return null;
}

/**
 * Ajouter un participant à un événement
 */
export async function addParticipant(eventId: string, event: Event): Promise<void> {
  const eventRef = ref(database, `events/${eventId}`);
  await update(eventRef, { participants: event.participants });
}

/**
 * Ajouter une consommation à un événement
 */
export async function addConsumption(
  eventId: string,
  consumption: DrinkConsumption
): Promise<void> {
  const event = await getEvent(eventId);
  if (!event) throw new Error('Événement non trouvé');
  
  event.consumptions.push(consumption);
  const eventRef = ref(database, `events/${eventId}`);
  await update(eventRef, { consumptions: event.consumptions });
}

/**
 * Écouter les changements d'un événement en temps réel
 */
export function subscribeToEvent(
  eventId: string,
  callback: (event: Event | null) => void
): () => void {
  const eventRef = ref(database, `events/${eventId}`);
  
  const unsubscribe = onValue(eventRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val() as Event);
    } else {
      callback(null);
    }
  });

  // Retourner une fonction pour se désabonner
  return () => off(eventRef, 'value', unsubscribe);
}
