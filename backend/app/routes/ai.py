from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import AIAgentActivity, AIAgentSettings
from typing import List

router = APIRouter(prefix="/ai", tags=["AI Agents"])

@router.get("/activity", response_model=List[dict])
def get_ai_activity(limit: int = 20, db: Session = Depends(get_db)):
    """Fetches the latest autonomous agent activity for the live feed."""
    activities = db.query(AIAgentActivity).order_by(AIAgentActivity.created_at.desc()).limit(limit).all()
    return [
        {
            "id": a.id,
            "agent_name": a.agent_name,
            "status": a.status,
            "message": a.message,
            "created_at": a.created_at
        } for a in activities
    ]

@router.get("/settings")
def get_ai_settings(db: Session = Depends(get_db)):
    """Retrieves current AI model management settings."""
    settings = db.query(AIAgentSettings).first()
    if not settings:
        settings = AIAgentSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings

@router.post("/settings/model")
def update_ai_model(model_name: str, db: Session = Depends(get_db)):
    """Updates the active neural model used by all agents."""
    settings = db.query(AIAgentSettings).first()
    if not settings:
        settings = AIAgentSettings()
        db.add(settings)
    
    settings.active_model = model_name
    db.commit()
    return {"message": f"Model successfully updated to {model_name}"}

@router.get("/stats")
def get_ai_stats(db: Session = Depends(get_db)):
    """Aggregates system-wide intelligence statistics."""
    settings = db.query(AIAgentSettings).first()
    total_activities = db.query(AIAgentActivity).count()
    
    return {
        "active_model": settings.active_model if settings else "N/A",
        "tokens_processed": settings.token_usage_total if settings else 0,
        "avg_response_ms": (settings.avg_response_time * 1000) if settings else 0,
        "total_autonomous_actions": total_activities
    }
