# TrainerIQ X Backend
## "AI Operating System for Human Trainers"

TrainerIQ X is a futuristic AI-powered platform designed to analyze, evaluate, and grow human trainers using advanced LLMs and predictive analytics.

---

## 🚀 Features

- **Session Autopsy Engine**: Deep dive into trainer transcripts for clarity, engagement, and pacing.
- **Trainer DNA Classification**: Identify teaching styles (Motivator, Storyteller, Technical Expert).
- **Sentiment Heatmap**: Real-time emotion and intensity tracking.
- **Predictive Growth Analytics**: Burnout risk assessment and future performance forecasting.
- **AI Improvement Roadmap**: Personalized 7-day coaching plans.
- **Real-time AI Coaching**: WebSocket-based live suggestions during sessions.
- **Secure Auth**: JWT-based authentication with role-based access.

---

## 🛠 Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite with SQLAlchemy ORM
- **AI**: Google Gemini Pro (via `google-generativeai`)
- **Authentication**: JWT (python-jose, passlib, bcrypt)
- **Validation**: Pydantic v2
- **Real-time**: WebSockets

---

## 📂 Project Structure

```text
backend/
├── app/
│   ├── main.py          # Entry point
│   ├── database.py      # SQLAlchemy setup
│   ├── config.py        # Settings & Env vars
│   ├── models/          # Database models
│   ├── schemas/         # Pydantic validation
│   ├── routes/          # API Endpoints
│   ├── services/        # Business logic
│   ├── ai/              # Gemini AI integration
│   ├── auth/            # JWT logic
│   └── websocket/       # Live coaching manager
├── uploads/             # Session file storage
├── requirements.txt
└── .env
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Python 3.12+
- Google Gemini API Key

### 2. Clone and Install
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY=your_random_secret_key
DATABASE_URL=sqlite:///./traineriq.db
```

### 4. Run the Server
```bash
uvicorn app.main:app --reload
```

The API will be available at: `http://localhost:8000`
Swagger Documentation: `http://localhost:8000/docs`

---

## 📡 API Documentation

### Auth
- `POST /auth/signup`: Create a new user
- `POST /auth/login`: Get JWT access token
- `GET /auth/me`: Get current user info

### Trainers
- `POST /trainers/create`: Register a new trainer
- `GET /trainers`: List all trainers
- `GET /trainers/{id}`: Get trainer details

### Sessions
- `POST /sessions/upload`: Upload audio/video/transcript
- `GET /sessions/{id}`: Get session details

### AI Features
- `POST /ai/autopsy/{session_id}`: Trigger Gemini session analysis
- `POST /ai/predict/{trainer_id}`: Predict growth and burnout
- `POST /ai/roadmap/{trainer_id}`: Generate 7-day improvement plan

### WebSocket
- `WS /ws/coaching`: Live real-time AI suggestions

---

## 🧪 Testing with Swagger
1. Navigate to `http://localhost:8000/docs`.
2. Use the "Authorize" button to log in after signing up.
3. Test the Session Upload and AI Analysis endpoints.

---

## 📝 License
MIT License. Created for TrainerIQ X SaaS.
