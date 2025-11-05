/**
 * Utilitaires pour la gestion du stockage des messages de chat
 */

import type { UIMessage } from "@ai-sdk/react";

export const CHAT_STORAGE_KEY = "chat-messages";

/**
 * Charge les messages depuis localStorage
 */
export function loadChatMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return [];

    const messages = JSON.parse(stored) as UIMessage[];
    // Valider que c'est bien un tableau
    return Array.isArray(messages) ? messages : [];
  } catch {
    // En cas d'erreur (JSON invalide, etc.), retourner un tableau vide
    return [];
  }
}

/**
 * Sauvegarde les messages dans localStorage
 */
export function saveChatMessages(messages: UIMessage[]): void {
  if (typeof window === "undefined") return;

  try {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } else {
      // Si on n'a plus de messages, supprimer du localStorage
      localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  } catch (error) {
    // Ignorer les erreurs (quota dépassé, etc.)
    console.warn("Impossible de sauvegarder les messages:", error);
  }
}

