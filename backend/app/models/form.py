from typing import List, Optional
from pydantic import BaseModel

class CapabilitySignals(BaseModel):
    patience: float
    scenario_reasoning: float
    ai_authenticity: float
    diagnostic_ability: float
    concept_simplification: float

class EvaluationStep(BaseModel):
    step: str
    reasoning: str
    status: str

class Question(BaseModel):
    id: str
    section: str
    type: str  # text, code, video
    prompt: str
    context: Optional[str] = None
    expected_signals: List[str]

class FormState(BaseModel):
    form_id: str
    blueprint_id: str
    trainer_type: str
    subject: str
    current_section: int
    questions: List[Question]
    answers: List[dict] = []
    signals: CapabilitySignals
    behavior_metrics: dict = {}
    risk_indicators: List[str] = []
    adaptive_logs: List[str] = []

class AnswerSubmission(BaseModel):
    form_id: str
    question_id: str
    answer: str
    behavior_metrics: dict # {typing_speed, pauses, edits, total_time}

class AdaptiveFollowUpRequest(BaseModel):
    form_id: str
    last_answer: str
    current_signals: CapabilitySignals
