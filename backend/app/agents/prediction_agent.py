from .base_agent import BaseAgent
from sqlalchemy.orm import Session
from ..models.models import Session as SessionModel, Prediction, Trainer
import json

class PredictiveRiskAgent(BaseAgent):
    def __init__(self):
        super().__init__("Predictive Risk Agent")

    async def process(self, session_id: int, db: Session):
        """Predicts future performance risks based on historical data."""
        self.log_activity(db, "THINKING", "Calculating burnout risk and performance trajectory...")
        
        session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
        if not session:
            return
            
        trainer = db.query(Trainer).filter(Trainer.id == session.trainer_id).first()
        
        # Get last 5 sessions for context
        history = db.query(SessionModel).filter(SessionModel.trainer_id == trainer.id).order_by(SessionModel.created_at.desc()).limit(5).all()
        
        system_prompt = """
        You are the TrainerIQ X Predictive Risk Agent. 
        Analyze the trainer's performance trend and predict risks.
        Return JSON:
        - burnout_risk (0-100)
        - future_score (0-100)
        - growth_probability (0-100)
        - ai_recommendations (list of strings)
        """
        
        user_prompt = f"Trainer: {trainer.trainer_name}. Recent session scores and history... Predict risks."
        
        prediction_data = self.call_ai(db, system_prompt, user_prompt, response_format="json")
        
        if prediction_data:
            prediction = Prediction(
                trainer_id=trainer.id,
                burnout_risk=prediction_data.get('burnout_risk'),
                future_score=prediction_data.get('future_score'),
                growth_probability=prediction_data.get('growth_probability'),
                ai_recommendations=prediction_data.get('ai_recommendations')
            )
            db.add(prediction)
            db.commit()
            
            if prediction.burnout_risk > 70:
                self.log_activity(db, "WARNING", f"HIGH BURNOUT RISK DETECTED for {trainer.trainer_name}")
            else:
                self.log_activity(db, "COMPLETED", "Risk forecasting completed successfully")
