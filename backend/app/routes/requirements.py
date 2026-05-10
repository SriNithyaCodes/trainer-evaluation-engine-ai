from fastapi import APIRouter, HTTPException
from ..schemas.requirement import RequirementInput, RequirementAnalysisResponse
from ..ai.groq_service import groq_service

router = APIRouter(prefix="/requirement", tags=["Requirement Intelligence"])

@router.post("/analyze", response_model=RequirementAnalysisResponse)
async def analyze_requirement(req: RequirementInput):
    """
    Analyzes a trainer hiring requirement and generates an AI evaluation blueprint.
    """
    try:
        analysis = await groq_service.analyze_requirement(req.dict())
        return analysis
    except Exception as e:
        print(f"Error analyzing requirement: {e}")
        raise HTTPException(status_code=500, detail=str(e))
