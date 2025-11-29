# ANKORA Global Connect

Plateforme web collaborative qui simplifie la recherche de stages/emplois à l'international via la mise en relation entre étudiants et mentors certifiés.

## 🚀 Stack Technique

- **Frontend** : React 18 + Vite
- **Styling** : Tailwind CSS
- **Backend & Auth** : Supabase (PostgreSQL, Authentication, Real-time)
- **Langage** : TypeScript
- **Routing** : React Router v6
- **Icônes** : Lucide React

## 📋 Prérequis

- Node.js 18+ et npm
- Un compte Supabase (gratuit)
- Git (optionnel)

## 🛠️ Installation

### 1. Cloner/Naviguer vers le projet

```bash
cd /Users/tristanthomas/Desktop/SaaS/Ankora/ext/ankora
```

**⚠️ IMPORTANT** : Assurez-vous d'être dans le répertoire `ankora` et non dans `ext` !

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer Supabase

#### a) Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte (gratuit)
3. Créez un nouveau projet
4. Notez l'URL du projet et la clé anonyme (anon key)

#### b) Créer la base de données

**Pour une nouvelle installation :**
1. Dans votre dashboard Supabase, allez dans **SQL Editor**
2. Créez une nouvelle requête
3. Ouvrez le fichier `supabase-schema.sql` dans ce projet
4. Copiez-collez tout le contenu dans l'éditeur SQL
5. Exécutez la requête (bouton "Run")

**Pour mettre à jour une base existante :**
1. Si vous avez déjà une base de données existante, utilisez `supabase-migration-update.sql`
2. Ce script ajoutera les nouvelles tables et colonnes sans supprimer les données existantes

#### c) Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```bash
# Dans le terminal, depuis le répertoire ankora
touch .env
```

Puis ajoutez-y le contenu suivant (remplacez par vos propres valeurs) :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anon-ici
```

**Où trouver ces valeurs ?**
- Dashboard Supabase → **Settings** → **API**
- **Project URL** → `VITE_SUPABASE_URL`
- **Project API keys** → **anon public** → `VITE_SUPABASE_ANON_KEY`

### 4. Lancer le projet

```bash
npm run dev
```

Le projet sera accessible sur `http://localhost:5173` (ou un autre port si 5173 est occupé).

## 📁 Structure du Projet

```
ankora/
├── src/
│   ├── components/              # Composants réutilisables
│   │   ├── layout/              # Navbar/Footer
│   │   ├── dashboard/           # Composants historiques liés aux dashboards
│   │   ├── Button.tsx           # Bouton avec variantes
│   │   ├── Card.tsx             # Container de contenu
│   │   ├── Input.tsx            # Champ de formulaire
│   │   ├── Badge.tsx            # Tags de statut/expertise
│   │   ├── SectionHeader.tsx    # Titres de section consistants
│   │   └── ProtectedRoute.tsx   # Protection des routes
│   ├── data/                    # Données mock (mentors, FAQs...)
│   ├── lib/                     # Utilitaires et configuration
│   │   ├── supabase.ts          # Client Supabase + types
│   │   └── auth.tsx             # Contexte d'authentification
│   ├── pages/                   # Pages de l'application
│   │   ├── public (Landing/About/FAQ...)
│   │   ├── student/             # Espace étudiant (dashboard, recherche, profil)
│   │   ├── mentor/              # Espace mentor (demandes, messages, profil)
│   │   └── messages/            # Pages conversation
│   ├── App.tsx                  # Composant racine + routage
│   ├── main.tsx                 # Point d'entrée
│   └── index.css                # Styles globaux Tailwind
├── supabase-schema.sql          # Schéma de base de données
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Fonctionnalités

### Zone Publique
- Page d'accueil enrichie (statistiques, témoignages, CTA étudiants/mentors)
- Pages "À propos", "Comment ça marche", "Devenir mentor" et "FAQ"
- Footer complet (confiance, contact) + navigation claire

### Authentification
- Inscription avec email/mot de passe
- Connexion avec gestion de session
- Protection des routes privées
- Déconnexion

### Onboarding
- Sélection du rôle (Étudiant/Mentor)
- Complétion du profil avec informations spécifiques au rôle
- Redirection automatique si profil déjà complété

### Dashboard Étudiant
- Vue d’ensemble + KPI clés (demandes, messages, pays cibles)
- Recherche mentors avec filtres pays/langues/expertise
- Suivi des requêtes et messagerie listée par conversation
- Profil étudiant éditable (université, objectifs, langues, CV)

### Dashboard Mentor
- Vue d’ensemble + KPI accompagnements
- Gestion des demandes reçues et des étudiants actifs
- Messagerie listée par conversation
- Profil mentor (expertises, disponibilités, LinkedIn)

### Messagerie Temps Réel
- Communication en temps réel via Supabase Realtime
- Interface de chat intuitive
- Historique des messages

## 🗄️ Base de Données

### Tables principales

1. **profiles** : Profils utilisateurs (étudiants et mentors)
   - Informations personnelles, localisation, compétences
   - Rôle (student/mentor)
   - Statut de vérification (pending_verification, under_review, verified, rejected)

2. **student_details** : Détails spécifiques aux étudiants
   - École, niveau d'études, domaine d'études
   - Pays et villes cibles, secteurs d'intérêt
   - Type et durée de stage recherché
   - Liens LinkedIn, CV, preuves d'étudiant
   - Date de début souhaitée, objectifs

3. **mentor_details** : Détails spécifiques aux mentors
   - Poste actuel, entreprise, années d'expérience
   - Secteurs d'expertise, réseau de pays
   - Types d'aide proposés, formats de coaching
   - Types de contact acceptés
   - Documents de preuve, limite d'étudiants par mois

4. **requests** : Demandes de contact
   - Lien étudiant ↔ mentor
   - Statut (pending/accepted/rejected)
   - Message optionnel

5. **messages** : Messages de la messagerie
   - Liés à une requête acceptée
   - Contenu et timestamp

### Sécurité

- **Row Level Security (RLS)** activé sur toutes les tables
- Politiques de sécurité pour limiter l'accès aux données
- Les utilisateurs ne peuvent voir/modifier que leurs propres données
- Les détails étudiants/mentors sont privés et accessibles uniquement au propriétaire

## 🔧 Scripts Disponibles

```bash
# Développement (serveur de dev avec hot-reload)
npm run dev

# Build de production
npm run build

# Prévisualiser le build de production
npm run preview

# Linter
npm run lint
```

## 🐛 Résolution de Problèmes

### Erreur "Could not read package.json"

**Problème** : Vous n'êtes pas dans le bon répertoire.

**Solution** :
```bash
# Vérifiez votre emplacement actuel
pwd

# Si vous êtes dans /Users/tristanthomas/Desktop/SaaS/Ankora/ext
# Allez dans le sous-dossier ankora
cd ankora

# Vérifiez que package.json existe
ls package.json

# Puis lancez le projet
npm run dev
```

### Erreur "Variables d'environnement Supabase manquantes"

**Problème** : Le fichier `.env` n'existe pas ou est mal configuré.

**Solution** :
1. Créez un fichier `.env` à la racine du projet
2. Ajoutez vos credentials Supabase (voir section Installation)
3. Redémarrez le serveur de développement

### Erreur de connexion à Supabase

**Problème** : Les credentials sont incorrects ou la base de données n'est pas configurée.

**Solution** :
1. Vérifiez que l'URL et la clé dans `.env` sont correctes
2. Vérifiez que vous avez exécuté le script SQL (`supabase-schema.sql`)
3. Vérifiez que RLS est activé dans Supabase

### Le projet ne se compile pas

**Problème** : Dépendances manquantes ou erreurs TypeScript.

**Solution** :
```bash
# Réinstallez les dépendances
rm -rf node_modules package-lock.json
npm install

# Vérifiez les erreurs TypeScript
npm run build
```

### Erreur `npm error 403 Forbidden - GET https://registry.npmjs.org/@radix-ui/react-slot`

**Problème** : `npm install` échoue à cause d'un blocage d'accès au registre npm pour certains packages (ex. `@radix-ui/react-slot`).

**Solution recommandée** :
1. Vérifiez votre configuration npm (proxies ou registries personnalisés) :
   ```bash
   npm config get registry
   npm config list
   ```
2. Forcez l'utilisation du registre public si besoin :
   ```bash
   npm install --registry=https://registry.npmjs.org
   ```
3. Si le réseau d'entreprise bloque certains packages, demandez l'autorisation ou ajoutez le registre à la liste blanche, puis relancez `npm install`.

## 📝 Développement

### Ajouter une nouvelle fonctionnalité

1. Créez vos composants dans `src/components/`
2. Créez vos pages dans `src/pages/`
3. Ajoutez les routes dans `src/App.tsx`
4. Utilisez les hooks et utilitaires de `src/lib/`

### Styles

- Utilisez Tailwind CSS pour le styling
- Les classes utilitaires sont préférées
- Les composants réutilisables (Button, Card, Input) sont dans `src/components/`

### Types TypeScript

- Les types de base de données sont définis dans `src/lib/supabase.ts`
- Utilisez le typage strict pour éviter les erreurs

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

### Options de déploiement

- **Vercel** : Déploiement automatique depuis Git
- **Netlify** : Déploiement avec support des variables d'environnement
- **Supabase Hosting** : Hébergement intégré avec Supabase

N'oubliez pas de configurer les variables d'environnement dans votre plateforme de déploiement !

## 📚 Ressources

- [Documentation React](https://react.dev)
- [Documentation Vite](https://vitejs.dev)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

## 📄 Licence

Ce projet est privé et destiné à un usage interne.

## 👥 Support

Pour toute question ou problème, consultez la section "Résolution de Problèmes" ci-dessus ou contactez l'équipe de développement.

---

**Développé avec ❤️ pour faciliter les connexions internationales entre étudiants et mentors**
