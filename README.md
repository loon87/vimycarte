# Guide de déploiement de Fimysolutions

Ce document contient toutes les instructions nécessaires pour déployer le site web Fimysolutions sur votre propre nom de domaine et commencer à recevoir des ventes.

## Table des matières

1. [Contenu du package](#contenu-du-package)
2. [Prérequis techniques](#prérequis-techniques)
3. [Options de déploiement](#options-de-déploiement)
   - [Option 1: Hébergement statique (recommandé)](#option-1-hébergement-statique-recommandé)
   - [Option 2: Serveur web traditionnel](#option-2-serveur-web-traditionnel)
   - [Option 3: Conteneur Docker](#option-3-conteneur-docker)
4. [Configuration du nom de domaine](#configuration-du-nom-de-domaine)
5. [Intégration des paiements](#intégration-des-paiements)
6. [Personnalisation du site](#personnalisation-du-site)
7. [Maintenance et mises à jour](#maintenance-et-mises-à-jour)
8. [Support technique](#support-technique)

## Contenu du package

Ce package contient tous les fichiers nécessaires pour déployer le site web Fimysolutions:

- `index.html` et autres fichiers HTML: Pages principales du site
- `/css`: Feuilles de style CSS
- `/js`: Scripts JavaScript pour les fonctionnalités interactives
- `/images`: Images et ressources graphiques
- `/en` et `/es`: Versions anglaise et espagnole du site

## Prérequis techniques

Pour déployer ce site, vous aurez besoin de:

- Un service d'hébergement web
- Un nom de domaine (optionnel mais recommandé)
- Connaissances de base en déploiement web

## Options de déploiement

### Option 1: Hébergement statique (recommandé)

Cette option est la plus simple et la plus économique.

**Services recommandés:**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Google Cloud Storage + Cloud CDN

**Instructions pour Netlify (le plus simple):**

1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Depuis le tableau de bord, cliquez sur "New site from upload"
3. Faites glisser-déposer le dossier décompressé de ce package
4. Attendez que le déploiement soit terminé
5. Votre site est en ligne! Vous pouvez maintenant configurer votre nom de domaine personnalisé

### Option 2: Serveur web traditionnel

Si vous préférez utiliser un hébergement web traditionnel:

1. Décompressez ce package
2. Téléversez tous les fichiers dans le répertoire racine de votre hébergement web (généralement `/public_html`, `/www` ou `/htdocs`)
3. Assurez-vous que les permissions des fichiers sont correctement configurées (généralement 644 pour les fichiers et 755 pour les dossiers)

**Services recommandés:**
- OVHcloud
- GoDaddy
- Hostinger
- Bluehost

### Option 3: Conteneur Docker

Pour une solution plus avancée et portable:

1. Installez Docker sur votre serveur
2. Créez un fichier `Dockerfile` avec le contenu suivant:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

3. Construisez l'image Docker:
```bash
docker build -t fimysolutions .
```

4. Exécutez le conteneur:
```bash
docker run -d -p 80:80 fimysolutions
```

## Configuration du nom de domaine

Pour configurer votre propre nom de domaine:

1. Achetez un nom de domaine auprès d'un registraire (GoDaddy, Namecheap, OVH, etc.)
2. Configurez les enregistrements DNS pour pointer vers votre hébergement:
   - Pour un hébergement traditionnel: Créez un enregistrement A pointant vers l'adresse IP de votre serveur
   - Pour Netlify/Vercel: Suivez leurs instructions pour ajouter un domaine personnalisé
   - Pour AWS/Google Cloud: Configurez les enregistrements CNAME comme indiqué dans leur documentation

## Intégration des paiements

Le site est actuellement configuré avec une simulation de paiement. Pour accepter de vrais paiements:

1. Créez un compte chez un processeur de paiement (Stripe recommandé)
2. Remplacez les clés API de démonstration dans les fichiers suivants:
   - `/js/payment-processing.js`
   - `/js/subscription-management.js`

Exemple d'intégration Stripe:
```javascript
// Remplacez ceci:
const stripePublicKey = 'pk_test_demo123456';

// Par votre vraie clé publique:
const stripePublicKey = 'pk_live_votreclereelle';
```

## Personnalisation du site

Pour personnaliser le site selon vos besoins:

- **Logo et marque**: Remplacez les images dans `/images` et mettez à jour les références dans les fichiers HTML
- **Couleurs**: Modifiez les variables CSS dans `/css/styles.css` et `/css/enhanced-styles.css`
- **Contenu**: Éditez les fichiers HTML pour modifier le texte et les descriptions
- **Forfaits et commissions**: Ajustez les prix et pourcentages dans `/js/subscription-management.js`

## Maintenance et mises à jour

Pour maintenir votre site à jour:

1. Sauvegardez régulièrement vos fichiers et configurations
2. Mettez à jour les bibliothèques JavaScript si nécessaire
3. Testez toute modification sur un environnement de développement avant de la déployer en production

## Support technique

Si vous avez besoin d'aide pour le déploiement ou la personnalisation:

- Consultez la documentation complète dans le dossier `/docs`
- Contactez notre équipe de support à support@fimysolutions.com
- Visitez notre forum d'aide à forum.fimysolutions.com

---

© 2025 Fimysolutions. Tous droits réservés.
