import { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import {
  RocketLaunchIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
interface User {
  id: number;
  name: string;
  email: string;
}

export default function FloatingAICoachBar() {
  const [visible, setVisible] = useState(true);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "Daily AI activities to boost your resilience",
    "Personalized coaching based on your score",
    "Build stronger habits with guided steps",
    "Track your growth with smart insights",
  ];

  const handleCoach = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login?message=login_required";
      return;
    }
    window.location.href = "/profile";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl animate-fade-in-up">
      {" "}
      <div className="relative rounded-2xl border bg-white shadow-xl p-4 flex items-center justify-between gap-4">
        {" "}
        {/* LEFT CONTENT */}{" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
            {" "}
            <SparklesIcon className="h-5 w-5 animate-pulse" />{" "}
          </div>{" "}
          <div>
            {" "}
            <Typography className="font-semibold text-sm">
              {" "}
              AI Resilience Coach{" "}
            </Typography>{" "}
            <Typography className="text-gray-600 text-xs">
              {" "}
              {messages[currentMessage]}{" "}
            </Typography>{" "}
          </div>{" "}
        </div>{" "}
        {/* RIGHT ACTIONS */}{" "}
        <div className="flex items-center gap-2">
          {" "}
          <Button
            size="sm"
            color="indigo"
            className="flex items-center gap-1 px-3 py-1"
            onClick={handleCoach}
          >
            {" "}
            <RocketLaunchIcon className="h-4 w-4" />
            {token ? "Go to Coach" : "Login to Start"}
          </Button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
