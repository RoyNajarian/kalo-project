# Kalo

Kalo est une application web qui calcule les besoins énergétiques d'un utilisateur à partir de son profil et de son activité physique. L'utilisateur renseigne quelques informations (sexe, âge, taille, poids, nombre de séances de sport par semaine et leur intensité), et Kalo lui indique son métabolisme de base, son niveau d'activité et son maintien calorique par jour et par semaine.

Projet réalisé dans le cadre de l'AdonisJS Lab, BUT MMI 3e année.

## Fonctionnalités

- **Création de compte et connexion**, avec des pages réservées aux utilisateurs connectés
- **Profil utilisateur** : saisie, consultation et modification des informations physiques et sportives
- **Validation des données** côté serveur (âge, taille, poids, nombre de séances, intensité)
- **Calcul des besoins énergétiques** :
  - métabolisme de base (formule de Mifflin-St Jeor)
  - niveau d'activité, déduit d'un score `séances par semaine × intensité`
  - maintien calorique par jour et par semaine
- **Tableau de bord** affichant les résultats, ou invitant à compléter son profil s'il est incomplet
- **Suppression du compte**, avec demande de confirmation

### Couverture CRUD

| Opération | Dans Kalo |
|---|---|
| Create | Création du compte |
| Read | Consultation du profil et des résultats |
| Update | Modification du profil |
| Delete | Suppression du compte |

### Évolutions prévues

- Programmes de musculation adaptés (haut du corps, bas du corps)
- Filtres sur les programmes
- Suivi des séances et de la progression
- Interface mobile avec barre d'onglets façon application

## Technologies

- **AdonisJS 7** (backend, starter kit React)
- **Lucid ORM** et **SQLite** (base de données)
- **VineJS** (validation des données)
- **Inertia.js** et **React** (interface)
- **TypeScript**

## Installation et lancement

Prérequis : **Node.js 24** ou supérieur et **npm 11** ou supérieur.

```bash
# 1. Cloner le dépôt
git clone https://github.com/RoyNajarian/kalo-project.git
cd kalo-project

# 2. Installer les dépendances
npm install

# 3. Créer le fichier d'environnement et générer la clé de l'application
cp .env.example .env
node ace generate:key

# 4. Créer les tables de la base de données
node ace migration:run

# 5. Lancer le serveur de développement
npm run dev
```

L'application est ensuite disponible sur [http://localhost:3333](http://localhost:3333). Il suffit de créer un compte sur `/signup`, puis de compléter son profil.

## Organisation du code

| Fichier | Rôle |
|---|---|
| `database/migrations/..._alter_users_table.ts` | Ajoute les champs du profil à la table `users` |
| `app/models/user.ts` | Modèle Lucid de l'utilisateur |
| `app/validators/user.ts` | Règles de validation du profil (`profileValidator`) |
| `app/services/energy_service.ts` | Toute la logique de calcul énergétique |
| `app/transformers/user_transformer.ts` | Choisit les champs de l'utilisateur envoyés à l'interface |
| `app/controllers/profile_controller.ts` | Affichage, modification et suppression du profil |
| `app/controllers/dashboard_controller.ts` | Appelle le service et transmet les résultats au tableau de bord |
| `start/routes.ts` | Définition des routes |
| `inertia/pages/profile.tsx` | Page profil (résumé et formulaire) |
| `inertia/pages/dashboard.tsx` | Tableau de bord avec les résultats |

Le trajet d'une requête suit le schéma MVC d'AdonisJS : **route → contrôleur → validateur → modèle → service → page React**. Les calculs sont isolés dans un service pour que les contrôleurs restent courts et que la logique soit réutilisable et testable indépendamment.

L'inscription et la connexion sont fournies par le starter kit React d'AdonisJS.

## Utilisation de l'IA

**Outil utilisé** : Claude (Anthropic), comme partenaire de conception, de développement et de débogage.

**Comment elle m'a aidé**
- Prendre en main AdonisJS et TypeScript, que je découvrais, grâce à des explications détaillées ligne par ligne
- Structurer le projet (migration, service, validateur, contrôleurs, routes)
- Comprendre et corriger les erreurs rencontrées
- Configurer Git et GitHub en ligne de commande

**Avantages**
- Avancer rapidement sur un framework inconnu
- Obtenir des explications adaptées à mon niveau, et demander des versions plus simples du code quand je ne le comprenais pas

**Difficultés et erreurs corrigées**
- Un résultat de test attendu était faux d'une unité à cause d'un arrondi (19 041 au lieu de 19 042), repéré en vérifiant le calcul
- Le premier code proposé était trop compact pour mon niveau en TypeScript : je l'ai fait réécrire de façon plus explicite pour pouvoir le comprendre et l'expliquer
- L'IA ne connaissait pas la structure exacte du starter kit AdonisJS 7 : il a fallu lui montrer les vrais fichiers du projet avant d'écrire du code, plutôt que de la laisser deviner
- Plusieurs erreurs ont été rencontrées et corrigées pendant le développement : une route déclarée en double, un commentaire JSX mal fermé provoquant une erreur trompeuse, une méthode dont la définition et l'appel ne correspondaient plus

**Ce que j'en retiens** : l'IA accélère beaucoup le développement, mais il faut vérifier ce qu'elle produit, tester le code (notamment dans le REPL d'AdonisJS) et ne garder que du code que l'on comprend.

## Auteur

Roy Najarian, BUT MMI 3e année, Université Gustave Eiffel
