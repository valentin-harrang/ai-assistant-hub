// 🎓 Page des exercices - Liste des exercices pour les étudiants
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Code,
  Rocket,
  Lightbulb,
  MessageSquare,
  Server,
  FileCode,
  Key,
  Info,
  XCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function ExercicesPage() {
  const exercices = [
    {
      numero: 1,
      titre: "Créer un nouveau projet Next.js",
      description:
        "Mettre en place le projet avec la configuration recommandée",
      icon: Rocket,
      color: "blue",
      details: [
        "Utiliser `create-next-app@latest` avec l'App Router",
        "Sélectionner TypeScript, Tailwind CSS, ESLint",
        "Installer les dépendances nécessaires",
      ],
    },
    {
      numero: 2,
      titre: "Page d'accueil en SSG",
      description: "Créer une page de présentation statique",
      icon: Code,
      color: "purple",
      details: [
        "Créer/modifier `app/page.tsx`",
        "Afficher une photo ou avatar",
        "Se présenter (nom, passions, compétences)",
        "Utiliser Server Component (pas de 'use client')",
        "Design avec Tailwind CSS",
      ],
    },
    {
      numero: 3,
      titre:
        "Page en SSR avec génération de contenu via Route Handler + AI SDK",
      description:
        "Apprendre à créer un Route Handler interne et une page SSR qui l'appelle",
      icon: Lightbulb,
      color: "amber",
      details: [
        "Créer `app/api/ai/route.ts` (Route Handler)",
        "Utiliser `generateText()` de l'AI SDK pour générer du texte",
        "Retourner un JSON avec `NextResponse.json()`",
        "Créer `app/idee/page.tsx` (ou autre nom) avec `export const dynamic = 'force-dynamic'`",
        "Appeler le Route Handler interne avec `fetch('/api/ai', { cache: 'no-store' })`",
        "Afficher le contenu généré par l'IA (citation, idée, fun fact, etc.)",
        "Comprendre : la clé API reste sécurisée côté serveur (jamais exposée au client)",
      ],
    },
    {
      numero: 4,
      titre: "Chatbot en CSR avec AI SDK",
      description: "Créer un chatbot interactif avec streaming",
      icon: MessageSquare,
      color: "blue",
      details: [
        "Installer `@ai-sdk/react` et `@ai-sdk/groq`",
        "Créer une clé API sur groq.com (gratuit)",
        "Créer `app/chat/page.tsx` avec `'use client'`",
        "Utiliser le hook `useChat()` pour gérer les messages",
        "Afficher les messages et le formulaire de chat",
        "Suivre la documentation : https://ai-sdk.dev/docs/getting-started/nextjs-app-router",
      ],
    },
    {
      numero: 5,
      titre: "Route Handler API pour le chatbot",
      description: "Créer l'endpoint API qui communique avec le LLM",
      icon: Server,
      color: "green",
      details: [
        "Créer `app/api/chat/route.ts`",
        "Implémenter une fonction `POST` async",
        "Utiliser `streamText()` de la lib `ai`",
        "Configurer le modèle Groq avec la clé API",
        "Retourner `result.toTextStreamResponse()` ou `result.toUIMessageStreamResponse()`",
        "Gérer les erreurs (clé API manquante, etc.)",
      ],
    },
  ];

  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="Exercices Pratiques"
        emoji="📚"
        description="Liste des exercices à réaliser pour maîtriser Next.js et l'intégration IA"
        className="my-12"
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section À propos du projet */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-foreground">🚀 Projet</h2>
          <p className="text-muted-foreground mb-4">
            Next.js Studio est un petit site Next.js proposant plusieurs
            fonctionnalités IA.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">
            🎯 Objectif
          </h2>
          <p className="text-muted-foreground mb-4">
            Créer un petit site Next.js proposant plusieurs fonctionnalités IA :
          </p>

          <ul className="list-disc list-inside text-muted-foreground mb-6">
            <li>Page d&apos;accueil statique (SSG)</li>
            <li>Chatbot interactif (CSR)</li>
            <li>Générateur d&apos;idées IA (SSR)</li>
            <li>API Route connectée à un modèle IA (OpenAI, Groq ou local)</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-foreground">👉 Le but</h2>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>
              Apprendre les fondamentaux de Next.js (App Router, rendu, API)
            </li>
            <li>
              Découvrir l&apos;intégration d&apos;un modèle IA via Vercel AI SDK
            </li>
            <li>Obtenir un projet concret et valorisable sur un portfolio.</li>
          </ul>
        </Card>

        {/* Accordéon SSG */}
        <Card className="mb-6 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ssg-explanation" className="border-none">
              <AccordionTrigger className="hover:no-underline px-6 py-4">
                <div className="flex items-center gap-3">
                  <Info className="size-5 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="font-semibold text-foreground text-base">
                    Qu&apos;est-ce que le SSG (Static Site Generation) ?
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
                      Le <strong>Static Site Generation (SSG)</strong> est un
                      mode de rendu où le HTML est généré au{" "}
                      <strong>moment du build</strong>. Toutes les pages sont
                      pré-rendues en fichiers HTML statiques avant le
                      déploiement, ce qui les rend ultra-rapides à servir.
                    </p>
                  </div>

                  {/* Comment ça marche */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      ⚙️ Comment ça marche ?
                    </h3>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>
                        Au build (`npm run build`), Next.js exécute tous les
                        Server Components
                      </li>
                      <li>Les pages sont générées en HTML statique</li>
                      <li>Les fichiers HTML sont stockés sur le serveur/CDN</li>
                      <li>
                        À chaque requête, le serveur envoie directement le HTML
                        pré-généré
                      </li>
                      <li>Aucun traitement serveur nécessaire à la requête</li>
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
                          <strong>Performance ultra-rapide</strong> : HTML
                          statique servi instantanément, pas de traitement
                          serveur
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">
                          ✓
                        </span>
                        <span>
                          <strong>SEO optimal</strong> : Contenu complet dans le
                          HTML, robots d&apos;indexation voient tout
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">
                          ✓
                        </span>
                        <span>
                          <strong>Coûts réduits</strong> : Peut être hébergé sur
                          un CDN gratuit (Vercel, Netlify, GitHub Pages)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">
                          ✓
                        </span>
                        <span>
                          <strong>Scalabilité infinie</strong> : Pas de charge
                          serveur, un CDN peut servir des millions de requêtes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">
                          ✓
                        </span>
                        <span>
                          <strong>Sécurité</strong> : Pas de serveur à
                          maintenir, moins de surface d&apos;attaque
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
                          <strong>Contenu statique uniquement</strong> : Pas de
                          données dynamiques à la requête
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">
                          ✗
                        </span>
                        <span>
                          <strong>Rebuild nécessaire</strong> : Pour changer le
                          contenu, il faut rebuilder et redéployer
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">
                          ✗
                        </span>
                        <span>
                          <strong>Pas de personnalisation</strong> : Impossible
                          d&apos;afficher du contenu personnalisé par
                          utilisateur
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">
                          ✗
                        </span>
                        <span>
                          <strong>Temps de build</strong> : Si beaucoup de
                          pages, le build peut prendre du temps
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Quand l'utiliser */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      🎯 Quand utiliser le SSG ?
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Blogs, sites de documentation</li>
                      <li>• Landing pages, sites vitrines</li>
                      <li>• Pages de contenu qui changent rarement</li>
                      <li>
                        • Sites avec beaucoup de trafic (performance critique)
                      </li>
                      <li>
                        • Quand le contenu est le même pour tous les
                        utilisateurs
                      </li>
                    </ul>
                  </div>

                  {/* Exemple dans ce projet */}
                  <div className="mt-4 p-4 bg-background border rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">
                      💡 Exemple dans ce projet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Cette page utilise le SSG car :
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>
                        • Le contenu est statique (informations sur le projet)
                      </li>
                      <li>• Pas besoin de données dynamiques</li>
                      <li>• Performance optimale (chargement instantané)</li>
                      <li>• SEO optimal pour la page &quot;Exercices&quot;</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
        {/* Introduction */}
        <Card className="p-6 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <Rocket className="size-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">Objectif des Exercices</h2>
              <p>
                Ces exercices vous permettront de pratiquer les concepts vus en
                cours :<strong> SSG, SSR, CSR</strong> et l&apos;intégration
                d&apos;un modèle IA avec Vercel AI SDK. Chaque exercice est
                progressif et vous amènera à créer un projet complet et
                valorisable.
              </p>
            </div>
          </div>
        </Card>

        {/* Liste des exercices */}
        {exercices.map((exercice) => {
          const Icon = exercice.icon;
          const colorClasses = {
            blue: "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20",
            purple:
              "border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20",
            amber:
              "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20",
            green:
              "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20",
          };

          return (
            <Card
              key={exercice.numero}
              className={`p-6 ${
                colorClasses[exercice.color as keyof typeof colorClasses]
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-foreground/10 flex items-center justify-center font-bold text-lg">
                    {exercice.numero}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="size-5 text-foreground" />
                    <h3 className="text-xl font-bold">{exercice.titre}</h3>
                  </div>
                  <p className="mb-4">{exercice.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">
                      Étapes à suivre :
                    </h4>
                    <ul className="space-y-2">
                      {exercice.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section détaillée pour l'exercice 3 */}
                  {exercice.numero === 3 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                          value="ex3-details"
                          className="border-none"
                        >
                          <AccordionTrigger className="hover:no-underline px-0 py-2">
                            <div className="flex items-center gap-2">
                              <FileCode className="size-4 text-amber-600 dark:text-amber-400" />
                              <span className="font-semibold text-sm">
                                Voir les exemples de code et détails
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-0 pb-0">
                            <div className="space-y-4 mt-4">
                              {/* Installation */}
                              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center gap-2 mb-3">
                                  <Rocket className="size-4 text-blue-600 dark:text-blue-400" />
                                  <h5 className="font-semibold text-sm">
                                    📦 Installation préalable
                                  </h5>
                                </div>
                                <div className="space-y-2 text-xs">
                                  <p>Installer les dépendances :</p>
                                  <pre className="bg-background p-2 rounded border text-xs overflow-x-auto">
                                    <code>
                                      npm install ai @ai-sdk/openai # ou avec
                                      Groq (gratuit et rapide) : npm install ai
                                      @ai-sdk/groq
                                    </code>
                                  </pre>
                                  <p className="mt-3">
                                    Ajouter dans{" "}
                                    <code className="bg-muted px-1 rounded">
                                      .env.local
                                    </code>{" "}
                                    :
                                  </p>
                                  <pre className="bg-background p-2 rounded border text-xs overflow-x-auto">
                                    <code>{`# Pour OpenAI :
OPENAI_API_KEY=sk-xxxxxx

# Pour Groq (gratuit) :
GROQ_API_KEY=gsk_xxxxxx

# URL de base (pour fetch interne)
NEXT_PUBLIC_BASE_URL=http://localhost:3000`}</code>
                                  </pre>
                                </div>
                              </div>

                              {/* Étape 1 : Route Handler */}
                              <div className="bg-background/50 p-4 rounded-lg border">
                                <div className="flex items-center gap-2 mb-3">
                                  <FileCode className="size-4 text-amber-600 dark:text-amber-400" />
                                  <h5 className="font-semibold text-sm">
                                    1️⃣ Créer le Route Handler
                                  </h5>
                                </div>
                                <p className="text-xs mb-3">
                                  Créer{" "}
                                  <code className="bg-muted px-1 rounded text-xs">
                                    app/api/ai/route.ts
                                  </code>
                                </p>
                                <pre className="bg-background p-3 rounded border text-xs overflow-x-auto">
                                  <code>{`// app/api/ai/route.ts
import { NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
// ou import { createGroq } from "@ai-sdk/groq";

export async function GET() {
  const prompt = "Donne une idée originale de startup pour un étudiant";
  
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    // ou: model: groq("qwen/qwen3-32b"),
    prompt,
  });

  return NextResponse.json({ text });
}`}</code>
                                </pre>
                                <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800">
                                  <div className="flex items-start gap-2">
                                    <Key className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                                    <p className="text-xs">
                                      <strong className="text-foreground">
                                        Sécurité :
                                      </strong>{" "}
                                      La clé API reste côté serveur, jamais
                                      exposée au client !
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Étape 2 : Page SSR */}
                              <div className="bg-background/50 p-4 rounded-lg border">
                                <div className="flex items-center gap-2 mb-3">
                                  <FileCode className="size-4 text-amber-600 dark:text-amber-400" />
                                  <h5 className="font-semibold text-sm">
                                    2️⃣ Créer la page SSR
                                  </h5>
                                </div>
                                <p className="text-xs mb-3">
                                  Créer{" "}
                                  <code className="bg-muted px-1 rounded text-xs">
                                    app/idee/page.tsx
                                  </code>
                                </p>
                                <pre className="bg-background p-3 rounded border text-xs overflow-x-auto">
                                  <code>{`// app/idee/page.tsx
export const dynamic = "force-dynamic"; // ✅ Force SSR

export default async function IdeePage() {
  // Appel du Route Handler interne
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(\`\${baseUrl}/api/ai\`, {
    cache: "no-store", // ✅ Pas de cache = SSR
  });
  
  const data = await res.json();

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">💡 Idée générée par l'IA</h1>
      <p className="text-lg">{data.text}</p>
      <p className="text-sm text-gray-500">
        Générée le {new Date().toLocaleTimeString()}
      </p>
    </main>
  );
}`}</code>
                                </pre>
                              </div>

                              {/* Tableau récapitulatif */}
                              <div className="bg-background/50 p-4 rounded-lg border">
                                <h5 className="font-semibold text-sm mb-3">
                                  ⚙️ À retenir
                                </h5>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-xs">
                                    <thead>
                                      <tr className="border-b">
                                        <th className="text-left p-2 font-semibold">
                                          Élément
                                        </th>
                                        <th className="text-left p-2 font-semibold">
                                          Rôle
                                        </th>
                                        <th className="text-left p-2 font-semibold">
                                          Exécuté où ?
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-b">
                                        <td className="p-2">
                                          <code>app/api/ai/route.ts</code>
                                        </td>
                                        <td className="p-2">
                                          Route handler (mini API)
                                        </td>
                                        <td className="p-2">🖥️ Serveur</td>
                                      </tr>
                                      <tr className="border-b">
                                        <td className="p-2">
                                          <code>generateText()</code>
                                        </td>
                                        <td className="p-2">
                                          Appel IA (AI SDK)
                                        </td>
                                        <td className="p-2">🖥️ Serveur</td>
                                      </tr>
                                      <tr className="border-b">
                                        <td className="p-2">
                                          <code>app/idee/page.tsx</code>
                                        </td>
                                        <td className="p-2">Page en SSR</td>
                                        <td className="p-2">🖥️ Serveur</td>
                                      </tr>
                                      <tr className="border-b">
                                        <td className="p-2">
                                          <code>
                                            fetch(&quot;/api/ai&quot;)
                                          </code>
                                        </td>
                                        <td className="p-2">
                                          Appel à l&apos;API interne
                                        </td>
                                        <td className="p-2">🖥️ Serveur</td>
                                      </tr>
                                      <tr>
                                        <td className="p-2">Résultat HTML</td>
                                        <td className="p-2">
                                          Envoyé au navigateur
                                        </td>
                                        <td className="p-2">📱 Client</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* Bonus */}
                              <div className="bg-background/50 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                  <Lightbulb className="size-4 text-amber-600 dark:text-amber-400" />
                                  ✨ Bonus possibles
                                </h5>
                                <ul className="text-xs space-y-1 ml-6 list-disc">
                                  <li>
                                    Ajouter un champ texte pour changer le
                                    prompt
                                  </li>
                                  <li>
                                    Ajouter un bouton &quot;🔄 Régénérer une
                                    idée&quot;
                                  </li>
                                  <li>
                                    Créer un composant client
                                    &quot;Historique&quot; (CSR) pour lister les
                                    dernières idées générées
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}

        {/* Ressources supplémentaires */}
        <Card className="p-6 bg-muted/50">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="size-5" />
            Ressources Utiles
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong className="text-foreground">
                Documentation AI SDK :
              </strong>
              <Link
                href="https://ai-sdk.dev/docs/getting-started/nextjs-app-router"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
              >
                ai-sdk.dev/docs/getting-started/nextjs-app-router
              </Link>
            </div>
            <div>
              <strong className="text-foreground">
                Documentation Next.js :
              </strong>
              <Link
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
              >
                nextjs.org/docs
              </Link>
            </div>
            <div>
              <strong className="text-foreground">
                Groq Console (API Key) :
              </strong>
              <Link
                href="https://console.groq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
              >
                console.groq.com
              </Link>
            </div>
            <div>
              <strong className="text-foreground">
                ShadCn UI (composants) :
              </strong>
              <Link
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
              >
                ui.shadcn.com
              </Link>
            </div>
            <div>
              <strong className="text-foreground">
                Libs / Outils / Plateformes recommandées :
              </strong>
              <Link
                href="/ressources"
                className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
              >
                Ressources
              </Link>
            </div>
          </div>
        </Card>

        {/* Checklist finale */}
        <Card className="p-6 bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
            Checklist de Validation
          </h2>
          <p className="mb-4">
            Avant de considérer les exercices terminés, vérifiez que :
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <span>
                La page d&apos;accueil s&apos;affiche correctement (SSG)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <span>
                La page SSR appelle le Route Handler et génère du contenu
                différent à chaque actualisation
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <span>
                Le Route Handler utilise l&apos;AI SDK et la clé API reste
                sécurisée côté serveur
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <span>
                Le chatbot fonctionne et affiche les réponses en streaming
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <span>
                L&apos;API route est fonctionnelle et communique avec Groq
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <span>
                Le projet est déployé sur Vercel (optionnel mais recommandé)
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </PageContainer>
  );
}
