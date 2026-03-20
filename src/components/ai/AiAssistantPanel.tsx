import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiAssistantPanel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! Your **ResilienceQ** assistant here. 👋\n\nAsk me anything about building your inner strength or managing mental health!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const API_URL = import.meta.env.PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/ai/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentInput }),
      });

      if (!response.ok) throw new Error("Server error");

      const data: { answer: string } = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ I'm having trouble connecting. Please try again soon.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
      >
        <span className="text-2xl">💬</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex justify-end animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full sm:w-[450px] h-full bg-slate-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-white border-b shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                  RQ
                </div>
                <h2 className="font-bold text-slate-800 tracking-tight">
                  AI Assistant
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] px-4 py-3 rounded-2xl shadow-sm ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                    }`}
                  >
                    {/* Markdown Renderer for Organized Content */}
                    <div
                      className={`prose prose-sm max-w-none ${msg.role === "user" ? "prose-invert" : "prose-slate"}`}
                    >
                      <ReactMarkdown
                        components={{
                          strong: ({ node, ...props }) => (
                            <span
                              className="font-bold text-indigo-500 bg-indigo-50 px-1 rounded"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-2 last:mb-0" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p
                              className="mb-2 last:mb-0 leading-relaxed"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 font-medium transition-all"
                >
                  Send
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-3 uppercase tracking-widest font-bold">
                ResilienceQ AI
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
