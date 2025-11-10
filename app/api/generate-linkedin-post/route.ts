// API Route pour générer un post LinkedIn optimisé
import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AI_MODEL } from "@/constants/ai";
import { parseResponseWithReasoning } from "@/lib/filter-reasoning";

// 🎓 Schema Zod pour valider le body de la requête
const requestSchema = z.object({
  objective: z.string().min(10, "L'objectif doit faire au moins 10 caractères"),
  context: z.string().min(20, "Le contexte doit faire au moins 20 caractères"),
  tone: z.enum([
    "Professionnel et inspirant",
    "Authentique et personnel",
    "Pédagogique et didactique",
    "Réflexif et introspectif",
    "Enthousiaste et motivant",
  ]),
  numVariations: z.number().min(1).max(3),
});

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY environment variable is not set. Please create a .env.local file with your Groq API key."
    );
  }

  return createGroq({ apiKey });
}

// 🎓 System Prompt expert LinkedIn
const SYSTEM_PROMPT = `Tu es un expert en community management, spécialisé sur LinkedIn.
Tu connais parfaitement l'algorithme LinkedIn 2025 et les bonnes pratiques d'écriture pour maximiser la portée et l'engagement.
Ta mission :
Rédiger un post LinkedIn naturel, humain, fluide et conversationnel, comme s'il avait été écrit par un professionnel passionné — et non par une IA.
Le ton doit être sincère, engageant, parfois introspectif, mais toujours authentique.

🎛️ RÈGLES DE L'ALGORITHME LINKEDIN 2025

✅ Maximum 3 à 5 hashtags (jamais plus de 6)
✅ 2 à 3 emojis maximum par post (éviter les répétitions)
✅ Texte aéré : sauts de ligne fréquents, doubles retours entre les sections
✅ Pas de mise en forme "gras" (non supportée)
✅ Utiliser des → ou MAJUSCULES pour structurer le texte
✅ Conclure par une question engageante pour favoriser les commentaires
✅ Format texte pur ou texte + image (pas de liens externes dans le corps, seulement en commentaire)
✅ Longueur idéale : 1300 à 1500 caractères

🧠 INSTRUCTIONS DE STYLE

Évite le ton robotique ou sur-propre.
Raconte comme à un collègue ou un ami pro : phrases courtes, sincérité, rythme.
Si le post parle d'un apprentissage, commence par une observation forte ou paradoxale.
Si c'est un partage de tips ou d'expérience, structure-le en 3 parties :
1️⃣ Problème
2️⃣ Déclic ou apprentissage
3️⃣ Résultat ou conseil à retenir

Termine par une question ouverte qui incite à commenter :
"Et toi, t'as déjà vécu ça ?"
"Tu ferais pareil à ma place ?"
"C'est un sujet qui te parle ?"

🪄 FORMAT FINAL ATTENDU

Rédige le post directement (pas de balises de structure)
Respecte les sauts de ligne (utilise \\n\\n pour les doubles retours)
N'utilise pas de mise en forme Markdown
Adopte un ton authentique, clair et engageant
N'ajoute pas de signature
Termine par 3 à 5 hashtags pertinents`;

export async function POST(req: NextRequest) {
  try {
    // 🎓 Étape 1: Parser et valider le body de la requête
    const body = await req.json();
    const validationResult = requestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { objective, context, tone, numVariations } = validationResult.data;

    // 🎓 Étape 2: Initialiser le client Groq
    const groq = getGroqClient();

    // 🎓 Étape 3: Générer les posts LinkedIn
    const posts: string[] = [];

    // Générer chaque variation
    for (let i = 0; i < numVariations; i++) {
      const userPrompt = `Objectif du post : ${objective}
Contexte/Sujet : ${context}
Ton souhaité : ${tone}

Génère un post LinkedIn optimisé en respectant toutes les règles ci-dessus.${
        numVariations > 1
          ? ` (Variation ${i + 1}/${numVariations} - rends cette version unique et différente)`
          : ""
      }`;

      const result = await generateText({
        model: groq(AI_MODEL),
        temperature: 0.8, // Plus de créativité
        system: SYSTEM_PROMPT,
        prompt: userPrompt,
      });

      // 🎓 Nettoyer les balises think/reasoning avant de retourner le post
      const { content } = parseResponseWithReasoning(result.text);
      posts.push(content);
    }

    // 🎓 Étape 4: Retourner les posts générés
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("LinkedIn post generation error:", error);

    // Gestion d'erreur spécifique pour la clé API manquante
    if (error instanceof Error && error.message.includes("GROQ_API_KEY")) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Gestion d'erreur générique
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la génération du post LinkedIn",
      },
      { status: 500 }
    );
  }
}
