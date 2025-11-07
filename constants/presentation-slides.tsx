import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
  notes?: string; // Notes pour le présentateur
}

export const presentationSlides: Slide[] = [
  {
    id: "intro",
    title: "Présentation et tour de table",
    content: (
      <div className="space-y-6">
        <div className="text-3xl font-bold text-center mb-8">
          🎓 Formation React & Next.js
        </div>
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">
            Master - 3 jours de formation pratique
          </p>
          <iframe
            src="https://giphy.com/embed/3ornk57KwDXf81rjWM"
            width="480"
            height="259"
            allowFullScreen
            className="mx-auto rounded-lg"
          />
        </div>
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold mb-2">👋 Tour de table</p>
          <p className="text-muted-foreground">
            Prénom • Expérience en dev • Attentes de la formation
          </p>
        </div>
      </div>
    ),
    notes:
      "Prendre 10-15 min pour le tour de table. Noter les niveaux pour adapter le rythme.",
  },
  {
    id: "react-history",
    title: "Pourquoi React a été créé ?",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Pourquoi React a été créé ?
        </div>
        <div className="space-y-4 text-lg">
          <p>
            Vers <strong>2010-2012</strong>, les développeurs utilisaient
            principalement <strong>jQuery</strong> pour manipuler le DOM.
          </p>
          <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border-l-4 border-red-500">
            <p className="font-semibold mb-2">Problème 👉</p>
            <p>
              Les pages web devenaient de plus en plus{" "}
              <strong>dynamiques et complexes</strong> mais le DOM du navigateur
              était <strong>lent</strong> et{" "}
              <strong>difficile à maintenir</strong>.
            </p>
          </div>
          <p>
            Facebook avait justement ce problème avec sa{" "}
            <strong>boîte de commentaires en temps réel</strong> et son{" "}
            <strong>fil d&apos;actualité</strong> 👉 Chaque petite mise à jour
            devait être rendue sans recharger toute la page, ça devenait
            ingérable.
          </p>
          <p>
            <strong>Jordan Walke</strong>, ingénieur de chez{" "}
            <strong>Facebook</strong> a créé React en <strong>2011</strong> en
            interne et l&apos;a <strong>open-sourcé en 2013</strong>
          </p>
        </div>
      </div>
    ),
    notes:
      "Insister sur le problème avant la solution. Montrer pourquoi jQuery était insuffisant.",
  },
  {
    id: "code-comparison",
    title: "jQuery vs React : La différence",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          jQuery vs React : Exemple concret
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-red-50 dark:bg-red-950 border-l-4 border-red-500">
            <h3 className="text-xl font-bold mb-4 text-red-700 dark:text-red-300">
              ❌ Avec jQuery (2010)
            </h3>
            <pre className="bg-white dark:bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`// HTML
<button id="btn">
  Compteur: <span id="count">0</span>
</button>

// JavaScript
let count = 0;
$('#btn').click(function() {
  count++;
  $('#count').text(count);
  
  // Et si on veut changer
  // la couleur aussi ?
  if (count > 5) {
    $('#btn').css('color', 'red');
  }
  
  // Ça devient vite le chaos ! 😱
});`}</code>
            </pre>
          </Card>
          <Card className="p-6 bg-green-50 dark:bg-green-950 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">
              ✅ Avec React (moderne)
            </h3>
            <pre className="bg-white dark:bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button 
      onClick={() => setCount(count + 1)}
      style={{
        color: count > 5 ? 'red' : 'black'
      }}
    >
      Compteur: {count}
    </button>
  );
}

// Simple, lisible, maintenable ! ✨`}</code>
            </pre>
          </Card>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="font-semibold mb-2">💡 La différence clé :</p>
          <p>
            jQuery : Tu <strong>manipules le DOM manuellement</strong>
            <br />
            React : Tu <strong>déclares ce que tu veux afficher</strong>, React
            s&apos;occupe du reste !
          </p>
        </div>
      </div>
    ),
    notes:
      "Prendre le temps d'expliquer ligne par ligne. C'est le déclic pour comprendre React.",
  },
  {
    id: "react-innovations",
    title: "Les innovations de React",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Les 3 innovations majeures de React
        </div>
        <div className="space-y-6">
          <Card className="p-6 bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">1️⃣</span> Virtual DOM
            </h3>
            <p className="mb-4">
              Au lieu de modifier directement le DOM (lent), React utilise un
              Virtual DOM : une représentation en mémoire de l&apos;interface.
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg space-y-3">
              <p className="font-semibold text-purple-700 dark:text-purple-300">
                Le processus :
              </p>
              <div className="space-y-2 ml-4">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-600">1.</span>
                  <p>L&apos;état change (ex: clic sur un bouton)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-600">2.</span>
                  <p>React crée une nouvelle version du Virtual DOM</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-600">3.</span>
                  <p>
                    Il compare (diff) l&apos;ancien et le nouveau Virtual DOM
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-600">4.</span>
                  <p>
                    Il met à jour <strong>uniquement</strong> les parties qui
                    ont changé dans le vrai DOM
                  </p>
                </div>
              </div>
              <p className="mt-3 text-green-600 dark:text-green-400 font-semibold">
                ⚡ Résultat : Performances optimales !
              </p>
            </div>
          </Card>
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">2️⃣</span> Architecture en composants
            </h3>
            <p className="mb-2">
              L&apos;interface = arborescence de composants réutilisables et
              indépendants
            </p>
            <pre className="bg-white dark:bg-slate-900 p-3 rounded text-xs overflow-x-auto">
              <code>{`<App>
  <Header />
  <Main>
    <Sidebar />
    <Content>
      <ArticleList>
        <Article />
        <Article />
      </ArticleList>
    </Content>
  </Main>
  <Footer />
</App>`}</code>
            </pre>
          </Card>
          <Card className="p-6 bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">3️⃣</span> JSX - JavaScript + XML
            </h3>
            <p>
              Syntaxe qui mélange HTML et JavaScript pour écrire des composants
              de manière intuitive
            </p>
            <pre className="bg-white dark:bg-slate-900 p-3 rounded text-sm overflow-x-auto mt-3">
              <code>{`const name = "John";
const element = <h1>Bonjour {name} !</h1>;`}</code>
            </pre>
          </Card>
        </div>
      </div>
    ),
    notes: "Expliquer le Virtual DOM avec un schéma au tableau si possible.",
  },
  {
    id: "react-today",
    title: "React aujourd'hui",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          React aujourd&apos;hui en 2024-2025
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <div className="text-4xl mb-3">📊</div>
            <p className="text-lg font-semibold mb-2">
              #1 des bibliothèques front-end
            </p>
            <p className="text-sm text-muted-foreground">
              Utilisé par Facebook, Netflix, Airbnb, Uber, Discord...
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <div className="text-4xl mb-3">💼</div>
            <p className="text-lg font-semibold mb-2">
              Très demandé sur le marché
            </p>
            <p className="text-sm text-muted-foreground">
              Compétence clé pour les développeurs front-end
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <div className="text-4xl mb-3">🚀</div>
            <p className="text-lg font-semibold mb-2">
              Base de nombreux frameworks
            </p>
            <p className="text-sm text-muted-foreground">
              Next.js, Remix, Gatsby, Expo (React Native)...
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
            <div className="text-4xl mb-3">🎨</div>
            <p className="text-lg font-semibold mb-2">
              Modèle pour d&apos;autres technos
            </p>
            <p className="text-sm text-muted-foreground">
              Vue, Svelte, Solid s&apos;inspirent de React
            </p>
          </Card>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-l-4 border-blue-500 mt-6">
          <p className="font-semibold mb-2">🔑 Pourquoi apprendre React ?</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Écosystème riche et mature</li>
            <li>Grande communauté et nombreuses ressources</li>
            <li>Compétences transférables vers d&apos;autres frameworks</li>
            <li>Évolution constante avec rétrocompatibilité</li>
          </ul>
        </div>
      </div>
    ),
    notes:
      "Rassurer sur le fait que React est une valeur sûre pour leur carrière.",
  },
  {
    id: "create-react-app",
    title: "Comment créer une app React ?",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Comment créer une application React ?
        </div>
        <div className="space-y-4">
          <p className="text-lg text-center">
            Sur la{" "}
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              documentation officielle de React
            </a>
            , il y a <strong>5 façons recommandées</strong> :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-r from-black to-gray-800 text-white">
              <p className="font-semibold text-lg">1. Next.js ⭐</p>
              <p className="text-sm text-gray-300 mt-1">
                Framework full-stack recommandé
              </p>
            </Card>
            <Card className="p-4 bg-blue-50 dark:bg-blue-950">
              <p className="font-semibold text-lg">2. React Router</p>
              <p className="text-sm text-muted-foreground mt-1">
                Pour les SPAs avec routing
              </p>
            </Card>
            <Card className="p-4 bg-purple-50 dark:bg-purple-950">
              <p className="font-semibold text-lg">3. Expo</p>
              <p className="text-sm text-muted-foreground mt-1">
                React Native pour le mobile
              </p>
            </Card>
            <Card className="p-4 bg-orange-50 dark:bg-orange-950">
              <p className="font-semibold text-lg">4. TanStack Start</p>
              <p className="text-sm text-muted-foreground mt-1">
                Nouveau framework (bêta)
              </p>
            </Card>
            <Card className="p-4 bg-red-50 dark:bg-red-950">
              <p className="font-semibold text-lg">5. Redwood</p>
              <p className="text-sm text-muted-foreground mt-1">
                Framework full-stack opinionated
              </p>
            </Card>
            <Card className="p-4 bg-green-50 dark:bg-green-950">
              <p className="font-semibold text-lg">6. Vite + React</p>
              <p className="text-sm text-muted-foreground mt-1">
                Setup from scratch (plus de contrôle)
              </p>
            </Card>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border-l-4 border-blue-500 mt-6">
            <p className="font-semibold mb-2 text-lg">
              🏆 Pourquoi Next.js est recommandé en premier ?
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                Exploite les <strong>dernières fonctionnalités de React</strong>{" "}
                (Server Components)
              </li>
              <li>
                <strong>SEO optimisé</strong> par défaut
              </li>
              <li>
                <strong>Performance</strong> excellente out-of-the-box
              </li>
              <li>Routing file-based simple et intuitif</li>
              <li>Déploiement facilité (Vercel)</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    notes:
      "Expliquer qu'on va se concentrer sur Next.js car c'est le standard actuel.",
  },
  {
    id: "nextjs-why",
    title: "Pourquoi Next.js ?",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Pourquoi Next.js a été créé ?
        </div>
        <div className="space-y-5">
          <div className="text-center">
            <p className="text-lg mb-2">
              Next.js a été créé en <strong>2016</strong> par{" "}
              <strong>Vercel</strong>
            </p>
          </div>
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-3">🎯 Objectifs principaux</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Simplifier la création d&apos;applications React</li>
              <li>Résoudre les problématiques de référencement SEO</li>
              <li>
                Améliorer les performances et l&apos;expérience utilisateur
              </li>
              <li>Offrir une solution full-stack avec API routes</li>
            </ul>
          </Card>
          <div className="bg-yellow-50 dark:bg-yellow-950 p-5 rounded-lg border-l-4 border-yellow-500">
            <p className="font-semibold mb-3">⚠️ Le problème de React seul :</p>
            <p className="mb-3">
              React (seul) ne supportait pas nativement le{" "}
              <strong>Server-Side Rendering (SSR)</strong> ni la{" "}
              <strong>Static Site Generation (SSG)</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              Ces fonctionnalités étaient pourtant indispensables pour le SEO et
              les performances.
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-950 p-5 rounded-lg border-l-4 border-red-500">
            <p className="font-semibold mb-3">🔴 Impact SEO :</p>
            <div className="space-y-3">
              <p>
                Sans Next.js, les robots des moteurs de recherche (Google,
                Bing...) voyaient une <strong>page blanche</strong> 😱
              </p>
              <p className="text-sm">
                Pourquoi ? Le HTML était généré côté client par JavaScript, donc
                les robots ne pouvaient pas indexer le contenu.
              </p>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-5 rounded-lg border-l-4 border-green-500">
            <p className="font-semibold mb-3">✅ La solution Next.js :</p>
            <p>
              Next.js génère le HTML <strong>côté serveur</strong> ou{" "}
              <strong>au build</strong>, puis l&apos;envoie au client avec le
              JavaScript pour l&apos;interactivité.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Résultat : SEO parfait + Performance optimale + Expérience fluide
            </p>
          </div>
        </div>
      </div>
    ),
    notes: "Bien faire comprendre le problème avant de présenter la solution.",
  },
  {
    id: "rendering-modes",
    title: "CSR, SSR, SSG et ISR",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Les 4 modes de rendu de Next.js
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500">
            <Badge className="mb-3 bg-blue-600">CSR</Badge>
            <h3 className="font-bold text-lg mb-2">Client-Side Rendering</h3>
            <p className="mb-3 text-sm">
              Le HTML est généré <strong>dans le navigateur</strong> après le
              chargement du JavaScript.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-xs space-y-1">
              <p className="font-semibold text-blue-600">
                📦 Cas d&apos;usage :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Dashboard privé (admin)</li>
                <li>Application interne</li>
                <li>Pas besoin de SEO</li>
              </ul>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-600">✅ Interactivité rapide</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-red-600">❌ Mauvais pour le SEO</span>
            </div>
          </Card>

          <Card className="p-6 bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500">
            <Badge className="mb-3 bg-purple-600">SSR</Badge>
            <h3 className="font-bold text-lg mb-2">Server-Side Rendering</h3>
            <p className="mb-3 text-sm">
              Le HTML est généré <strong>sur le serveur</strong> à chaque
              requête.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-xs space-y-1">
              <p className="font-semibold text-purple-600">
                📦 Cas d&apos;usage :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>E-commerce (prix dynamiques)</li>
                <li>Réseaux sociaux (feed personnalisé)</li>
                <li>Données temps réel</li>
              </ul>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-600">✅ SEO parfait</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-600">
                ✅ Données toujours fraîches
              </span>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 dark:bg-green-950 border-l-4 border-green-500">
            <Badge className="mb-3 bg-green-600">SSG</Badge>
            <h3 className="font-bold text-lg mb-2">Static Site Generation</h3>
            <p className="mb-3 text-sm">
              Le HTML est généré <strong>une fois au build</strong>, puis servi
              statiquement (CDN).
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-xs space-y-1">
              <p className="font-semibold text-green-600">
                📦 Cas d&apos;usage :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Blog / Articles</li>
                <li>Documentation</li>
                <li>Landing pages</li>
                <li>Contenu rarement modifié</li>
              </ul>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-600">✅ Performance maximale</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-600">✅ SEO parfait</span>
            </div>
          </Card>

          <Card className="p-6 bg-orange-50 dark:bg-orange-950 border-l-4 border-orange-500">
            <Badge className="mb-3 bg-orange-600">ISR</Badge>
            <h3 className="font-bold text-lg mb-2">
              Incremental Static Regeneration
            </h3>
            <p className="mb-3 text-sm">
              Comme SSG, mais avec <strong>régénération en arrière-plan</strong>{" "}
              après un délai.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-xs space-y-1">
              <p className="font-semibold text-orange-600">
                📦 Cas d&apos;usage :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Articles de presse</li>
                <li>Catalogue produits</li>
                <li>Contenu semi-dynamique</li>
              </ul>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-600">✅ Performance + Fraîcheur</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-600">✅ SEO parfait</span>
            </div>
          </Card>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border-l-4 border-green-500">
          <p className="font-semibold mb-3 text-lg">🎯 En résumé :</p>
          <div className="space-y-2">
            <p>
              <strong>Pour le SEO :</strong> SSG, ISR ou SSR ✅
            </p>
            <p>
              <strong>Pour les apps privées :</strong> CSR (dashboard, admin)
            </p>
            <p>
              <strong>Le plus rapide :</strong> SSG (servi depuis un CDN)
            </p>
            <p>
              <strong>Le plus flexible :</strong> ISR (best of both worlds)
            </p>
          </div>
        </div>
      </div>
    ),
    notes:
      "Prendre des exemples concrets de sites qu'ils connaissent pour chaque mode.",
  },
  {
    id: "nextjs-versions",
    title: "Versions de Next.js",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          L&apos;évolution de Next.js
        </div>
        <div className="space-y-6">
          <Card className="p-6 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📜</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">
                  Anciennes versions (v12 et avant)
                </h3>
                <div className="space-y-2">
                  <p className="font-semibold text-yellow-700 dark:text-yellow-300">
                    Pages Router
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>
                      Composants <strong>Client par défaut</strong>
                    </li>
                    <li>
                      Fichiers dans le dossier <code>/pages</code>
                    </li>
                    <li>
                      API avec <code>getServerSideProps</code>,{" "}
                      <code>getStaticProps</code>
                    </li>
                    <li>Encore utilisé dans de nombreux projets legacy</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 dark:bg-green-950 border-l-4 border-green-500">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🚀</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">
                  Versions modernes (v13+)
                </h3>
                <div className="space-y-3">
                  <p className="font-semibold text-green-700 dark:text-green-300">
                    App Router (la nouvelle approche)
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>
                      Composants <strong>Serveur par défaut</strong>
                    </li>
                    <li>
                      Fichiers dans le dossier <code>/app</code>
                    </li>
                    <li>React Server Components (RSC)</li>
                    <li>Streaming et Suspense natifs</li>
                    <li>Layouts imbriqués</li>
                    <li>Meilleure performance et SEO par défaut</li>
                  </ul>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded mt-3">
                    <p className="text-xs font-semibold mb-2">
                      💡 Version actuelle :
                    </p>
                    <p className="text-sm">
                      Next.js <strong>16</strong> (octobre 2025) avec React 19
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg border-l-4 border-red-500">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <p className="font-semibold mb-2">Attention importante !</p>
                <p className="mb-3">
                  Sur la documentation et dans les tutoriels en ligne, vérifiez
                  toujours que vous êtes bien en <strong>App Router</strong> et
                  pas en Pages Router.
                </p>
                <p className="text-sm text-muted-foreground">
                  La syntaxe et les concepts sont différents entre les deux !
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-5 rounded-lg border-l-4 border-blue-500">
            <p className="font-semibold mb-2">
              🎯 Dans cette formation, nous utilisons :
            </p>
            <div className="flex items-center gap-3 text-lg">
              <Badge className="bg-blue-600 text-white">Next.js 16</Badge>
              <span>+</span>
              <Badge className="bg-purple-600 text-white">App Router</Badge>
              <span>+</span>
              <Badge className="bg-indigo-600 text-white">TypeScript</Badge>
            </div>
          </div>
        </div>
      </div>
    ),
    notes: "Insister sur le fait qu'on va utiliser l'App Router moderne.",
  },
  {
    id: "server-vs-client",
    title: "Server Components vs Client Components",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Server Components vs Client Components
        </div>
        <div className="bg-purple-50 dark:bg-purple-950 p-5 rounded-lg border-l-4 border-purple-500 mb-6">
          <p className="font-semibold mb-2">
            🆕 Nouveauté majeure de Next.js 13+ !
          </p>
          <p>
            Avec l&apos;App Router, tous les composants sont{" "}
            <strong>Server Components par défaut</strong>. C&apos;est une
            révolution dans la façon de penser React !
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🖥️</div>
              <h3 className="text-xl font-bold">Server Components</h3>
            </div>
            <Badge className="mb-3 bg-blue-600">Par défaut</Badge>
            <div className="space-y-3 text-sm">
              <p className="font-semibold">Caractéristiques :</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>S&apos;exécutent sur le serveur</li>
                <li>Peuvent faire des requêtes DB directement</li>
                <li>N&apos;envoient pas de JS au client</li>
                <li>Pas d&apos;interactivité (pas de hooks)</li>
              </ul>
              <div className="bg-white dark:bg-slate-900 p-3 rounded mt-3">
                <p className="font-mono text-xs">
                  <span className="text-gray-500">{"// Pas de directive"}</span>
                  <br />
                  <span className="text-blue-600">async function</span> Page()
                  {"{"}
                  <br />
                  <span className="ml-4">
                    <span className="text-purple-600">const</span> data ={" "}
                    <span className="text-blue-600">await</span> fetch(...)
                  </span>
                  <br />
                  <span className="ml-4">
                    <span className="text-blue-600">return</span>{" "}
                    <span className="text-green-600">&lt;div&gt;</span>
                    {"{data}"}
                    <span className="text-green-600">&lt;/div&gt;</span>
                  </span>
                  <br />
                  {"}"}
                </p>
              </div>
              <p className="text-green-600 font-semibold mt-3">
                ✅ Quand l&apos;utiliser :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Fetch de données</li>
                <li>Contenu statique</li>
                <li>SEO important</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6 bg-orange-50 dark:bg-orange-950 border-l-4 border-orange-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">💻</div>
              <h3 className="text-xl font-bold">Client Components</h3>
            </div>
            <Badge className="mb-3 bg-orange-600">&quot;use client&quot;</Badge>
            <div className="space-y-3 text-sm">
              <p className="font-semibold">Caractéristiques :</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>S&apos;exécutent dans le navigateur</li>
                <li>Peuvent utiliser les hooks React</li>
                <li>Gèrent l&apos;interactivité</li>
                <li>Envoient du JS au client</li>
              </ul>
              <div className="bg-white dark:bg-slate-900 p-3 rounded mt-3">
                <p className="font-mono text-xs">
                  <span className="text-green-600">&quot;use client&quot;</span>
                  <br />
                  <br />
                  <span className="text-blue-600">function</span> Counter()
                  {"{"}
                  <br />
                  <span className="ml-4">
                    <span className="text-purple-600">const</span> [count, set]
                    = useState(0)
                  </span>
                  <br />
                  <span className="ml-4">
                    <span className="text-blue-600">return</span>{" "}
                    <span className="text-green-600">&lt;button</span>{" "}
                    onClick=...
                  </span>
                  <br />
                  {"}"}
                </p>
              </div>
              <p className="text-green-600 font-semibold mt-3">
                ✅ Quand l&apos;utiliser :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Interactivité (clicks, forms)</li>
                <li>useState, useEffect, etc.</li>
                <li>Event listeners</li>
                <li>Browser APIs</li>
              </ul>
            </div>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 p-6 rounded-lg border-l-4 border-amber-500">
          <p className="font-semibold mb-3 text-lg">🎯 Règle d&apos;or :</p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>1.</strong> Par défaut, gardez tout en Server Component
            </p>
            <p>
              <strong>2.</strong> Ajoutez <code>&quot;use client&quot;</code>{" "}
              UNIQUEMENT quand vous avez besoin de :
            </p>
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>
                Hooks React (<code>useState</code>, <code>useEffect</code>...)
              </li>
              <li>
                Event handlers (<code>onClick</code>, <code>onChange</code>...)
              </li>
              <li>
                Browser APIs (<code>localStorage</code>, <code>window</code>...)
              </li>
            </ul>
            <p className="mt-3 text-green-600 font-semibold">
              ⚡ Résultat : Moins de JS envoyé au client = App plus rapide !
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-5 rounded-lg border-l-4 border-blue-500">
          <p className="font-semibold mb-2">💡 Conseil pratique :</p>
          <p className="text-sm">
            Créez des composants clients <strong>petits et ciblés</strong>.
            N&apos;ajoutez pas <code>&quot;use client&quot;</code> sur une page
            entière si seul un bouton a besoin d&apos;interactivité !
          </p>
        </div>
      </div>
    ),
    notes:
      "C'est LE concept clé à comprendre. Prendre le temps d'expliquer avec des exemples.",
  },
  {
    id: "data-fetching",
    title: "Récupération de données dans Next.js",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Comment récupérer des données ?
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-4">
              🖥️ Dans un Server Component
            </h3>
            <pre className="bg-white dark:bg-slate-900 p-4 rounded-lg overflow-x-auto text-xs">
              <code>{`async function Page() {
  // Fetch direct, pas besoin d'useEffect !
  const res = await fetch('https://api.com/data', {
    cache: 'force-cache' // SSG
    // ou
    cache: 'no-store' // SSR
    // ou
    next: { revalidate: 60 } // ISR (60s)
  });
  
  const data = await res.json();
  
  return <div>{data.title}</div>;
}`}</code>
            </pre>
            <div className="mt-3 bg-white dark:bg-slate-900 p-3 rounded text-xs">
              <p className="font-semibold text-green-600 mb-2">
                ✅ Avantages :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Pas de loading spinner</li>
                <li>SEO parfait</li>
                <li>Données au premier rendu</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6 bg-orange-50 dark:bg-orange-950 border-l-4 border-orange-500">
            <h3 className="text-xl font-bold mb-4">
              💻 Dans un Client Component
            </h3>
            <pre className="bg-white dark:bg-slate-900 p-4 rounded-lg overflow-x-auto text-xs">
              <code>{`"use client";
import { useState, useEffect } from 'react';

function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  if (!data) return <div>Loading...</div>;
  
  return <div>{data.title}</div>;
}`}</code>
            </pre>
            <div className="mt-3 bg-white dark:bg-slate-900 p-3 rounded text-xs">
              <p className="font-semibold text-orange-600 mb-2">
                ⚠️ Quand l&apos;utiliser :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Fetch basé sur une action utilisateur</li>
                <li>Données temps réel (WebSocket)</li>
                <li>Polling / actualisation</li>
              </ul>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500">
          <h3 className="text-xl font-bold mb-4">🚀 Server Actions (Bonus)</h3>
          <p className="mb-3 text-sm">
            Nouvelle façon de gérer les mutations de données (POST, PUT, DELETE)
          </p>
          <pre className="bg-white dark:bg-slate-900 p-4 rounded-lg overflow-x-auto text-xs">
            <code>{`// app/actions.ts
"use server";

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts'); // Rafraîchit la page
}

// app/page.tsx
import { createPost } from './actions';

export default function Page() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Créer</button>
    </form>
  );
}`}</code>
          </pre>
          <div className="mt-3 bg-white dark:bg-slate-900 p-3 rounded text-xs">
            <p className="font-semibold text-purple-600 mb-2">💡 Avantages :</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Pas besoin de créer des API routes</li>
              <li>Fonctionne sans JavaScript (progressive enhancement)</li>
              <li>Type-safe avec TypeScript</li>
            </ul>
          </div>
        </Card>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border-l-4 border-green-500">
          <p className="font-semibold mb-3 text-lg">🎯 Best Practices :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-green-600 mb-2">✅ À faire :</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Fetch dans Server Components quand possible</li>
                <li>
                  Utiliser le cache de Next.js (<code>revalidate</code>)
                </li>
                <li>Gérer les erreurs avec error boundaries</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-600 mb-2">❌ À éviter :</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  Fetch dans <code>useEffect</code> si pas nécessaire
                </li>
                <li>Oublier de gérer les états de loading</li>
                <li>Ne pas utiliser le cache (appels répétés)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    notes: "Montrer des exemples en live si possible. C'est très concret.",
  },
  {
    id: "structure",
    title: "Structure de fichiers Next.js",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Structure de fichiers / dossiers (App Router)
        </div>
        <div className="space-y-4">
          <Card className="p-5 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500">
            <div className="font-mono text-sm space-y-2">
              <div className="font-bold text-blue-700 dark:text-blue-300 mb-3 text-base flex items-center gap-2">
                📁 app/{" "}
                <Badge className="ml-2 bg-blue-600">Dossier principal</Badge>
              </div>
              <div className="ml-4 space-y-2">
                <div className="p-2 bg-white dark:bg-slate-900 rounded">
                  <span className="text-green-600 font-semibold">
                    📄 page.tsx
                  </span>
                  <span className="text-muted-foreground ml-3">
                    → Route accessible (ex: <code>/</code>)
                  </span>
                  <div className="text-xs text-muted-foreground ml-6 mt-1">
                    C&apos;est ici que vous créez vos pages !
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded">
                  <span className="text-purple-600 font-semibold">
                    📄 layout.tsx
                  </span>
                  <span className="text-muted-foreground ml-3">
                    → Layout partagé (persiste entre pages)
                  </span>
                  <div className="text-xs text-muted-foreground ml-6 mt-1">
                    Pour header, footer, navigation...
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded">
                  <span className="text-amber-600 font-semibold">
                    📄 loading.tsx
                  </span>
                  <span className="text-muted-foreground ml-3">
                    → UI de chargement (Suspense)
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded">
                  <span className="text-red-600 font-semibold">
                    📄 error.tsx
                  </span>
                  <span className="text-muted-foreground ml-3">
                    → UI d&apos;erreur (Error Boundary)
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded">
                  <span className="text-gray-600 font-semibold">
                    📄 not-found.tsx
                  </span>
                  <span className="text-muted-foreground ml-3">→ Page 404</span>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded mb-2">
                    <span className="font-semibold">📁 about/</span>
                    <span className="text-muted-foreground ml-3">
                      → Route <code>/about</code>
                    </span>
                  </div>
                  <div className="ml-4 p-2 bg-white dark:bg-slate-900 rounded">
                    <span className="text-green-600">📄 page.tsx</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded mb-2">
                    <span className="font-semibold">📁 blog/[slug]/</span>
                    <span className="text-muted-foreground ml-3">
                      → Route dynamique <code>/blog/mon-article</code>
                    </span>
                  </div>
                  <div className="ml-4 p-2 bg-white dark:bg-slate-900 rounded text-xs">
                    <code className="text-purple-600">[slug]</code> = paramètre
                    dynamique
                  </div>
                </div>
                <div className="mt-2">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded mb-2">
                    <span className="font-semibold">📁 api/</span>
                    <span className="text-muted-foreground ml-3">
                      → API Routes
                    </span>
                  </div>
                  <div className="ml-4 space-y-1">
                    <div className="p-2 bg-white dark:bg-slate-900 rounded text-xs">
                      <span className="text-blue-600">📄 route.ts</span>
                      <span className="text-muted-foreground ml-2">
                        → GET, POST, etc.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded">
                    <span className="font-semibold">📁 (dashboard)/</span>
                    <span className="text-muted-foreground ml-3">
                      → Route Group (n&apos;affecte pas l&apos;URL)
                    </span>
                    <div className="text-xs text-muted-foreground ml-6 mt-1">
                      Pour organiser sans créer de segment d&apos;URL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500">
            <div className="font-mono text-sm space-y-2">
              <div className="font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                📁 public/{" "}
                <Badge className="ml-2 bg-purple-600">Fichiers statiques</Badge>
              </div>
              <div className="ml-4 text-muted-foreground text-xs">
                Images, fonts, fichiers accessibles via{" "}
                <code>/nom-fichier</code>
                <div className="mt-2 p-2 bg-white dark:bg-slate-900 rounded">
                  <div>
                    📄 logo.png → accessible via <code>/logo.png</code>
                  </div>
                  <div className="mt-1">📄 favicon.ico</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Card className="p-3 bg-slate-50 dark:bg-slate-900">
              <div className="font-mono text-xs">
                <div className="font-bold mb-1">📄 package.json</div>
                <div className="text-muted-foreground">
                  Dépendances npm & scripts
                </div>
              </div>
            </Card>
            <Card className="p-3 bg-slate-50 dark:bg-slate-900">
              <div className="font-mono text-xs">
                <div className="font-bold mb-1">📄 next.config.js</div>
                <div className="text-muted-foreground">
                  Configuration Next.js
                </div>
              </div>
            </Card>
            <Card className="p-3 bg-slate-50 dark:bg-slate-900">
              <div className="font-mono text-xs">
                <div className="font-bold mb-1">📄 tsconfig.json</div>
                <div className="text-muted-foreground">
                  Configuration TypeScript
                </div>
              </div>
            </Card>
            <Card className="p-3 bg-slate-50 dark:bg-slate-900">
              <div className="font-mono text-xs">
                <div className="font-bold mb-1">📄 .env.local</div>
                <div className="text-muted-foreground">
                  Variables d&apos;environnement
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 p-5 rounded-lg border-l-4 border-amber-500 mt-4">
            <p className="font-semibold mb-4 text-lg">
              💡 Fichiers spéciaux : layout vs template
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded border-2 border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                  📄 layout.tsx
                  <Badge className="bg-blue-600">Recommandé</Badge>
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>
                    <strong>Persiste</strong> entre les navigations
                  </li>
                  <li>
                    <strong>Conserve l&apos;état</strong> (pas de re-render)
                  </li>
                  <li>Ne se réinstancie pas</li>
                  <li>
                    <strong>Parfait pour :</strong> header, nav, footer, sidebar
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded border-2 border-green-200 dark:border-green-800">
                <p className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                  📄 template.tsx
                  <Badge className="bg-green-600">Cas spécifiques</Badge>
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>
                    <strong>Se réinstancie</strong> à chaque navigation
                  </li>
                  <li>Recrée tous les composants enfants</li>
                  <li>État remis à zéro</li>
                  <li>
                    <strong>Utile pour :</strong> animations page, analytics
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950 p-5 rounded-lg border-l-4 border-green-500">
            <p className="font-semibold mb-3 text-lg">🎯 Points clés :</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>
                <strong>page.tsx</strong> = crée une route accessible
              </li>
              <li>
                <strong>[slug]</strong> = route dynamique (paramètre)
              </li>
              <li>
                <strong>(folder)</strong> = route group (organisation
                uniquement)
              </li>
              <li>
                <strong>loading.tsx</strong> = affichage pendant le chargement
                (Suspense automatique)
              </li>
              <li>
                <strong>error.tsx</strong> = gestion des erreurs (Error Boundary
                automatique)
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    notes:
      "Montrer la structure dans VS Code en live pour que ce soit concret.",
  },
  {
    id: "pratical-example",
    title: "Exemple pratique",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          🛠️ Mini exercice pratique guidé
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border-l-4 border-blue-500">
          <p className="font-semibold mb-3 text-lg">
            Avant de commencer le projet, faisons un petit exercice ensemble !
          </p>
          <p className="text-sm text-muted-foreground">
            Durée estimée : 10-15 minutes
          </p>
        </div>

        <div className="space-y-4">
          <Card className="p-6 bg-white dark:bg-slate-900">
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-600">Étape 1</Badge>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">
                  Créer une nouvelle page
                </h3>
                <p className="text-sm mb-3">
                  Dans <code>app/users/page.tsx</code>
                </p>
                <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto">
                  <code>{`export default function UsersPage() {
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
    </div>
  );
}`}</code>
                </pre>
                <p className="text-xs text-muted-foreground mt-2">
                  ✅ La page est accessible sur <code>/users</code>
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900">
            <div className="flex items-start gap-3">
              <Badge className="bg-purple-600">Étape 2</Badge>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">
                  Fetch de données (Server Component)
                </h3>
                <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto">
                  <code>{`async function UsersPage() {
  // Fetch côté serveur
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}</code>
                </pre>
                <p className="text-xs text-green-600 mt-2">
                  ✅ Pas besoin de useState ni useEffect !
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900">
            <div className="flex items-start gap-3">
              <Badge className="bg-orange-600">Étape 3</Badge>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">
                  Ajouter un composant interactif
                </h3>
                <p className="text-sm mb-3">
                  Créer <code>components/like-button.tsx</code>
                </p>
                <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto">
                  <code>{`"use client"; // ← Important !

import { useState } from 'react';

export function LikeButton() {
  const [likes, setLikes] = useState(0);
  
  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes} likes
    </button>
  );
}`}</code>
                </pre>
                <p className="text-xs text-muted-foreground mt-3 mb-2">
                  Puis l&apos;utiliser dans la page :
                </p>
                <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto">
                  <code>{`import { LikeButton } from '@/components/like-button';

async function UsersPage() {
  const res = await fetch('...');
  const users = await res.json();
  
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} <LikeButton />
          </li>
        ))}
      </ul>
    </div>
  );
}`}</code>
                </pre>
                <p className="text-xs text-green-600 mt-2">
                  ✅ Mix parfait : Server Component + Client Component !
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border-l-4 border-green-500">
          <p className="font-semibold mb-3 text-lg">
            🎯 Ce qu&apos;on a appris :
          </p>
          <ul className="space-y-2 text-sm list-disc list-inside">
            <li>Créer une page avec le routing file-based</li>
            <li>Faire un fetch dans un Server Component</li>
            <li>
              Créer un Client Component avec <code>&quot;use client&quot;</code>
            </li>
            <li>Combiner les deux approches</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-5 rounded-lg border-l-4 border-blue-500 text-center">
          <p className="font-semibold text-lg mb-2">
            🚀 Prêts pour le projet principal ?
          </p>
          <p className="text-sm text-muted-foreground">
            On va maintenant construire une vraie application avec IA !
          </p>
        </div>
      </div>
    ),
    notes:
      "Faire cet exercice en live coding avec les étudiants. C'est le moment clé !",
  },
  {
    id: "project",
    title: "Le Projet",
    content: (
      <div className="space-y-6">
        <div className="text-3xl font-bold text-center mb-8">
          🎨 Projet : Next.js Studio
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg border-l-4 border-purple-500">
          <p className="font-semibold mb-3 text-xl">
            Ce qu&apos;on va construire ensemble
          </p>
          <p className="text-lg mb-4">
            Une plateforme de <strong>génération de contenu par IA</strong> avec
            différents types de rendus Next.js
          </p>
          <div className="flex items-center justify-center gap-3">
            <Badge className="text-lg py-2 px-4 bg-blue-600">React 19</Badge>
            <span className="text-2xl">+</span>
            <Badge className="text-lg py-2 px-4 bg-green-600">Next.js 16</Badge>
            <span className="text-2xl">+</span>
            <Badge className="text-lg py-2 px-4 bg-purple-600">
              TypeScript
            </Badge>
            <span className="text-2xl">+</span>
            <Badge className="text-lg py-2 px-4 bg-pink-600">IA</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500">
            <div className="text-3xl mb-3">🏠</div>
            <h3 className="font-bold text-lg mb-2">
              Page d&apos;accueil (SSG)
            </h3>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Landing page statique</li>
              <li>Présentation du projet</li>
              <li>Navigation vers les features</li>
            </ul>
          </Card>

          <Card className="p-6 bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500">
            <div className="text-3xl mb-3">✍️</div>
            <h3 className="font-bold text-lg mb-2">
              Générateur de texte (SSR)
            </h3>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Formulaire avec IA générative</li>
              <li>Génération côté serveur</li>
              <li>Historique des générations</li>
            </ul>
          </Card>

          <Card className="p-6 bg-green-50 dark:bg-green-950 border-l-4 border-green-500">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-bold text-lg mb-2">Blog (ISR)</h3>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Articles avec régénération</li>
              <li>Routes dynamiques</li>
              <li>Markdown to HTML</li>
            </ul>
          </Card>

          <Card className="p-6 bg-orange-50 dark:bg-orange-950 border-l-4 border-orange-500">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-bold text-lg mb-2">Chat IA (CSR)</h3>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Interface conversationnelle</li>
              <li>Streaming de réponses</li>
              <li>État local temps réel</li>
            </ul>
          </Card>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded-lg border-l-4 border-amber-500">
          <p className="font-semibold mb-3 text-lg">🛠️ Technologies & Outils</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-sm">
              <span className="font-semibold">Next.js 16</span>
              <p className="text-xs text-muted-foreground">App Router</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-sm">
              <span className="font-semibold">TypeScript</span>
              <p className="text-xs text-muted-foreground">Type safety</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-sm">
              <span className="font-semibold">Tailwind CSS</span>
              <p className="text-xs text-muted-foreground">Styling</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-sm">
              <span className="font-semibold">shadcn/ui</span>
              <p className="text-xs text-muted-foreground">Components</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-sm">
              <span className="font-semibold">OpenAI API</span>
              <p className="text-xs text-muted-foreground">IA générative</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 rounded text-sm">
              <span className="font-semibold">Vercel</span>
              <p className="text-xs text-muted-foreground">Déploiement</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border-l-4 border-green-500">
          <p className="font-semibold mb-3 text-lg">📅 Planning sur 3 jours</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-600">Jour 1</Badge>
              <div className="flex-1 text-sm">
                <p className="font-semibold">Setup + Théorie + Home (SSG)</p>
                <p className="text-muted-foreground text-xs">
                  Installation, configuration, première page statique
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-purple-600">Jour 2</Badge>
              <div className="flex-1 text-sm">
                <p className="font-semibold">Générateur (SSR) + Blog (ISR)</p>
                <p className="text-muted-foreground text-xs">
                  Intégration IA, routes dynamiques, data fetching
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-orange-600">Jour 3</Badge>
              <div className="flex-1 text-sm">
                <p className="font-semibold">Chat (CSR) + Déploiement</p>
                <p className="text-muted-foreground text-xs">
                  Interactivité avancée, optimisations, mise en ligne
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-l-4 border-blue-500">
          <p className="font-semibold mb-3 text-lg">
            🎯 Ce que vous allez apprendre
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <ul className="space-y-1 list-disc list-inside">
              <li>Maîtriser les 4 modes de rendu</li>
              <li>Server vs Client Components</li>
              <li>Data fetching moderne</li>
              <li>Routes dynamiques</li>
            </ul>
            <ul className="space-y-1 list-disc list-inside">
              <li>Intégration d&apos;APIs externes</li>
              <li>TypeScript avec Next.js</li>
              <li>Optimisation des performances</li>
              <li>Déploiement production</li>
            </ul>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-8 rounded-lg">
          <p className="font-semibold text-xl mb-3">👉 Démo du projet final</p>
          <a
            href="https://nextjs-studio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Voir la démo →
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            C&apos;est ce qu&apos;on va construire ensemble !
          </p>
        </div>
      </div>
    ),
    notes:
      "Montrer la démo en live. Laisser les étudiants explorer un peu. Répondre aux questions.",
  },
  {
    id: "final",
    title: "Questions & Setup",
    content: (
      <div className="space-y-6">
        <div className="text-3xl font-bold text-center mb-8">
          🚀 C&apos;est parti !
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-8 rounded-lg border-l-4 border-blue-500 text-center">
          <div className="text-6xl mb-4">💬</div>
          <p className="font-semibold text-2xl mb-4">
            Questions avant de commencer ?
          </p>
          <p className="text-muted-foreground">
            C&apos;est le moment de clarifier les derniers points !
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-green-50 dark:bg-green-950 border-l-4 border-green-500">
            <h3 className="font-bold text-xl mb-4">✅ Prérequis</h3>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>
                <strong>Node.js</strong> 18+ installé
              </li>
              <li>
                <strong>VS Code</strong> (ou éditeur de code)
              </li>
              <li>
                <strong>Git</strong> pour le versioning
              </li>
              <li>
                <strong>Compte Vercel</strong> (gratuit) pour le déploiement
              </li>
              <li>
                <strong>OpenAI API Key</strong> (gratuit pour tester)
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500">
            <h3 className="font-bold text-xl mb-4">📚 Ressources utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  → Documentation Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  → Documentation React
                </a>
              </li>
              <li>
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  → shadcn/ui Components
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  → Tailwind CSS
                </a>
              </li>
            </ul>
          </Card>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded-lg border-l-4 border-amber-500">
          <p className="font-semibold mb-3 text-lg">
            💻 Commandes de setup (on fait ensemble)
          </p>
          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-900 p-3 rounded">
              <p className="text-xs text-muted-foreground mb-1">
                1. Créer le projet Next.js
              </p>
              <code className="text-sm">
                npx create-next-app@latest nextjs-studio
              </code>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 rounded">
              <p className="text-xs text-muted-foreground mb-1">
                2. Options à sélectionner :
              </p>
              <ul className="text-xs space-y-1 ml-4 list-disc list-inside">
                <li>✅ TypeScript</li>
                <li>✅ ESLint</li>
                <li>✅ Tailwind CSS</li>
                <li>✅ src/ directory? Non</li>
                <li>✅ App Router</li>
                <li>✅ Turbopack</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 rounded">
              <p className="text-xs text-muted-foreground mb-1">
                3. Lancer le serveur de dev
              </p>
              <code className="text-sm">npm run dev</code>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-8 rounded-lg">
          <div className="text-6xl mb-4">🎉</div>
          <p className="font-semibold text-2xl mb-2">Prêts à coder ?</p>
          <p className="text-muted-foreground text-lg">
            On passe à la pratique ! 💪
          </p>
        </div>
      </div>
    ),
    notes:
      "Vérifier que tout le monde a bien son environnement prêt avant de commencer le coding.",
  },
];
