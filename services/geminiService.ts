import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function getSmartTravelAdvice(from: string, to: string, lang: string = 'ta') {
  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide travel advice for a commuter going from ${from} to ${to}.`,
    });

    return response.text;
  } catch (error) {
    console.error(error);
    return "Service temporarily unavailable.";
  }
}
