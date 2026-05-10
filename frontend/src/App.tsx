import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import SessionAutopsy from './pages/SessionAutopsy';
import TrainerDNA from './pages/TrainerDNA';
import SentimentHeatmap from './pages/SentimentHeatmap';
import Predictions from './pages/Predictions';
import Leaderboard from './pages/Leaderboard';
import TrainerProfile from './pages/TrainerProfile';

// New Futuristic Pages
import Simulator from './pages/Simulator';
import ReputationEngine from './pages/ReputationEngine';
import EngagementReplay from './pages/EngagementReplay';
import Settings from './pages/Settings';
import AISettings from './pages/AISettings';
import RequirementIntelligence from './pages/RequirementIntelligence';
import AdaptiveFrictionEvaluation from './pages/AdaptiveFrictionEvaluation';
import AIEvaluationIntelligence from './pages/AIEvaluationIntelligence';
import AIAuthenticityIntelligence from './pages/AIAuthenticityIntelligence';
import DiagnosticIntelligence from './pages/DiagnosticIntelligence';

// Layout
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected App Routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/intelligence" element={<RequirementIntelligence />} />
          <Route path="/evaluation" element={<AdaptiveFrictionEvaluation />} />
          <Route path="/intelligence-engine" element={<AIEvaluationIntelligence />} />
          <Route path="/authenticity-engine" element={<AIAuthenticityIntelligence />} />
          <Route path="/diagnostic-engine" element={<DiagnosticIntelligence />} />
          <Route path="/autopsy" element={<SessionAutopsy />} />
          <Route path="/dna" element={<TrainerDNA />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/dashboard" element={<Navigate to="/intelligence" replace />} />
          <Route path="/" element={<Navigate to="/intelligence" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

