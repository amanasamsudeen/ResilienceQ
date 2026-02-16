import ThemeProvider from "./theme-provider";
import Navbar from "./defaultNavbar";
import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  AcademicCapIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

export function SignUp() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    institution: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Registration failed");
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch {
      setError("Server not reachable");
    }
  };

  return (
    <ThemeProvider>
      <section
        className="grid h-screen lg:grid-cols-2 items-center
                   bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      >
        {/* LEFT – FORM */}
        <div className="flex items-center justify-center px-8 sm:px-12">
          <div className="w-full max-w-md">
            <Typography
              variant="h3"
              className="mb-2 font-semibold text-blue-gray-900"
            >
              Create your <span className="text-indigo-600">ResilienceQ</span>{" "}
              account
            </Typography>

            <Typography className="mb-10 text-blue-gray-700">
              Begin your journey toward understanding and strengthening
              resilience.
            </Typography>

            <form className="space-y-5" onSubmit={handleRegister}>
              <Input
                size="lg"
                label="Full Name"
                name="full_name"
                icon={<UserIcon className="h-5 w-5" />}
                onChange={handleChange}
                required
              />

              <Input
                size="lg"
                label="Email"
                type="email"
                name="email"
                icon={<EnvelopeIcon className="h-5 w-5" />}
                onChange={handleChange}
                required
              />

              <Input
                size="lg"
                label="Password"
                type="password"
                name="password"
                icon={<LockClosedIcon className="h-5 w-5" />}
                onChange={handleChange}
                required
              />

              <Input
                size="lg"
                label="Institution / Organization"
                name="institution"
                icon={<AcademicCapIcon className="h-5 w-5" />}
                onChange={handleChange}
              />

              {/* Messages */}
              {error && (
                <Typography className="text-sm text-red-500">
                  {error}
                </Typography>
              )}
              {success && (
                <Typography className="text-sm text-green-600">
                  {success}
                </Typography>
              )}

              <Button
                type="submit"
                size="lg"
                fullWidth
                className="flex items-center justify-center gap-2 bg-indigo-600"
              >
                <ArrowRightCircleIcon className="h-5 w-5" />
                Get Started
              </Button>

              <Typography className="pt-4 text-center text-sm text-blue-gray-700">
                Already have an account?
                <a
                  href="/login"
                  className="ml-1 font-medium text-indigo-600 hover:underline"
                >
                  Log in
                </a>
              </Typography>
            </form>
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden lg:flex items-center justify-center p-10">
          <div className="relative h-full w-full max-w-[520px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="team.jpg"
              alt="Resilience illustration"
              className="h-full w-full object-cover scale-105"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-tr
                         from-indigo-900/60 via-indigo-900/30 to-transparent"
            />

            {/* Caption */}
            <div
              className="absolute bottom-6 left-6 right-6
                         rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-lg"
            >
              <Typography className="text-sm font-medium text-blue-gray-900">
                Join a trusted resilience assessment platform
              </Typography>
              <Typography className="text-xs text-blue-gray-600">
                Secure · Research-based · Student-focused
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}

export default SignUp;
