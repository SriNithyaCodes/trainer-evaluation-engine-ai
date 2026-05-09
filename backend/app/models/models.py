from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    organization = Column(String)
    role = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Trainer(Base):
    __tablename__ = "trainers"

    id = Column(Integer, primary_key=True, index=True)
    trainer_name = Column(String)
    department = Column(String)
    specialization = Column(String)
    experience = Column(Integer)
    dna_type = Column(String) # Motivator, Technical Expert, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    sessions = relationship("Session", back_populates="trainer")
    predictions = relationship("Prediction", back_populates="trainer")
    feedback_reports = relationship("FeedbackReport", back_populates="trainer")

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    trainer_id = Column(Integer, ForeignKey("trainers.id"))
    session_title = Column(String)
    transcript = Column(Text)
    duration = Column(Integer) # in seconds
    upload_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    trainer = relationship("Trainer", back_populates="sessions")
    ai_analysis = relationship("AIAnalysis", back_populates="session", uselist=False)
    sentiment_data = relationship("SentimentData", back_populates="session")

class AIAnalysis(Base):
    __tablename__ = "ai_analysis"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"))
    clarity_score = Column(Float)
    engagement_score = Column(Float)
    confidence_score = Column(Float)
    pacing_score = Column(Float)
    technical_depth_score = Column(Float)
    strengths = Column(JSON) # List of strengths
    weaknesses = Column(JSON) # List of weaknesses
    suggestions = Column(JSON) # List of suggestions
    ai_summary = Column(Text)

    session = relationship("Session", back_populates="ai_analysis")

class SentimentData(Base):
    __tablename__ = "sentiment_data"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"))
    timestamp = Column(Float)
    emotion = Column(String)
    intensity = Column(Float)

    session = relationship("Session", back_populates="sentiment_data")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    trainer_id = Column(Integer, ForeignKey("trainers.id"))
    future_score = Column(Float)
    burnout_risk = Column(Float)
    growth_probability = Column(Float)
    ai_recommendations = Column(JSON)

    trainer = relationship("Trainer", back_populates="predictions")

class FeedbackReport(Base):
    __tablename__ = "feedback_reports"

    id = Column(Integer, primary_key=True, index=True)
    trainer_id = Column(Integer, ForeignKey("trainers.id"))
    generated_feedback = Column(Text)
    improvement_plan = Column(JSON) # 7-day roadmap

    trainer = relationship("Trainer", back_populates="feedback_reports")
