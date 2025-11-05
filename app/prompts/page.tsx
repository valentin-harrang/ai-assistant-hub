// 🎓 SSR - Server Component (pas de "use client")
// Cette page est rendue côté serveur à chaque requête
// Avantages: SEO optimal, données toujours fraîches, pas de JS client nécessaire

import { PageHeader } from "@/app/components/shared/page-header";
import { MarkdownContent } from "@/app/components/shared/markdown-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Lightbulb, Brain } from "lucide-react";
import { getPrompts } from "@/app/lib/get-prompts";
import { GoHome } from "../components/shared/go-home";
import { RefreshButton } from "./refresh-button";

// 🎓 Force le rendu dynamique (SSR) à chaque requête
// Sans cette ligne, Next.js pourrait mettre en cache la page
export const dynamic = "force-dynamic";

// 🎓 Fonction Server Component asynchrone
// Peut appeler directement les fonctions serveur (getPrompts)
export default async function PromptsPage() {
  // 🎓 Fetch des données côté serveur avec await
  // Pas besoin de useState, useEffect, loading states
  // Next.js gère automatiquement le streaming et le suspense
  const data = await getPrompts();

  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background to-background/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <GoHome />

        <PageHeader
          title="Générateur d'idées IA (SSR)"
          emoji="💡"
          description="Découvrez des idées de projets web innovants. Cette page est rendue côté serveur (SSR) à chaque requête pour des données toujours fraîches."
          className="my-12"
        />

        {/* Content - Toujours disponible (pas de loading state) */}
        <div className="space-y-6">
          {/* Accordions pour raisonnement et contenu */}
          <Accordion type="multiple" className="w-full space-y-4">
            {/* Accordion pour le raisonnement */}
            {data.reasoning && (
              <AccordionItem
                value="reasoning"
                className="border rounded-lg overflow-hidden bg-card shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline px-4 py-4 bg-linear-to-r from-blue-500/10 to-purple-500/10 hover:bg-blue-500/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <Brain className="size-5 text-blue-500 shrink-0" />
                    <span className="font-semibold text-foreground text-base">
                      Raisonnement de l&apos;IA
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <div className="bg-muted/30 border-t p-6">
                    <MarkdownContent
                      content={data.reasoning}
                      className="text-sm prose-sm max-w-none dark:prose-invert"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Accordion pour les idées générées */}
            <AccordionItem
              value="ideas"
              className="border rounded-lg overflow-hidden bg-card shadow-sm"
            >
              <AccordionTrigger className="hover:no-underline px-4 py-4 bg-linear-to-r from-yellow-500/10 to-orange-500/10 hover:bg-yellow-500/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Lightbulb className="size-5 text-yellow-500 shrink-0" />
                  <span className="font-semibold text-foreground text-base">
                    Idées générées
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="bg-muted/30 border-t p-6 sm:p-8">
                  <MarkdownContent
                    content={data.content}
                    className="prose max-w-none dark:prose-invert"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* 🎓 Bouton de rafraîchissement (Client Component)
              Utilise router.refresh() pour recharger les données serveur */}
          <div className="flex gap-3 justify-center pt-4">
            <RefreshButton />
          </div>
        </div>
      </div>
    </main>
  );
}
