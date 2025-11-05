"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "@ai-sdk/react";
import { loadChatMessages, saveChatMessages } from "./chat-storage";

/**
 * Hook pour synchroniser les messages du chat avec localStorage
 * Charge les messages au démarrage et sauvegarde automatiquement à chaque changement
 *
 * @param messages - Messages actuels du chat
 * @param setMessages - Fonction pour mettre à jour les messages (si disponible)
 */
export function useChatStorage(
  messages: UIMessage[],
  setMessages?: (messages: UIMessage[]) => void
): void {
  const hasLoadedRef = useRef(false);

  // Charger les messages depuis localStorage au premier montage
  useEffect(() => {
    if (hasLoadedRef.current) return;
    if (typeof window === "undefined") return;

    const storedMessages = loadChatMessages();
    if (storedMessages.length > 0 && messages.length === 0 && setMessages) {
      setMessages(storedMessages);
    }
    hasLoadedRef.current = true;
  }, [messages.length, setMessages]);

  // Sauvegarder les messages dans localStorage à chaque changement
  useEffect(() => {
    if (!hasLoadedRef.current) return;
    saveChatMessages(messages);
  }, [messages]);
}

