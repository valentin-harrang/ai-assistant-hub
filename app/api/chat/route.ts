// API Route IA Chat
import { createGroq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { AI_MODEL } from "@/app/constants/ai";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY environment variable is not set. Please create a .env.local file with your Groq API key."
    );
  }

  return createGroq({ apiKey });
}

export async function POST(req: NextRequest) {
  try {
    // 🎓 Étape 1: Initialiser le client IA (Groq avec Mixtral)
    const groq = getGroqClient();
    const body = await req.json();

    // 🎓 Étape 2: Extraire les messages envoyés par useChat()
    // Le format attendu est { messages: UIMessage[] }
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", body);
      return NextResponse.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    // 🎓 Étape 3: Convertir les messages UI en format attendu par l'IA
    // UIMessage { role, content } → ModelMessage compatible avec le modèle
    const modelMessages = convertToModelMessages(messages);

    // 🎓 Étape 4: Générer la réponse en streaming
    // streamText() retourne un stream de tokens en temps réel
    const result = streamText({
      model: groq(AI_MODEL),
      messages: modelMessages,
    });

    // 🎓 Étape 5: Retourner le stream au client
    // toTextStreamResponse() crée une Response compatible avec useChat()
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

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
