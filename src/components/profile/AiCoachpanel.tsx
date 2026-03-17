import { useEffect, useState } from "react";

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
    // Ensure this only runs in browser
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUsername(userData?.name || "");

    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_URL}/assessment/history`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        body: JSON.stringify({
          username,
          history,
        }),
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
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">AI Resilience Coach</h2>

      <p className="text-gray-600 mb-4">
        Personalized coaching insights for <strong>{username}</strong>
      </p>

      <button
        onClick={generateInsight}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Generate Coaching Insight
      </button>

      {loading && (
        <p className="mt-4 text-gray-500">Generating AI insight...</p>
      )}

      {insight && (
        <div className="mt-6 bg-indigo-50 border border-indigo-200 p-4 rounded-xl">
          <h3 className="font-semibold text-indigo-700 mb-2">
            AI Coaching Insight
          </h3>

          <p className="text-gray-700 whitespace-pre-line">{insight}</p>
        </div>
      )}
    </div>
  );
}
