# Guide de préparation pour la soumission aux App Stores

## 1. Préparation pour l'App Store (iOS)

### Compte développeur Apple
- Créer un compte Apple Developer Program (99$ par an)
- Configurer les certificats et profils de provisionnement
- Configurer App Store Connect

### Métadonnées requises
- Nom de l'application: Fimysolutions
- Sous-titre: Cartes-cadeaux pour expériences locales
- Description complète (4000 caractères max)
- Description promotionnelle (170 caractères max)
- Mots-clés (100 caractères max)
- URL du site web de support
- URL de la politique de confidentialité

### Ressources graphiques
- Icône de l'application (1024x1024px)
- Captures d'écran pour iPhone (6.5" et 5.5")
- Captures d'écran pour iPad (12.9" et 11")
- Vidéo promotionnelle (facultatif)

### Informations de contact
- Nom, adresse email et numéro de téléphone du contact
- Informations de copyright

### Informations de tarification
- Prix: Gratuit (avec achats intégrés)
- Disponibilité: Tous les territoires ou sélection spécifique

### Informations de version
- Numéro de version: 1.0.0
- Numéro de build: 1
- Notes de version

### Révision de l'application
- Informations de connexion pour les testeurs Apple
- Notes pour la révision (instructions spéciales)
- Informations sur les fonctionnalités nécessitant une explication

## 2. Préparation pour Google Play Store (Android)

### Compte développeur Google
- Créer un compte Google Play Developer (frais uniques de 25$)
- Configurer la console Google Play

### Métadonnées requises
- Nom de l'application: Fimysolutions
- Description complète (4000 caractères max)
- Description courte (80 caractères max)
- Catégorie principale et secondaire
- Type de contenu et classification d'âge
- Email de contact

### Ressources graphiques
- Icône de l'application (512x512px)
- Image de fonctionnalité graphique (1024x500px)
- Captures d'écran pour téléphone (min. 2)
- Captures d'écran pour tablette (facultatif)
- Vidéo promotionnelle (facultatif)

### Informations de tarification
- Prix: Gratuit (avec achats intégrés)
- Pays de distribution

### Informations de version
- Numéro de version: 1.0.0
- Notes de version

### Confidentialité et conformité
- Questionnaire de classification de contenu
- Politique de confidentialité
- Déclaration de conformité aux lois sur l'exportation des États-Unis

## 3. Préparation technique

### Configuration du projet React Native
- Mettre à jour le fichier app.json:
```json
{
  "expo": {
    "name": "Fimysolutions",
    "slug": "fimysolutions",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.fimysolutions.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.fimysolutions.app"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### Création des builds
- Pour iOS:
```bash
expo build:ios
```

- Pour Android:
```bash
expo build:android
```

### Tests avant soumission
- Tester sur plusieurs appareils iOS et Android
- Vérifier la compatibilité avec différentes tailles d'écran
- Tester toutes les fonctionnalités principales
- Vérifier les performances et la stabilité
- Tester les trois langues (français, anglais, espagnol)

## 4. Liste de vérification finale

### Fonctionnalités
- [ ] Navigation entre les écrans fonctionne correctement
- [ ] Système multilingue fonctionne pour toutes les langues
- [ ] Système d'authentification fonctionne
- [ ] Affichage des expériences fonctionne
- [ ] Processus d'achat de carte-cadeau fonctionne
- [ ] Personnalisation des cartes-cadeaux fonctionne
- [ ] Système de paiement fonctionne
- [ ] Suivi des cartes-cadeaux fonctionne

### Conformité
- [ ] Politique de confidentialité conforme au RGPD
- [ ] Conditions d'utilisation claires
- [ ] Gestion des données utilisateur conforme aux réglementations
- [ ] Système de paiement conforme aux exigences des app stores

### Expérience utilisateur
- [ ] Interface utilisateur cohérente et intuitive
- [ ] Messages d'erreur clairs et utiles
- [ ] Temps de chargement optimisés
- [ ] Accessibilité vérifiée

## 5. Ressources supplémentaires

### Icônes et images
- Créer un dossier `assets` contenant:
  - icon.png (1024x1024px)
  - splash.png (2048x2048px)
  - adaptive-icon.png (pour Android)
  - favicon.png (pour web)
  - Captures d'écran pour les stores

### Documentation
- Créer un README.md avec les instructions d'installation et d'utilisation
- Documenter l'API et les intégrations tierces
- Préparer un guide de déploiement pour les futures mises à jour

## 6. Calendrier de soumission

1. Finalisation du développement: Semaine 1
2. Tests internes et corrections de bugs: Semaine 2
3. Tests utilisateurs (beta): Semaine 3
4. Préparation des assets et métadonnées: Semaine 3
5. Soumission à l'App Store: Fin de la semaine 3
6. Soumission au Google Play Store: Fin de la semaine 3
7. Période de révision estimée: 1-2 semaines
8. Date de lancement prévue: Semaine 5-6
