import json
import os
import asyncio
import random
from typing import List, Dict, Any
from groq import Groq
from dotenv import load_dotenv
from ..models.diagnostic import StudentScenario, DiagnosticEvaluation, TrainerResponse, DiagnosticReport

load_dotenv()

class DiagnosticService:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.3-70b-versatile"

    async def generate_scenario(self, subject: str, difficulty: str = "Intermediate") -> StudentScenario:
        prompt = f"""
        Generate a realistic student confusion scenario for a technical trainer.
        Subject: {subject}
        Difficulty: {difficulty}
        
        The scenario must include:
        1. A broken code snippet.
        2. A confusing student statement.
        3. The actual root cause of their misunderstanding (e.g., conceptual gap in recursion vs syntax error).
        
        Return ONLY JSON in this format:
        {{
            "subject": str,
            "code": str,
            "student_statement": str,
            "runtime_behavior": str,
            "expected_output": str,
            "actual_output": str,
            "difficulty": str,
            "root_cause": str
        }}
        """
        
        res = self.client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=self.model,
            response_format={"type": "json_object"}
        )
        
        data = json.loads(res.choices[0].message.content)
        data["id"] = "SCEN-" + os.urandom(4).hex().upper()
        return StudentScenario(**data)

    async def evaluate_response(self, scenario: StudentScenario, response: TrainerResponse) -> DiagnosticEvaluation:
        prompt = f"""
        Act as an elite Master Trainer Evaluator. Evaluate this trainer's diagnostic ability.
        
        SCENARIO:
        Subject: {scenario.subject}
        Student Confusion: {scenario.student_statement}
        Actual Root Cause: {scenario.root_cause}
        
        TRAINER RESPONSE:
        First Question: {response.first_question}
        Reasoning: {response.reasoning}
        Suspected Confusion: {response.suspected_confusion}
        
        CRITERIA:
        1. Problem-Space Narrowing: Did they ask a question that isolates the confusion?
        2. Precision: Did they identify the correct root cause?
        3. Efficiency: How quickly would this lead to a student breakthrough?
        
        Return ONLY JSON:
        {{
            "score": float (0-100),
            "narrowing_score": float,
            "precision_score": float,
            "efficiency_score": float,
            "detected_misconceptions": [str],
            "root_cause_identified": bool,
            "reasoning": str,
            "evidence": [{{"point": str, "reason": str}}],
            "summary": str,
            "confidence": float
        }}
        """
        
        res = self.client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=self.model,
            response_format={"type": "json_object"}
        )
        
        data = json.loads(res.choices[0].message.content)
        return DiagnosticEvaluation(**data)

diagnostic_service = DiagnosticService()
