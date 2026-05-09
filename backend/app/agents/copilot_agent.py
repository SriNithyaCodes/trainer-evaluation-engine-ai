from .base_agent import BaseAgent
from sqlalchemy.orm import Session
import json

class LiveCopilotAgent(BaseAgent):
    def __init__(self):
        super().__init__("Live AI Co-Pilot Agent")

    async def get_suggestions(self, session_id: int, current_text: str, db: Session):
        """Generates real-time suggestions during a live session."""
        system_prompt = """
        You are the TrainerIQ X Live Co-Pilot. 
        Analyze the current live transcript and provide 1-2 urgent suggestions for the trainer.
        Suggestions must be short (e.g., "Slow down", "Engage students").
        Return a JSON list of strings.
        """
        
        user_prompt = f"Current live transcript: {current_text}"
        
        suggestions = self.call_ai(db, system_prompt, user_prompt, response_format="json")
        
        # Log to feed that copilot is active
        self.log_activity(db, "THINKING", "Generating real-time coaching suggestions...")
        
        return suggestions if suggestions else ["Maintain current pacing", "Monitor student focus"]
