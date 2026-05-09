from .base_agent import BaseAgent
from sqlalchemy.orm import Session
from ..models.models import Session as SessionModel, SentimentData
import json

class SentimentIntelligenceAgent(BaseAgent):
    def __init__(self):
        super().__init__("Sentiment Intelligence Agent")

    async def process(self, session_id: int, db: Session):
        """Automatically generates an emotional timeline for the session."""
        self.log_activity(db, "ANALYZING", f"Mapping learner emotional response for session {session_id}")
        
        session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
        if not session or not session.transcript:
            return

        system_prompt = """
        You are the TrainerIQ X Sentiment Agent. 
        Analyze the transcript for learner emotions: boredom, confusion, frustration, excitement, focus.
        Return a JSON list of objects, each with:
        - timestamp (float, simulated seconds based on transcript length)
        - emotion (string)
        - intensity (float 0-1)
        """
        
        user_prompt = f"Map the emotional flow of this session: \n\n {session.transcript[:3000]}"
        
        sentiment_results = self.call_ai(db, system_prompt, user_prompt, response_format="json")
        
        if sentiment_results and isinstance(sentiment_results, dict) and 'emotions' in sentiment_results:
            # Assuming AI returns {'emotions': [...]}
            for item in sentiment_results['emotions']:
                data = SentimentData(
                    session_id=session_id,
                    timestamp=item.get('timestamp'),
                    emotion=item.get('emotion'),
                    intensity=item.get('intensity')
                )
                db.add(data)
            
            db.commit()
            self.log_activity(db, "COMPLETED", f"Emotional heatmap generated for session {session_id}")
        elif sentiment_results and isinstance(sentiment_results, list):
            for item in sentiment_results:
                data = SentimentData(
                    session_id=session_id,
                    timestamp=item.get('timestamp'),
                    emotion=item.get('emotion'),
                    intensity=item.get('intensity')
                )
                db.add(data)
            db.commit()
            self.log_activity(db, "COMPLETED", f"Emotional heatmap generated for session {session_id}")
        else:
            self.log_activity(db, "IDLE", "No significant emotional shifts detected")
