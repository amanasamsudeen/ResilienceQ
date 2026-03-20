import { useEffect, useState, useRef } from "react";

// ... (Interfaces remain the same)

export default function ResilienceAICoach() {
  const [data, setData] = useState<AIRecommendationResponse | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const API_URL = import.meta.env.PUBLIC_API_URL;

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatLoading]);

  useEffect(() => {
    fetchLatestRecommendation();
  }, []);

  const fetchLatestRecommendation = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/ai/latest-recommendation`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      setData(result);

      // Initial Coach Message
      setMessages([
        {
          role: "assistant",
          message: `Hello! I'm your Resilience Coach. Your current level is ${result.resilience_state}. How can I support you today?`,
        },
      ]);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !data) return;

    const userMessage = { role: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
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
          message: currentInput,
          resilience_level: data.resilience_state,

          history: [...messages, userMessage],
          recommendations: data.recommendations,
        }),
      });

      const result = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", message: result.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">Loading coach...</div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 border border-gray-200 rounded-2xl shadow-sm bg-white overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Ask me anything</h2>
        <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">
          Level: {data?.resilience_state}
        </span>
      </div>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-gray-100 text-gray-800 rounded-tl-none"
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed">
                {/* Basic Bold formatting for 'High' */}
                {msg.message.split("**High**").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="font-bold text-emerald-600">High</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {chatLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-none text-xs text-gray-400 animate-pulse">
              Coach is typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={sendMessage}
          disabled={chatLoading || !input.trim()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
