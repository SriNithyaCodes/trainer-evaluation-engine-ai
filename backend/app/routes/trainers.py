from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..schemas.schemas import TrainerCreate, TrainerResponse
from ..services.trainer_service import trainer_service

router = APIRouter(prefix="/trainers", tags=["Trainers"])

@router.post("/create", response_model=TrainerResponse)
def create_trainer(trainer: TrainerCreate, db: Session = Depends(get_db)):
    return trainer_service.create_trainer(db, trainer)

@router.get("/", response_model=List[TrainerResponse])
def list_trainers(db: Session = Depends(get_db)):
    return trainer_service.get_trainers(db)

@router.get("/{id}", response_model=TrainerResponse)
def get_trainer(id: int, db: Session = Depends(get_db)):
    trainer = trainer_service.get_trainer_by_id(db, id)
    if not trainer:
        raise HTTPException(status_code=404, detail="Trainer not found")
    return trainer
