from fastapi import APIRouter, HTTPException, Body
from typing import List, Dict, Any, Optional
from ..models.diagnostic import StudentScenario, DiagnosticEvaluation, TrainerResponse, DiagnosticReport
from ..services.diagnostic_service import diagnostic_service

router = APIRouter(prefix="/diagnostic", tags=["Diagnostic Teaching Intelligence"])

# Active scenarios storage (in-memory for hackathon)
scenarios_db: Dict[str, StudentScenario] = {}

@router.post("/generate-scenario", response_model=StudentScenario)
async def generate_diagnostic_scenario(subject: str = "Java", difficulty: str = "Intermediate"):
    try:
        scenario = await diagnostic_service.generate_scenario(subject, difficulty)
        scenarios_db[scenario.id] = scenario
        return scenario
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/evaluate", response_model=DiagnosticEvaluation)
async def evaluate_diagnostic_response(response: TrainerResponse):
    scenario = scenarios_db.get(response.scenario_id)
    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")
    
    try:
        evaluation = await diagnostic_service.evaluate_response(scenario, response)
        return evaluation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/report/{candidate_id}")
async def get_diagnostic_report(candidate_id: str):
    # Retrieve from DB (simulated)
    pass
