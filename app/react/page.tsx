import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Sparkles, Zap, Code2 } from "lucide-react";

export const metadata = {
  title: "Pourquoi React a été créé",
  description:
    "Découvrez l&apos;histoire de React, les problèmes qu&apos;il résolvait et les innovations qu&apos;il a apportées au développement web",
};

export default function ReactPage() {
  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="Pourquoi React a été créé"
        emoji="⚛️"
        description="L'histoire de React et les problèmes qu'il résolvait dans le développement web moderne"
        className="my-12"
      />

      {/* Contexte historique */}
      <Card className="p-6 mb-8 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
        <div className="flex items-start gap-4">
          <Sparkles className="size-8 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold mb-2 text-foreground">
              🧩 Le contexte : avant React (vers 2010–2012)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Avant React, les développeurs web utilisaient principalement :
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>
                  <strong>jQuery</strong> pour manipuler le DOM
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>
                  Des frameworks comme <strong>Backbone.js</strong>,{" "}
                  <strong>AngularJS (v1)</strong>, <strong>Ember.js</strong>,
                  etc.
                </span>
              </li>
            </ul>
            <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/20 p-4">
              <h3 className="font-semibold mb-2 text-foreground">
                👉 Le problème :
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Les interfaces web devenaient de plus en plus dynamiques et
                complexes (notifications, filtres en temps réel, dashboards,
                etc.). Mais le DOM du navigateur était lent et difficile à
                maintenir.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Quand l&apos;état de ton application changeait (par exemple : un
                élément de la liste est ajouté), tu devais manuellement mettre à
                jour le DOM pour refléter ce changement.
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">
                  Résultat :
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <XCircle className="size-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                    <span>beaucoup de code spaghetti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="size-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                    <span>
                      erreurs de synchronisation entre les données et
                      l&apos;affichage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="size-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                    <span>
                      et une complexité croissante dès que l&apos;app
                      grossissait
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Naissance de React */}
      <Card className="p-6 mb-8 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
        <div className="flex items-start gap-4">
          <Zap className="size-8 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold mb-2 text-foreground">
              ⚛️ 1. React est né chez Facebook (2011–2013)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Facebook avait justement ce problème avec sa boîte de commentaires
              en temps réel et son fil d&apos;actualité. Chaque petite mise à
              jour devait être rendue sans recharger toute la page, ce qui
              devenait ingérable.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">👉</span>
                <span>
                  <strong>Jordan Walke</strong>, ingénieur chez Facebook, crée
                  React en interne vers 2011, et le framework est open-sourcé en
                  2013.
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Innovations de React */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          💡 2. Les idées révolutionnaires de React
        </h2>

        <div className="space-y-6">
          {/* Virtual DOM */}
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              a) Le Virtual DOM
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Au lieu de modifier directement le DOM (lent), React utilise un{" "}
              <strong>Virtual DOM</strong> : un modèle en mémoire qui représente
              ton interface.
            </p>
            <p className="text-sm font-semibold mb-2 text-foreground">
              Quand l&apos;état change :
            </p>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>React crée une nouvelle version du Virtual DOM.</li>
              <li>Il la compare à l&apos;ancienne (diffing).</li>
              <li>
                Il met à jour seulement les parties nécessaires du vrai DOM.
              </li>
            </ol>
            <div className="mt-3 p-3 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <p className="text-sm text-muted-foreground">
                <strong>→ Résultat :</strong> plus rapide, plus prévisible, plus
                simple.
              </p>
            </div>
          </div>

          {/* Composants */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              b) La logique par composants
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Une interface = une arborescence de composants indépendants.
            </p>
            <p className="text-sm font-semibold mb-2 text-foreground">
              Chaque composant gère :
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <span>son propre état (useState, setState)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <span>son affichage (return &lt;JSX /&gt;)</span>
              </li>
            </ul>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-muted-foreground">
                C&apos;est un paradigme <strong>déclaratif</strong> :
                &quot;Dis-moi ce que tu veux voir à l&apos;écran, pas comment le
                mettre à jour.&quot;
              </p>
            </div>
          </div>

          {/* JSX */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              c) JSX
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              React introduit le JSX, une syntaxe qui mélange HTML et JavaScript
              :
            </p>
            <div className="bg-muted p-4 rounded-lg border">
              <code className="text-sm text-foreground">
                {`function Hello({ name }) {
  return <h1>Hello {name}</h1>;
}`}
              </code>
            </div>
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-muted-foreground">
                <strong>→</strong> Cela rend la structure de l&apos;interface
                lisible et expressive.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tableau comparatif */}
      <Card className="p-6 mb-8 border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          🚀 3. En résumé : pourquoi React a été créé
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold text-foreground">
                  Problème du web d&apos;avant
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  Solution de React
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 text-muted-foreground">
                  DOM lent et difficile à manipuler
                </td>
                <td className="p-3 text-muted-foreground">
                  <Badge
                    variant="outline"
                    className="bg-green-50 dark:bg-green-950/20"
                  >
                    Virtual DOM performant
                  </Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-muted-foreground">
                  Code spaghetti et difficile à maintenir
                </td>
                <td className="p-3 text-muted-foreground">
                  <Badge
                    variant="outline"
                    className="bg-green-50 dark:bg-green-950/20"
                  >
                    Architecture par composants
                  </Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-muted-foreground">
                  Mises à jour manuelles du DOM
                </td>
                <td className="p-3 text-muted-foreground">
                  <Badge
                    variant="outline"
                    className="bg-green-50 dark:bg-green-950/20"
                  >
                    Rendu déclaratif automatique
                  </Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-muted-foreground">
                  Frameworks lourds et rigides
                </td>
                <td className="p-3 text-muted-foreground">
                  <Badge
                    variant="outline"
                    className="bg-green-50 dark:bg-green-950/20"
                  >
                    Librairie légère et flexible
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="p-3 text-muted-foreground">
                  Pas de standard clair pour les interfaces réactives
                </td>
                <td className="p-3 text-muted-foreground">
                  <Badge
                    variant="outline"
                    className="bg-green-50 dark:bg-green-950/20"
                  >
                    Paradigme universel basé sur l&apos;état et les props
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Aujourd&apos;hui */}
      <Card className="p-6 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
        <div className="flex items-start gap-4">
          <Code2 className="size-8 text-green-600 dark:text-green-400 shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              📅 4. Et aujourd&apos;hui ?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depuis 2013, React est devenu :
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    la librairie la plus utilisée
                  </p>
                  <p className="text-sm text-muted-foreground">
                    pour construire des interfaces web
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    la base de frameworks modernes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    comme Next.js, Remix, Gatsby, Expo, etc.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    le modèle d&apos;interface pour de nombreuses autres technos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Vue, Svelte, SolidJS s&apos;en inspirent fortement
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
