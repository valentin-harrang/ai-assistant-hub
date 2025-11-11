'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Bot, Send, Users, Wifi, WifiOff, MessageCircle } from 'lucide-react';

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

const SOCKET_URL = 'http://localhost:3001';

export default function CollaborativeChatPage() {
  // State
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState('');
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      autoConnect: true,
    });

    socketInstance.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
      setError('');
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setConnected(false);
      setError('Impossible de se connecter au serveur. Assurez-vous que le serveur Socket.IO est démarré (npm run socket).');
    });

    socketInstance.on('error', (errorMessage: string) => {
      setError(errorMessage);
    });

    socketInstance.on('message:history', (history: Message[]) => {
      setMessages(history);
    });

    socketInstance.on('message:new', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketInstance.on('users:list', (usersList: User[]) => {
      setUsers(usersList);
    });

    socketInstance.on('user:joined', (username: string) => {
      // Optional: Show notification
      console.log(`${username} joined the chat`);
    });

    socketInstance.on('user:left', (username: string) => {
      // Optional: Show notification
      console.log(`${username} left the chat`);
    });

    socketInstance.on('user:typing', (username: string) => {
      setTypingUsers((prev) => {
        if (!prev.includes(username)) {
          return [...prev, username];
        }
        return prev;
      });
    });

    socketInstance.on('user:stop-typing', (username: string) => {
      setTypingUsers((prev) => prev.filter((u) => u !== username));
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Join chat
  const handleJoin = () => {
    if (!socket || !connected) {
      setError('Non connecté au serveur');
      return;
    }

    if (!username.trim()) {
      setError('Le pseudo ne peut pas être vide');
      return;
    }

    if (username.length > 20) {
      setError('Le pseudo est trop long (max 20 caractères)');
      return;
    }

    socket.emit('user:join', username.trim());
    setHasJoined(true);
    setError('');
  };

  // Send message
  const handleSendMessage = () => {
    if (!socket || !inputMessage.trim()) {
      return;
    }

    socket.emit('message:send', inputMessage.trim());
    setInputMessage('');

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    socket.emit('user:stop-typing');
  };

  // Handle input change (typing indicator)
  const handleInputChange = (value: string) => {
    setInputMessage(value);

    if (!socket) return;

    // Emit typing event
    socket.emit('user:typing');

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('user:stop-typing');
    }, 2000);
  };

  // Format timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render login screen
  if (!hasJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Chat Collaboratif
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discutez en temps réel avec d'autres utilisateurs et l'IA
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Choisissez votre pseudo
              </label>
              <Input
                type="text"
                placeholder="Votre pseudo (max 20 caractères)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
                maxLength={20}
                className="text-base"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              {connected ? (
                <>
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    Connecté au serveur
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    Déconnecté
                  </span>
                </>
              )}
            </div>

            <Button
              onClick={handleJoin}
              disabled={!connected || !username.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-6 text-base"
            >
              Rejoindre le chat
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              💡 Mentionnez <span className="font-mono font-semibold">@chatbot</span> dans vos messages pour invoquer l'IA
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Render chat interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Chat Collaboratif
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Connecté en tant que <span className="font-semibold text-purple-600 dark:text-purple-400">{username}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                {connected ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      En ligne
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      Hors ligne
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-2 rounded-lg">
                <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                  {users.length} {users.length === 1 ? 'utilisateur' : 'utilisateurs'}
                </span>
              </div>
            </div>
          </div>

          {/* Users list */}
          {users.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
                  >
                    {user.username}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 h-[calc(100vh-320px)] overflow-y-auto">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  Aucun message pour le moment.
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Soyez le premier à envoyer un message !
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.username === username && !message.isAI
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] ${
                      message.isAI
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : message.username === username
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    } rounded-2xl px-4 py-3 shadow-md`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.isAI && (
                        <Bot className="w-4 h-4" />
                      )}
                      <span className="font-semibold text-sm">
                        {message.username}
                      </span>
                      {message.isAI && (
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                          IA
                        </span>
                      )}
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.text}
                    </p>
                    <p className={`text-xs mt-1 ${
                      message.isAI || message.username === username
                        ? 'text-white/70'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Typing indicator */}
            {typingUsers.length > 0 && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2 shadow-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    {typingUsers.join(', ')} {typingUsers.length === 1 ? 'est' : 'sont'} en train d'écrire...
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg p-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Votre message... (Utilisez @chatbot pour invoquer l'IA)"
              value={inputMessage}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 text-base"
              maxLength={1000}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || !connected}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            💡 Astuce : Mentionnez <span className="font-mono font-semibold">@chatbot</span> pour poser une question à l'IA
          </p>
        </div>
      </div>
    </div>
  );
}
