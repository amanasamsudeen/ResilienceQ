import ThemeProvider from "./theme-provider";
import { useState } from "react";
import {
  Typography,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightCircleIcon,
  UserPlusIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlelogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const API_URL = import.meta.env.PUBLIC_API_URL;

      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setError(loginData.detail || "Login failed");
        return;
      }

      // Store token
      localStorage.setItem("access_token", loginData.access_token);
      localStorage.setItem("role", loginData.role);
      // Fetch profile
      const meResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
        },
      });

      const userData = await meResponse.json();

      if (!meResponse.ok) {
        setError("Failed to fetch user profile");
        return;
      }

      localStorage.setItem("user", JSON.stringify(userData));

      setSuccess("Login successful!");

      setTimeout(() => {
        if (loginData.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Server not reachable");
    }
  };

  return (
    <ThemeProvider>
      <section className="relative grid h-screen lg:grid-cols-2 items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* 🔹 HOME BUTTON */}
        <IconButton
          variant="text"
          onClick={() => (window.location.href = "/")}
          className="absolute top-6 left-6 z-50"
        >
          <HomeIcon className="h-6 w-6 text-indigo-600" />
        </IconButton>

        {/* LEFT – FORM */}
        <div className="flex items-center justify-center px-8 sm:px-12">
          <div className="w-full max-w-md">
            <Typography
              variant="h3"
              className="mb-2 font-semibold text-blue-gray-900"
            >
              Welcome Back to{" "}
              <span className="text-indigo-600">ResilienceQ</span>
            </Typography>

            <Typography className="mb-10 text-blue-gray-700">
              Sign in to continue your resilience assessment journey.
            </Typography>

            <form onSubmit={handlelogin}>
              {/* Email */}
              <div className="mb-6">
                <Input
                  size="lg"
                  label="Email"
                  type="email"
                  name="email"
                  icon={<EnvelopeIcon className="h-5 w-5" />}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-2">
                <Input
                  size="lg"
                  label="Password"
                  type="password"
                  name="password"
                  icon={<LockClosedIcon className="h-5 w-5" />}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 🔹 Forgot Password */}
              <div className="mb-6 text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Messages */}
              {error && (
                <Typography className="mb-3 text-sm text-red-500">
                  {error}
                </Typography>
              )}

              {success && (
                <Typography className="mb-3 text-sm text-green-600">
                  {success}
                </Typography>
              )}

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                fullWidth
                className="mt-2 flex items-center justify-center gap-2 bg-indigo-600"
              >
                <ArrowRightCircleIcon className="h-5 w-5" />
                Sign In
              </Button>

              {/* Signup */}
              <Typography className="mt-6 text-center text-sm text-blue-gray-700">
                Don&apos;t have an account?
                <a
                  href="/signup"
                  className="ml-2 inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline"
                >
                  <UserPlusIcon className="h-4 w-4" />
                  Sign Up
                </a>
              </Typography>
            </form>
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden lg:flex items-center justify-center p-10">
          <div className="relative h-full w-full max-w-[520px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="resilience.jpg"
              alt="Resilience illustration"
              className="h-full w-full object-cover scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/60 via-indigo-900/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-lg">
              <Typography className="text-sm font-medium text-blue-gray-900">
                Build emotional strength with data-driven insights
              </Typography>
              <Typography className="text-xs text-blue-gray-600">
                Evidence-based resilience assessment platform
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}

export default SignIn;
