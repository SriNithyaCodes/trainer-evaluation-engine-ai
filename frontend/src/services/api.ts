/**
 * TrainerIQ X — Backend API Service
 * Connects the React frontend to the FastAPI backend at localhost:8000
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Grab token from localStorage (set on login)
const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem('traiq_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handle = async (res: Response) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
};

// ─── Auth ────────────────────────────────────────────────────────────────────

export const signup = (data: {
  full_name: string;
  email: string;
  password: string;
  organization: string;
  role: string;
}) =>
  fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

export const login = (email: string, password: string) => {
  const form = new URLSearchParams();
  form.append('username', email);
  form.append('password', password);
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,
  }).then(handle);
};

export const getMe = () =>
  fetch(`${BASE_URL}/auth/me`, { headers: getHeaders() }).then(handle);

// ─── Trainers ────────────────────────────────────────────────────────────────

export const createTrainer = (data: {
  trainer_name: string;
  department: string;
  specialization: string;
  experience: number;
}) =>
  fetch(`${BASE_URL}/trainers/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

export const getTrainers = () =>
  fetch(`${BASE_URL}/trainers/`, { headers: getHeaders() }).then(handle);

export const getTrainer = (id: number) =>
  fetch(`${BASE_URL}/trainers/${id}`, { headers: getHeaders() }).then(handle);

// ─── Sessions ────────────────────────────────────────────────────────────────

export const uploadSession = (formData: FormData) =>
  fetch(`${BASE_URL}/sessions/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem('traiq_token') || ''}` },
    body: formData,
  }).then(handle);

export const getSession = (id: number) =>
  fetch(`${BASE_URL}/sessions/${id}`, { headers: getHeaders() }).then(handle);

// ─── AI Features ─────────────────────────────────────────────────────────────

export const runAutopsy = (sessionId: number) =>
  fetch(`${BASE_URL}/ai/autopsy/${sessionId}`, {
    method: 'POST',
    headers: getHeaders(),
  }).then(handle);

export const predictGrowth = (trainerId: number) =>
  fetch(`${BASE_URL}/ai/predict/${trainerId}`, {
    method: 'POST',
    headers: getHeaders(),
  }).then(handle);

export const generateRoadmap = (trainerId: number) =>
  fetch(`${BASE_URL}/ai/roadmap/${trainerId}`, {
    method: 'POST',
    headers: getHeaders(),
  }).then(handle);

// New AI Operating System Features
export const simulateStudent = (data: { persona: string; message: string; context?: string }) =>
  fetch(`${BASE_URL}/ai/simulate`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

export const getReputation = (trainerId: number) =>
  fetch(`${BASE_URL}/ai/reputation/${trainerId}`, {
    method: 'POST',
    headers: getHeaders(),
  }).then(handle);

export const runEngagementReplay = (sessionId: number) =>
  fetch(`${BASE_URL}/ai/replay/${sessionId}`, {
    method: 'POST',
    headers: getHeaders(),
  }).then(handle);

export const updateAIModel = (modelId: string) =>
  fetch(`${BASE_URL}/ai/settings/model`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(modelId),
  }).then(handle);

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const getDashboardStats = () =>
  fetch(`${BASE_URL}/dashboard/stats`, { headers: getHeaders() }).then(handle);

export const getLeaderboard = () =>
  fetch(`${BASE_URL}/dashboard/leaderboard`, { headers: getHeaders() }).then(handle);

// ─── Requirements ────────────────────────────────────────────────────────────

export const analyzeRequirement = (data: any) =>
  fetch(`${BASE_URL}/requirement/analyze`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

// ─── Adaptive Friction Form ──────────────────────────────────────────────────

export const generateForm = (subject: string, trainerType: string) =>
  fetch(`${BASE_URL}/form/generate?subject=${encodeURIComponent(subject)}&trainer_type=${encodeURIComponent(trainerType)}`, {
    method: 'POST',
    headers: getHeaders(),
  }).then(handle);

export const submitAnswer = (data: { form_id: string; question_id: string; answer: string; behavior_metrics: any }) =>
  fetch(`${BASE_URL}/form/submit-answer`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

export const getFormSignals = (formId: string) =>
  fetch(`${BASE_URL}/form/${formId}/signals`, { headers: getHeaders() }).then(handle);

export const getFormState = (formId: string) =>
  fetch(`${BASE_URL}/form/${formId}/state`, { headers: getHeaders() }).then(handle);

// ─── AI Evaluation Intelligence ──────────────────────────────────────────────

export const analyzeEvaluation = (formData: FormData) =>
  fetch(`${BASE_URL}/evaluation/analyze`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem('traiq_token') || ''}` },
    body: formData,
  }).then(handle);

// ─── AI Authenticity Intelligence ───────────────────────────────────────────

export const analyzeAuthenticity = (formData: FormData) =>
  fetch(`${BASE_URL}/authenticity/analyze`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem('traiq_token') || ''}` },
    body: formData,
  }).then(handle);

// ─── Diagnostic Teaching Intelligence ───────────────────────────────────────

export const generateDiagnosticScenario = (subject: string, difficulty: string) =>
  fetch(`${BASE_URL}/diagnostic/generate-scenario?subject=${subject}&difficulty=${difficulty}`, {
    method: 'POST',
    headers: getHeaders(),
  }).then(handle);

export const evaluateDiagnosticResponse = (response: any) =>
  fetch(`${BASE_URL}/diagnostic/evaluate`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(response),
  }).then(handle);
