<div align="center">

# 🚀 OneClick Invest

### Simplifiez vos levées de fonds en un clic

[![GitHub License](https://img.shields.io/badge/license-MIT-0d1117)](LICENSE)
[![Strapi](https://img.shields.io/badge/strapi-5.6.0-4945ff)](https://strapi.io)
[![11ty](https://img.shields.io/badge/11ty-3.0.0-222)](https://www.11ty.dev/)

</div>

## 🌟 À propos

# Projet CMS pour OneClick Invest (OCI) par Absconse

Ce projet fournit une solution de gestion de contenu (CMS) sur mesure pour OneClick Invest (OCI), une plateforme de financement participatif innovante qui permet aux entreprises de transformer leurs clients en investisseurs. Développée par Absconse, cette solution combine la puissance d'un CMS headless (Strapi) avec les performances d'un générateur de site statique (11ty) pour offrir une expérience utilisateur optimale et une gestion de contenu flexible.

## Contexte

OneClick Invest (OCI) avait besoin d'une solution CMS performante et adaptable pour gérer efficacement son contenu et soutenir sa mission de démocratisation de l'investissement. Absconse a répondu à ce besoin en développant une architecture combinant les technologies suivantes :

## Technologies utilisées

*   **Strapi (CMS Headless) :** Strapi offre une interface intuitive pour la création, la gestion et la diffusion de contenu. Son architecture headless permet une flexibilité maximale dans la manière dont le contenu est présenté, ouvrant la voie à de futures évolutions et intégrations. Il assure également une sécurité renforcée pour la gestion des données.
*   **11ty (Générateur de site statique) :** 11ty génère des sites web statiques ultra-rapides, offrant des performances optimales en termes de vitesse de chargement et d'expérience utilisateur. Cette approche améliore également le référencement naturel (SEO) du site.
*   **Système de prévisualisation :** Un système de prévisualisation intégré permet aux équipes d'OCI de visualiser les modifications apportées au contenu en temps réel avant leur publication, garantissant ainsi un contrôle total sur l'apparence et la qualité du contenu mis en ligne.

## 💡 Architecture technique

### Backend (Strapi)
- **CMS Headless** : Séparation complète entre le backend et le frontend
- **API RESTful** : Permet une communication efficace entre les services
- **Système de rôles** : Gestion avancée des permissions
- **Webhooks** : Déclenchement automatique de la reconstruction du site lors des modifications

### Frontend (11ty)
- **Générateur statique** : Création de pages HTML optimisées
- **Sans JavaScript côté client** : Performance maximale
- **Templates modulaires** : Facilite la maintenance et les modifications
- **Intégration API** : Récupération automatique des données depuis Strapi

## ⚙️ Prérequis techniques

| Composant | Version | Pourquoi ? |
|-----------|---------|------------|
| Node.js | ≥ 14.0.0 | Environnement d'exécution JavaScript |
| npm/yarn | Dernière version | Gestionnaire de paquets |
| Git | Dernière version | Contrôle de version |

## 🚀 Installation détaillée

### 1. Configuration initiale
```bash
# Clone le repository
git clone https://github.com/AbsconseOfficiel/OneClickInvest.git
cd OneClickInvest

# Installation des dépendances
npm install
```

### 2. Configuration de l'environnement
1. **Fichier .env** :
   ```env
   CLIENT_URL=...
   PREVIEW_SECRET=...
   ```
   - `CLIENT_URL` : URL du site frontend
   - `PREVIEW_SECRET` : Clé de sécurité pour la prévisualisation

2. **Structure des dossiers** :
   ```
   .
   ├── data/             # Stockage
   │   └── data.db       # Données de démo
   ├── src/              # Code source
   ├── public/           # Fichiers statiques
   └── .env              # Configuration
   ```

## 🔧 Scripts npm

| Commande | Description | Utilisation |
|----------|-------------|-------------|
| `npm run start` | Premier démarrage | Initialise la base de données et configure Strapi |
| `npm run start-all` | Démarrage complet | Lance tous les services (Strapi, 11ty, webhooks) |

## 📖 Utilisation du CMS

### Accès administrateur
- **URL** : http://localhost:1337
- **Identifiants** :
  ```
  Email : admin@admin.com
  Mot de passe : Oneclickinvest123*
  ```

### Structure du contenu

#### Header
- Navigation du site
- Liens et menus
- Logo et branding

#### Pages
- **Home** :
  - Sections modulaires
  - Contenus dynamiques
  - Mise en page flexible

### Système de prévisualisation
1. **Comment ça marche** :
   - Webhooks pour la synchronisation
   - Reconstruction automatique
   - Vue en temps réel des modifications

2. **Configuration du webhook** :
   - Dans Strapi : `Paramètres → Webhooks → Update`
   - Port à configurer selon le message : `Serveur en écoute sur ...`

## ⚠️ Résolution des problèmes courants

### Prévisualisation ne fonctionne pas
1. Vérifiez le port dans les webhooks
2. Assurez-vous que le service webhook est en cours d'exécution
3. Vérifiez les logs pour les erreurs

### Erreurs de build
1. Réinstallez les dépendances : `npm install`
2. Relancez le build : `npm run start`

## 🔄 Workflow de développement

1. **Modification du contenu** :
   - Utilisez l'interface Strapi
   - Prévisualisez les changements
   - Publiez quand tout est prêt

2. **Développement de fonctionnalités** :
   - Créez une branche : `feature/[nom-fonctionnalite]`
   - Développez et testez localement
   - Soumettez une pull request

## 📝 Notes de version

Cette version est en phase de TEST et inclut :
- ✅ CMS fonctionnel
- ✅ Génération de site statique
- ✅ Système de prévisualisation
- ⏳ Fonctionnalités additionnelles en développement

## 🤝 Support et contribution

- **Issues** : Utilisez GitHub Issues pour les bugs
- **Suggestions** : Ouvrez une discussion GitHub
- **Contributions** : Pull requests bienvenues

---

<div align="center">
Made with ❤️ by Absconse
</div>