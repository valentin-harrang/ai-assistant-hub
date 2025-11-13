"use client";

import { useState } from "react";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { SpellCheckedText } from "@/components/shared/spell-checked-text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSpellChecker } from "@/hooks/use-spell-checker";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function SpellCheckDemoPage() {
  const [customText, setCustomText] = useState(
    "Ceci est un texte avec plusieur faute d'orthographe. Les erreur de grammaire son également corrigés."
  );
  const [enabled, setEnabled] = useState(true);

  // Exemples de textes avec fautes
  const examples = [
    "Bienvenue sur notre platforme d'apprentisage",
    "Les ressource sont organiser par catégorie",
    "Vous pouvez génerer des quiz personaliser",
    "Le chat collaboratif permet de communiqué en temp réel",
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Démonstration de Correction Orthographique"
        description="Testez la correction orthographique automatique avec l'IA"
      />

      <div className="space-y-8">
        {/* Section 1: Activation/Désactivation */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Contrôle de la correction</h2>
              <p className="text-sm text-muted-foreground">
                Activez ou désactivez la correction pour voir la différence
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="spell-check-toggle">
                {enabled ? "Activée" : "Désactivée"}
              </Label>
              <Switch
                id="spell-check-toggle"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Exemples prédéfinis */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Exemples de correction</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Ces exemples contiennent des fautes d'orthographe et de grammaire
          </p>

          <div className="space-y-4">
            {examples.map((example, index) => (
              <ExampleCard
                key={index}
                originalText={example}
                enabled={enabled}
                number={index + 1}
              />
            ))}
          </div>
        </Card>

        {/* Section 3: Test personnalisé */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Testez votre propre texte</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Entrez un texte avec des fautes et voyez la correction en temps réel
          </p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="custom-text">Texte original (avec fautes)</Label>
              <Textarea
                id="custom-text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="min-h-[120px] mt-2"
                placeholder="Entrez votre texte ici..."
              />
            </div>

            <CustomTextDemo text={customText} enabled={enabled} />
          </div>
        </Card>

        {/* Section 4: Informations techniques */}
        <Card className="p-6 bg-muted/50">
          <h2 className="text-xl font-semibold mb-4">Comment ça fonctionne ?</h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Correction automatique avec IA</p>
                <p className="text-muted-foreground">
                  Utilise Groq (Qwen3 32B) pour corriger les fautes d'orthographe et de
                  grammaire
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Données originales préservées</p>
                <p className="text-muted-foreground">
                  La correction s'effectue uniquement à l'affichage, sans modifier la
                  base de données
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Mise en cache intelligente</p>
                <p className="text-muted-foreground">
                  Les textes déjà corrigés sont mis en cache pour améliorer les
                  performances
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Activation sélective</p>
                <p className="text-muted-foreground">
                  Peut être activée/désactivée par composant ou globalement
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

// Composant pour afficher un exemple
function ExampleCard({
  originalText,
  enabled,
  number,
}: {
  originalText: string;
  enabled: boolean;
  number: number;
}) {
  const { text, isCorreting, error } = useSpellChecker(originalText, { enabled });

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
          Exemple {number}
        </span>
        {isCorreting && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Loader2 className="size-3 animate-spin" />
            Correction en cours...
          </span>
        )}
        {error && (
          <span className="text-xs text-red-600 flex items-center gap-1">
            <XCircle className="size-3" />
            Erreur
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-muted-foreground">Texte original</Label>
          <p className="mt-1 text-sm p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-900">
            {originalText}
          </p>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">
            {enabled ? "Texte corrigé" : "Correction désactivée"}
          </Label>
          <p
            className={`mt-1 text-sm p-3 rounded border ${
              enabled
                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
                : "bg-muted"
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

// Composant pour le texte personnalisé
function CustomTextDemo({ text, enabled }: { text: string; enabled: boolean }) {
  const { text: correctedText, isCorreting, error } = useSpellChecker(text, {
    enabled,
  });

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="flex items-center justify-between mb-3">
        <Label className="text-sm font-medium">
          {enabled ? "Texte corrigé" : "Correction désactivée"}
        </Label>
        {isCorreting && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Loader2 className="size-3 animate-spin" />
            Correction en cours...
          </span>
        )}
        {error && (
          <span className="text-xs text-red-600 flex items-center gap-1">
            <XCircle className="size-3" />
            {error}
          </span>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-gray-950 rounded border min-h-[120px]">
        <p className="text-sm whitespace-pre-wrap">{correctedText}</p>
      </div>
    </div>
  );
}
