# 🔥 Configuration Firebase pour AlcoTrack

## Étapes de Configuration

### 1️⃣ Créer un Projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur **"Ajouter un projet"**
3. Nommez-le `alcotrack` (ou autre nom)
4. Désactivez Google Analytics (optionnel pour ce projet)
5. Cliquez sur **"Créer le projet"**

### 2️⃣ Activer Realtime Database

1. Dans le menu de gauche, cliquez sur **"Realtime Database"**
2. Cliquez sur **"Créer une base de données"**
3. Choisissez une localisation (ex: `europe-west1`)
4. Sélectionnez **"Mode test"** pour commencer (⚠️ à sécuriser plus tard)
5. Cliquez sur **"Activer"**

### 3️⃣ Configurer les Règles de Sécurité

Dans l'onglet **"Règles"**, remplacez par :

```json
{
  "rules": {
    "events": {
      "$eventId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

⚠️ **IMPORTANT** : Ces règles permettent à tout le monde de lire/écrire. Pour la production, vous devrez les sécuriser.

### 4️⃣ Obtenir les Clés de Configuration

1. Cliquez sur l'icône ⚙️ (Paramètres) > **"Paramètres du projet"**
2. Faites défiler jusqu'à **"Vos applications"**
3. Cliquez sur l'icône web **`</>`** pour créer une app web
4. Nommez l'app `alcotrack-web`
5. **NE PAS** cocher "Configurer Firebase Hosting"
6. Cliquez sur **"Enregistrer l'application"**

Vous verrez un bloc de configuration comme :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "alcotrack-xxxxx.firebaseapp.com",
  databaseURL: "https://alcotrack-xxxxx-default-rtdb.firebaseio.com",
  projectId: "alcotrack-xxxxx",
  storageBucket: "alcotrack-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 5️⃣ Configurer l'Application

1. Copiez le fichier `.env.local.example` vers `.env.local` :
   ```bash
   cp .env.local.example .env.local
   ```

2. Éditez `.env.local` et remplacez par vos valeurs :

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=alcotrack-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://alcotrack-xxxxx-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=alcotrack-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=alcotrack-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

3. **Redémarrez le serveur** :
   ```bash
   npm run dev
   ```

### 6️⃣ Tester

1. Créez un événement sur un navigateur/téléphone
2. Notez le code (ex: `K3F9L2`)
3. Sur un autre navigateur/téléphone, rejoignez avec ce code
4. Ajoutez des boissons sur l'un, elles apparaîtront sur l'autre en temps réel ! 🎉

## 🔒 Sécurisation pour Production

Une fois que tout fonctionne, sécurisez les règles Firebase :

```json
{
  "rules": {
    "events": {
      "$eventId": {
        ".read": true,
        ".write": "!data.exists() || data.child('participants').val().hasChild(auth.uid)"
      }
    }
  }
}
```

## 📊 Structure de la Base de Données

```
alcotrack-xxxxx
└── events/
    ├── ABC123/
    │   ├── id: "ABC123"
    │   ├── name: "Soirée du vendredi"
    │   ├── createdAt: 1736803200000
    │   ├── participants: [...]
    │   └── consumptions: [...]
    └── XYZ789/
        └── ...
```

## ❓ Dépannage

### "Firebase: Error (auth/api-key-not-valid)"
→ Vérifiez que vos clés dans `.env.local` sont correctes

### "PERMISSION_DENIED"
→ Vérifiez les règles de sécurité Firebase

### Les événements ne se synchronisent pas
→ Ouvrez la console (F12) et vérifiez les erreurs
→ Vérifiez que `databaseURL` est correct

### Le serveur ne redémarre pas
→ Arrêtez avec Ctrl+C et relancez `npm run dev`

## 🌐 Déploiement

Quand vous déployez sur Vercel :

1. Allez dans les paramètres du projet Vercel
2. Ajoutez les variables d'environnement
3. Redéployez

---

**🔥 Firebase est maintenant configuré ! Les utilisateurs peuvent partager des événements en temps réel !**
