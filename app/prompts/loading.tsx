// 🎓 Loading UI pour la page Prompts (SSR)
// Next.js affiche automatiquement ce composant pendant le fetch côté serveur
// Utilise le système Suspense de React

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-background/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="size-12 animate-spin text-blue-500" />
          <p className="text-lg text-muted-foreground">
            Génération d&apos;idées IA en cours...
          </p>
          <p className="text-sm text-muted-foreground">
            Rendu côté serveur (SSR)
          </p>
        </div>
      </div>
    </div>
  );
}

