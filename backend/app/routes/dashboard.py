from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models.models import Trainer, Session as SessionModel, AIAnalysis
from ..schemas.schemas import DashboardStats, LeaderboardEntry
from typing import List

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats", response_model=DashboardStats)
def get_stats(db: Session = Depends(get_db)):
    total_trainers = db.query(Trainer).count()
    total_sessions = db.query(SessionModel).count()
    avg_engagement = db.query(func.avg(AIAnalysis.engagement_score)).scalar() or 0.0
    ai_insights_count = db.query(AIAnalysis).count()
    
    return {
        "total_trainers": total_trainers,
        "total_sessions": total_sessions,
        "avg_engagement": round(float(avg_engagement), 2),
        "ai_insights_count": ai_insights_count
    }

@router.get("/leaderboard", response_model=List[LeaderboardEntry])
def get_leaderboard(db: Session = Depends(get_db)):
    # Join Trainer and AIAnalysis to get average scores
    results = db.query(
        Trainer.trainer_name,
        func.avg(AIAnalysis.clarity_score + AIAnalysis.engagement_score + AIAnalysis.confidence_score).label("total_score"),
        Trainer.dna_type
    ).join(SessionModel).join(AIAnalysis).group_by(Trainer.id).order_by(func.avg(AIAnalysis.clarity_score + AIAnalysis.engagement_score + AIAnalysis.confidence_score).desc()).limit(10).all()

    return [
        {"trainer_name": r[0], "score": round(float(r[1]/3), 2), "dna_type": r[2] or "Unknown"} 
        for r in results
    ]
