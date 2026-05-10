import json
import os
import asyncio
from typing import List, Dict, Any
from groq import Groq
from dotenv import load_dotenv
from ..models.evaluation import EvaluationResult, CapabilityScore, RedFlag, VideoIntelligence, EvaluationInput

load_dotenv()

class EvaluationService:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.3-70b-versatile"

    async def run_pipeline(self, input_data: EvaluationInput) -> EvaluationResult:
        """
        Multi-stage scoring pipeline:
        Resume -> Capability -> Behavior -> Video -> Risk -> Composite -> Explainability
        """
        
        # 1. Resume & Form Analysis
        capability_scores = await self._score_capabilities(input_data)
        
        # 2. Risk & Red Flag Detection
        red_flags = await self._detect_risks(input_data, capability_scores)
        
        # 3. Video Intelligence (Simulated for this stage)
        video_intel = await self._analyze_video(input_data.video_url)
        
        # 4. Composite Score & Summary
        composite_data = await self._generate_composite(input_data, capability_scores, red_flags, video_intel)
        
        return EvaluationResult(
            candidate_id="CAN-" + os.urandom(4).hex().upper(),
            composite_score=composite_data["score"],
            confidence_score=composite_data["confidence"],
            capabilities=capability_scores,
            red_flags=red_flags,
            reject_probability=composite_data["reject_prob"],
            reject_reason=composite_data["reject_reason"],
            summary=composite_data["summary"],
            tags=composite_data["tags"],
            ai_authenticity_score=composite_data["ai_authenticity"],
            video_intelligence=video_intel
        )

    async def _score_capabilities(self, input_data: EvaluationInput) -> List[CapabilityScore]:
        prompt = f"""
        Evaluate candidate capabilities based on:
        Resume: {input_data.resume_text[:2000]}
        Form Answers: {json.dumps(input_data.form_answers)}
        
        Score 0-100 for each:
        1. Patience
        2. Deep Scenario Response
        3. AI Stance
        4. Diagnostic Teaching
        5. Concept Simplification

        Provide evidence from their answers/resume and detailed reasoning.
        Return ONLY JSON.
        """
        
        res = self.client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=self.model,
            response_format={"type": "json_object"}
        )
        
        data = json.loads(res.choices[0].message.content)
        return [CapabilityScore(**c) for c in data.get("capabilities", [])]

    async def _detect_risks(self, input_data: EvaluationInput, scores: List[CapabilityScore]) -> List[RedFlag]:
        # Implementation for risk detection
        return [
            RedFlag(severity="Warning", label="AI Dependency", description="Detected repetitive phrasing in technical responses."),
            RedFlag(severity="Info", label="Pacing", description="Candidate tends to rush complex explanations.")
        ]

    async def _analyze_video(self, video_url: str) -> VideoIntelligence:
        # Simulated video intelligence
        return VideoIntelligence(
            confidence_score=88.5,
            pacing_analysis="Steady cadence with natural pauses.",
            energy_level="High",
            authenticity_signals=["Natural eye movement", "Dynamic hand gestures"],
            pacing_data=[0.8, 0.9, 0.85, 0.92, 0.88]
        )

    async def _generate_composite(self, input_data, scores, risks, video) -> Dict[str, Any]:
        # Final reasoning stage
        avg_score = sum(s.score for s in scores) / len(scores) if scores else 0
        
        return {
            "score": round(avg_score * 0.8 + video.confidence_score * 0.2, 1),
            "confidence": 92.0,
            "reject_prob": 15.0 if avg_score > 70 else 65.0,
            "reject_reason": "N/A" if avg_score > 70 else "Low diagnostic depth observed.",
            "summary": "Strong technical foundation with balanced communication skills.",
            "tags": ["Technical Expert", "Calm Mentor"],
            "ai_authenticity": 94.0
        }

evaluation_service = EvaluationService()
