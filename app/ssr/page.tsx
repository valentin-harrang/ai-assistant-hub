// 🎓 Page explicative SSR - Vulgarisée pour les étudiants
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Server, Search } from "lucide-react";

export default function SSRPage() {
  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="SSR - Server-Side Rendering"
        emoji="🖥️"
        description="Rendu côté serveur : le serveur prépare tout avant de te l'envoyer"
        className="my-12"
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Analogie simple */}
        <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-4">
            <Server className="size-8 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                🍕 Analogie : La Pizza Livrée
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Avec le <strong>SSR</strong>, c&apos;est comme commander une
                pizza :
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>• 🍕 Tu commandes (requête au serveur)</li>
                <li>
                  • 🏪 Le restaurant prépare la pizza (serveur génère le HTML)
                </li>
                <li>
                  • 🚗 Le livreur arrive avec une pizza{" "}
                  <strong>prête à manger</strong> (HTML complet)
                </li>
              </ul>
              <p className="mt-3 text-muted-foreground">
                Le serveur fait tout le travail, tu reçois juste le résultat
                final !
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
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Tu cliques sur un lien</h3>
                <p className="text-sm text-muted-foreground">
                  Ton navigateur demande la page au serveur : &quot;Hey,
                  donne-moi /prompts&quot;
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Le serveur se met au travail
                </h3>
                <p className="text-sm text-muted-foreground">
                  Le serveur exécute le code React, récupère les données (API,
                  base de données), et génère tout le HTML
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Le HTML complet est prêt</h3>
                <p className="text-sm text-muted-foreground">
                  Tous les textes, images, contenu sont déjà dans le HTML. Rien
                  n&apos;est vide !
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Le serveur t&apos;envoie tout
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tu reçois un HTML complet avec tout le contenu déjà dedans
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Tu vois la page immédiatement
                </h3>
                <p className="text-sm text-muted-foreground">
                  Le contenu s&apos;affiche tout de suite, même si JavaScript
                  n&apos;est pas encore chargé !
                </p>
              </div>
            </div>
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
              <Search className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">SEO Parfait</h3>
                <p className="text-sm text-muted-foreground">
                  Google voit le contenu complet dès le premier chargement.
                  C&apos;est idéal pour être trouvé sur les moteurs de recherche
                  !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Search className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Contenu Visible Tout de Suite</h3>
                <p className="text-sm text-muted-foreground">
                  Pas besoin d&apos;attendre JavaScript. Le texte s&apos;affiche
                  immédiatement, même sur un vieux téléphone !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Search className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Données Toujours Fraîches</h3>
                <p className="text-sm text-muted-foreground">
                  À chaque visite, le serveur génère une nouvelle page. Toujours
                  à jour, jamais de cache vieux !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Search className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Sécurité</h3>
                <p className="text-sm text-muted-foreground">
                  Les clés API restent sur le serveur, jamais exposées dans le
                  navigateur. Super sécurisé !
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
                <h3 className="font-semibold">Le Serveur Travaille Beaucoup</h3>
                <p className="text-sm text-muted-foreground">
                  À chaque visite, le serveur doit générer la page. Si tu as
                  beaucoup de visiteurs, ça peut devenir lent ou cher.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">Premier Affichage Plus Long</h3>
                <p className="text-sm text-muted-foreground">
                  Le serveur doit attendre les données avant de générer le HTML.
                  Ça peut prendre 1-2 secondes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">
                  Pas d&apos;Interactivité Sans JavaScript
                </h3>
                <p className="text-sm text-muted-foreground">
                  Pour les boutons, animations, etc., il faut quand même charger
                  JavaScript. Le HTML seul ne suffit pas.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quand l'utiliser - Version simple */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            🎯 Quand utiliser le SSR ?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">✅ Utilise SSR pour :</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 📰 Les blogs et actualités</li>
                <li>• 🛒 Les pages produits e-commerce</li>
                <li>• 🔍 Les sites qui veulent être trouvés sur Google</li>
                <li>• 📚 Les sites de documentation</li>
                <li>• 👤 Les pages de profil utilisateur</li>
                <li>• 📊 Les pages avec données personnalisées</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">❌ Évite SSR pour :</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 💬 Les chats en temps réel</li>
                <li>• 🎮 Les apps très interactives</li>
                <li>• 📱 Les dashboards privés</li>
                <li>• 🎨 Les éditeurs collaboratifs</li>
                <li>• 🚀 Les sites avec très peu de trafic</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Exemple concret dans le projet */}
        <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <h2 className="text-2xl font-bold mb-4">
            💡 Exemple dans notre projet
          </h2>
          <p className="text-muted-foreground mb-4">
            La page <strong>/prompts</strong> utilise le SSR. Voici pourquoi
            c&apos;est parfait :
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">→</span>
              <span>
                Les idées IA sont <strong>générées à chaque visite</strong>{" "}
                (toujours fraîches)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">→</span>
              <span>
                La clé API Groq reste <strong>sécurisée côté serveur</strong>{" "}
                (jamais exposée)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">→</span>
              <span>
                Le contenu est <strong>visible immédiatement</strong> (pas de
                loading spinner)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">→</span>
              <span>
                Potentiel SEO (même si limité ici, on pourrait partager des
                idées)
              </span>
            </div>
          </div>
        </Card>

        {/* Résumé en une phrase */}
        <Card className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-300 dark:border-amber-700">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">📝 Résumé en une phrase</h2>
            <p className="text-lg text-muted-foreground">
              <strong>SSR</strong> = Le serveur prépare tout le HTML avec le
              contenu, <strong>tu reçois une page complète</strong> prête à
              afficher.
            </p>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
