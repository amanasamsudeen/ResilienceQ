import {
  Dialog,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  TrophyIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import AIRecommendationModal from "./AiRecommendationModal";
import HalfCircleGauge from "./halfcircle";

type Props = {
  answers: (number | null)[];
  excelPath: string;
  onClose: () => void;
};

export default function ResultModal({ answers, excelPath, onClose }: Props) {
  const [showAI, setShowAI] = useState(false);
  const negativeQuestions = [5, 6, 9, 10, 12, 15, 16, 23, 25, 27];

  const score = answers.reduce<number>((sum, val, index) => {
    if (val === null) return sum;

    if (negativeQuestions.includes(index)) {
      return sum + (6 - val); // reverse scoring
    }

    return sum + val;
  }, 0);

  const maxScore = 150;

  let resilienceLevel = "";
  let color = "";
  let message = "";
  let Icon = SparklesIcon;
  if (score <= 60) {
    resilienceLevel = "Low";
    color = "bg-red-500";
    message =
      "You're going through a challenging phase. Start small—every step builds resilience.";
    Icon = SparklesIcon;
  } else if (score <= 90) {
    resilienceLevel = "Below Average";
    color = "bg-orange-500";
    message =
      "You're holding on. With consistent effort, you can strengthen your resilience further.";
    Icon = SparklesIcon;
  } else if (score <= 120) {
    resilienceLevel = "Moderate";
    color = "bg-yellow-500";
    message =
      "You're doing well! Keep building healthy habits to reach a stronger mindset.";
    Icon = FireIcon;
  } else {
    resilienceLevel = "High";
    color = "bg-green-500";
    message =
      "Excellent! You have strong resilience. Keep growing and inspiring others.";
    Icon = TrophyIcon;
  }

  const progressPercent = Math.min((score / maxScore) * 100, 100);

  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius;

  // progress (0 → 1)
  const progress = Math.min(score / maxScore, 1);

  // stroke offset for semi-circle
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <>
      <Dialog open={true} handler={onClose} size="sm">
        <DialogBody className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <Typography variant="h4" className="font-bold">
              Resilience Assessment Result
            </Typography>
            <Typography className="text-sm text-gray-600">
              Bharathiar University Resilience Scale (BURS)
            </Typography>
          </div>

          <div className="text-center bg-gray-50 p-6 rounded-2xl shadow-sm">
            <Typography className="text-sm text-gray-500">
              Your Score
            </Typography>

            <Typography
              variant="h2"
              className={`font-extrabold ${
                resilienceLevel === "Low"
                  ? "text-red-600"
                  : resilienceLevel === "Below Average"
                    ? "text-orange-600"
                    : resilienceLevel === "Moderate"
                      ? "text-yellow-600"
                      : "text-green-600"
              }`}
            >
              {score}
            </Typography>

            <Typography className="text-sm text-gray-500">
              out of {maxScore}
            </Typography>
          </div>

          <div className="space-y-3">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="w-[40%] bg-red-400" /> {/* 0–60 */}
              <div className="w-[20%] bg-orange-400" /> {/* 60–90 */}
              <div className="w-[20%] bg-yellow-400" /> {/* 90–120 */}
              <div className="w-[20%] bg-green-400" /> {/* 120–150 */}
            </div>

            <div className="relative h-4">
              <div
                className="absolute top-0 transform -translate-x-1/2"
                style={{ left: `${(score / maxScore) * 100}%` }}
              >
                <div className="w-3 h-3 bg-black rounded-full shadow" />
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>60</span>
              <span>90</span>
              <span>120</span>
              <span>150</span>
            </div>
          </div>

          <div className="text-center">
            <Typography className="text-sm text-gray-500">
              Your Resilience Level
            </Typography>

            <Typography
              variant="h5"
              className={`font-bold ${
                resilienceLevel === "Low"
                  ? "text-red-600"
                  : resilienceLevel === "Below Average"
                    ? "text-orange-600"
                    : resilienceLevel === "Moderate"
                      ? "text-yellow-600"
                      : "text-green-600"
              }`}
            >
              {resilienceLevel}
            </Typography>
          </div>

          {/* 🔥 INSIGHT */}
          {/* <div className="bg-gray-50 p-4 rounded-xl border text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon className="h-5 w-5 text-indigo-500" />
              <Typography className="font-semibold">Your Insight</Typography>
            </div>

            <Typography className="text-sm text-gray-600">{message}</Typography>
          </div> */}

          <div className="space-y-3">
            <Button fullWidth color="purple" onClick={() => setShowAI(true)}>
              View AI Recommendations
            </Button>

            <Button
              fullWidth
              color="blue"
              onClick={() =>
                window.open(
                  `http://127.0.0.1:8000/assessment/download/${excelPath}?t=${Date.now()}`,
                  "_blank",
                )
              }
            >
              Download Excel Report
            </Button>

            <Button fullWidth variant="outlined" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogBody>
      </Dialog>

      {showAI && (
        <AIRecommendationModal
          resilienceLevel={resilienceLevel}
          score={score}
          answers={answers}
          onClose={() => setShowAI(false)}
        />
      )}
    </>
  );
}
