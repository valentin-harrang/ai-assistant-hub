// 🎓 Page explicative ISR - Vulgarisée pour les étudiants
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RefreshCw, Zap } from "lucide-react";

export default function ISRPage() {
  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="ISR - Incremental Static Regeneration"
        emoji="🔄"
        description="Régénération statique incrémentale : le meilleur des deux mondes (SSG + SSR)"
        className="my-12"
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Analogie simple */}
        <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <div className="flex items-start gap-4">
            <RefreshCw className="size-8 text-green-600 dark:text-green-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                🍕 Analogie : La Pizza Surgelée Intelligente
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Avec l&apos;<strong>ISR</strong>, c&apos;est comme une pizza
                surgelée :
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  • 🏭 La pizza est préparée en usine (générée au build - SSG)
                </li>
                <li>• ❄️ Elle est stockée dans un frigo (cache CDN)</li>
                <li>
                  • 🚀 Quand tu en veux une, c&apos;est{" "}
                  <strong>instantané</strong> (servie depuis le cache)
                </li>
                <li>
                  • 🔄 Mais toutes les 24h, l&apos;usine prépare une{" "}
                  <strong>nouvelle pizza</strong> en arrière-plan
                </li>
                <li>
                  • 👥 Pendant ce temps, les visiteurs continuent de recevoir
                  l&apos;ancienne (pas d&apos;attente)
                </li>
              </ul>
              <p className="mt-3 text-muted-foreground">
                Le meilleur des deux mondes : <strong>rapidité du SSG</strong> +{" "}
                <strong>fraîcheur du SSR</strong> !
              </p>
            </div>
          </div>
        </Card>

        {/* Comment ça marche - Version simple */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            ⚙️ Comment ça marche ? (Version simple)
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Première génération (Build)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Au build, Next.js génère la page en HTML statique (comme SSG)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  La page est servie depuis le cache
                </h3>
                <p className="text-sm text-muted-foreground">
                  Les visiteurs reçoivent la version en cache instantanément
                  (ultra rapide !)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Le timer de revalidation arrive
                </h3>
                <p className="text-sm text-muted-foreground">
                  Après le délai défini (ex: 60 secondes), Next.js détecte que
                  la page doit être régénérée
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Régénération en arrière-plan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Next.js régénère la page côté serveur (comme SSR){" "}
                  <strong>sans bloquer</strong> les visiteurs
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold mb-1">Nouveau cache prêt</h3>
                <p className="text-sm text-muted-foreground">
                  La nouvelle version remplace l&apos;ancienne. Les prochains
                  visiteurs verront la version fraîche !
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Exemple de code */}
        <Card className="p-6 bg-muted/50">
          <h2 className="text-xl font-bold mb-4">💻 Exemple de Code</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-sm">
                Dans `app/articles/page.tsx` :
              </h3>
              <pre className="bg-background p-4 rounded-lg border text-xs overflow-x-auto">
                <code>{`// ISR - Régénération toutes les 60 secondes
export const revalidate = 60; // en secondes

export default async function ArticlesPage() {
  // Fetch des articles (qui changent régulièrement)
  const articles = await fetchArticles();
  
  return (
    <div>
      {articles.map(article => (
        <article key={article.id}>
          {article.title}
        </article>
      ))}
    </div>
  );
}`}</code>
              </pre>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Explication :</strong> La page est générée au build, puis
              régénérée automatiquement toutes les 60 secondes. Les visiteurs
              voient toujours la dernière version en cache, sans attendre.
            </p>
          </div>
        </Card>

        {/* Avantages - Version simple */}
        <Card className="p-6 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="size-6 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold">✅ Les Avantages</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Performance du SSG</h3>
                <p className="text-sm text-muted-foreground">
                  Les pages sont servies instantanément depuis le cache CDN.
                  Aussi rapide que du SSG !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Fraîcheur du SSR</h3>
                <p className="text-sm text-muted-foreground">
                  Le contenu est régénéré automatiquement après un délai. Pas
                  besoin de rebuild manuel !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">
                  Pas d&apos;Attente pour les Visiteurs
                </h3>
                <p className="text-sm text-muted-foreground">
                  Pendant la régénération, les utilisateurs voient toujours la
                  version en cache. Zéro downtime !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">SEO Optimal</h3>
                <p className="text-sm text-muted-foreground">
                  Le contenu est toujours dans le HTML, parfait pour les robots
                  d&apos;indexation.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Scalabilité</h3>
                <p className="text-sm text-muted-foreground">
                  Peut servir des millions de requêtes depuis le cache, sans
                  charge serveur pour chaque visite.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Inconvénients - Version simple */}
        <Card className="p-6 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="size-6 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold">❌ Les Inconvénients</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">Délai de Mise à Jour</h3>
                <p className="text-sm text-muted-foreground">
                  Les changements ne sont visibles qu&apos;après le délai de
                  revalidation. Si tu mets à jour quelque chose, il faut
                  attendre jusqu&apos;à 60 secondes (par exemple).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">
                  Pas de Contenu Ultra-Dynamique
                </h3>
                <p className="text-sm text-muted-foreground">
                  Si tu as besoin de données qui changent à chaque seconde
                  (comme un chat live), l&apos;ISR n&apos;est pas adapté.
                  Utilise plutôt CSR ou SSR.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">Première Régénération</h3>
                <p className="text-sm text-muted-foreground">
                  La première personne qui visite après l&apos;expiration du
                  cache peut attendre un peu (le temps de régénérer). Les
                  suivants verront la nouvelle version instantanément.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quand l'utiliser - Version simple */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            🎯 Quand utiliser l&apos;ISR ?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">✅ Utilise ISR pour :</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 📰 Les blogs avec articles qui changent régulièrement</li>
                <li>• 🛒 Les catalogues produits e-commerce</li>
                <li>
                  • 📊 Les dashboards avec données qui changent (mais pas en
                  temps réel)
                </li>
                <li>
                  • 📈 Les pages avec statistiques (mises à jour périodiques)
                </li>
                <li>• 📝 Les sites de contenu avec beaucoup de trafic</li>
                <li>• 🔄 Les pages qui doivent être rapides ET à jour</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">❌ Évite ISR pour :</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 💬 Les chats en temps réel</li>
                <li>• 📊 Les dashboards avec données live (secondes)</li>
                <li>• 👤 Les pages de profil utilisateur (personnalisées)</li>
                <li>• 🎮 Les apps interactives</li>
                <li>
                  • 📱 Les contenus qui doivent être 100% à jour instantanément
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Comparaison avec les autres modes */}
        <Card className="p-6 bg-linear-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-bold mb-4">📊 ISR vs SSG vs SSR</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Critère</th>
                  <th className="text-left p-2">SSG</th>
                  <th className="text-left p-2">ISR</th>
                  <th className="text-left p-2">SSR</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Vitesse</td>
                  <td className="p-2 text-muted-foreground">
                    ⚡⚡⚡ Ultra rapide
                  </td>
                  <td className="p-2 text-muted-foreground">
                    ⚡⚡⚡ Ultra rapide
                  </td>
                  <td className="p-2 text-muted-foreground">⚡⚡ Moyenne</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Mise à jour</td>
                  <td className="p-2 text-muted-foreground">
                    ❌ Rebuild nécessaire
                  </td>
                  <td className="p-2 text-muted-foreground">
                    ✅ Auto après délai
                  </td>
                  <td className="p-2 text-muted-foreground">
                    ✅ Toujours frais
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Charge serveur</td>
                  <td className="p-2 text-muted-foreground">✅ Aucune</td>
                  <td className="p-2 text-muted-foreground">
                    ✅ Minimale (revalidation)
                  </td>
                  <td className="p-2 text-muted-foreground">
                    ⚠️ À chaque requête
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">SEO</td>
                  <td className="p-2 text-muted-foreground">✅ Parfait</td>
                  <td className="p-2 text-muted-foreground">✅ Parfait</td>
                  <td className="p-2 text-muted-foreground">✅ Parfait</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Cas d&apos;usage</td>
                  <td className="p-2 text-muted-foreground">
                    Contenu statique
                  </td>
                  <td className="p-2 text-muted-foreground">
                    Contenu qui change régulièrement
                  </td>
                  <td className="p-2 text-muted-foreground">
                    Données toujours fraîches
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Exemple concret */}
        <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold mb-4">💡 Exemple Concret</h2>
          <p className="text-muted-foreground mb-4">
            Imagine un site de blog avec 1000 articles :
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">→</span>
              <span>
                <strong>Avec SSG :</strong> Au build, les 1000 pages sont
                générées. Si tu ajoutes un article, il faut rebuilder tout le
                site (long !).
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">→</span>
              <span>
                <strong>Avec ISR :</strong> Les 1000 pages sont générées au
                build. Quand tu ajoutes un article, la page est régénérée
                automatiquement après le délai (ex: 60s). Les autres pages
                restent en cache (rapide !).
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">→</span>
              <span>
                <strong>Avec SSR :</strong> Chaque visite régénère la page. Si
                tu as 10 000 visiteurs/jour, le serveur bosse 10 000 fois (lourd
                !).
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <strong>ISR = Le meilleur choix</strong> pour ce cas : rapide, SEO
            optimal, et contenu qui se met à jour automatiquement !
          </p>
        </Card>

        {/* Résumé en une phrase */}
        <Card className="p-6 bg-linear-to-r from-green-500/10 to-emerald-500/10 border-green-300 dark:border-green-700">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">📝 Résumé en une phrase</h2>
            <p className="text-lg text-muted-foreground">
              <strong>ISR</strong> = Génère la page une fois (comme SSG), puis
              la <strong>régénère automatiquement</strong> après un délai (comme
              SSR), tout en <strong>servant le cache</strong> aux visiteurs
              pendant la régénération.
            </p>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
