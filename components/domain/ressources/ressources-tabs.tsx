"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ressources } from "@/lib/ressources-data";
import type { Ressource } from "@/lib/ressources-data";

interface RessourcesTabsProps {
  ressourcesByCategory: Array<{
    category: string;
    ressources: Array<{
      slug: string;
      name: string;
      category: string;
      description: string;
      color: {
        bg: string;
        bgDark: string;
        text: string;
        textDark: string;
      };
    }>;
  }>;
}

const categoryGroups = [
  {
    id: "ai",
    label: "🤖 IA",
    categories: [
      "AI Agents",
      "AI SDK",
      "AI Chat",
      "Local AI",
      "AI Code Generation",
      "AI Documentation",
    ],
  },
  {
    id: "core",
    label: "⚙️ Core",
    categories: [
      "State Management",
      "Data Fetching",
      "Hooks",
      "Utilities",
    ],
  },
  {
    id: "ui",
    label: "🎨 UI",
    categories: [
      "UI Components",
      "Forms",
      "Validation",
      "Styling",
      "Icons",
      "Notifications",
      "Tables",
    ],
  },
  {
    id: "other",
    label: "🔧 Autres",
    categories: [
      "Internationalization",
      "Onboarding",
      "Development",
      "Authentication",
      "Email",
    ],
  },
];

export function RessourcesTabs({ ressourcesByCategory }: RessourcesTabsProps) {
  // Créer un map pour accéder rapidement aux ressources par catégorie
  const ressourcesMap = new Map<
    string,
    Array<{
      slug: string;
      name: string;
      category: string;
      description: string;
      color: {
        bg: string;
        bgDark: string;
        text: string;
        textDark: string;
      };
    }>
  >();
  ressourcesByCategory.forEach(({ category, ressources }) => {
    ressourcesMap.set(category, ressources);
  });

  return (
    <Tabs defaultValue="ai" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
        {categoryGroups.map((group) => {
          const hasRessources = group.categories.some((cat) =>
            ressourcesMap.has(cat)
          );
          if (!hasRessources) return null;

          return (
            <TabsTrigger key={group.id} value={group.id}>
              {group.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {categoryGroups.map((group) => {
        const categoriesInGroup = group.categories.filter((cat) =>
          ressourcesMap.has(cat)
        );
        if (categoriesInGroup.length === 0) return null;

        return (
          <TabsContent key={group.id} value={group.id} className="mt-0">
            <div className="space-y-8">
              {categoriesInGroup.map((category) => {
                const categoryRessources = ressourcesMap.get(category) || [];
                if (categoryRessources.length === 0) return null;

                return (
                  <div key={category}>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryRessources.map((ressourceData) => {
                        // Récupérer la ressource complète pour avoir l'icône
                        const ressource = ressources.find(
                          (r) => r.slug === ressourceData.slug
                        );
                        if (!ressource) return null;

                        const Icon = ressource.icon;
                        return (
                          <Link
                            key={ressource.slug}
                            href={`/ressources/${ressource.slug}`}
                          >
                            <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full">
                              <div className="flex items-start justify-between mb-3">
                                <div
                                  className={`p-2 rounded-lg ${ressource.color.bg} ${ressource.color.bgDark}`}
                                >
                                  <Icon
                                    className={`size-5 ${ressource.color.text} ${ressource.color.textDark}`}
                                  />
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {ressource.category}
                                </Badge>
                              </div>

                              <h3 className="text-lg font-semibold mb-2 text-foreground">
                                {ressource.name}
                              </h3>

                              <p className="text-sm text-muted-foreground mb-4">
                                {ressource.description}
                              </p>

                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>En savoir plus</span>
                                <ExternalLink className="size-3" />
                              </div>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

