from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import auth, trainers, sessions, ai, dashboard
from .websocket.manager import manager
from .config import settings
import random
import asyncio

# Initialize Database
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(trainers.router)
app.include_router(sessions.router)
app.include_router(ai.router)
app.include_router(dashboard.router)

@app.get("/")
async def root():
    return {"message": "Welcome to TrainerIQ X - AI Operating System for Human Trainers"}

@app.websocket("/ws/coaching")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        # Simulate real-time AI suggestions
        suggestions = [
            "Speak slower, students are trying to take notes.",
            "Add an interactive example here to boost engagement.",
            "The energy level is dropping, maybe a quick poll?",
            "Technical depth is good, but check if everyone follows.",
            "Great use of storytelling to explain this concept!",
            "Engagement warning: students are losing focus."
        ]
        
        while True:
            # Wait for any data from client or just push periodic suggestions
            # For demo, we push a random suggestion every 10 seconds
            await asyncio.sleep(10)
            suggestion = random.choice(suggestions)
            await manager.send_personal_message(f"AI Suggestion: {suggestion}", websocket)
            
            # Also handle incoming messages if any
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=0.1)
                print(f"Received: {data}")
            except asyncio.TimeoutError:
                pass
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket Error: {e}")
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
