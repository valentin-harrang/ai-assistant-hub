# 🤖 AI Assistant Hub

Projet Next.js démontrant l'intégration de l'IA avec le **AI SDK** de Vercel et les différents modes de rendu de Next.js.

## 🎯 Objectifs

- **CSR (Client-Side Rendering)** : Chat interactif en temps réel avec streaming IA
- **SSR (Server-Side Rendering)** : Génération de contenu IA côté serveur
- **SSG (Static Site Generation)** : Page statique (À propos)

## ✨ Fonctionnalités

- 💬 **Chat streaming** : Réponses IA en temps réel avec `useChat`
- 🧠 **Filtrage du raisonnement** : Masque automatiquement les balises `<think>` de l'IA
- 📝 **Rendu Markdown** : Affichage enrichi des réponses (titres, listes, code, etc.)
- 🌓 **Dark mode** : Bascule automatique entre thème clair et sombre
- 🎨 **Design moderne** : Interface élégante avec ShadCn UI et animations
- ♿ **Accessibilité** : Composants basés sur Radix UI (ARIA, keyboard navigation)
- 📱 **Responsive** : S'adapte à tous les écrans (mobile, tablette, desktop)
- 🔄 **Auto-scroll** : Le chat descend automatiquement au nouveau message
- 🎯 **TypeScript strict** : Typage fort, **aucun `any`** autorisé

## 🛠️ Stack Technique

- **Framework** : [Next.js 16](https://nextjs.org) (App Router, React 19)
- **IA** : [Vercel AI SDK](https://ai-sdk.dev) avec Groq (Mixtral)
- **Language** : TypeScript (strict mode, NO `any`)
- **Styling** : Tailwind CSS 4
- **UI Components** : [ShadCn UI](https://ui.shadcn.com/) (Radix UI + Tailwind)
- **Dark Mode** : [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons** : [Lucide React](https://lucide.dev/)
- **State Management** : React hooks (`useState`, `useChat`)
- **Data Fetching** : TanStack Query (React Query)

## 📦 Installation

```bash
# Cloner le projet
git clone <repository-url>
cd ai-assistant-hub

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Éditer .env.local et ajouter votre clé API Groq
# GROQ_API_KEY=your_groq_api_key_here
```

## 🔑 Variables d'environnement

### Configuration requise

Créez un fichier `.env.local` à la racine du projet (copiez depuis `.env.example`) :

```env
# Groq API Configuration
# Get your API key from: https://console.groq.com
GROQ_API_KEY=your_groq_api_key_here
```

### Obtenir une clé API Groq

1. Allez sur [https://console.groq.com](https://console.groq.com)
2. Créez un compte (gratuit)
3. Générez une clé API
4. Copiez la clé et ajoutez-la dans `.env.local`

### Fichiers d'environnement

- `.env.example` - Template avec les variables nécessaires (versionné)
- `.env.local` - Votre fichier local avec les vraies clés (ignoré par git)
- `.env` - Alternative à `.env.local` (ignoré par git)

**⚠️ Important** : Ne jamais commiter `.env.local` ou `.env` avec vos vraies clés API !

## 🚀 Démarrage

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
app/
├── api/
│   └── chat/
│       └── route.ts                    # API Route pour le streaming chat
├── components/
│   ├── ui/                            # ShadCn UI (kebab-case)
│   │   ├── button.tsx                 # Button component
│   │   ├── input.tsx                  # Input component
│   │   └── card.tsx                   # Card component
│   ├── shared/                        # Composants partagés (kebab-case)
│   │   ├── navigation-link.tsx        # Lien de navigation
│   │   ├── page-container.tsx         # Container de page
│   │   └── page-header.tsx            # En-tête de page
│   └── domain/                        # Composants domaine (kebab-case)
│       └── chat/                      # Composants spécifiques au chat
│           ├── message-item.tsx       # Item de message
│           ├── message-list.tsx       # Liste de messages
│           └── chat-form.tsx          # Formulaire de chat
├── lib/
│   └── utils.ts                       # Utilitaires (cn() pour ShadCn)
├── chat/
│   └── page.tsx                       # Page Chat (CSR)
├── prompts/
│   └── page.tsx                       # Page Générateur d'idées (SSR)
├── about/
│   └── page.tsx                       # Page À propos (SSG)
├── types/
│   └── chat.ts                        # Types TypeScript partagés
├── layout.tsx                         # Layout global
└── page.tsx                           # Page d'accueil
```

## 🎨 Pages

### 1. 🏠 Accueil - `/`

- Page d'accueil moderne avec ShadCn UI
- Cards avec animations et gradients
- Dark mode toggle

### 2. 💬 Chat Interactif (CSR) - `/chat`

- **Utilise l'IA** : Streaming en temps réel avec `useChat` de `@ai-sdk/react`
- Filtrage automatique du raisonnement de l'IA (`<think>`)
- Rendu Markdown des réponses
- Auto-scroll et state management local

### 3. 💡 Générateur d'Idées (SSR) - `/prompts`

- **Utilise l'IA** : Génération côté serveur avec `generateText`
- Rendu à chaque requête (Server-Side Rendering)
- Affichage du raisonnement et du contenu dans des accordéons
- Bouton pour régénérer de nouvelles idées

### 4. ℹ️ À Propos (SSG) - `/about`

- Page statique (Static Site Generation)
- **N'utilise pas l'IA** : Contenu fixe généré au build
- Informations sur le projet

## 🧪 Commandes

```bash
# Développement
npm run dev

# Build
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

## 📚 Bonnes pratiques appliquées

### ✅ TypeScript strict

- ❌ **JAMAIS** de type `any` (explicite ou implicite)
- ✅ Typage strict avec interfaces
- ✅ Types partagés dans `app/types/`

### ✅ Architecture des composants

- **`components/ui/`** : **ShadCn UI** - Composants accessibles basés sur Radix UI
- **`components/shared/`** : Composants partagés entre pages (PageContainer, PageHeader)
- **`components/domain/`** : Composants spécifiques au domaine (MessageList, ChatForm)
- ✅ Named exports uniquement (❌ **PAS de default exports**)
- ✅ Imports directs (❌ **PAS de barrel exports** pour les performances)
- ✅ Composants petits et focalisés (Single Responsibility)
- ✅ Extraction dès qu'il y a duplication ou > 20 lignes de logique
- ✅ Un composant par fichier, un fichier par composant

**ShadCn UI** (`components/ui/`) :
- ✅ Composants copiés depuis [ui.shadcn.com](https://ui.shadcn.com/)
- ✅ Basés sur Radix UI (accessibilité ARIA)
- ✅ Stylés avec Tailwind CSS
- ✅ Code que vous possédez (pas de npm package)

**Règles de découpe** (voir `.cursor/rules/component-architecture.mdc`) :
- Extraire si **duplication** (2+ endroits)
- Extraire si **> 20 lignes de logique complexe**
- Extraire si besoin de **tester en isolation**
- Garder les composants **< 200 lignes** (split si plus grand)

### ✅ State Management

- `useState` pour l'état local (formulaire)
- `useChat` pour le chat streaming (AI SDK)
- Pas de state management global (inutile pour ce projet)

### ✅ Conventions de nommage

- **Composants (fichiers)** : `kebab-case` (`chat-page.tsx`, `button.tsx`, `page-container.tsx`)
- **Composants (exports)** : `PascalCase` (`export function ChatPage()`, `export function Button()`)
- **Fonctions** : `camelCase` (`handleSubmit`, `handleSendMessage`)
- **Types/Interfaces** : `PascalCase` (`ChatMessage`, `ChatFormProps`)
- **Utilities** : `kebab-case` (`format-date.ts`, `validate-email.ts`)

### ✅ Exports & Imports

**Exports** :
- ✅ Named exports uniquement : `export function Button()`
- ❌ **JAMAIS** de default exports (sauf pages Next.js)
- **Pourquoi** : Meilleur refactoring, tree-shaking, auto-complete

**Fichiers** :
- ✅ **TOUS les composants** : **kebab-case** (`button.tsx`, `page-container.tsx`, `chat-form.tsx`)
- ✅ **Pourquoi** : Cohérence dans tout le codebase, correspond à la convention ShadCn

**Imports** :
- ❌ **JAMAIS** de barrel exports (`index.ts`) - Impact performance
- ✅ Imports directs uniquement :
  ```typescript
  // ✅ Good - Tous les composants (kebab-case path)
  import { Button } from "@/app/components/ui/button";
  import { PageContainer } from "@/app/components/shared/page-container";
  import { ChatForm } from "@/app/components/domain/chat/chat-form";
  
  // ❌ Bad - Barrel export
  import { Button } from "@/app/components/ui";
  
  // ❌ Bad - Default import
  import Button from "@/app/components/ui/button";
  ```
- ✅ Ordre : external → internal (`@/`) → relative (`./`)
- ✅ Utiliser `type` pour les imports de types uniquement

### ✅ AI SDK - Bonnes pratiques

- Utilise `useChat` pour le streaming client
- Utilise `streamText` pour l'API route
- Utilise `generateText` pour SSR
- Structure `message.parts` (nouvelle API)

## 🔗 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://ai-sdk.dev/docs)
- [Groq Documentation](https://console.groq.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📄 License

MIT
