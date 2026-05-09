import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "TrainerIQ X")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./traineriq.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your_secret_key_here")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads/")
    DEBUG: bool = os.getenv("DEBUG", "True") == "True"

    class Config:
        env_file = ".env"

settings = Settings()
