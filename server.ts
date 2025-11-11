import { config } from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

// Load environment variables from .env
config();

// Types
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

// Configuration
const PORT = 3001;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error('❌ GROQ_API_KEY is not defined in environment variables');
  process.exit(1);
}

// System prompt for AI
const SYSTEM_PROMPT = `Tu es un assistant IA dans un chat collaboratif. Tu es mentionné avec @chatbot par les utilisateurs.

Contexte : Tu peux voir les derniers messages de la conversation pour comprendre le contexte.

Ton rôle :
- Réponds de manière concise et utile (max 200 mots)
- Adapte ta réponse au contexte de la conversation
- Sois amical et naturel
- Si la question nécessite du code, utilise la syntaxe markdown

Tu es dans un chat en temps réel, garde tes réponses courtes et pertinentes.`;

// In-memory storage
const messages: Message[] = [];
const users = new Map<string, User>();

// Create HTTP server
const httpServer = createServer();

// Create Socket.IO server with CORS
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Helper function to call AI
async function getAIResponse(context: Message[], userMessage: string): Promise<string> {
  try {
    // Build conversation history for context
    const conversationMessages = context.map(msg => ({
      role: 'user' as const,
      content: `${msg.username}: ${msg.text}`,
    }));

    // Add the current message
    conversationMessages.push({
      role: 'user' as const,
      content: userMessage,
    });

    const response = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationMessages,
      ],
      temperature: 0.7,
    });

    return response.text;
  } catch (error) {
    console.error('Error calling AI:', error);
    return "Désolé, je rencontre des difficultés techniques pour répondre. Réessayez plus tard.";
  }
}

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log(`🔌 New connection: ${socket.id}`);

  // User joins with username
  socket.on('user:join', (username: string) => {
    // Validate username
    if (!username || username.trim().length === 0) {
      socket.emit('error', 'Username cannot be empty');
      return;
    }

    if (username.length > 20) {
      socket.emit('error', 'Username too long (max 20 characters)');
      return;
    }

    // Check for duplicate username
    const existingUser = Array.from(users.values()).find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
      socket.emit('error', 'Username already taken');
      return;
    }

    // Create user
    const user: User = {
      id: socket.id,
      username: username.trim(),
    };

    users.set(socket.id, user);

    // Send message history to the new user
    socket.emit('message:history', messages);

    // Send updated user list to everyone
    io.emit('users:list', Array.from(users.values()));

    // Notify everyone that user joined
    io.emit('user:joined', user.username);

    console.log(`👤 User joined: ${user.username} (${socket.id})`);
  });

  // New message sent
  socket.on('message:send', async (text: string) => {
    const user = users.get(socket.id);

    if (!user) {
      socket.emit('error', 'You must join with a username first');
      return;
    }

    // Validate message
    if (!text || text.trim().length === 0) {
      return;
    }

    if (text.length > 1000) {
      socket.emit('error', 'Message too long (max 1000 characters)');
      return;
    }

    // Create user message
    const message: Message = {
      id: `msg-${Date.now()}-${socket.id}`,
      username: user.username,
      text: text.trim(),
      timestamp: Date.now(),
      isAI: false,
    };

    messages.push(message);

    // Broadcast message to all clients
    io.emit('message:new', message);

    console.log(`💬 Message from ${user.username}: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);

    // Check if AI is mentioned
    const mentionsBot = /(@chatbot|@ai|@assistant)/i.test(text);

    if (mentionsBot) {
      console.log('🤖 AI mentioned, generating response...');

      // Get last 5 messages for context (excluding the current one)
      const context = messages.slice(-6, -1);

      // Clean the message (remove @chatbot mentions)
      const cleanMessage = text.replace(/@chatbot|@ai|@assistant/gi, '').trim();

      // Call AI
      const aiResponseText = await getAIResponse(context, cleanMessage);

      // Create AI message
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        username: 'Assistant IA',
        text: aiResponseText,
        timestamp: Date.now(),
        isAI: true,
      };

      messages.push(aiMessage);

      // Broadcast AI response
      io.emit('message:new', aiMessage);

      console.log(`🤖 AI response sent: ${aiResponseText.substring(0, 50)}${aiResponseText.length > 50 ? '...' : ''}`);
    }
  });

  // User is typing
  socket.on('user:typing', () => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('user:typing', user.username);
    }
  });

  // User stopped typing
  socket.on('user:stop-typing', () => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('user:stop-typing', user.username);
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);

    if (user) {
      users.delete(socket.id);

      // Notify everyone that user left
      io.emit('user:left', user.username);

      // Send updated user list
      io.emit('users:list', Array.from(users.values()));

      console.log(`👋 User left: ${user.username} (${socket.id})`);
    } else {
      console.log(`🔌 Disconnected: ${socket.id}`);
    }
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  🚀 Socket.IO Server Started              ║
║                                            ║
║  📡 Port: ${PORT}                            ║
║  🌐 URL: http://localhost:${PORT}            ║
║  🤖 AI: Groq (Llama 3.3 70B)              ║
║                                            ║
║  Ready to accept connections!             ║
╚════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Shutting down server...');
  io.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
