// Home Page SSG
import { MessageSquare, Lightbulb, Info, Sparkles } from "lucide-react";
import { PageContainer } from "@/app/components/shared/page-container";
import { FeatureCard } from "@/app/components/shared/feature-card";

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
          différents modes de rendu : CSR, SSR et SSG
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

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Développé avec Next.js 16, React 19, TypeScript, Tailwind CSS et
          ShadCn UI
        </p>
      </div>
    </PageContainer>
  );
}
