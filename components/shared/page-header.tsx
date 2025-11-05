"use client";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  emoji?: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  title,
  emoji,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-3 mb-8 animate-in fade-in slide-in-from-top-4 duration-500",
        className
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {emoji && (
            <span
              className="text-4xl drop-shadow-lg animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              {emoji}
            </span>
          )}
          <h1 className="text-4xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        {description && (
          <p className="text-lg max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
    </div>
  );
}
