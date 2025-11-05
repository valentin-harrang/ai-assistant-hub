// API Route IA Fun Fact
import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { AI_MODEL } from "@/constants/ai";
import { parseResponseWithReasoning } from "@/lib/filter-reasoning";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY environment variable is not set. Please create a .env.local file with your Groq API key."
    );
  }

  return createGroq({ apiKey });
}

export async function GET() {
  try {
    // 🎓 Initialiser le client IA (Groq)
    const groq = getGroqClient();

    // 🎓 Prompt pour générer un fun fact amusant
    const prompt = `Génère un fun fact du jour amusant et surprenant. Le format doit être :

**Fun fact du jour :** [Un fun fact amusante avec emojis, bien développée avec plusieurs détails surprenants et une conclusion marrante]

Requirements:
- Utilise des emojis pertinents (2-3 emojis maximum)
- Développe le fun fact avec plusieurs détails intéressants (2-3 phrases)
- Ajoute une conclusion marrante ou surprenante
- Sois créatif et amusant
- Le sujet peut être varié : science, histoire, animaux, technologie, sport, culture, etc.`;

    // 🎓 Générer le texte avec l'IA
    const result = await generateText({
      model: groq(AI_MODEL),
      prompt,
    });

    // 🎓 Filtrer le raisonnement (ne pas l'afficher)
    const { content } = parseResponseWithReasoning(result.text);

    // 🎓 Retourner le fun fact généré (sans raisonnement)
    return NextResponse.json({ funFact: content });
  } catch (error) {
    console.error("Fun Fact API error:", error);

    if (error instanceof Error && error.message.includes("GROQ_API_KEY")) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
