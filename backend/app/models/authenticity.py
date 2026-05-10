from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from datetime import datetime

class EvidenceNode(BaseModel):
    timestamp: str
    label: str
    description: str
    confidence: float

class CadenceAnalysis(BaseModel):
    naturalness_score: float
    pause_consistency: float
    rhythm_pattern: str
    waveform_data: List[float]

class TeleprompterDetection(BaseModel):
    probability: float
    gaze_heatmap: List[Dict[str, float]]
    eye_movement_flags: List[str]

class AuthenticityReport(BaseModel):
    candidate_id: str
    authenticity_score: float
    ai_dependency_risk: float
    risk_severity: str  # Low, Moderate, High, Critical
    cadence: CadenceAnalysis
    teleprompter: TeleprompterDetection
    monotone_score: float
    concept_recall_score: float
    ai_fingerprint_probability: float
    evidence: List[EvidenceNode]
    summary: str
    timeline: List[Dict[str, Any]]
    timestamp: datetime = Field(default_factory=datetime.now)

class AuthenticityInput(BaseModel):
    video_url: str
    transcript: str
    metadata: Dict[str, Any]
