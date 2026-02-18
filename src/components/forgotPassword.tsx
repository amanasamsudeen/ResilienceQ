import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const API_URL = import.meta.env.PUBLIC_API_URL;

      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong");
        return;
      }

      setMessage("Password reset link sent to your email.");
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <Typography variant="h4" className="mb-6 text-center">
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <Input
            label="Enter your email"
            size="lg"
            icon={<EnvelopeIcon className="h-5 w-5" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && (
            <Typography className="text-sm text-red-500 mt-3">
              {error}
            </Typography>
          )}

          {message && (
            <Typography className="text-sm text-green-600 mt-3">
              {message}
            </Typography>
          )}

          <Button type="submit" fullWidth className="mt-6 bg-indigo-600">
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
}
