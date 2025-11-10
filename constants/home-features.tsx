import {
  MessageSquare,
  Lightbulb,
  Target,
  BookOpen,
  Atom,
  GraduationCap,
  Presentation,
  Brain,
} from "lucide-react";

export interface HomeFeature {
  title: string;
  description: string;
  href: string;
  icon: typeof MessageSquare;
  badge: string;
  badgeVariant: "default" | "secondary" | "outline";
  gradient: string;
}

export const homeFeatures: HomeFeature[] = [
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
    title: "Fun Fact du Jour",
    description: "Découvrez un fun fact amusant généré par l'IA",
    href: "/fun-fact",
    icon: Target,
    badge: "CSR",
    badgeVariant: "default" as const,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Quiz Intelligent",
    description: "Générez des quiz personnalisés sur n'importe quel sujet",
    href: "/quiz",
    icon: Brain,
    badge: "CSR",
    badgeVariant: "default" as const,
    gradient: "from-purple-500 to-fuchsia-500",
  },
  {
    title: "Ressources",
    description: "Bibliothèques et outils recommandés",
    href: "/ressources",
    icon: BookOpen,
    badge: "SSG",
    badgeVariant: "outline" as const,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Pourquoi React ?",
    description: "Découvrez l'histoire et les innovations de React",
    href: "/react",
    icon: Atom,
    badge: "SSG",
    badgeVariant: "outline" as const,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Exercices Pratiques",
    description: "Maîtrisez Next.js et l'IA avec des exercices pratiques",
    href: "/exercices",
    icon: GraduationCap,
    badge: "SSG",
    badgeVariant: "outline" as const,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Présentation Cours",
    description:
      "Support de présentation interactif pour les cours React/Next.js",
    href: "/presentation",
    icon: Presentation,
    badge: "CSR",
    badgeVariant: "default" as const,
    gradient: "from-purple-500 to-pink-500",
  },
];

