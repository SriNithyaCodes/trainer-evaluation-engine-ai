import os
import json
import time
from groq import Groq
from sqlalchemy.orm import Session
from ..models.models import AIAgentActivity, AIAgentSettings
from ..database import SessionLocal

class BaseAgent:
    def __init__(self, agent_name: str):
        self.agent_name = agent_name
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        
    def log_activity(self, db: Session, status: str, message: str, data: dict = None):
        """Logs agent activity to the database and prints to console."""
        activity = AIAgentActivity(
            agent_name=self.agent_name,
            status=status,
            message=message,
            data=data
        )
        db.add(activity)
        db.commit()
        db.refresh(activity)
        print(f"[{self.agent_name}] {status}: {message}")
        return activity

    def get_active_model(self, db: Session) -> str:
        """Retrieves the currently selected AI model from settings."""
        settings = db.query(AIAgentSettings).first()
        if not settings:
            settings = AIAgentSettings()
            db.add(settings)
            db.commit()
        return settings.active_model

    def call_ai(self, db: Session, system_prompt: str, user_prompt: str, response_format: str = "text") -> dict:
        """Calls the AI model and updates usage analytics."""
        model = self.get_active_model(db)
        start_time = time.time()
        
        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                response_format={"type": "json_object"} if response_format == "json" else {"type": "text"}
            )
            
            end_time = time.time()
            duration = end_time - start_time
            
            # Update analytics
            settings = db.query(AIAgentSettings).first()
            if settings:
                settings.token_usage_total += response.usage.total_tokens
                # Simple moving average for response time
                settings.avg_response_time = (settings.avg_response_time + duration) / 2
                db.commit()

            content = response.choices[0].message.content
            return json.loads(content) if response_format == "json" else content
            
        except Exception as e:
            print(f"Error in AI call for {self.agent_name}: {str(e)}")
            return None
