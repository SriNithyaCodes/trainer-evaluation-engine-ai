from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from datetime import datetime

class CapabilityScore(BaseModel):
    capability: str
    score: float
    evidence: List[str]
    reasoning: str

class RedFlag(BaseModel):
    severity: str  # Critical, Warning, Info
    label: str
    description: str

class VideoIntelligence(BaseModel):
    confidence_score: float
    pacing_analysis: str
    energy_level: str
    authenticity_signals: List[str]
    pacing_data: List[float]  # For graphing

class EvaluationResult(BaseModel):
    candidate_id: str
    composite_score: float
    confidence_score: float
    capabilities: List[CapabilityScore]
    red_flags: List[RedFlag]
    reject_probability: float
    reject_reason: str
    summary: str
    tags: List[str]
    ai_authenticity_score: float
    video_intelligence: VideoIntelligence
    timestamp: datetime = Field(default_factory=datetime.now)

class EvaluationInput(BaseModel):
    resume_text: str
    form_answers: List[Dict[str, Any]]
    video_url: Optional[str] = None
    behavioral_metadata: Dict[str, Any]
