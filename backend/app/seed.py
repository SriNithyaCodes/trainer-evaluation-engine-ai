from sqlalchemy.orm import Session
from .database import engine, SessionLocal, Base
from .models.models import Trainer, Session as SessionModel, AIAnalysis
import random

def seed_data():
    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(Trainer).count() > 0:
            print("Database already contains data. Skipping seed.")
            return

        print("Seeding database with real trainer intelligence data...")

        # 1. Create Trainers
        trainer_names = [
            ("Sarah Jenkins", "Technical", "Data Science", 8, "The Analytical Master"),
            ("David Kumar", "Soft Skills", "Leadership", 12, "The Visionary Mentor"),
            ("Elena Rodriguez", "Product", "UI/UX Design", 5, "The Storyteller"),
            ("Michael Chen", "Engineering", "Backend Systems", 10, "The Deep Tech Expert"),
            ("Priya Sharma", "Marketing", "Digital Growth", 7, "The Engagement Guru")
        ]

        trainers = []
        for name, dept, spec, exp, dna in trainer_names:
            t = Trainer(
                trainer_name=name,
                department=dept,
                specialization=spec,
                experience=exp,
                dna_type=dna
            )
            db.add(t)
            trainers.append(t)
        
        db.commit()

        # 2. Create Sessions & AI Analysis for each trainer
        for trainer in trainers:
            num_sessions = random.randint(3, 8)
            for i in range(num_sessions):
                session = SessionModel(
                    trainer_id=trainer.id,
                    session_title=f"{trainer.specialization} Workshop - Part {i+1}",
                    transcript=f"This is a simulated transcript for {trainer.trainer_name}'s session on {trainer.specialization}...",
                    duration=random.randint(1800, 3600)
                )
                db.add(session)
                db.flush() # Get session ID

                # Create AI Analysis for the session
                analysis = AIAnalysis(
                    session_id=session.id,
                    clarity_score=random.randint(70, 98),
                    engagement_score=random.randint(65, 95),
                    confidence_score=random.randint(75, 99),
                    filler_words_count=random.randint(5, 40),
                    sentiment_summary="Excellent session with high learner participation and clear technical explanations.",
                    burnout_risk=random.choice(["Low", "Low", "Medium"]),
                    key_strengths="Technical depth, storytelling, interactive Q&A",
                    areas_for_improvement="Pacing in complex sections, eye contact simulation"
                )
                db.add(analysis)

        db.commit()
        print("Database seeding complete.")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
