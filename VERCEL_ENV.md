# Configuration des variables d'environnement sur Vercel

## ⚠️ IMPORTANT - À faire MAINTENANT

Votre déploiement Vercel a échoué car les variables d'environnement Firebase ne sont pas configurées.

## Étapes à suivre

1. **Allez sur votre projet Vercel** : https://vercel.com/guigzs-projects/alco-track

2. **Cliquez sur "Settings"** dans le menu du haut

3. **Cliquez sur "Environment Variables"** dans le menu de gauche

4. **Ajoutez TOUTES ces variables** une par une :

### Variables à ajouter

Copiez les valeurs depuis votre fichier `.env.local` :

| Nom de la variable | Environnements |
|-------------------|----------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | Production, Preview, Development |

### Valeurs depuis .env.local

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyArMrcdkiCohau3wgrGVe1e5bzyXYh-wUY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=alcotrack-b3ae9.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=alcotrack-b3ae9
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=alcotrack-b3ae9.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1054838827348
NEXT_PUBLIC_FIREBASE_APP_ID=1:1054838827348:web:b0f1086f16c75cef1cf9c9
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://alcotrack-b3ae9-default-rtdb.europe-west1.firebasedatabase.app
```

## 5. Redéployer

Une fois toutes les variables ajoutées, Vercel redéploiera automatiquement votre application.

Vous pouvez aussi forcer un redéploiement en allant dans "Deployments" puis "Redeploy".

## Vérification

Une fois déployé, votre application sera accessible sur :
- https://alco-track-git-main-guigzs-projects-c57245a2.vercel.app
- ou un autre domaine Vercel qui vous sera attribué

✅ Après configuration, votre application fonctionnera en production !
