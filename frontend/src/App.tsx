import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/autopsy" element={<SessionAutopsy />} />
          <Route path="/dna" element={<TrainerDNA />} />
          <Route path="/sentiment" element={<SentimentHeatmap />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/trainers/:id" element={<TrainerProfile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
