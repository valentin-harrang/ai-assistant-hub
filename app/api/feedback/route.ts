import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, type CourseFeedback } from '@/lib/supabase';
import { z } from 'zod';

// Schema de validation
const feedbackSchema = z.object({
  learningRating: z.number().int().min(1).max(5),
  enjoymentRating: z.number().int().min(1).max(5),
  whatLearned: z.string().min(10),
  improvements: z.string().min(10),
  wouldRecommend: z.enum(['yes', 'no', 'maybe']),
  additionalComments: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Vérifier la date d'expiration
    const now = new Date();
    const expirationDate = new Date();
    expirationDate.setHours(23, 59, 59, 999);

    if (now > expirationDate) {
      return NextResponse.json(
        { error: 'Le formulaire a expiré' },
        { status: 403 }
      );
    }

    // Parser et valider les données
    const body = await request.json();
    const validatedData = feedbackSchema.parse(body);

    // Préparer les données pour Supabase
    const feedbackData: Omit<CourseFeedback, 'id' | 'created_at' | 'session_date'> = {
      learning_rating: validatedData.learningRating,
      enjoyment_rating: validatedData.enjoymentRating,
      what_learned: validatedData.whatLearned,
      improvements: validatedData.improvements,
      would_recommend: validatedData.wouldRecommend,
      additional_comments: validatedData.additionalComments,
    };

    // Vérifier que le client admin est disponible
    if (!supabaseAdmin) {
      console.error('Supabase admin client not configured');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // Insérer dans Supabase avec le client admin (bypass RLS)
    const { data, error } = await supabaseAdmin
      .from('course_feedback')
      .insert([feedbackData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement du feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Feedback enregistré avec succès',
        id: data.id
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// GET pour récupérer tous les feedbacks avec statistiques
export async function GET() {
  try {
    // Vérifier que le client admin est disponible
    if (!supabaseAdmin) {
      console.error('Supabase admin client not configured');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // Récupérer tous les feedbacks
    const { data: feedbacks, error } = await supabaseAdmin
      .from('course_feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des feedbacks' },
        { status: 500 }
      );
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
        if (f.would_recommend === 'yes') recommendationBreakdown.yes++;
        else if (f.would_recommend === 'no') recommendationBreakdown.no++;
        else if (f.would_recommend === 'maybe') recommendationBreakdown.maybe++;
      });
    }

    return NextResponse.json({
      feedbacks: feedbacks || [],
      stats: {
        totalResponses,
        averageLearning,
        averageEnjoyment,
        recommendationBreakdown,
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
