import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, Question, SkillType, UnitDefinition } from "../types";

// Initialize Gemini
// NOTE: In a real production app, ensure your API key is secure.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuiz = async (
  unit: UnitDefinition,
  skill: SkillType,
  difficulty: Difficulty
): Promise<Question[]> => {
  
  const modelId = "gemini-2.5-flash"; // Fast and capable for this task

  // Construct a prompt that guides the model to use the specific curriculum data
  const prompt = `
    You are an expert English teacher creating a quiz for Grade 11 students using the "Global Success" textbook.
    
    Target Unit: ${unit.title}
    Unit Topic: ${unit.topic}
    Focus Area: ${skill}
    Difficulty Level: ${difficulty}
    
    ${skill === SkillType.VOCABULARY ? `Focus specifically on vocabulary: ${unit.vocabularyFocus}.` : ''}
    ${skill === SkillType.GRAMMAR ? `Focus specifically on grammar: ${unit.grammarFocus}.` : ''}
    ${skill === SkillType.READING ? `Create short reading passages about ${unit.topic} and ask comprehension questions.` : ''}

    Task: Generate exactly 10 multiple-choice questions.
    
    Difficulty Guidelines:
    - Easy: Basic identification, simple sentence structures, direct definitions.
    - Medium: Application of concepts, connecting ideas, standard textbook level.
    - Hard: Advanced usage, inference, complex sentence structures, confusing distractors.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              questionText: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              correctAnswer: { type: Type.STRING, description: "Must be exactly one of the strings in options" },
              explanation: { type: Type.STRING, description: "Short explanation of why the answer is correct (in Vietnamese)" }
            },
            required: ["id", "questionText", "options", "correctAnswer", "explanation"],
            propertyOrdering: ["id", "questionText", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data returned from AI");
    }

    const questions = JSON.parse(jsonText) as Question[];
    return questions;

  } catch (error) {
    console.error("Error generating quiz:", error);
    // Fallback or re-throw
    throw error;
  }
};