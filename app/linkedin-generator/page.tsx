"use client";

import { useState } from "react";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Linkedin, Copy, Check, Trash2, RefreshCw } from "lucide-react";
import { parseResponseWithReasoning } from "@/lib/filter-reasoning";
import { MarkdownContent } from "@/components/shared/markdown-content";

// Types pour les tons disponibles
type ToneOption =
  | "Professionnel et inspirant"
  | "Authentique et personnel"
  | "Pédagogique et didactique"
  | "Réflexif et introspectif"
  | "Enthousiaste et motivant";

export default function LinkedInGeneratorPage() {
  // 🎓 State pour le formulaire
  const [objective, setObjective] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<ToneOption>("Professionnel et inspirant");
  const [numVariations, setNumVariations] = useState(1);

  // 🎓 State pour les résultats
  const [posts, setPosts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🎓 State pour les boutons "Copier"
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // 🎓 Fonction pour générer les posts
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation côté client
    if (objective.length < 10) {
      setError("L'objectif doit faire au moins 10 caractères");
      return;
    }
    if (context.length < 20) {
      setError("Le contexte doit faire au moins 20 caractères");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-linkedin-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objective, context, tone, numVariations }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la génération");
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      console.error("Error generating LinkedIn post:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  // 🎓 Fonction pour copier un post
  const handleCopy = async (post: string, index: number) => {
    try {
      await navigator.clipboard.writeText(post);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // 🎓 Fonction pour régénérer une variation spécifique
  const handleRegenerateVariation = async (index: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-linkedin-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objective, context, tone, numVariations: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la régénération");
      }

      const data = await response.json();
      const newPosts = [...posts];
      newPosts[index] = data.posts[0];
      setPosts(newPosts);
    } catch (err) {
      console.error("Error regenerating post:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  // 🎓 Fonction pour tout effacer
  const handleClear = () => {
    setPosts([]);
    setObjective("");
    setContext("");
    setTone("Professionnel et inspirant");
    setNumVariations(1);
    setError(null);
  };

  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="Générateur de Posts LinkedIn"
        emoji="💼"
        description="Créez des posts LinkedIn optimisés pour l'algorithme 2025"
        className="my-12"
      />

      {/* Formulaire */}
      <Card className="max-w-4xl mx-auto p-8 mb-8 border-[#0A66C2]/20 dark:border-[#0A66C2]/40 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <div className="flex items-center gap-3 mb-6">
          <Linkedin className="size-6 text-[#0A66C2]" />
          <h2 className="text-2xl font-bold">Configurez votre post</h2>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          {/* Objectif */}
          <div>
            <label htmlFor="objective" className="block text-sm font-medium mb-2">
              Objectif du post
            </label>
            <textarea
              id="objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="Ex: Partager mon retour d'expérience sur mon premier cours..."
              rows={3}
              disabled={isLoading}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-white dark:bg-slate-950 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {objective.length} caractères (min: 10)
            </p>
          </div>

          {/* Contexte */}
          <div>
            <label htmlFor="context" className="block text-sm font-medium mb-2">
              Contexte/Sujet
            </label>
            <textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Ex: J'ai donné 3 jours de cours sur Next.js avec une approche hands-on..."
              rows={4}
              disabled={isLoading}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-white dark:bg-slate-950 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {context.length} caractères (min: 20)
            </p>
          </div>

          {/* Ton */}
          <div>
            <label htmlFor="tone" className="block text-sm font-medium mb-2">
              Ton du post
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneOption)}
              disabled={isLoading}
              className="flex h-9 w-full rounded-md border border-input bg-white dark:bg-slate-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Professionnel et inspirant">Professionnel et inspirant</option>
              <option value="Authentique et personnel">Authentique et personnel</option>
              <option value="Pédagogique et didactique">Pédagogique et didactique</option>
              <option value="Réflexif et introspectif">Réflexif et introspectif</option>
              <option value="Enthousiaste et motivant">Enthousiaste et motivant</option>
            </select>
          </div>

          {/* Nombre de variations */}
          <div>
            <label htmlFor="numVariations" className="block text-sm font-medium mb-2">
              Nombre de variations
            </label>
            <input
              id="numVariations"
              type="number"
              min={1}
              max={3}
              value={numVariations}
              onChange={(e) => setNumVariations(Number(e.target.value))}
              disabled={isLoading}
              className="flex h-9 w-full rounded-md border border-input bg-white dark:bg-slate-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-xs text-muted-foreground mt-1">Entre 1 et 3 variations</p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="p-4 rounded-md bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Bouton de génération */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Linkedin className="size-4" />
                Générer le post
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Affichage des résultats */}
      {posts.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Vos posts LinkedIn</h2>
            <Button
              onClick={handleClear}
              variant="outline"
              size="sm"
              className="text-red-600 dark:text-red-400"
            >
              <Trash2 className="size-4" />
              Tout effacer
            </Button>
          </div>

          {posts.length === 1 ? (
            // Une seule variation : pas de tabs
            <PostCard
              post={posts[0]}
              index={0}
              copiedIndex={copiedIndex}
              onCopy={handleCopy}
              onRegenerate={handleRegenerateVariation}
              isRegenerating={isLoading}
            />
          ) : (
            // Plusieurs variations : avec tabs
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {posts.map((_, index) => (
                  <TabsTrigger key={index} value={String(index)}>
                    Variation {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {posts.map((post, index) => (
                <TabsContent key={index} value={String(index)}>
                  <PostCard
                    post={post}
                    index={index}
                    copiedIndex={copiedIndex}
                    onCopy={handleCopy}
                    onRegenerate={handleRegenerateVariation}
                    isRegenerating={isLoading}
                  />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      )}
    </PageContainer>
  );
}

// 🎓 Composant pour afficher une carte de post
interface PostCardProps {
  post: string;
  index: number;
  copiedIndex: number | null;
  onCopy: (post: string, index: number) => void;
  onRegenerate: (index: number) => void;
  isRegenerating: boolean;
}

function PostCard({
  post,
  index,
  copiedIndex,
  onCopy,
  onRegenerate,
  isRegenerating,
}: PostCardProps) {
  const isCopied = copiedIndex === index;

  // 🎓 Nettoyer les balises think et extraire le contenu
  const { content: cleanedPost } = parseResponseWithReasoning(post);

  const charCount = cleanedPost.length;
  const isOptimalLength = charCount >= 1300 && charCount <= 1500;

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
      {/* Preview du post style LinkedIn */}
      <div className="mb-4 p-6 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="size-12 rounded-full bg-[#0A66C2] flex items-center justify-center text-white font-semibold">
            You
          </div>
          <div>
            <p className="font-semibold">Votre nom</p>
            <p className="text-xs text-muted-foreground">Votre titre • Maintenant</p>
          </div>
        </div>
        <div className="text-sm leading-relaxed font-sans">
          <MarkdownContent
            content={cleanedPost}
            className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 prose-p:mb-2"
          />
        </div>
      </div>

      {/* Compteur de caractères */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Nombre de caractères</span>
          <span
            className={`font-semibold ${
              isOptimalLength
                ? "text-green-600 dark:text-green-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
          >
            {charCount} / 1300-1500
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              isOptimalLength ? "bg-green-500" : "bg-amber-500"
            }`}
            style={{ width: `${Math.min((charCount / 1500) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-3">
        <Button
          onClick={() => onCopy(cleanedPost, index)}
          className="flex-1 bg-[#0A66C2] hover:bg-[#004182] text-white"
        >
          {isCopied ? (
            <>
              <Check className="size-4" />
              Copié !
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copier le post
            </>
          )}
        </Button>
        <Button
          onClick={() => onRegenerate(index)}
          disabled={isRegenerating}
          variant="outline"
          className="border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/10"
        >
          {isRegenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <RefreshCw className="size-4" />
          )}
          Régénérer
        </Button>
      </div>
    </Card>
  );
}
