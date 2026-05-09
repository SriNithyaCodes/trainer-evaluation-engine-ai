/**
 * Groq AI Service — Client-side implementation
 * (Calls Groq API directly using the key from process.env.GROQ_API_KEY)
 */

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const MODEL = "llama-3.3-70b-versatile";

const groqFetch = async (messages: any[], system: string) => {
  if (!GROQ_API_KEY) {
    console.error("GROQ_API_KEY is not set!");
    throw new Error("API Key missing");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        ...messages
      ],
      response_format: { type: "json_object" }
    })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Groq API error");
  return JSON.parse(data.choices[0].message.content);
};

export const GeminiService = {
  async analyzeSession(transcript: string) {
    return groqFetch(
      [{ role: "user", content: `Evaluate this trainer session: ${transcript}` }],
      "You are an advanced AI trainer evaluation system. Evaluate communication, engagement, confidence, depth, effectiveness, interaction, pacing, energy. Return JSON with scores (0-100), strengths, weaknesses, suggestions, and personality traits."
    );
  },

  async analyzeSentiment(transcript: string) {
    return groqFetch(
      [{ role: "user", content: `Analyze emotional engagement heatmap: ${transcript}` }],
      "Identify engagement spikes, confusion, boredom, excitement. Return JSON with emotionalScore and a timeline array (timestamp, sentiment, intensity)."
    );
  },

  async generateTrainerDNA(sessionsData: any[]) {
    return groqFetch(
      [{ role: "user", content: `Generate Trainer DNA fingerprint: ${JSON.stringify(sessionsData)}` }],
      "Classify teaching personality. Types: Motivator, Storyteller, Technical Expert, Interactive Coach, Fast Lecturer. Return JSON with dnaType, communicationStyle, primaryStrengths, blindSpots."
    );
  },

  async predictPerformance(history: any[]) {
    return groqFetch(
      [{ role: "user", content: `Predict future performance: ${JSON.stringify(history)}` }],
      "Predict future scores, burnout risk, and growth trends. Return JSON with futureScore, burnoutRisk, growthProbability, forecast."
    );
  },

  async generateRoadmap(analysis: any) {
    return groqFetch(
      [{ role: "user", content: `Generate 7-day roadmap: ${JSON.stringify(analysis)}` }],
      "Create daily tasks focused on communication, pacing, and confidence. Return JSON with a 'days' array (day, focus, task)."
    );
  },

  async getLiveCoPilotTip(transcriptSnippet: string) {
    return groqFetch(
      [{ role: "user", content: `Live tip for: ${transcriptSnippet}` }],
      "Provide a short, actionable coaching tip. Return JSON with alertType, tip, priority (low/medium/high)."
    );
  }
};
