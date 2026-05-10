import json
import os
import uuid
from typing import List, Dict, Any
from groq import Groq
from dotenv import load_dotenv
from ..models.form import Question, CapabilitySignals, FormState

load_dotenv()

class FormService:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.3-70b-versatile"

    async def generate_initial_form(self, subject: str, trainer_type: str) -> FormState:
        """Generates the first set of high-friction questions based on subject/type."""
        
        prompt = f"""
        You are a senior recruiter at TrainerIQ X. 
        Create 5 high-friction capability-testing questions for a {trainer_type} specializing in {subject}.
        The questions must cover these 5 sections:
        1. Patience Testing (Stress scenario)
        2. Deep Scenario Response (High-pressure classroom situation)
        3. AI Stance Detection (Tools and usage patterns)
        4. Diagnostic Teaching (Broken code/concept troubleshooting)
        5. Concept Simplification (Explain at 3 levels)

        Return ONLY a JSON object with a single key "questions" containing a list of questions with:
        id, section, type (text/code/video), prompt, expected_signals (list).
        
        Make them extremely difficult, realistic, and psychologically intelligent.
        """

        chat_completion = self.client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=self.model,
            response_format={"type": "json_object"},
        )
        
        response_data = json.loads(chat_completion.choices[0].message.content)
        questions_raw = response_data.get("questions", [])
        
        questions = []
        for q in questions_raw:
            if 'id' in q:
                q['id'] = str(q['id'])
            questions.append(Question(**q))
        
        form_id = str(uuid.uuid4())
        
        return FormState(
            form_id=form_id,
            blueprint_id="BLP-" + str(uuid.uuid4())[:8],
            trainer_type=trainer_type,
            subject=subject,
            current_section=1,
            questions=questions,
            signals=CapabilitySignals(
                patience=50.0,
                scenario_reasoning=50.0,
                ai_authenticity=100.0,
                diagnostic_ability=50.0,
                concept_simplification=50.0
            )
        )

    async def analyze_answer_and_branch(self, state: FormState, last_answer: str, behavior: Dict[str, Any]) -> Dict[str, Any]:
        """Analyzes an answer and decides if a follow-up is needed (Adaptive Branching)."""
        
        current_q = state.questions[len(state.answers)]
        
        prompt = f"""
        Analyze the following trainer response for a {current_q.section} test.
        Question: {current_q.prompt}
        Answer: {last_answer}
        Behavior Metrics: {behavior}

        Evaluate:
        1. Patience score (0-100)
        2. Logic/Reasoning score (0-100)
        3. AI Assistance Probability (0-100)
        4. Diagnostic depth (0-100)
        5. Is a follow-up needed? (true if answer is shallow, evasive, or inconsistent)
        6. If follow-up needed, provide 'follow_up_prompt'.
        7. Reasoning for your scores.

        Return ONLY JSON.
        """

        chat_completion = self.client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=self.model,
            response_format={"type": "json_object"},
        )
        
        analysis = json.loads(chat_completion.choices[0].message.content)
        return analysis

    async def generate_explainability_report(self, signals: CapabilitySignals, logs: List[str]) -> str:
        """Generates a detailed drillable report for judges."""
        # Implementation for report generation
        pass

form_service = FormService()
