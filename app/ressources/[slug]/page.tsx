import { notFound } from "next/navigation";
import { PageContainer } from "@/components/shared/page-container";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRessourceBySlug, ressources } from "@/lib/ressources-data";
import { ExternalLink, CheckCircle2, ArrowLeft } from "lucide-react";

interface RessourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ressources.map((ressource) => ({
    slug: ressource.slug,
  }));
}

export async function generateMetadata({ params }: RessourcePageProps) {
  const { slug } = await params;
  const ressource = getRessourceBySlug(slug);

  if (!ressource) {
    return {
      title: "Ressource non trouvée",
    };
  }

  return {
    title: `${ressource.name} - Ressources`,
    description: ressource.description,
  };
}

export default async function RessourcePage({ params }: RessourcePageProps) {
  const { slug } = await params;
  const ressource = getRessourceBySlug(slug);

  if (!ressource) {
    notFound();
  }

  const Icon = ressource.icon;

  return (
    <PageContainer>
      <div className="mb-6">
        <Link href="/ressources">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="size-4 mr-2" />
            Retour aux ressources
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div
          className={`p-3 rounded-lg ${ressource.color.bg} ${ressource.color.bgDark}`}
        >
          <Icon
            className={`size-6 ${ressource.color.text} ${ressource.color.textDark}`}
          />
        </div>
        <Badge variant="outline">{ressource.category}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Description
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {ressource.longDescription}
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Cas d&apos;usage
            </h2>
            <ul className="space-y-2">
              {ressource.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{useCase}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Fonctionnalités
            </h2>
            <ul className="space-y-2">
              {ressource.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-foreground">Liens</h3>
            <div className="space-y-3">
              <Link
                href={ressource.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="size-4 mr-2" />
                  Site officiel
                </Button>
              </Link>
              {ressource.npmPackage && (
                <Link
                  href={`https://www.npmjs.com/package/${ressource.npmPackage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="size-4 mr-2" />
                    npm package
                  </Button>
                </Link>
              )}
            </div>
          </Card>

          {ressource.npmPackage && (
            <Card className="p-6">
              <h3 className="font-semibold mb-2 text-foreground">
                Installation
              </h3>
              <code className="block p-3 bg-muted rounded-md text-sm text-foreground">
                npm install {ressource.npmPackage}
              </code>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
