"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Linkedin, Clock } from "lucide-react";

// Date d'expiration : aujourd'hui à 23h59
const EXPIRATION_DATE = new Date();
EXPIRATION_DATE.setHours(23, 59, 59, 999);

// Mapping des labels vers les valeurs numériques
const ratingLabels = [
  { value: "1", label: "Insuffisant" },
  { value: "2", label: "Moyen" },
  { value: "3", label: "Bien" },
  { value: "4", label: "Très bien" },
  { value: "5", label: "Excellent" },
];

// Schema de validation Zod (formulaire anonyme)
const feedbackSchema = z.object({
  learningRating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Veuillez sélectionner une note",
  }),
  enjoymentRating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Veuillez sélectionner une note",
  }),
  whatLearned: z.string().min(10, {
    message: "Veuillez donner plus de détails (minimum 10 caractères)",
  }),
  improvements: z.string().min(10, {
    message: "Veuillez donner plus de détails (minimum 10 caractères)",
  }),
  wouldRecommend: z.enum(["yes", "no", "maybe"], {
    required_error: "Veuillez sélectionner une réponse",
  }),
  additionalComments: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function FeedbackPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExpired, setIsExpired] = useState(new Date() > EXPIRATION_DATE);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      whatLearned: "",
      improvements: "",
      additionalComments: "",
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    if (new Date() > EXPIRATION_DATE) {
      setIsExpired(true);
      return;
    }

    try {
      // Envoyer les données à l'API
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learningRating: parseInt(data.learningRating),
          enjoymentRating: parseInt(data.enjoymentRating),
          whatLearned: data.whatLearned,
          improvements: data.improvements,
          wouldRecommend: data.wouldRecommend,
          additionalComments: data.additionalComments,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de l'envoi");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Erreur lors de l'envoi du feedback. Veuillez réessayer.");
    }
  };

  // Si le formulaire a expiré
  if (isExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <CardTitle className="text-2xl">Formulaire expiré</CardTitle>
            <CardDescription className="text-base mt-2">
              Ce formulaire de feedback n&apos;est plus disponible. La date
              limite était fixée au{" "}
              {EXPIRATION_DATE.toLocaleDateString("fr-FR")} à 23h59.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Si le formulaire a été soumis
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              Merci pour votre feedback !
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Vos retours sont précieux et m&apos;aideront à améliorer les
              prochaines sessions.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Restons connectés sur LinkedIn !
              </p>
              <Button
                asChild
                className="bg-[#0077B5] hover:bg-[#006399] text-white"
              >
                <a
                  href="https://www.linkedin.com/in/valentin-harrang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Linkedin className="w-5 h-5" />
                  Suivre sur LinkedIn
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Formulaire de feedback
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Feedback - Formation IA & Next.js
            </CardTitle>
            <CardDescription className="text-base">
              Merci d&apos;avoir participé à ces 3 jours de formation ! Votre
              avis est essentiel pour améliorer les prochaines sessions.
            </CardDescription>
            <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
              <Clock className="w-4 h-4" />
              <span>
                Ce formulaire expire le{" "}
                {EXPIRATION_DATE.toLocaleDateString("fr-FR")} à 23h59
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Note sur l'anonymat */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    🔒 <strong>Formulaire 100% anonyme</strong> - Aucune
                    information personnelle n&apos;est collectée.
                  </p>
                </div>

                {/* Évaluation de l'apprentissage */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Évaluation</h3>

                  <FormField
                    control={form.control}
                    name="learningRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Combien avez-vous appris pendant ces 3 jours ?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-3"
                          >
                            {ratingLabels.map(({ value, label }) => (
                              <div
                                key={value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={value}
                                  id={`learning-${value}`}
                                />
                                <Label htmlFor={`learning-${value}`} className="cursor-pointer">
                                  {label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enjoymentRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Avez-vous apprécié cette formation ?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-3"
                          >
                            {ratingLabels.map(({ value, label }) => (
                              <div
                                key={value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={value}
                                  id={`enjoyment-${value}`}
                                />
                                <Label htmlFor={`enjoyment-${value}`} className="cursor-pointer">
                                  {label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Questions ouvertes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Vos retours</h3>

                  <FormField
                    control={form.control}
                    name="whatLearned"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Qu&apos;avez-vous appris de plus important pendant ces
                          3 jours ?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Par exemple : l'utilisation de l'API Vercel AI SDK, la création de webhooks, etc."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="improvements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Que puis-je améliorer pour les prochaines formations ?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Soyez honnête, vos critiques constructives sont les bienvenues !"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wouldRecommend"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Recommanderiez-vous cette formation à d&apos;autres
                          étudiants ?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="recommend-yes" />
                              <Label htmlFor="recommend-yes">
                                Oui, sans hésiter
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="maybe"
                                id="recommend-maybe"
                              />
                              <Label htmlFor="recommend-maybe">
                                Peut-être, selon le profil
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="recommend-no" />
                              <Label htmlFor="recommend-no">Non</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalComments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Commentaires supplémentaires (optionnel)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Autres remarques, suggestions, anecdotes..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* LinkedIn */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Linkedin className="w-6 h-6 text-[#0077B5] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Restons connectés !
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Suivez-moi sur LinkedIn pour élargir votre réseau
                        professionnel.
                      </p>
                      <Button
                        type="button"
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white"
                      >
                        <a
                          href="https://www.linkedin.com/in/valentin-harrang/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          <Linkedin className="w-4 h-4" />
                          Me suivre sur LinkedIn
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Envoi en cours..."
                    : "Envoyer mon feedback"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
