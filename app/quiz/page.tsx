"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles } from "lucide-react";

// 🎓 Type pour une question du quiz
export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

// 🎓 Type pour le quiz complet
export type Quiz = {
  questions: QuizQuestion[];
};

export default function QuizConfigPage() {
  const router = useRouter();

  // 🎓 State pour le formulaire
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<"Facile" | "Moyen" | "Difficile">("Moyen");
  const [numQuestions, setNumQuestions] = useState<5 | 10 | 15>(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🎓 Fonction pour générer le quiz
  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation côté client
    if (!topic.trim()) {
      setError("Veuillez entrer un thème pour le quiz");
      return;
    }

    setIsLoading(true);

    try {
      // 🎓 Appel à l'API pour générer le quiz
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, numQuestions }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la génération du quiz");
      }

      const quiz: Quiz = await response.json();

      // 🎓 Stocker le quiz dans sessionStorage pour le passer à la page play
      sessionStorage.setItem("currentQuiz", JSON.stringify(quiz));
      sessionStorage.setItem("quizTopic", topic);
      sessionStorage.setItem("quizDifficulty", difficulty);

      // 🎓 Redirection vers la page de jeu
      router.push("/quiz/play");
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="Générateur de Quiz"
        emoji="🎯"
        description="Créez un quiz personnalisé sur n'importe quel sujet"
        className="my-12"
      />

      <Card className="max-w-2xl mx-auto p-8 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="size-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold">Configurez votre quiz</h2>
        </div>

        <form onSubmit={handleGenerateQuiz} className="space-y-6">
          {/* Thématique */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium mb-2">
              Thématique du quiz
            </label>
            <Input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Histoire de France, JavaScript, Astronomie..."
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {/* Niveau de difficulté */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium mb-2">
              Niveau de difficulté
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as "Facile" | "Moyen" | "Difficile")}
              disabled={isLoading}
              className="flex h-9 w-full rounded-md border border-input bg-white dark:bg-slate-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Facile">Facile</option>
              <option value="Moyen">Moyen</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          {/* Nombre de questions */}
          <div>
            <label htmlFor="numQuestions" className="block text-sm font-medium mb-2">
              Nombre de questions
            </label>
            <select
              id="numQuestions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value) as 5 | 10 | 15)}
              disabled={isLoading}
              className="flex h-9 w-full rounded-md border border-input bg-white dark:bg-slate-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value={5}>5 questions</option>
              <option value={10}>10 questions</option>
              <option value={15}>15 questions</option>
            </select>
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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Génération du quiz...
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Générer le quiz
              </>
            )}
          </Button>
        </form>

        {/* Info sur la génération IA */}
        {isLoading && (
          <div className="mt-6 p-4 rounded-md bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              L'IA génère vos questions personnalisées... Cela peut prendre quelques secondes.
            </p>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}
