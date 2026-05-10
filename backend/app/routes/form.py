from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List, Dict, Any
from ..models.form import FormState, AnswerSubmission, AdaptiveFollowUpRequest
from ..services.form_service import form_service

router = APIRouter(prefix="/form", tags=["Adaptive Form"])

# Volatile store for demo purposes (use DB for production)
forms_db: Dict[str, FormState] = {}

@router.post("/generate", response_model=Any)
async def generate_form(subject: str, trainer_type: str):
    try:
        form_state = await form_service.generate_initial_form(subject, trainer_type)
        forms_db[form_state.form_id] = form_state
        return form_state
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}

@router.post("/submit-answer")
async def submit_answer(submission: AnswerSubmission):
    if submission.form_id not in forms_db:
        raise HTTPException(status_code=404, detail="Form not found")
    
    state = forms_db[submission.form_id]
    
    # 1. Analyze answer and branching
    analysis = await form_service.analyze_answer_and_branch(
        state, 
        submission.answer, 
        submission.behavior_metrics
    )
    
    # 2. Update state signals
    state.signals.patience = (state.signals.patience + analysis.get("patience_score", 50)) / 2
    state.signals.scenario_reasoning = (state.signals.scenario_reasoning + analysis.get("logic_score", 50)) / 2
    state.signals.ai_authenticity = (state.signals.ai_authenticity + (100 - analysis.get("ai_probability", 0))) / 2
    
    # 3. Add to logs
    state.answers.append({"answer": submission.answer, "analysis": analysis})
    state.adaptive_logs.append(analysis.get("reasoning", "Processed answer."))
    
    # 4. Check for adaptive follow-up
    follow_up = None
    if analysis.get("follow_up_needed") and analysis.get("follow_up_prompt"):
        follow_up = {
            "id": f"follow_{len(state.answers)}",
            "section": "Adaptive Follow-up",
            "type": "text",
            "prompt": analysis.get("follow_up_prompt"),
            "expected_signals": ["Clarity", "Depth"]
        }
        # Inject follow-up into next position
        state.questions.insert(len(state.answers), follow_up)

    return {
        "status": "success",
        "signals": state.signals,
        "follow_up_generated": analysis.get("follow_up_needed", False),
        "next_question_id": state.questions[len(state.answers)].id if len(state.answers) < len(state.questions) else None,
        "analysis_brief": analysis.get("reasoning")
    }

@router.get("/{form_id}/signals")
async def get_signals(form_id: str):
    if form_id not in forms_db:
        raise HTTPException(status_code=404, detail="Form not found")
    return forms_db[form_id].signals

@router.get("/{form_id}/state")
async def get_form_state(form_id: str):
    if form_id not in forms_db:
        raise HTTPException(status_code=404, detail="Form not found")
    return forms_db[form_id]
