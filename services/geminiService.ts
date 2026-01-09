
import { GoogleGenAI, Type } from "@google/genai";

/* Gemini Service for TNPT 24/7. Always uses process.env.API_KEY directly as required. */

export async function getSmartTravelAdvice(from: string, to: string, lang: string = 'ta') {
  // Use process.env.API_KEY directly in the constructor as per guidelines.
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const isTamil = lang === 'ta';
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide travel advice for a commuter going from ${from} to ${to} in Tamil Nadu. 
      Suggest bus types, typical fares, and any landmarks. 
      The response must be in ${isTamil ? 'Tamil language' : 'English'}. 
      Keep it very concise and easy to understand.`,
    });
    // Property .text is used directly (not a method call) to extract text output.
    return response.text;
  } catch (error: any) {
    console.error("Gemini advice error:", error);
    // Rethrow specific error to allow reset of key selection in App.tsx
    if (error?.message?.includes("Requested entity was not found")) {
      throw error;
    }
    return lang === 'ta' ? "பாதுகாப்பான பயணம்! சமீபத்திய தகவல்களுக்கு உள்ளூர் நேர அட்டவணையைச் சரிபார்க்கவும்." : "Safe travels! Check local schedules for the latest updates.";
  }
}

export async function getBusRouteSuggestions(query: string) {
  // Always initialize with named parameter apiKey from process.env.API_KEY.
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search for bus routes or locations in Tamil Nadu matching "${query}". Return a JSON list of possible names.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    // Directly access the .text property from GenerateContentResponse.
    return JSON.parse(response.text || '[]');
  } catch (error: any) {
    // Rethrow specific error to allow reset of key selection in App.tsx
    if (error?.message?.includes("Requested entity was not found")) {
      throw error;
    }
    return [];
  }
}
