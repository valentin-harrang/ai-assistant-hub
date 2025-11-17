import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart3, TrendingUp, ThumbsUp, MessageSquare } from "lucide-react";
import { supabaseAdmin, type CourseFeedback } from "@/lib/supabase";
import { SpellCheckedText } from "@/components/shared/spell-checked-text";

// Revalider toutes les 60 secondes (ISR)
export const revalidate = 60;

interface FeedbackStats {
  totalResponses: number;
  averageLearning: number;
  averageEnjoyment: number;
  recommendationBreakdown: {
    yes: number;
    no: number;
    maybe: number;
  };
}

async function getFeedbacksData(): Promise<{
  feedbacks: CourseFeedback[];
  stats: FeedbackStats;
}> {
  try {
    if (!supabaseAdmin) {
      console.error("Supabase admin client not configured");
      return {
        feedbacks: [],
        stats: {
          totalResponses: 0,
          averageLearning: 0,
          averageEnjoyment: 0,
          recommendationBreakdown: { yes: 0, no: 0, maybe: 0 },
        },
      };
    }

    // Récupérer tous les feedbacks
    const { data: feedbacks, error } = await supabaseAdmin
      .from("course_feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return {
        feedbacks: [],
        stats: {
          totalResponses: 0,
          averageLearning: 0,
          averageEnjoyment: 0,
          recommendationBreakdown: { yes: 0, no: 0, maybe: 0 },
        },
      };
    }

    // Calculer les statistiques
    const totalResponses = feedbacks?.length || 0;
    let averageLearning = 0;
    let averageEnjoyment = 0;
    const recommendationBreakdown = {
      yes: 0,
      no: 0,
      maybe: 0,
    };

    if (feedbacks && feedbacks.length > 0) {
      averageLearning =
        feedbacks.reduce((sum, f) => sum + f.learning_rating, 0) /
        totalResponses;
      averageEnjoyment =
        feedbacks.reduce((sum, f) => sum + f.enjoyment_rating, 0) /
        totalResponses;

      feedbacks.forEach((f) => {
        if (f.would_recommend === "yes") recommendationBreakdown.yes++;
        else if (f.would_recommend === "no") recommendationBreakdown.no++;
        else if (f.would_recommend === "maybe") recommendationBreakdown.maybe++;
      });
    }

    return {
      feedbacks: feedbacks || [],
      stats: {
        totalResponses,
        averageLearning,
        averageEnjoyment,
        recommendationBreakdown,
      },
    };
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return {
      feedbacks: [],
      stats: {
        totalResponses: 0,
        averageLearning: 0,
        averageEnjoyment: 0,
        recommendationBreakdown: { yes: 0, no: 0, maybe: 0 },
      },
    };
  }
}

export default async function FeedbackResultsPage() {
  const { feedbacks, stats } = await getFeedbacksData();

  const getRatingLabel = (rating: number) => {
    const labels = ["Insuffisant", "Moyen", "Bien", "Très bien", "Excellent"];
    return labels[rating - 1] || "";
  };

  const getRecommendationLabel = (value: string) => {
    const labels: Record<string, string> = {
      yes: "Oui, sans hésiter",
      maybe: "Peut-être, selon le profil",
      no: "Non",
    };
    return labels[value] || value;
  };

  const getRecommendationColor = (value: string) => {
    const colors: Record<string, string> = {
      yes: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      maybe:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      no: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };
    return colors[value] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Résultats du Feedback
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyse des retours de la formation IA & Next.js
          </p>
        </div>

        {/* Statistiques globales */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Réponses
                  </CardTitle>
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalResponses}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Apprentissage
                  </CardTitle>
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.averageLearning.toFixed(1)}/5
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Moyenne
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Appréciation
                  </CardTitle>
                  <ThumbsUp className="w-4 h-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.averageEnjoyment.toFixed(1)}/5
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Moyenne
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Recommandations
                  </CardTitle>
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.totalResponses > 0
                    ? Math.round(
                        (stats.recommendationBreakdown.yes /
                          stats.totalResponses) *
                          100
                      )
                    : 0}
                  %
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Oui
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Liste des feedbacks */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Tous les feedbacks</h2>

          {feedbacks.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Aucun feedback disponible</CardTitle>
                <CardDescription>
                  Les feedbacks apparaîtront ici une fois soumis par les
                  étudiants.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid gap-6">
              {feedbacks.map((feedback, index) => (
                <Card key={feedback.id || index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Feedback #{index + 1}
                        </CardTitle>
                        <CardDescription>
                          {feedback.created_at
                            ? new Date(feedback.created_at).toLocaleDateString(
                                "fr-FR",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "Date inconnue"}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Recommandation
                        </span>
                        <Badge
                          className={getRecommendationColor(
                            feedback.would_recommend
                          )}
                        >
                          {getRecommendationLabel(feedback.would_recommend)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Ratings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Apprentissage
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">
                            {feedback.learning_rating}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            / 5 - {getRatingLabel(feedback.learning_rating)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Appréciation
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">
                            {feedback.enjoyment_rating}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            / 5 - {getRatingLabel(feedback.enjoyment_rating)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* What Learned */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Ce qui a été appris :
                      </p>
                      <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                        <SpellCheckedText showLoader>
                          {feedback.what_learned}
                        </SpellCheckedText>
                      </p>
                    </div>

                    {/* Improvements */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Améliorations suggérées :
                      </p>
                      <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                        <SpellCheckedText showLoader>
                          {feedback.improvements}
                        </SpellCheckedText>
                      </p>
                    </div>

                    {/* Additional Comments */}
                    {feedback.additional_comments && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Commentaires supplémentaires :
                        </p>
                        <p className="text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <SpellCheckedText showLoader>
                            {feedback.additional_comments}
                          </SpellCheckedText>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
