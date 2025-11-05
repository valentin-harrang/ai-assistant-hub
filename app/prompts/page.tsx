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
import { Lightbulb, Brain, Info, CheckCircle2, XCircle } from "lucide-react";
import { getPrompts } from "@/app/lib/get-prompts";
import { GoHome } from "../components/shared/go-home";
import { RefreshButton } from "./refresh-button";
import { Card } from "@/app/components/ui/card";

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

        {/* 🎓 Section explicative sur le SSR */}
        <Card className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ssr-explanation" className="border-none">
              <AccordionTrigger className="hover:no-underline px-6 py-4">
                <div className="flex items-center gap-3">
                  <Info className="size-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-semibold text-foreground text-base">
                    Qu&apos;est-ce que le SSR (Server-Side Rendering) ?
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
                      Le <strong>Server-Side Rendering (SSR)</strong> est un
                      mode de rendu où le HTML est généré côté{" "}
                      <strong>serveur</strong> à chaque requête. Le contenu est
                      pré-rendu sur le serveur avant d&apos;être envoyé au
                      navigateur, ce qui garantit un HTML complet dès le
                      chargement initial.
                    </p>
                  </div>

                  {/* Comment ça marche */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      ⚙️ Comment ça marche ?
                    </h3>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>L&apos;utilisateur fait une requête au serveur</li>
                      <li>
                        Le serveur exécute le Server Component (fonction async)
                      </li>
                      <li>
                        Le serveur fetch les données (API, base de données)
                      </li>
                      <li>
                        Le serveur génère le HTML complet avec les données
                      </li>
                      <li>
                        Le navigateur reçoit un HTML complet et prêt à afficher
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
                          <strong>SEO optimal</strong> : Le contenu est dans le
                          HTML initial, les robots d&apos;indexation voient tout
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">
                          ✓
                        </span>
                        <span>
                          <strong>Performance initiale</strong> : HTML complet
                          envoyé, pas besoin d&apos;attendre le JavaScript
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">
                          ✓
                        </span>
                        <span>
                          <strong>Données toujours fraîches</strong> : Généré à
                          chaque requête, pas de cache
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">
                          ✓
                        </span>
                        <span>
                          <strong>Sécurité</strong> : Les clés API restent côté
                          serveur, jamais exposées au client
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
                          <strong>Charge serveur</strong> : Le serveur doit
                          générer le HTML à chaque requête
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">
                          ✗
                        </span>
                        <span>
                          <strong>Time to First Byte (TTFB)</strong> : Plus long
                          car le serveur doit attendre les données
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">
                          ✗
                        </span>
                        <span>
                          <strong>Pas d&apos;interactivité native</strong> :
                          Nécessite des Client Components pour
                          l&apos;interactivité
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">
                          ✗
                        </span>
                        <span>
                          <strong>Hydration nécessaire</strong> : Le JavaScript
                          doit encore s&apos;hydrater pour l&apos;interactivité
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Quand l'utiliser */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      🎯 Quand utiliser le SSR ?
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Pages publiques nécessitant un bon SEO</li>
                      <li>• Contenu qui change fréquemment</li>
                      <li>• Données personnalisées par utilisateur</li>
                      <li>• Quand la sécurité est importante (API keys)</li>
                      <li>• Blogs, e-commerce, pages de contenu</li>
                    </ul>
                  </div>

                  {/* Exemple dans ce projet */}
                  <div className="mt-4 p-4 bg-background border rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">
                      💡 Exemple dans ce projet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Cette page utilise le SSR car elle nécessite :
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>
                        • Génération d&apos;idées IA à chaque visite (frais)
                      </li>
                      <li>• SEO potentiel (même si limité ici)</li>
                      <li>• Clé API Groq sécurisée côté serveur</li>
                      <li>• HTML complet pour un rendu rapide</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

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
