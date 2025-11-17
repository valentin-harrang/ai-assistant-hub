/**
 * Utilitaire de correction orthographique avec IA
 * Corrige les fautes d'ortographe dans le texte affiché sans modifier la base de données
 */

import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

// Cache pour éviter de corriger plusieurs fois le même texte
const correctionCache = new Map<string, string>();

/**
 * Corrige l'orthographe d'un texte en utilisant l'IA
 * @param text - Le texte à corriger
 * @param options - Options de correction
 * @returns Le texte corrigé
 */
export async function correctSpelling(
  text: string,
  options: {
    useCache?: boolean;
    maxRetries?: number;
  } = {}
): Promise<string> {
  const { useCache = true, maxRetries = 2 } = options;

  // Si le texte est vide ou très court, le retourner tel quel
  if (!text || text.trim().length < 3) {
    return text;
  }

  // Vérifier le cache
  if (useCache && correctionCache.has(text)) {
    return correctionCache.get(text)!;
  }

  try {
    const { text: correctedText } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Tu es un correcteur orthographique professionnel pour le français.

Consigne stricte : Corrige UNIQUEMENT les fautes d'orthographe et de grammaire dans le texte ci-dessous.

RÈGLES DE CORRECTION :
- Corrige les fautes d'orthographe évidentes (exemple : "faute" → "fautes")
- Pour les accords de genre et d'adjectifs, identifie d'abord le SUJET ou le NOM auquel l'adjectif se rapporte
- ATTENTION : "Professeur" est MASCULIN, donc "professeur gentil et patient" (pas "patiente")
- ATTENTION aux anglicismes : "stack" est FÉMININ en français (une stack, la stack, les stacks utilisées)
- En cas de doute sur le genre du sujet, NE MODIFIE PAS l'accord de l'adjectif
- Corrige les accords des participes passés en identifiant le COD
- Corrige la conjugaison des verbes
- Ne change PAS le sens, le style ou la structure des phrases
- Ne traduis PAS
- Ne reformule PAS
- Conserve la ponctuation et la mise en forme
- Si le texte contient du code, des URLs ou des noms propres, ne les modifie PAS
- Retourne UNIQUEMENT le texte corrigé, sans explication ni commentaire

Texte à corriger :
${text}`,
      temperature: 0.1, // Température basse pour des corrections cohérentes
    });

    // Nettoyer la réponse (enlever les guillemets si présents)
    const cleaned = correctedText.trim().replace(/^["']|["']$/g, "");

    // Mettre en cache
    if (useCache) {
      correctionCache.set(text, cleaned);
    }

    return cleaned;
  } catch (error) {
    console.error("Erreur lors de la correction orthographique:", error);
    // En cas d'erreur, retourner le texte original
    return text;
  }
}

/**
 * Corrige l'orthographe d'un tableau de textes
 * Utile pour corriger plusieurs textes en parallèle (features, useCases, etc.)
 */
export async function correctSpellingBatch(
  texts: string[],
  options?: Parameters<typeof correctSpelling>[1]
): Promise<string[]> {
  return Promise.all(texts.map((text) => correctSpelling(text, options)));
}

/**
 * Vide le cache de correction
 */
export function clearSpellingCache(): void {
  correctionCache.clear();
}

/**
 * Obtient la taille du cache
 */
export function getSpellingCacheSize(): number {
  return correctionCache.size;
}
