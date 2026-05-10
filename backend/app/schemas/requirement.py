from pydantic import BaseModel
from typing import List, Optional

class RequirementInput(BaseModel):
    subject: str
    duration: int
    budget: int
    delivery_mode: str
    batch_size: int
    project_type: str
    topics: str
    experience_preference: int

class Skill(BaseModel):
    skill: str
    score: int

class Difficulty(BaseModel):
    level: str
    score: int
    reasoning: str

class TrainerPersona(BaseModel):
    type: str
    personality: str
    communication_style: str
    engagement_behavior: str

class CapabilityMap(BaseModel):
    capability: str
    importance: str
    what_to_test: str
    recommended_method: str

class EvalTask(BaseModel):
    title: str
    mapped_capability: str
    objective: str
    difficulty: str

class Risk(BaseModel):
    risk: str
    mitigation: str

class TimelineStep(BaseModel):
    step: str
    status: str

class RequirementAnalysisResponse(BaseModel):
    derived_skills: List[Skill]
    difficulty: Difficulty
    trainer_persona: TrainerPersona
    capability_mapping: List[CapabilityMap]
    evaluation_tasks: List[EvalTask]
    risks: List[Risk]
    timeline: List[TimelineStep]
