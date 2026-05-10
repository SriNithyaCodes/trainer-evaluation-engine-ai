from fastapi import APIRouter, HTTPException, UploadFile, File, Form
import json
import io
from PyPDF2 import PdfReader
from docx import Document
from typing import List, Dict, Any, Optional
from ..models.evaluation import EvaluationResult, EvaluationInput
from ..services.evaluation_service import evaluation_service

router = APIRouter(prefix="/evaluation", tags=["AI Evaluation Intelligence"])

def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    ext = filename.split('.')[-1].lower() if '.' in filename else ''
    text = ""
    try:
        if ext == 'pdf':
            reader = PdfReader(io.BytesIO(file_bytes))
            for page in reader.pages:
                text += page.extract_text() + "\n"
        elif ext == 'docx':
            doc = Document(io.BytesIO(file_bytes))
            for para in doc.paragraphs:
                text += para.text + "\n"
        else:
            # Assume text file
            text = file_bytes.decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error parsing file {filename}: {e}")
    return text

@router.post("/analyze", response_model=EvaluationResult)
async def analyze_candidate(
    resume: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(None),
    form_answers: str = Form(...),
    behavioral_metadata: str = Form(...),
    video_url: Optional[str] = Form(None)
):
    try:
        parsed_resume_text = ""
        if resume:
            contents = await resume.read()
            parsed_resume_text = extract_text_from_file(contents, resume.filename)
        elif resume_text:
            parsed_resume_text = resume_text

        input_data = EvaluationInput(
            resume_text=parsed_resume_text,
            form_answers=json.loads(form_answers),
            behavioral_metadata=json.loads(behavioral_metadata),
            video_url=video_url
        )
        
        result = await evaluation_service.run_pipeline(input_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{candidate_id}")
async def get_evaluation(candidate_id: str):
    # Retrieve from DB (simulated)
    pass
