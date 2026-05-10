<div align="center">

# 🧠 TrainerIQ X

### **The Autonomous AI Operating System for Human Trainers**

[![Version](https://img.shields.io/badge/Version-2.0.0-00e5ff.svg?style=for-the-badge&labelColor=0f172a)](.)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI%20%7C%20Groq-6e00ff.svg?style=for-the-badge&labelColor=0f172a)](.)
[![AI](https://img.shields.io/badge/AI-Llama--3.3--70b-ff00c8.svg?style=for-the-badge&labelColor=0f172a)](.)
[![License](https://img.shields.io/badge/License-MIT-00e5ff.svg?style=for-the-badge&labelColor=0f172a)](.)

> *Self-operating AI systems continuously analyzing, predicting, coaching, and optimizing trainer performance in real time.*

</div>

---

## 🌟 What is TrainerIQ X?

**TrainerIQ X** is a recruiter-grade, enterprise AI evaluation platform that transforms how trainers are assessed, coached, and verified. It deploys **5 autonomous AI intelligence modules** that operate in parallel — analyzing resumes, evaluating teaching demos, detecting AI-assisted delivery, diagnosing pedagogical reasoning, and generating adaptive friction tests.

Built using **Groq Llama-3.3-70b-versatile** for all AI reasoning pipelines, TrainerIQ X delivers explainable, evidence-backed intelligence reports that recruiters can trust.

---

## ⚡ The 5 Core Intelligence Modules

### 🔬 Feature 1 — Requirement Intelligence Engine
> *Autonomous requirement decomposition and capability blueprint generation*

- Parses raw job descriptions into structured hiring blueprints
- Maps candidate capability requirements to evaluation dimensions
- Generates weighted skill matrices for technical and behavioral competencies
- AI-powered scoring rubric creation from natural language input
- **Endpoint:** `POST /requirement/analyze`

---

### 📋 Feature 2 — Adaptive Friction Evaluation Engine
> *Dynamic AI-generated test forms that adapt to candidate responses in real-time*

- Generates subject-specific evaluation forms on-the-fly using Groq AI
- Tracks behavioral metadata: typing speed, pause patterns, edit frequency
- Applies **Friction Scoring** — detects candidates who are overly rehearsed vs. genuinely knowledgeable
- Evaluates answer depth, conceptual accuracy, and response latency
- Supports subjects: `Java + DSA`, `Python`, `Cloud`, `DevOps`, and more
- **Endpoints:** `POST /form/generate`, `POST /form/submit-answer`, `GET /form/{id}/signals`

---

### 🧠 Feature 3 — AI Evaluation Intelligence Engine
> *Multi-stage composite scoring pipeline using resume + form + behavioral data*

The scoring system runs a **6-stage neural pipeline**:

```
Resume Parsing → Capability Detection → Behavioral Analysis
    → AI Authenticity Scan → Diagnostic Scoring → Composite Intelligence
```

**What it evaluates:**
- Resume text extraction (PDF, DOCX, TXT) via real file upload
- 5 capability dimensions: Patience · Deep Scenario Response · AI Stance · Diagnostic Teaching · Concept Simplification
- Behavioral metadata signals (typing patterns, pause frequency)
- Red flag detection with severity levels
- **Composite Trainer Intelligence Score** (0–100) with confidence rating
- Recruiter-safe AI summary with evidence tags
- **Endpoint:** `POST /evaluation/analyze`

---

### 🎥 Feature 4 — AI Authenticity Intelligence Engine (Forensic Module 04)
> *Detecting AI-assisted delivery in teaching demo videos*

The system distinguishes between:

| ✅ Authentic Teaching | ❌ AI-Assisted Delivery |
|---|---|
| Natural hesitation pauses | Robotic over-structured delivery |
| Dynamic gaze shifts | Fixed teleprompter eye patterns |
| Genuine conceptual recall | Rehearsed verbatim recall |
| Varied cadence rhythm | Monotone flat speech |

**Forensic pipeline stages:**
1. 🎞️ Frame Extraction
2. 👁️ Eye Movement Tracking
3. 🎵 Cadence Analysis
4. ⏸️ Pause Pattern Detection
5. 🗣️ Speech Naturalness Scoring
6. 🧠 Concept Recall Verification
7. 🤖 AI Dependency Scoring

**Output:**
- **Authenticity Score** (0–100) with `Verified Natural` / `AI Assisted` label
- AI Dependency Risk % (Low / Moderate / High)
- Teleprompter Detection probability + gaze consistency
- Cadence waveform analysis
- Timestamped forensic evidence nodes
- Recruiter Intelligence Summary
- **Endpoint:** `POST /authenticity/analyze`

---

### 🩺 Feature 5 — Diagnostic Teaching Intelligence Engine (CPS-01)
> *Evaluating whether a trainer can ISOLATE confusion, not just reteach*

The most critical evaluation module. Detects the difference between:

| ❌ Weak Trainer | ✅ Strong Trainer |
|---|---|
| Blindly reteaches the same material | Asks targeted diagnostic questions |
| Ignores the actual misconception | Isolates the root confusion node |
| Widens the problem space | Narrows the problem space |
| No evidence-based reasoning | Identifies root cause precisely |

**Forensic evaluation pipeline:**
```
Question Analysis → Reasoning Evaluation → Confusion Isolation
    → Misconception Mapping → Diagnostic Intelligence Scoring
```

**Generated intelligence:**
- **Diagnostic Intelligence Score** (0–100)
- Problem-Space Narrowing score
- Precision & Reasoning Depth metrics
- Root Cause Isolation: `Detected` / `Not Detected`
- Student Misconception Tags (extracted from trainer's response)
- Neural Evidence Logs with explanation of scoring rationale
- **Endpoints:** `POST /diagnostic/generate-scenario`, `POST /diagnostic/evaluate`

---

## 🏗️ System Architecture

```text
trainer-evaluation-engine-ai/
│
├── frontend/                          # React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.tsx            # Cinematic landing with AI agent showcase
│   │   │   ├── Dashboard.tsx          # Command center with live stats
│   │   │   ├── RequirementIntelligence.tsx   # Feature 1
│   │   │   ├── AdaptiveFrictionEvaluation.tsx # Feature 2
│   │   │   ├── AIEvaluationIntelligence.tsx  # Feature 3
│   │   │   ├── AIAuthenticityIntelligence.tsx # Feature 4
│   │   │   └── DiagnosticIntelligence.tsx    # Feature 5
│   │   ├── components/
│   │   │   ├── Layout.tsx             # App shell with sidebar
│   │   │   ├── Sidebar.tsx            # Navigation
│   │   │   ├── AgentCard.tsx          # Cinematic AI agent cards
│   │   │   └── IntelligencePreview.tsx
│   │   └── services/
│   │       └── api.ts                 # All backend API wrappers
│
├── backend/                           # FastAPI (Python 3.12+)
│   └── app/
│       ├── main.py                    # App entry + CORS + WebSocket
│       ├── routes/
│       │   ├── requirements.py        # Feature 1 routes
│       │   ├── form.py                # Feature 2 routes
│       │   ├── evaluation.py          # Feature 3 routes
│       │   ├── authenticity.py        # Feature 4 routes
│       │   └── diagnostic.py          # Feature 5 routes
│       ├── services/
│       │   ├── requirement_service.py
│       │   ├── form_service.py
│       │   ├── evaluation_service.py  # Resume parsing + multi-stage pipeline
│       │   ├── authenticity_service.py # Forensic video analysis
│       │   └── diagnostic_service.py  # CPS-01 diagnostic evaluation
│       └── models/
│           ├── evaluation.py
│           ├── authenticity.py
│           └── diagnostic.py
│
└── traineriq.db                       # SQLite database
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Backend** | FastAPI (Python 3.12+) |
| **Database** | SQLAlchemy + SQLite |
| **AI Engine** | Groq — Llama-3.3-70b-versatile |
| **File Parsing** | PyPDF2, python-docx |
| **Real-Time** | WebSockets |
| **Icons** | Lucide React |
| **Routing** | React Router (HashRouter — deployment safe) |

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** v18+
- **Python** 3.12+
- **Groq API Key** — [get one free at console.groq.com](https://console.groq.com)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/trainer-evaluation-engine-ai.git
cd trainer-evaluation-engine-ai
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
./venv/Scripts/activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `.env` in `/backend`:
```env
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=sqlite:///./traineriq.db
SECRET_KEY=your_secret_key_here
```

Start the backend server:
```bash
uvicorn app.main:app --reload
# Running at: http://localhost:8000
# Docs at:    http://localhost:8000/docs
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Running at: http://localhost:3000
```

> **Note:** The frontend connects directly to `http://localhost:8000`. CORS is fully configured on the backend.

---

## 🔌 API Reference

| Method | Endpoint | Feature | Description |
|---|---|---|---|
| `POST` | `/requirement/analyze` | Feature 1 | Analyze job requirement → blueprint |
| `POST` | `/form/generate` | Feature 2 | Generate adaptive evaluation form |
| `POST` | `/form/submit-answer` | Feature 2 | Submit answer + behavioral metadata |
| `GET` | `/form/{id}/signals` | Feature 2 | Get form friction signals |
| `POST` | `/evaluation/analyze` | Feature 3 | Run full evaluation pipeline on resume |
| `POST` | `/authenticity/analyze` | Feature 4 | Forensic video authenticity scan |
| `POST` | `/diagnostic/generate-scenario` | Feature 5 | Generate student confusion scenario |
| `POST` | `/diagnostic/evaluate` | Feature 5 | Evaluate trainer diagnostic response |
| `GET` | `/dashboard/stats` | Dashboard | Get live platform statistics |
| `WS` | `/ws/coaching` | Live | Real-time AI coaching suggestions |

---

## 🏆 Hackathon Highlights

- 🤖 **5 Real AI Modules** — every feature hits Groq's Llama-3.3-70b in production
- 📄 **Real File Processing** — actual PDF/DOCX resume parsing via `PyPDF2` and `python-docx`
- 🎥 **Video Upload Support** — teaching demo videos accepted and processed in the forensics module
- 🔐 **HashRouter Routing** — zero 404 errors on any deployment platform (Vercel, S3, Nginx)
- 🧬 **CPS-01 Diagnostic Engine** — unique IP that detects *pedagogical intelligence*, not just skill
- 🎨 **Cinema-Grade UI** — glassmorphism, neural grid overlays, framer motion, and animated agent cards
- ⚡ **Sub-100ms Routing** — all API calls go direct to Groq's LPU inference hardware

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for the future of education and AI-powered talent intelligence.**

[🔝 Back to top](#-traineriq-x)

</div>
