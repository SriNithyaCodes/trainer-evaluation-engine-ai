from groq import Groq
import json
from ..config import settings

class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        # Default model, can be overridden dynamically
        self.model = "llama-3.3-70b-versatile"

    def set_model(self, model_name: str):
        self.model = model_name

    async def analyze_session(self, transcript: str):
        prompt = f"""
        Evaluate this trainer session transcript for clarity, engagement, and confidence.
        Support multilingual analysis (English, Telugu, Hindi).
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

    async def classify_trainer_dna(self, transcript: str):
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Classify the trainer into one of these types: Motivator, Storyteller, Technical Expert, Interactive Coach, Fast Lecturer. Return JSON with: dna_type, primary_traits (list)."},
                {"role": "user", "content": f"Analyze this transcript: {transcript}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def simulate_student(self, persona: str, message: str, context: str = ""):
        """AI Mock Student Simulator logic"""
        personas = {
            "confused": "a confused student who doesn't understand technical terms and asks for simple analogies.",
            "advanced": "an advanced learner who asks deep, challenging questions to test the trainer's expertise.",
            "distracted": "a distracted learner who is bored and needs engagement to stay focused.",
            "weak": "a weak learner who struggles with basic concepts and needs slow explanations."
        }
        
        selected_persona = personas.get(persona, personas["confused"])
        
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": f"You are {selected_persona} in a classroom. Respond to the trainer's statement. Keep it brief and realistic. Return JSON with: response (string), confusion_level (0-100), engagement_level (0-100)."},
                {"role": "user", "content": f"Context: {context}\nTrainer says: {message}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def analyze_reputation(self, trainer_history: str):
        """Trainer Reputation Engine"""
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Analyze trainer reputation based on history. Return JSON with: trust_score, loyalty_score, consistency_index, communication_quality_score, badges (list of strings), milestones (list of strings)."},
                {"role": "user", "content": f"History: {trainer_history}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def engagement_replay_analysis(self, transcript: str):
        """AI Engagement Replay analysis"""
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Analyze transcript for engagement spikes and drops. Return JSON with a list 'moments', each having: timestamp (string), type ('spike' or 'drop'), reason (string), intensity (0-100). Also include 'filler_words' (dict of counts)."},
                {"role": "user", "content": f"Analyze: {transcript}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def generate_sentiment_heatmap(self, transcript: str):
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Generate a sentiment timeline for the session. Support multilingual (English, Telugu, Hindi). Return JSON with a list of 'data' points, each having: time (string), sentiment (float -1 to 1), emotion (string)."},
                {"role": "user", "content": f"Analyze: {transcript}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def predict_growth(self, session_history_summary: str):
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Predict trainer growth and burnout. Return JSON with: future_score (0-100), burnout_risk (0-100), growth_probability (0-100), reason (string)."},
                {"role": "user", "content": f"History: {session_history_summary}"}
            ],
            model=self.model,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def generate_7day_roadmap(self, last_analysis: str):
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

