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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { CheckCircle2, XCircle, Info } from "lucide-react";

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

      {/* 🎓 Section explicative sur le CSR */}
      <Card className="mb-8 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="csr-explanation" className="border-none">
            <AccordionTrigger className="hover:no-underline px-6 py-4">
              <div className="flex items-center gap-3">
                <Info className="size-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="font-semibold text-foreground text-base">
                  Qu&apos;est-ce que le CSR (Client-Side Rendering) ?
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                {/* Définition */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    📚 Définition
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Le <strong>Client-Side Rendering (CSR)</strong> est un mode
                    de rendu où le HTML est généré côté <strong>client</strong>{" "}
                    (dans le navigateur) grâce à JavaScript. La page est
                    initialement vide, puis le contenu est injecté dynamiquement
                    après le chargement du JavaScript.
                  </p>
                </div>

                {/* Comment ça marche */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    ⚙️ Comment ça marche ?
                  </h3>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>
                      Le serveur envoie un HTML minimal + le bundle JavaScript
                    </li>
                    <li>Le navigateur exécute le JavaScript (React hydrate)</li>
                    <li>
                      Les composants se rendent côté client avec `&quot;use
                      client&quot;`
                    </li>
                    <li>
                      Les données sont fetchées côté client (hooks, API calls)
                    </li>
                    <li>
                      L&apos;interface se met à jour dynamiquement sans
                      rechargement
                    </li>
                  </ol>
                </div>

                {/* Avantages */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
                    Avantages
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-1">
                        ✓
                      </span>
                      <span>
                        <strong>Interactivité en temps réel</strong> :
                        Streaming, updates instantanés sans rechargement
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-1">
                        ✓
                      </span>
                      <span>
                        <strong>Expérience utilisateur fluide</strong> : Pas de
                        rechargement de page, transitions smooth
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-1">
                        ✓
                      </span>
                      <span>
                        <strong>State management riche</strong> : Hooks React,
                        context, state local facile
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-1">
                        ✓
                      </span>
                      <span>
                        <strong>Applications dynamiques</strong> : Dashboards,
                        chats, éditeurs en temps réel
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Inconvénients */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <XCircle className="size-4 text-red-600 dark:text-red-400" />
                    Inconvénients
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 mt-1">
                        ✗
                      </span>
                      <span>
                        <strong>SEO moins optimal</strong> : Le contenu initial
                        est vide, les robots d&apos;indexation voient moins de
                        contenu
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 mt-1">
                        ✗
                      </span>
                      <span>
                        <strong>Performance initiale</strong> : Le bundle
                        JavaScript doit être téléchargé avant l&apos;affichage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 mt-1">
                        ✗
                      </span>
                      <span>
                        <strong>Charge serveur réduite</strong> : Mais plus de
                        charge sur le client (CPU, mémoire)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 mt-1">
                        ✗
                      </span>
                      <span>
                        <strong>Accessibilité</strong> : Peut être moins
                        accessible si JavaScript est désactivé
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Quand l'utiliser */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    🎯 Quand utiliser le CSR ?
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Applications interactives (chats, dashboards)</li>
                    <li>• Streaming de données en temps réel</li>
                    <li>• Applications avec beaucoup d&apos;état local</li>
                    <li>• Quand le SEO n&apos;est pas critique</li>
                    <li>• Applications authentifiées (contenu privé)</li>
                  </ul>
                </div>

                {/* Exemple dans ce projet */}
                <div className="mt-4 p-4 bg-background border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">
                    💡 Exemple dans ce projet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cette page chat utilise le CSR car elle nécessite :
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Streaming des réponses IA token par token</li>
                    <li>
                      • Gestion d&apos;état complexe (messages, loading, errors)
                    </li>
                    <li>• Interactivité en temps réel avec `useChat()`</li>
                    <li>• Pas besoin de SEO (contenu dynamique utilisateur)</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

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
