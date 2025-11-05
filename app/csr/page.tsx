// 🎓 Page explicative CSR - Vulgarisée pour les étudiants
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Zap, Smartphone } from "lucide-react";

export default function CSRPage() {
  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="CSR - Client-Side Rendering"
        emoji="💻"
        description="Rendu côté client : tout se passe dans le navigateur"
        className="my-12"
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Analogie simple */}
        <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <Smartphone className="size-8 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                🍕 Analogie : La Pizza Livrée
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Imagine que tu commandes une pizza. Avec le <strong>CSR</strong>
                , tu reçois :
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>• 📦 Une boîte vide (HTML minimal)</li>
                <li>• 📋 Une recette (JavaScript)</li>
                <li>
                  • 🧑‍🍳 Toi-même tu dois cuisiner la pizza (le navigateur génère
                  le contenu)
                </li>
              </ul>
              <p className="mt-3 text-muted-foreground">
                Le serveur ne fait pas grand-chose, c&apos;est{" "}
                <strong>ton navigateur</strong> qui fait tout le travail !
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
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Tu ouvres la page</h3>
                <p className="text-sm text-muted-foreground">
                  Le serveur t&apos;envoie un HTML quasi-vide + un gros fichier
                  JavaScript
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Ton navigateur charge le JavaScript
                </h3>
                <p className="text-sm text-muted-foreground">
                  Le JavaScript se télécharge et s&apos;exécute dans ton
                  navigateur
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">React prend le contrôle</h3>
                <p className="text-sm text-muted-foreground">
                  React crée tous les éléments de la page (boutons, textes,
                  images)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Les données arrivent</h3>
                <p className="text-sm text-muted-foreground">
                  Le JavaScript fait des appels API pour récupérer les données
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  La page s&apos;affiche enfin
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tout est maintenant visible et interactif !
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
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Super Interactif</h3>
                <p className="text-sm text-muted-foreground">
                  Tu peux faire des choses en temps réel : chat, streaming,
                  animations. Pas besoin de recharger la page !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Pas de Charge Serveur</h3>
                <p className="text-sm text-muted-foreground">
                  Le serveur ne fait presque rien, c&apos;est ton navigateur qui
                  bosse. Moins de coûts pour le serveur !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Expérience Fluide</h3>
                <p className="text-sm text-muted-foreground">
                  Une fois chargé, tout est instantané. Pas de rechargement de
                  page, transitions smooth !
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
                <h3 className="font-semibold">SEO Moins Bon</h3>
                <p className="text-sm text-muted-foreground">
                  Google voit d&apos;abord une page vide. Il doit attendre que
                  le JavaScript charge pour voir le contenu. Pas idéal pour le
                  référencement.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">Premier Chargement Lent</h3>
                <p className="text-sm text-muted-foreground">
                  Il faut attendre que tout le JavaScript se télécharge avant de
                  voir quelque chose. C&apos;est un peu frustrant au début.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">
                  Pas de JavaScript = Pas de Site
                </h3>
                <p className="text-sm text-muted-foreground">
                  Si quelqu&apos;un désactive JavaScript, il ne voit rien.
                  Problème d&apos;accessibilité.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quand l'utiliser - Version simple */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            🎯 Quand utiliser le CSR ?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">✅ Utilise CSR pour :</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 💬 Les chats (Discord, Slack)</li>
                <li>• 📊 Les dashboards interactifs</li>
                <li>• 🎮 Les apps web (Gmail, Notion)</li>
                <li>• 🎨 Les éditeurs en temps réel</li>
                <li>• 📱 Les apps mobiles web</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">❌ Évite CSR pour :</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 📰 Les blogs (besoin SEO)</li>
                <li>• 🛒 Les e-commerce publics</li>
                <li>• 📚 Les sites de documentation</li>
                <li>• 🌐 Les landing pages marketing</li>
                <li>• 🔍 Les sites qui doivent être trouvés sur Google</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Exemple concret dans le projet */}
        <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold mb-4">
            💡 Exemple dans notre projet
          </h2>
          <p className="text-muted-foreground mb-4">
            La page <strong>/chat</strong> utilise le CSR. Voici pourquoi
            c&apos;est parfait :
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">→</span>
              <span>
                Le chat doit être <strong>interactif en temps réel</strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">→</span>
              <span>
                Les réponses IA arrivent <strong>token par token</strong>{" "}
                (streaming)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">→</span>
              <span>
                Pas besoin de SEO (contenu privé, conversation personnelle)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">→</span>
              <span>L&apos;état (messages, loading) change constamment</span>
            </div>
          </div>
        </Card>

        {/* Résumé en une phrase */}
        <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-300 dark:border-blue-700">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">📝 Résumé en une phrase</h2>
            <p className="text-lg text-muted-foreground">
              <strong>CSR</strong> = Le serveur envoie une page vide,{" "}
              <strong>
                c&apos;est ton navigateur qui fait tout le travail
              </strong>{" "}
              pour créer le contenu.
            </p>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
