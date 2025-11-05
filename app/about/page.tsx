import { PageContainer } from "@/app/components/shared/page-container";
import { PageHeader } from "@/app/components/shared/page-header";
import { GoHome } from "../components/shared/go-home";
import { Card } from "@/app/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Info, CheckCircle2, XCircle } from "lucide-react";

export const metadata = {
  title: "À propos",
};

export default function About() {
  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="À propos (SSG)"
        emoji="🤖"
        description="Découvrez le projet AI Assistant Hub. Cette page est générée statiquement (SSG) au build."
        className="my-12"
      />

      {/* 🎓 Section explicative sur le SSG */}
      <Card className="mb-8 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
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
                    Le <strong>Static Site Generation (SSG)</strong> est un mode
                    de rendu où le HTML est généré au{" "}
                    <strong>moment du build</strong>. Toutes les pages sont
                    pré-rendues en fichiers HTML statiques avant le déploiement,
                    ce qui les rend ultra-rapides à servir.
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
                        statique servi instantanément, pas de traitement serveur
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
                        <strong>Sécurité</strong> : Pas de serveur à maintenir,
                        moins de surface d&apos;attaque
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
                        d&apos;afficher du contenu personnalisé par utilisateur
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 mt-1">
                        ✗
                      </span>
                      <span>
                        <strong>Temps de build</strong> : Si beaucoup de pages,
                        le build peut prendre du temps
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
                      • Quand le contenu est le même pour tous les utilisateurs
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
                    <li>• SEO optimal pour la page &quot;À propos&quot;</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <h2 className="text-2xl font-bold mb-4">🚀 Projet :</h2>
      <p className="text-gray-700 mb-4">
        AI Assistant Hub est un petit site Next.js proposant plusieurs
        fonctionnalités IA.
      </p>

      <h2 className="text-2xl font-bold mb-4">🎯 Objectif :</h2>
      <p className="text-gray-700 mb-4">
        Créer un petit site Next.js proposant plusieurs fonctionnalités IA :
      </p>

      <ul className="list-disc list-inside text-gray-700">
        <li>Page d’accueil statique (SSG)</li>
        <li>Chatbot interactif (CSR)</li>
        <li>Générateur d’idées IA (SSR)</li>
        <li>API Route connectée à un modèle IA (OpenAI, Groq ou local)</li>
      </ul>

      <h2 className="text-2xl font-bold my-4">👉 Le but :</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Apprendre les fondamentaux de Next.js (App Router, rendu, API)</li>
        <li>Découvrir l’intégration d’un modèle IA via Vercel AI SDK</li>
        <li>Obtenir un projet concret et valorisable sur un portfolio.</li>
      </ul>
    </PageContainer>
  );
}
