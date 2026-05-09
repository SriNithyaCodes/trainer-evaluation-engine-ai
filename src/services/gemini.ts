import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const GeminiService = {
  async analyzeSession(transcript: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `Evaluate this trainer session transcript. Return JSON.
          Transcript: ${transcript}`,
        },
      ],
      config: {
        systemInstruction: "You are an advanced AI trainer evaluation system. Evaluate communication, engagement, confidence, depth, effectiveness, interaction, pacing, energy, filler words, and impact. Provide scores (0-100), strengths, weaknesses, suggestions, and personality traits. Format: JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            clarityScore: { type: Type.NUMBER },
            engagementScore: { type: Type.NUMBER },
            confidenceScore: { type: Type.NUMBER },
            pacingScore: { type: Type.NUMBER },
            energyLevel: { type: Type.NUMBER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            personalityTraits: { type: Type.ARRAY, items: { type: Type.STRING } },
            fillerWordAnalysis: { type: Type.STRING }
          }
        }
      },
    });
    return JSON.parse(response.text);
  },

  async analyzeSentiment(transcript: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `Analyze emotional engagement and sentiment heatmap. Return JSON.
          Transcript: ${transcript}`,
        },
      ],
      config: {
        systemInstruction: "Identify engagement spikes, confusion, boredom, excitement, and drops. Return a sentiment timeline and emotional score. Format: JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            emotionalScore: { type: Type.NUMBER },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timestamp: { type: Type.NUMBER, description: "Seconds from start" },
                  sentiment: { type: Type.STRING, enum: ["excited", "neutral", "confused", "bored"] },
                  intensity: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      },
    });
    return JSON.parse(response.text);
  },

  async generateTrainerDNA(sessionsData: any[]) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `Generate Trainer DNA fingerprint based on these session results: ${JSON.stringify(sessionsData)}`,
        },
      ],
      config: {
        systemInstruction: "Classify teaching personality, communication style, and blind spots. Types: Motivator, Storyteller, Technical Expert, Interactive Coach, Fast Lecturer. Format: JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dnaType: { type: Type.STRING },
            communicationStyle: { type: Type.STRING },
            primaryStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            blindSpots: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      },
    });
    return JSON.parse(response.text);
  },

  async predictPerformance(history: any[]) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ text: `Predict future trainer performance: ${JSON.stringify(history)}` }],
      config: {
        systemInstruction: "Predict future scores, burnout risk, and growth trends. Format: JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            futureScore: { type: Type.NUMBER },
            burnoutRisk: { type: Type.NUMBER },
            growthProbability: { type: Type.NUMBER },
            forecast: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async generateRoadmap(analysis: any) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ text: `Generate 7-day improvement roadmap: ${JSON.stringify(analysis)}` }],
      config: {
        systemInstruction: "Create daily tasks focused on communication, pacing, and confidence. Format: JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  focus: { type: Type.STRING },
                  task: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getLiveCoPilotTip(transcriptSnippet: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ text: `Provide real-time co-pilot tip for: ${transcriptSnippet}` }],
      config: {
        systemInstruction: "Detect speaking speed, energy, or silence issues. Provide a short, actionable tip. Format: JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            alertType: { type: Type.STRING },
            tip: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ["low", "medium", "high"] }
          }
        }
      }
    });
    return JSON.parse(response.text);
  }
};

