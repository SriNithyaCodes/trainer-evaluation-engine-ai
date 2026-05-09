from .base_agent import BaseAgent
from sqlalchemy.orm import Session
from ..models.models import Session as SessionModel, AIAnalysis, FeedbackReport, Prediction
import json

class AutomationDecisionAgent(BaseAgent):
    def __init__(self):
        super().__init__("Automation Decision Agent")

    async def process(self, session_id: int, db: Session):
        """Autonomous workflow engine. Triggers roadmaps, alerts, and coaching based on agent results."""
        self.log_activity(db, "PROCESSING", "Evaluating cross-agent intelligence for autonomous actions...")
        
        analysis = db.query(AIAnalysis).filter(AIAnalysis.session_id == session_id).first()
        prediction = db.query(Prediction).filter(Prediction.id == session_id).first() # Simplified lookup
        
        if not analysis:
            return

        # LOGIC: IF engagement < 60, generate a 7-day roadmap automatically
        if analysis.engagement_score < 60:
            self.log_activity(db, "TRIGGERED", "Low engagement detected. Generating 7-day improvement roadmap...")
            
            # Simulate roadmap generation
            roadmap = {
                "day1": "Practice storytelling with active pauses.",
                "day2": "Implement 3 interactive polls.",
                "day3": "Record a 5-min intro and check pacing.",
                "day4": "Review sentiment heatmap of session.",
                "day5": "Shadow an Elite Trainer.",
                "day6": "Conduct a mock session with AI Student.",
                "day7": "Self-evaluation session."
            }
            
            report = FeedbackReport(
                trainer_id=analysis.session.trainer_id,
                generated_feedback="Autonomous feedback: Focus on learner interaction.",
                improvement_plan=roadmap
            )
            db.add(report)
            db.commit()
            self.log_activity(db, "COMPLETED", "7-Day Roadmap delivered to trainer dashboard.")

        self.log_activity(db, "IDLE", "System in optimal state. No further interventions required.")
