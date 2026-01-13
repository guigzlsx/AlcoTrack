# 🚀 Guide de Déploiement - AlcoTrack

## Déploiement sur Vercel (Recommandé)

Vercel est la plateforme officielle de Next.js et offre le déploiement le plus simple.

### Étapes

1. **Créer un compte sur [Vercel](https://vercel.com)**

2. **Connecter votre repository Git**
   - Push votre code sur GitHub/GitLab/Bitbucket
   - Sur Vercel, cliquez "New Project"
   - Importez votre repository

3. **Configuration automatique**
   - Vercel détecte automatiquement Next.js
   - Pas de configuration nécessaire !

4. **Déployer**
   - Cliquez "Deploy"
   - Votre app sera en ligne en quelques minutes

### Commandes

```bash
# Via CLI Vercel
npm i -g vercel
vercel
```

## Déploiement sur Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

## Déploiement sur votre serveur

### Avec Node.js

```bash
# Build l'application
npm run build

# Démarrer en production
npm start
```

### Avec Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
docker build -t alcotrack .
docker run -p 3000:3000 alcotrack
```

## Variables d'Environnement

Pour le moment, l'application utilise localStorage uniquement. Si vous ajoutez un backend :

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
```

## Performance & SEO

### Optimisations recommandées

- ✅ **Image Optimization** : Utiliser Next.js Image pour les icônes
- ✅ **Compression** : Activer gzip/brotli sur votre serveur
- ✅ **Cache** : Headers Cache-Control appropriés
- ✅ **CDN** : Utiliser un CDN (Vercel/Cloudflare)

### Métriques

```bash
# Analyser le bundle
npm run build
npx @next/bundle-analyzer
```

## Monitoring

### Recommandations

- **Vercel Analytics** : Gratuit pour les projets Vercel
- **Google Analytics** : Ajouter dans `layout.tsx`
- **Sentry** : Pour le monitoring d'erreurs

## SSL/HTTPS

- ✅ Vercel/Netlify : SSL automatique
- Pour serveur personnel : [Let's Encrypt](https://letsencrypt.org/)

## Domaine personnalisé

### Sur Vercel

1. Aller dans Settings > Domains
2. Ajouter votre domaine
3. Configurer les DNS selon les instructions

### Configuration DNS

```
Type  Name    Value
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
```

## Checklist avant déploiement

- [ ] Tester en mode production local (`npm run build && npm start`)
- [ ] Vérifier que toutes les fonctionnalités marchent
- [ ] Tester sur mobile (responsive)
- [ ] Vérifier les performances (Lighthouse)
- [ ] Configurer les métadonnées SEO
- [ ] Ajouter robots.txt et sitemap.xml
- [ ] Configurer les headers de sécurité
- [ ] Tester le partage sur réseaux sociaux (Open Graph)

## Support Multi-Utilisateurs (Future)

Quand vous ajouterez un backend :

1. **API Routes** : Créer dans `app/api/`
2. **Database** : Supabase, Firebase, MongoDB
3. **Auth** : NextAuth.js, Clerk, Auth0
4. **Real-time** : WebSocket, Pusher, Ably

## Coûts

### Gratuit
- Vercel : Hobby plan (suffisant pour commencer)
- Netlify : Free tier
- GitHub Pages : Gratuit (nécessite adaptation)

### Payant (si besoin)
- Vercel Pro : $20/mois
- Domaine : ~$10-15/an
- Backend (si ajouté) : Variable selon service

---

**Besoin d'aide ?** Consultez la [documentation Next.js](https://nextjs.org/docs/deployment) ou [Vercel docs](https://vercel.com/docs)
