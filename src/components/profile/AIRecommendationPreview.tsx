import { useEffect, useState } from "react";

interface RecommendationItem {
  title: string;
  description: string;
}

interface AIRecommendationResponse {
  resilience_state: string;
  total_score: number;
  recommendations: RecommendationItem[];
}

interface ChatMessage {
  role: string;
  message: string;
}

export default function ResilienceAICoach() {
  const [data, setData] = useState<AIRecommendationResponse | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.PUBLIC_API_URL;

  useEffect(() => {
    fetchLatestRecommendation();
  }, []);

  const fetchLatestRecommendation = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_URL}/ai/latest-recommendation`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      setData(result);

      setMessages([
        {
          role: "assistant",
          message: `Hello 👋 I'm your AI Resilience Coach.

Your current resilience level is **${result.resilience_state}**.

I can help you:
• Build stronger coping strategies
• Improve emotional resilience
• Maintain positive habits

Ask me anything about your resilience journey.`,
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("Failed to load AI coach.");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !data) return;

    const newMessages = [...messages, { role: "user", message: input }];
    setMessages(newMessages);
    setInput("");
    setChatLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_URL}/ai/coach-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: input,
          resilience_level: data.resilience_state || "Unknown",
          score: data.total_score ?? 0,
          history: newMessages,
          recommendations: data.recommendations,
        }),
      });

      const result = await response.json();

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          message: result.reply,
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
        🧠 AI Resilience Coach
      </h3>

      {loading && (
        <p className="text-gray-500">Loading your resilience profile...</p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="mb-6">
          <p className="font-medium text-indigo-600">
            Resilience Level: {data.resilience_state}
          </p>

          <div className="mt-3 space-y-2">
            {data.recommendations.map((rec, index) => (
              <div
                key={index}
                className="border border-indigo-100 p-3 rounded-lg bg-indigo-50"
              >
                <h4 className="font-semibold text-indigo-700">{rec.title}</h4>
                <p className="text-gray-700 text-sm">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Window */}
      <div className="border rounded-xl p-4 h-72 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-xl text-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}

        {chatLoading && (
          <p className="text-gray-400 text-sm">Coach is thinking...</p>
        )}
      </div>

      {/* Input */}
      <div className="flex mt-4 gap-2">
        <input
          type="text"
          placeholder="Ask your resilience coach..."
          className="flex-1 border rounded-xl px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
