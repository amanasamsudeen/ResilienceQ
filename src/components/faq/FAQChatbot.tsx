import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const API_URL = "http://localhost:8000/api/chat"; // FastAPI RAG backend

export default function FAQChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi Your assistant here. Ask me anything about resilience and mental health!",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }), // keep this as question
      });

      const data: { answer: string; sources: string[] } = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.answer }, // use answer instead of reply
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Unable to connect to the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-[480px] flex flex-col p-4 shadow-xl rounded-xl">
      <Typography variant="h6" className="mb-2">
        Resilience<span className="text-blue-600">Q</span> Assistant
      </Typography>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] text-sm ${
              msg.sender === "bot"
                ? "bg-blue-50 text-blue-gray-900"
                : "bg-gray-800 text-white ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Typing...</div>}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          label="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button color="blue" onClick={sendMessage} disabled={loading}>
          Send
        </Button>
      </div>
    </Card>
  );
}
