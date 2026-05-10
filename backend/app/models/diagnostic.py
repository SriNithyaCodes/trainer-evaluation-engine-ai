from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from datetime import datetime

class StudentScenario(BaseModel):
    id: str
    subject: str
    code: str
    student_statement: str
    runtime_behavior: str
    expected_output: str
    actual_output: str
    difficulty: str  # Beginner, Intermediate, Advanced
    root_cause: str  # The actual underlying confusion (hidden from trainer)

class DiagnosticEvaluation(BaseModel):
    score: float
    narrowing_score: float
    precision_score: float
    efficiency_score: float
    detected_misconceptions: List[str]
    root_cause_identified: bool
    reasoning: str
    evidence: List[Dict[str, str]]
    summary: str
    confidence: float

class TrainerResponse(BaseModel):
    scenario_id: str
    first_question: str
    reasoning: str
    suspected_confusion: str
    guidance_plan: str

class DiagnosticReport(BaseModel):
    candidate_id: str
    scenario: StudentScenario
    response: TrainerResponse
    evaluation: DiagnosticEvaluation
    timestamp: datetime = Field(default_factory=datetime.now)
