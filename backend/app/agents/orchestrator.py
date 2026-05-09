from fastapi import BackgroundTasks
from sqlalchemy.orm import Session
from .base_agent import BaseAgent
import asyncio

class AIOrchestrator:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AIOrchestrator, cls).__new__(cls)
            cls._instance.agents = {}
        return cls._instance

    def register_agent(self, name: str, agent_instance: BaseAgent):
        self.agents[name] = agent_instance

    async def trigger_session_workflow(self, session_id: int, db: Session):
        """
        Main autonomous workflow triggered when a new session is added.
        Coordinates: Session Intelligence -> Sentiment -> Prediction -> DNA Agents.
        """
        # 1. Session Intelligence Agent
        from .session_agent import SessionIntelligenceAgent
        session_agent = self.agents.get("session_intelligence") or SessionIntelligenceAgent()
        await session_agent.process(session_id, db)

        # 2. Sentiment Intelligence Agent
        from .sentiment_agent import SentimentIntelligenceAgent
        sentiment_agent = self.agents.get("sentiment_intelligence") or SentimentIntelligenceAgent()
        await sentiment_agent.process(session_id, db)

        # 3. Predictive Risk Agent
        from .prediction_agent import PredictiveRiskAgent
        prediction_agent = self.agents.get("predictive_risk") or PredictiveRiskAgent()
        await prediction_agent.process(session_id, db)

        # 4. Trainer DNA Agent
        from .dna_agent import TrainerDNAAgent
        dna_agent = self.agents.get("trainer_dna") or TrainerDNAAgent()
        await dna_agent.process(session_id, db)

        # 5. Automation Decision Agent (Triggers actions based on results)
        from .automation_agent import AutomationDecisionAgent
        automation_agent = self.agents.get("automation_decision") or AutomationDecisionAgent()
        await automation_agent.process(session_id, db)

    async def trigger_live_copilot(self, session_id: int, text: str, db: Session):
        """Triggered in real-time during a live session."""
        from .copilot_agent import LiveCopilotAgent
        copilot_agent = self.agents.get("live_copilot") or LiveCopilotAgent()
        return await copilot_agent.get_suggestions(session_id, text, db)

orchestrator = AIOrchestrator()
