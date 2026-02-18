import { useEffect, useState } from "react";

export default function Verify() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email...");
  const API_URL = import.meta.env.PUBLIC_API_URL;

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    fetch(`${API_URL}/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail || "Verification failed");
        }

        setStatus("success");
        setMessage(data.message || "Email verified successfully!");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-3">
          Welcome to ResilienceQ
        </h1>

        <p className="text-gray-600 text-sm mb-6">
          Build mental strength, emotional intelligence, and personal growth
          through intelligent resilience assessments.
        </p>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-3">
            <div className="text-green-500 text-4xl">✔</div>
            <p className="text-green-600 font-medium">{message}</p>
            <a
              href="/login"
              className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
            >
              Go to Login
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3">
            <div className="text-red-500 text-4xl">✖</div>
            <p className="text-red-600 font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
