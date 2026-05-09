from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    organization: str
    role: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Trainer Schemas
class TrainerBase(BaseModel):
    trainer_name: str
    department: str
    specialization: str
    experience: int

class TrainerCreate(TrainerBase):
    pass

class TrainerResponse(TrainerBase):
    id: int
    dna_type: Optional[str]
    created_at: datetime
    class Config:
        from_attributes = True

# Session Schemas
class SessionBase(BaseModel):
    trainer_id: int
    session_title: str
    duration: int

class SessionCreate(SessionBase):
    transcript: str
    upload_url: Optional[str] = None

class SessionResponse(SessionBase):
    id: int
    transcript: str
    upload_url: Optional[str]
    created_at: datetime
    class Config:
        from_attributes = True

# AI Schemas
class AIAnalysisResponse(BaseModel):
    clarity_score: float
    engagement_score: float
    confidence_score: float
    pacing_score: float
    technical_depth_score: float
    strengths: List[str]
    weaknesses: List[str]
    suggestions: List[str]
    ai_summary: str
    class Config:
        from_attributes = True

class SentimentDataPoint(BaseModel):
    timestamp: float
    emotion: str
    intensity: float
    class Config:
        from_attributes = True

class PredictionResponse(BaseModel):
    future_score: float
    burnout_risk: float
    growth_probability: float
    ai_recommendations: List[str]
    class Config:
        from_attributes = True

class FeedbackReportResponse(BaseModel):
    generated_feedback: str
    improvement_plan: List[str]
    class Config:
        from_attributes = True

# Dashboard Schemas
class DashboardStats(BaseModel):
    total_trainers: int
    total_sessions: int
    avg_engagement: float
    ai_insights_count: int

class LeaderboardEntry(BaseModel):
    trainer_name: str
    score: float
    dna_type: str
