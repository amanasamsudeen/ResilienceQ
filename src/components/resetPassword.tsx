import { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) setToken(t);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const API_URL = import.meta.env.PUBLIC_API_URL;

      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid token");
        return;
      }

      setMessage("Password updated successfully!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <Typography variant="h4" className="mb-6 text-center">
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            label="New Password"
            size="lg"
            icon={<LockClosedIcon className="h-5 w-5" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
