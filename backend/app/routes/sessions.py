import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import Session as SessionModel
from ..schemas.schemas import SessionResponse
from ..config import settings

router = APIRouter(prefix="/sessions", tags=["Sessions"])

@router.post("/upload", response_model=SessionResponse)
async def upload_session(
    trainer_id: int = Form(...),
    session_title: str = Form(...),
    duration: int = Form(...),
    transcript: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Ensure upload directory exists
    if not os.path.exists(settings.UPLOAD_DIR):
        os.makedirs(settings.UPLOAD_DIR)

    file_path = os.path.join(settings.UPLOAD_DIR, f"{trainer_id}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    new_session = SessionModel(
        trainer_id=trainer_id,
        session_title=session_title,
        duration=duration,
        transcript=transcript,
        upload_url=file_path
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session

@router.get("/{id}", response_model=SessionResponse)
def get_session(id: int, db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter(SessionModel.id == id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session
