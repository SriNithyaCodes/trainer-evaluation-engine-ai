import { useEffect, useState } from 'react';
import { BrainCircuit, X } from 'lucide-react';

const COACHING_SUGGESTIONS = [
  '💡 Speak slower — students are taking notes.',
  '⚡ Engagement dropping — try asking a question!',
  '🎯 Add an interactive example here.',
  '📊 Consider a quick 1-minute poll.',
  '🔥 Great energy — keep it up!',
  '⚠️ Pacing is fast — pause for 10 seconds.',
  '🧠 Technical depth is excellent — check comprehension.',
];

export default function LiveCoachingBanner() {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Try to connect to the backend WebSocket
    let ws: WebSocket | null = null;
    let fallbackInterval: ReturnType<typeof setInterval>;

    const tryConnect = () => {
      try {
        ws = new WebSocket('ws://localhost:8000/ws/coaching');

        ws.onmessage = (event) => {
          setSuggestion(event.data);
          setVisible(true);
          // Auto-hide after 8s
          setTimeout(() => setVisible(false), 8000);
        };

        ws.onerror = () => startFallback();
        ws.onclose = () => startFallback();
      } catch {
        startFallback();
      }
    };

    const startFallback = () => {
      // Simulate suggestions every 15s if WS not available
      fallbackInterval = setInterval(() => {
        const random = COACHING_SUGGESTIONS[Math.floor(Math.random() * COACHING_SUGGESTIONS.length)];
        setSuggestion(`AI Suggestion: ${random}`);
        setVisible(true);
        setTimeout(() => setVisible(false), 8000);
      }, 15000);
    };

    tryConnect();

    return () => {
      ws?.close();
      clearInterval(fallbackInterval);
    };
  }, []);

  if (!visible || !suggestion) return null;

  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white text-sm font-medium animate-in slide-in-from-top">
      <BrainCircuit className="w-4 h-4 shrink-0 animate-pulse" />
      <span className="flex-1">{suggestion}</span>
      <button onClick={() => setVisible(false)} className="opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
