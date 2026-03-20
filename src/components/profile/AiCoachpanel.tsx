import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"; // Optional: npm install react-markdown

interface TrendItem {
  date: string;
  score: number;
  level: string;
}

export default function AICoachPanel() {
  const [history, setHistory] = useState<TrendItem[]>([]);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const API_URL = import.meta.env.PUBLIC_API_URL;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUsername(userData?.name || "Member");
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/assessment/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const formatted = data.map((item: any) => ({
        date: new Date(item.created_at).toLocaleDateString(),
        score: item.score,
        level: item.level,
      }));
      setHistory(formatted);
    } catch (error) {
      console.error("History fetch error", error);
    }
  };

  const generateInsight = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/ai/resilience-coach`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, history }),
      });
      const data = await response.json();
      setInsight(data.insight);
    } catch (error) {
      console.error("AI Coach error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* Header Section */}
      <div className="bg-indigo-600 rounded-3xl p-8 shadow-xl text-white mb-8">
        <h2 className="text-3xl font-bold mb-2">Resilience Coach</h2>
        <p className="text-indigo-100 opacity-90">
          Welcome back,{" "}
          <span className="font-semibold text-white">{username}</span>. Ready to
          discover your inner strengths today?
        </p>

        <button
          onClick={generateInsight}
          disabled={loading}
          className={`mt-6 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2
            ${loading ? "bg-white/20 cursor-not-allowed" : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg active:scale-95"}`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              Analyzing patterns...
            </>
          ) : (
            "✨ Generate Daily Insight"
          )}
        </button>
      </div>

      {/* Insight Display */}
      {insight && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
              <h3 className="text-slate-800 font-bold flex items-center gap-2">
                <span className="text-xl">🧭</span> Your Personalized Compass
              </h3>
            </div>

            <div className="p-8 prose prose-slate max-w-none">
              {/* Using a simple custom renderer or ReactMarkdown */}
              <div className="text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                {/* Formatting logic: Split by headers to create visual separation */}
                {insight.split("###").map(
                  (section, idx) =>
                    section.trim() && (
                      <div
                        key={idx}
                        className={
                          idx > 0 ? "mt-8 pt-6 border-t border-slate-50" : ""
                        }
                      >
                        <ReactMarkdown>
                          {idx > 0 ? `### ${section}` : section}
                        </ReactMarkdown>
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>

          <p className="text-center text-slate-400 text-xs mt-6 uppercase tracking-widest">
            Powered by ResilienceQ Intelligence
          </p>
        </div>
      )}

      {/* Empty State */}
      {!insight && !loading && (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
          <div className="text-4xl mb-4 text-slate-300">🌱</div>
          <p className="text-slate-500">
            Click the button above to start your daily coaching session.
          </p>
        </div>
      )}
    </div>
  );
}
