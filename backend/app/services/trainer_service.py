from sqlalchemy.orm import Session
from ..models.models import Trainer, Session as SessionModel, AIAnalysis, Prediction, FeedbackReport, SentimentData
from ..schemas.schemas import TrainerCreate, SessionCreate
from ..ai.gemini_service import gemini_service

class TrainerService:
    @staticmethod
    def create_trainer(db: Session, trainer_data: TrainerCreate):
        db_trainer = Trainer(**trainer_data.dict())
        db.add(db_trainer)
        db.commit()
        db.refresh(db_trainer)
        return db_trainer

    @staticmethod
    def get_trainers(db: Session):
        return db.query(Trainer).all()

    @staticmethod
    def get_trainer_by_id(db: Session, trainer_id: int):
        return db.query(Trainer).filter(Trainer.id == trainer_id).first()

    @staticmethod
    async def analyze_session(db: Session, session_id: int):
        session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
        if not session:
            return None

        # 1. Session Autopsy
        analysis_data = await gemini_service.analyze_session(session.transcript)
        db_analysis = AIAnalysis(session_id=session_id, **analysis_data)
        db.add(db_analysis)

        # 2. Sentiment Timeline
        sentiment_points = await gemini_service.generate_sentiment_timeline(session.transcript)
        for point in sentiment_points:
            db_sentiment = SentimentData(session_id=session_id, **point)
            db.add(db_sentiment)

        # 3. Trainer DNA (if not set or update)
        dna_type = await gemini_service.classify_trainer_dna(session.transcript)
        session.trainer.dna_type = dna_type

        db.commit()
        return db_analysis

    @staticmethod
    async def predict_growth(db: Session, trainer_id: int):
        trainer = db.query(Trainer).filter(Trainer.id == trainer_id).first()
        history = f"Trainer: {trainer.trainer_name}, Specialization: {trainer.specialization}"
        prediction_data = await gemini_service.predict_trainer_growth(history)
        
        db_prediction = Prediction(trainer_id=trainer_id, **prediction_data)
        db.add(db_prediction)
        db.commit()
        db.refresh(db_prediction)
        return db_prediction

    @staticmethod
    async def generate_roadmap(db: Session, trainer_id: int):
        trainer = db.query(Trainer).filter(Trainer.id == trainer_id).first()
        roadmap_data = await gemini_service.generate_improvement_roadmap(f"{trainer.trainer_name} in {trainer.department}")
        
        db_report = FeedbackReport(trainer_id=trainer_id, **roadmap_data)
        db.add(db_report)
        db.commit()
        db.refresh(db_report)
        return db_report

trainer_service = TrainerService()
