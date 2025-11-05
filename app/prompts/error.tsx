// 🎓 Error UI pour la page Prompts (SSR)
// Next.js affiche automatiquement ce composant si une erreur survient
// Doit être un Client Component pour utiliser les hooks

"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-background/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Card className="border-destructive bg-destructive/10 p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="size-12 text-destructive" />
            <h2 className="text-2xl font-bold text-destructive">
              Erreur lors de la génération
            </h2>
            <p className="text-muted-foreground">
              {error.message ||
                "Une erreur est survenue lors de la génération des idées IA."}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <Button onClick={reset} variant="default">
                Réessayer
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
              >
                Retour à l&apos;accueil
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
