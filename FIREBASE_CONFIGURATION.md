# Configuration des règles Firebase

## État actuel
Firebase est configuré et fonctionne en **mode test** (lectures et écritures autorisées pour tous).

⚠️ **IMPORTANT** : Les règles actuelles expirent automatiquement après 30 jours. Vous devez configurer des règles de production avant cette date.

## Prochaines étapes

### 1. Configurer les règles de sécurité

Allez sur la [Console Firebase](https://console.firebase.google.com/project/alcotrack-b3ae9/database/alcotrack-b3ae9-default-rtdb/rules) et remplacez les règles par le contenu de `firebase.rules.json` :

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "events": {
      "$eventId": {
        ".read": true,
        ".write": true,
        ".validate": "newData.hasChildren(['id', 'name', 'code', 'createdAt'])"
      }
    }
  }
}
```

Ces règles permettent :
- ✅ Lecture/écriture sur les événements uniquement
- ✅ Validation de la structure des données
- ❌ Pas d'accès global à la base

### 2. Test en local

1. Ouvrez http://localhost:3000
2. Créez votre profil (nom, poids, sexe)
3. Créez un nouvel événement
4. Notez le code de l'événement (ex: ABC123)
5. Ouvrez une fenêtre de navigation privée
6. Rejoignez l'événement avec le code
7. Ajoutez des consommations dans chaque fenêtre
8. Vérifiez que le classement se met à jour en temps réel

### 3. Déploiement sur Vercel

```bash
# 1. Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# 2. Se connecter à Vercel
vercel login

# 3. Déployer
vercel

# 4. Configurer les variables d'environnement dans le dashboard Vercel
# Copiez toutes les variables de .env.local
```

Variables à configurer sur Vercel :
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`

### 4. Améliorer la sécurité (optionnel)

Pour une meilleure sécurité, vous pouvez :

1. **Activer Firebase Authentication** pour identifier les utilisateurs
2. **Restreindre les règles** pour que seuls les participants puissent modifier un événement
3. **Ajouter des indexes** pour améliorer les performances des requêtes

Exemple de règles avec authentification :
```json
{
  "rules": {
    "events": {
      "$eventId": {
        ".read": "auth != null",
        ".write": "auth != null && (!data.exists() || data.child('participants').child(auth.uid).exists())"
      }
    }
  }
}
```

## Liens utiles

- [Console Firebase](https://console.firebase.google.com/project/alcotrack-b3ae9)
- [Documentation Firebase Realtime Database](https://firebase.google.com/docs/database)
- [Règles de sécurité](https://firebase.google.com/docs/database/security)
- [Dashboard Vercel](https://vercel.com/dashboard)
