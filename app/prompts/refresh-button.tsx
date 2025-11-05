// 🎓 Client Component pour le bouton de rafraîchissement
// Doit être un Client Component car utilise des hooks (useRouter, useTransition)
"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/app/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

export function RefreshButton() {
  const router = useRouter();
  
  // 🎓 useTransition() pour gérer l'état de chargement
  // isPending devient true pendant le rafraîchissement
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    // 🎓 startTransition() pour marquer le refresh comme transition
    // Permet à React de garder l'UI interactive pendant le chargement
    startTransition(() => {
      // 🎓 router.refresh() force Next.js à:
      // 1. Re-exécuter le Server Component
      // 2. Récupérer les nouvelles données
      // 3. Re-rendre la page avec les données fraîches
      router.refresh();
    });
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleRefresh}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin" />
            Génération...
          </>
        ) : (
          <>
            <RefreshCw className="size-4 mr-2" />
            Générer d&apos;autres idées
          </>
        )}
      </Button>
      
      <Button
        variant="default"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Retour en haut
      </Button>
    </>
  );
}

