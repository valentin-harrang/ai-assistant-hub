# Chat Collaboratif en Temps Réel avec IA

Une fonctionnalité complète de chat collaboratif intégrant WebSocket (Socket.IO) et intelligence artificielle conditionnelle.

## 📋 Vue d'ensemble

Cette fonctionnalité permet à plusieurs utilisateurs de :
- ✅ Discuter entre eux en temps réel
- ✅ Invoquer l'IA en mentionnant `@chatbot` dans leurs messages
- ✅ Voir qui est en ligne et qui tape un message
- ✅ Bénéficier d'une interface moderne et responsive

## 🏗️ Architecture

### Composants principaux

1. **Serveur WebSocket** (`server.ts`)
   - Serveur Socket.IO standalone sur le port 3001
   - Gestion des connexions/déconnexions
   - Broadcast des messages
   - Détection des mentions @chatbot
   - Intégration avec l'API Groq (Llama 3.3 70B)

2. **Client React** (`app/collaborative-chat/page.tsx`)
   - Interface utilisateur avec Next.js
   - Connexion Socket.IO temps réel
   - Gestion d'état avec React hooks
   - Auto-scroll et indicateurs visuels

## 🚀 Installation et Lancement

### 1. Variables d'environnement

Assurez-vous d'avoir la clé API Groq dans votre `.env.local` :

```env
GROQ_API_KEY=votre_clé_api_groq
```

### 2. Installation des dépendances

Les dépendances sont déjà installées, mais si nécessaire :

```bash
npm install
```

### 3. Lancement de l'application

**Option A : Deux terminaux séparés**

Terminal 1 - Serveur Socket.IO :
```bash
npm run socket
```

Terminal 2 - Application Next.js :
```bash
npm run dev
```

**Option B : Un seul terminal (recommandé)**

```bash
npm run dev:all
```

Cette commande lance automatiquement les deux serveurs en parallèle avec des couleurs distinctes pour les logs.

### 4. Accès à l'application

1. Ouvrez votre navigateur sur [http://localhost:3000](http://localhost:3000)
2. Cliquez sur la carte "Chat Collaboratif"
3. Choisissez un pseudo et rejoignez le chat

## 💬 Utilisation

### Rejoindre le chat

1. Entrez un pseudo (max 20 caractères)
2. Attendez que l'indicateur de connexion soit vert
3. Cliquez sur "Rejoindre le chat"

### Envoyer des messages

Tapez votre message dans le champ de saisie et appuyez sur Entrée ou cliquez sur le bouton Envoyer.

### Invoquer l'IA

Pour interroger l'IA, mentionnez `@chatbot` n'importe où dans votre message :

**Exemples :**
```
@chatbot explique-moi les WebSockets
```
```
Hey @chatbot, que penses-tu de Next.js 15 ?
```
```
C'est une super feature @chatbot, non ?
```

L'IA analyse les 5 derniers messages pour comprendre le contexte de la conversation et répond de manière contextuelle.

### Fonctionnalités temps réel

- **Liste des utilisateurs** : Voyez qui est connecté en haut de page
- **Indicateur de frappe** : Sachez quand quelqu'un est en train d'écrire
- **Auto-scroll** : Les nouveaux messages apparaissent automatiquement
- **Statut de connexion** : Indicateur vert = connecté, rouge = déconnecté

## 🧪 Tester avec plusieurs utilisateurs

### Méthode 1 : Plusieurs onglets

1. Ouvrez l'application dans un premier onglet
2. Rejoignez avec le pseudo "Alice"
3. Ouvrez un nouvel onglet sur la même URL
4. Rejoignez avec le pseudo "Bob"
5. Échangez des messages entre les deux onglets

### Méthode 2 : Navigation privée

1. Fenêtre normale : rejoignez en tant que "Alice"
2. Fenêtre privée : rejoignez en tant que "Bob"
3. Testez les échanges

### Méthode 3 : Plusieurs navigateurs

Utilisez Chrome, Firefox, Safari, etc. avec différents pseudos.

## 🤖 Fonctionnement de l'IA

### Déclenchement

L'IA est invoquée quand un message contient :
- `@chatbot`
- `@ai`
- `@assistant`

(Case-insensitive)

### Contexte

L'IA reçoit :
- Les 5 derniers messages de la conversation
- Le message actuel (nettoyé de la mention @chatbot)

### Prompt système

L'IA est configurée pour :
- Répondre de manière concise (max 200 mots)
- S'adapter au contexte de la conversation
- Être amicale et naturelle
- Utiliser markdown si nécessaire pour le code

### Modèle utilisé

- **Fournisseur** : Groq
- **Modèle** : Llama 3.3 70B Versatile
- **Contexte** : 131,072 tokens
- **Température** : 0.7
- **Vitesse** : ~280 tokens/seconde

## 📦 Structure des fichiers

```
ai-assistant-hub/
├── server.ts                        # Serveur WebSocket Socket.IO
├── app/
│   └── collaborative-chat/
│       └── page.tsx                 # Interface utilisateur du chat
├── constants/
│   └── home-features.tsx            # Configuration des features (ajout du chat)
└── package.json                     # Scripts npm ajoutés
```

## 🔧 Configuration technique

### Types TypeScript

```typescript
interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: number;
  isAI?: boolean;
}

interface User {
  id: string;
  username: string;
}
```

### Événements Socket.IO

**Client → Serveur :**
- `user:join` : Rejoindre avec un pseudo
- `message:send` : Envoyer un message
- `user:typing` : Indiquer qu'on tape
- `user:stop-typing` : Arrêter l'indicateur

**Serveur → Client :**
- `message:history` : Historique des messages
- `message:new` : Nouveau message
- `users:list` : Liste des utilisateurs
- `user:joined` : Notification d'arrivée
- `user:left` : Notification de départ
- `error` : Erreur de validation

### Limites et validations

- **Pseudo** : 1-20 caractères, unique
- **Message** : 1-1000 caractères
- **Historique** : Les 5 derniers messages pour le contexte IA
- **Port Socket.IO** : 3001
- **CORS** : localhost:3000 et 127.0.0.1:3000

## 🎨 Interface utilisateur

### Thèmes

L'interface supporte le mode clair et sombre automatiquement.

### Couleurs des messages

- **Vos messages** : Bleu (alignés à droite)
- **Messages des autres** : Gris (alignés à gauche)
- **Messages IA** : Gradient violet/bleu avec icône robot 🤖

### Responsive

L'interface s'adapte aux écrans mobiles, tablettes et desktop.

## ⚠️ Dépannage

### Le serveur Socket.IO ne démarre pas

```bash
# Vérifiez que le port 3001 est libre
lsof -ti:3001 | xargs kill -9

# Relancez le serveur
npm run socket
```

### Erreur "Impossible de se connecter au serveur"

1. Vérifiez que le serveur Socket.IO est lancé
2. Vérifiez que le port 3001 est accessible
3. Vérifiez les logs du terminal

### L'IA ne répond pas

1. Vérifiez que `GROQ_API_KEY` est définie dans `.env.local`
2. Vérifiez que vous mentionnez bien `@chatbot` dans le message
3. Consultez les logs du serveur Socket.IO pour les erreurs

### Pseudo déjà pris

Les pseudos sont uniques (case-insensitive). Choisissez-en un autre ou déconnectez l'autre utilisateur.

## 🚧 Fonctionnalités bonus (optionnelles)

Ces fonctionnalités peuvent être ajoutées pour aller plus loin :

### Niveau 1
- ✅ Liste des utilisateurs en temps réel (déjà implémenté)
- ✅ Indicateur "en train d'écrire..." (déjà implémenté)
- ⬜ Notifications sonores
- ⬜ Notifications desktop

### Niveau 2
- ⬜ Rooms/channels (plusieurs salons)
- ⬜ Messages privés entre utilisateurs
- ⬜ Persistance en base de données (MongoDB, PostgreSQL)
- ⬜ Authentification avec NextAuth

### Niveau 3
- ⬜ Rendu markdown dans les messages
- ⬜ Upload d'images
- ⬜ Réactions aux messages (emoji)
- ⬜ Recherche dans l'historique
- ⬜ Mentions d'utilisateurs (@username)

## 📚 Concepts d'apprentissage

Cette fonctionnalité permet d'apprendre :

1. **WebSocket et temps réel**
   - Communication bidirectionnelle
   - Socket.IO (events, rooms, broadcast)
   - Gestion de la connexion/déconnexion

2. **Serveur Node.js custom**
   - Serveur HTTP avec Socket.IO
   - Intégration avec Next.js
   - Gestion des événements asynchrones

3. **Intégration IA contextuelle**
   - Utilisation du Vercel AI SDK
   - Gestion du contexte conversationnel
   - Parsing et détection de patterns (regex)

4. **State management React**
   - Gestion d'état complexe avec hooks
   - useEffect pour les side effects
   - useRef pour les références DOM

5. **UX temps réel**
   - Auto-scroll
   - Indicateurs de statut
   - Feedback visuel instantané

## 🤝 Contribution

Pour améliorer cette fonctionnalité :

1. Créez une branche : `git checkout -b feature/amélioration-chat`
2. Commitez vos changements : `git commit -m "Ajout de..."`
3. Pushez : `git push origin feature/amélioration-chat`
4. Créez une Pull Request

## 📝 License

Ce projet fait partie du Next.js Studio et suit la même licence.

## 🙏 Remerciements

- **Socket.IO** pour la gestion temps réel
- **Vercel AI SDK** pour l'intégration IA
- **Groq** pour l'API d'inférence rapide
- **Next.js** pour le framework
- **Tailwind CSS** pour le styling

---

**Bon chat collaboratif ! 🚀💬**
