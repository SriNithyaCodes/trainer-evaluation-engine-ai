from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.trainer_service import trainer_service
from ..schemas.schemas import AIAnalysisResponse, PredictionResponse, FeedbackReportResponse

router = APIRouter(prefix="/ai", tags=["AI Features"])

@router.post("/autopsy/{session_id}", response_model=AIAnalysisResponse)
async def analyze_session(session_id: int, db: Session = Depends(get_db)):
    result = await trainer_service.analyze_session(db, session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Session not found")
    return result

@router.post("/predict/{trainer_id}", response_model=PredictionResponse)
async def predict_growth(trainer_id: int, db: Session = Depends(get_db)):
    return await trainer_service.predict_growth(db, trainer_id)

@router.post("/roadmap/{trainer_id}", response_model=FeedbackReportResponse)
async def generate_roadmap(trainer_id: int, db: Session = Depends(get_db)):
    return await trainer_service.generate_roadmap(db, trainer_id)
