import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # App Settings
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "TrainerIQ X")
    DEBUG: bool = os.getenv("DEBUG", "True") == "True"
    
    # Database & Security
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./traineriq.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your_secret_key_here")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    
    # AI & Features
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads/")
    
    # Networking
    # We'll allow extra inputs so that .env values not in this class don't crash the app
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore" # This prevents the "Extra inputs are not permitted" error
    )

settings = Settings()
