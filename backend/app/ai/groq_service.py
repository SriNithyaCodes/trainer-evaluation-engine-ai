from groq import Groq
import json
from ..config import settings

class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        # Using Llama 3 for fast, high-quality reasoning
        self.model = "llama-3.3-70b-versatile"

    async def analyze_session(self, transcript: string):
        prompt = f"""
        Evaluate this trainer session transcript for clarity, engagement, and confidence.
        Return ONLY valid JSON.
        
        Transcript: {transcript}
        """
        
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are an AI trainer intelligence system. Evaluate trainer performance and return JSON with: clarity_score, engagement_score, confidence_score, pacing_score, technical_depth_score, strengths (list), weaknesses (list), suggestions (list)."},
                {"role": "user", "content": prompt}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def classify_trainer_dna(self, transcript: string):
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Classify the trainer into one of these types: Motivator, Storyteller, Technical Expert, Interactive Coach, Fast Lecturer. Return JSON with: dna_type, primary_traits (list)."},
                {"role": "user", "content": f"Analyze this transcript: {transcript}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def generate_sentiment_heatmap(self, transcript: string):
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Generate a sentiment timeline for the session. Return JSON with a list of 'data' points, each having: time (string), sentiment (float -1 to 1), emotion (string)."},
                {"role": "user", "content": f"Analyze: {transcript}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def predict_growth(self, session_history_summary: string):
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Predict trainer growth and burnout. Return JSON with: future_score (0-100), burnout_risk (0-100), growth_probability (0-100), reason (string)."},
                {"role": "user", "content": f"History: {session_history_summary}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def generate_7day_roadmap(self, last_analysis: string):
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Create a 7-day improvement roadmap. Return JSON with a list 'roadmap', each item having: day (int), focus (string), task (string)."},
                {"role": "user", "content": f"Analysis: {last_analysis}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

groq_service = GroqService()
