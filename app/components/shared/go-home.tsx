import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

export const GoHome = () => (
  <Link
    href="/"
    className={cn(
      "inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg",
      "text-sm font-medium text-muted-foreground",
      "bg-muted/30 border border-border/50",
      "hover:bg-muted/50 hover:text-foreground hover:border-border",
      "transition-all duration-200 ease-in-out",
      "group hover:shadow-sm",
      "hover:-translate-x-1"
    )}
  >
    <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
    <Home className="size-4" />
    <span>Retour à l&apos;accueil</span>
  </Link>
);
