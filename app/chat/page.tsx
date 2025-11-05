// Chat Page CSR
"use client";

import { useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { PageContainer } from "@/app/components/shared/page-container";
import { PageHeader } from "@/app/components/shared/page-header";
import { MessageList } from "@/app/components/domain/chat/message-list";
import { ChatForm } from "@/app/components/domain/chat/chat-form";
import { GoHome } from "@/app/components/shared/go-home";
import { Card } from "@/app/components/ui/card";

export default function ChatPage() {
  // 🎓 Étape 1: Créer un transport pour communiquer avec l'API
  // TextStreamChatTransport gère le streaming des réponses
  // useMemo() évite de recréer le transport à chaque render
  const transport = useMemo(
    () => new TextStreamChatTransport({ api: "/api/chat" }),
    []
  );

  // 🎓 Étape 2: Utiliser useChat() du Vercel AI SDK
  // Gère automatiquement: messages, loading, streaming, erreurs
  const chat = useChat({ transport });

  // 🎓 Étape 3: Fonction pour envoyer un message
  const handleSendMessage = async (text: string) => {
    await chat.sendMessage({ text });
  };

  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="Chatbot (CSR)"
        emoji="💬"
        description="Interagissez avec un chatbot IA en temps réel"
        className="my-12"
      />

      {/* Error State */}
      {chat.error && (
        <Card className="border-destructive bg-destructive/10 p-4 mb-4">
          <p className="text-destructive font-semibold text-sm">
            Erreur: {chat.error.message || "Une erreur est survenue"}
          </p>
        </Card>
      )}

      <MessageList
        messages={chat.messages}
        isStreaming={chat.status === "streaming"}
      />
      <ChatForm onSubmit={handleSendMessage} status={chat.status} />
    </PageContainer>
  );
}
