# Configuration des variables d'environnement sur Vercel

## ⚠️ IMPORTANT - À faire MAINTENANT

Votre déploiement Vercel a échoué car les variables d'environnement Firebase ne sont pas configurées.

## 🚀 Méthode RAPIDE : Importer le fichier .env

### Étape 1 : Préparez votre fichier .env.local

Le fichier existe déjà : `C:\Users\glesaux\Documents\Perso\alcotrack-web\.env.local`

### Étape 2 : Allez sur Vercel Settings

1. **Allez sur votre projet Vercel** : https://vercel.com/guigzs-projects/alco-track
2. **Cliquez sur "Settings"** dans le menu du haut
3. **Cliquez sur "Environment Variables"** dans le menu de gauche

### Étape 3 : Importez le fichier

1. Cliquez sur le bouton **"Import .env.local"** ou **"Import"** en haut de la page
2. Sélectionnez votre fichier `.env.local`
3. Vercel importera **automatiquement** toutes les variables

### Étape 4 : Redéployer

Une fois importé, Vercel redéploiera automatiquement votre application ! ✅

---

## Alternative MANUELLE : Ajouter les variables une par une

Si l'import ne fonctionne pas, vous pouvez ajouter chaque variable manuellement :

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

### Pour chaque variable :
1. Cliquez sur "Add New"
2. Entrez le nom de la variable
3. Copiez/collez la valeur
4. Sélectionnez les 3 environnements : **Production**, **Preview**, **Development**
5. Cliquez "Save"

---

## ✅ Vérification

Une fois déployé, votre application sera accessible sur :
- https://alco-track-git-main-guigzs-projects-c57245a2.vercel.app
- ou un autre domaine Vercel qui vous sera attribué

**Après configuration, votre application fonctionnera en production !**
