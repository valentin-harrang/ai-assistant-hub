import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ressources, categories } from "@/lib/ressources-data";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Ressources",
  description: "Bibliothèques et outils recommandés pour Next.js et React",
};

export default function RessourcesPage() {
  const ressourcesByCategory = categories.map((category) => ({
    category,
    ressources: ressources.filter((r) => r.category === category),
  })).filter((group) => group.ressources.length > 0);

  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="Ressources"
        emoji="📚"
        description="Bibliothèques et outils recommandés pour développer avec Next.js et React"
        className="my-12"
      />

      <div className="space-y-8">
        {ressourcesByCategory.map(({ category, ressources: categoryRessources }) => (
          <div key={category}>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryRessources.map((ressource) => {
                const Icon = ressource.icon;
                return (
                  <Link key={ressource.slug} href={`/ressources/${ressource.slug}`}>
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-2 rounded-lg ${ressource.color.bg} ${ressource.color.bgDark}`}
                        >
                          <Icon className={`size-5 ${ressource.color.text} ${ressource.color.textDark}`} />
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
        ))}
      </div>
    </PageContainer>
  );
}

