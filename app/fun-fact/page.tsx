// 🎓 CSR - Client-Side Rendering
// Cette page charge les données côté client avec TanStack Query
"use client";

import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";
import { MarkdownContent } from "@/components/shared/markdown-content";

// 🎓 Fonction pour charger le fun fact depuis l'API
async function fetchFunFact(): Promise<string> {
  const response = await fetch("/api/fun-fact");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erreur lors du chargement du fun fact");
  }

  return data.funFact;
}

export default function FunFactPage() {
  // 🎓 Utiliser TanStack Query pour gérer les données serveur
  // Single source of truth, cache automatique, gestion d'erreurs intégrée
  const {
    data: funFact,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["fun-fact"],
    queryFn: fetchFunFact,
    staleTime: 0, // Toujours considérer comme stale pour forcer un nouveau fun fact
  });

  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="Fun Fact du Jour"
        emoji="🎯"
        description="Découvrez un fun fact amusant et surprenant généré par l'IA. Cette page utilise le CSR (Client-Side Rendering)."
        className="my-12"
      />

      {/* Contenu principal */}
      <div className="space-y-6">
        {isLoading && (
          <Card className="p-12 text-center">
            <Loader2 className="size-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Génération du fun fact en cours...
            </p>
          </Card>
        )}

        {error && (
          <Card className="p-6 border-destructive bg-destructive/10">
            <div className="text-center">
              <p className="text-destructive font-semibold mb-4">⚠️ Erreur</p>
              <p className="text-sm text-muted-foreground mb-4">
                {error instanceof Error
                  ? error.message
                  : "Une erreur est survenue lors du chargement du fun fact"}
              </p>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                disabled={isRefetching}
              >
                {isRefetching ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  "Réessayer"
                )}
              </Button>
            </div>
          </Card>
        )}

        {funFact && !isLoading && (
          <Card className="p-8 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="size-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Fun Fact du Jour</h2>
                <p className="text-sm text-muted-foreground">
                  Généré par l&apos;IA à chaque chargement
                </p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownContent content={funFact} />
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button
                onClick={() => refetch()}
                variant="outline"
                className="w-full sm:w-auto"
                disabled={isRefetching}
              >
                {isRefetching ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-4 mr-2" />
                    Générer un autre fun fact
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Note pédagogique sur le CSR */}
        <Card className="p-6 bg-muted/50 border-dashed">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">💡 Note :</strong> Cette page
            utilise le <strong>CSR (Client-Side Rendering)</strong>. Les données
            sont chargées côté client avec{" "}
            <code className="bg-muted px-1 rounded text-xs">
              TanStack Query
            </code>{" "}
            (useQuery). Le contenu est généré dynamiquement après le chargement
            de la page.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
}
