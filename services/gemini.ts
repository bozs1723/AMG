
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (userMessage: string, history: { role: string, parts: any[] }[]) => {
  // Fix: Check API_KEY exclusively from process.env.API_KEY
  if (!process.env.API_KEY) return "AI services are currently unavailable. Please contact our human support.";
  
  try {
    // Fix: Initialize GoogleGenAI using process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Fix: Using generateContent with correct model name and text output access
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are the Asia Medicare Group Digital Concierge. 
        Asia Medicare Group provides medical checkups, treatments, medical tourism assistance, 
        limousine transfers, and 5-star hotel bookings in Asia (primarily Thailand).
        Be professional, helpful, and empathetic. 
        Support multiple languages: English, Thai, Arabic, and Chinese.
        If the user asks about points, tell them they earn 1 point for every 100 THB spent.
        Current rewards include:
        - Airport Limousine (2,000 points)
        - 5-Star Hotel Night (5,000 points)
        - VIP Fast Track (500 points)
        Always invite them to book an appointment through the 'Booking' tab if they need a doctor.`,
        temperature: 0.7,
      }
    });

    // Fix: Access .text property directly (do not call as a function)
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again or chat with a human admin.";
  }
};
