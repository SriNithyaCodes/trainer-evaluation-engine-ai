from .base_agent import BaseAgent
from sqlalchemy.orm import Session
from ..models.models import Session as SessionModel, AIAnalysis
import json

class SessionIntelligenceAgent(BaseAgent):
    def __init__(self):
        super().__init__("Session Intelligence Agent")

    async def process(self, session_id: int, db: Session):
        """Automatically analyzes a trainer session transcript."""
        self.log_activity(db, "ANALYZING", f"Starting deep session autopsy for ID: {session_id}")
        
        session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
        if not session or not session.transcript:
            self.log_activity(db, "ERROR", f"No transcript found for session {session_id}")
            return

        system_prompt = """
        You are the TrainerIQ X Session Intelligence Agent. 
        Your task is to analyze trainer transcripts and provide quantitative and qualitative feedback.
        Return your analysis in strict JSON format with the following keys:
        - clarity_score (0-100)
        - engagement_score (0-100)
        - confidence_score (0-100)
        - pacing_score (0-100)
        - technical_depth_score (0-100)
        - strengths (list of strings)
        - weaknesses (list of strings)
        - suggestions (list of strings)
        - ai_summary (string)
        """
        
        user_prompt = f"Analyze this session transcript: \n\n {session.transcript[:4000]}"
        
        self.log_activity(db, "THINKING", f"Running neural analysis on {len(session.transcript)} characters...")
        
        analysis_data = self.call_ai(db, system_prompt, user_prompt, response_format="json")
        
        if analysis_data:
            # Create or update AIAnalysis
            analysis = db.query(AIAnalysis).filter(AIAnalysis.session_id == session_id).first()
            if not analysis:
                analysis = AIAnalysis(session_id=session_id)
                db.add(analysis)
            
            analysis.clarity_score = analysis_data.get('clarity_score')
            analysis.engagement_score = analysis_data.get('engagement_score')
            analysis.confidence_score = analysis_data.get('confidence_score')
            analysis.pacing_score = analysis_data.get('pacing_score')
            analysis.technical_depth_score = analysis_data.get('technical_depth_score')
            analysis.strengths = analysis_data.get('strengths')
            analysis.weaknesses = analysis_data.get('weaknesses')
            analysis.suggestions = analysis_data.get('suggestions')
            analysis.ai_summary = analysis_data.get('ai_summary')
            
            db.commit()
            self.log_activity(db, "COMPLETED", f"Session analysis finalized for {session.session_title}")
        else:
            self.log_activity(db, "ERROR", "Neural analysis failed to generate data")
