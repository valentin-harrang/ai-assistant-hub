"use client";

import {
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { useSlideNavigation } from "@/hooks/use-slide-navigation";
import { presentationSlides } from "@/constants/presentation-slides";

const slides = presentationSlides;

export default function PresentationPage() {
  const { isFullscreen, toggleFullscreen, containerRef } = useFullscreen();
  const { currentSlide, goToNext, goToPrevious, goToSlide } =
    useSlideNavigation({
      totalSlides: slides.length,
      onFullscreenToggle: toggleFullscreen,
    });

  return (
    <div
      ref={containerRef}
      className={`${
        isFullscreen ? "h-screen overflow-y-auto" : "min-h-screen"
      } bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800`}
    >
      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50 flex gap-2">
        <Link href="/">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <Home className="size-3 sm:size-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Accueil</span>
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullscreen}
          title={
            isFullscreen ? "Quitter le plein écran (F)" : "Plein écran (F)"
          }
          className="p-2"
        >
          {isFullscreen ? (
            <Minimize className="size-3 sm:size-4" />
          ) : (
            <Maximize className="size-3 sm:size-4" />
          )}
        </Button>
      </div>

      <div
        className={`flex ${
          isFullscreen ? "items-start" : "items-center"
        } justify-center ${isFullscreen ? "py-4" : "min-h-screen p-2 sm:p-4 md:p-8"}`}
      >
        <div className="w-full max-w-5xl">
          <Card
            className={`p-4 sm:p-6 md:p-8 lg:p-12 ${
              isFullscreen
                ? "my-4"
                : "min-h-[calc(100vh-8rem)] sm:min-h-150"
            } flex flex-col`}
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full">{slides[currentSlide]?.content}</div>
            </div>

            <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4 sm:pt-6">
              <Button
                onClick={goToPrevious}
                disabled={currentSlide === 0}
                variant="outline"
                className="flex items-center gap-2 w-full sm:w-auto text-xs sm:text-sm"
              >
                <ChevronLeft className="size-4" />
                <span className="hidden sm:inline">Précédent</span>
                <span className="sm:hidden">Préc.</span>
              </Button>

              <div className="flex items-center gap-2 order-first sm:order-none">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {currentSlide + 1} / {slides.length}
                </span>
                <div className="flex gap-1 flex-wrap max-w-[200px] sm:max-w-none">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-colors ${
                        index === currentSlide
                          ? "bg-primary"
                          : "bg-muted hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Aller à la slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {currentSlide < slides.length - 1 && (
                <Button
                  onClick={goToNext}
                  variant="outline"
                  className="flex items-center gap-2 w-full sm:w-auto text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Suivant</span>
                  <span className="sm:hidden">Suiv.</span>
                  <ChevronRight className="size-4" />
                </Button>
              )}
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              <p>
                Utilisez les flèches du clavier ou la barre d&apos;espace pour
                naviguer
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
