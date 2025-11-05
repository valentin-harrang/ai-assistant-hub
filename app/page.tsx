// Home Page SSG
import {
  MessageSquare,
  Lightbulb,
  Info,
  Sparkles,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";
import { FeatureCard } from "@/components/shared/feature-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    title: "Chatbot Interactif",
    description: "Chat IA en temps réel avec streaming et rendu Markdown",
    href: "/chat",
    icon: MessageSquare,
    badge: "CSR",
    badgeVariant: "default" as const,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Générateur d'Idées",
    description: "Génération de contenu IA côté serveur à chaque requête",
    href: "/prompts",
    icon: Lightbulb,
    badge: "SSR",
    badgeVariant: "secondary" as const,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "À Propos",
    description: "Page statique avec informations sur le projet",
    href: "/about",
    icon: Info,
    badge: "SSG",
    badgeVariant: "outline" as const,
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function Home() {
  return (
    <PageContainer centered>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="size-10 text-blue-500" />
          <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            AI Assistant Hub
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez l&apos;intégration de l&apos;IA avec Next.js et les
          différents modes de rendu : CSR, SSR, SSG et ISR
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.href}
            title={feature.title}
            description={feature.description}
            href={feature.href}
            icon={feature.icon}
            badge={feature.badge}
            badgeVariant={feature.badgeVariant}
            gradient={feature.gradient}
          />
        ))}
      </div>

      {/* Section Exercices */}
      <Card className="mt-12 p-8 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="size-6 text-emerald-700 dark:text-emerald-300" />
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              Exercices Pratiques
            </h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Liste complète des exercices à réaliser pour maîtriser Next.js et
            l&apos;IA
          </p>
          <Link href="/exercices">
            <Button
              variant="default"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <GraduationCap className="size-4 mr-2" />
              Voir les Exercices
            </Button>
          </Link>
        </div>
      </Card>

      {/* Section explicative sur les modes de rendu */}
      <Card className="mt-12 p-8 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="size-6 text-slate-700 dark:text-slate-300" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Comprendre les Modes de Rendu
            </h2>
          </div>
          <p className="text-muted-foreground">
            Des explications simples et concrètes pour comprendre CSR, SSR, SSG
            et ISR
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <Link href="/csr">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
              <div className="text-center">
                <div className="text-3xl mb-2">💻</div>
                <h3 className="font-semibold mb-2">CSR</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Client-Side Rendering
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Découvrir
                </Button>
              </div>
            </Card>
          </Link>

          <Link href="/ssr">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
              <div className="text-center">
                <div className="text-3xl mb-2">🖥️</div>
                <h3 className="font-semibold mb-2">SSR</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Server-Side Rendering
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Découvrir
                </Button>
              </div>
            </Card>
          </Link>

          <Link href="/ssg">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
              <div className="text-center">
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-semibold mb-2">SSG</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Static Site Generation
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Découvrir
                </Button>
              </div>
            </Card>
          </Link>

          <Link href="/isr">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
              <div className="text-center">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold mb-2">ISR</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Incremental Static Regeneration
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Découvrir
                </Button>
              </div>
            </Card>
          </Link>
        </div>
      </Card>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Développé avec Next.js 16, React 19, TypeScript, Tailwind CSS et
          ShadCn UI
        </p>
      </div>
    </PageContainer>
  );
}
