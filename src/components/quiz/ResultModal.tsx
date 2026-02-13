import {
  Dialog,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import AIRecommendationModal from "./AiRecommendationModal";

type Props = {
  answers: (number | null)[];
  onClose: () => void;
};

export default function ResultModal({ answers, onClose }: Props) {
  const [showAI, setShowAI] = useState(false);

  const score = answers.reduce((sum, val) => sum + (val ?? 0), 0);
  const maxScore = 150;

  let resilienceLevel = "";
  let color = "";

  if (score <= 60) {
    resilienceLevel = "Low";
    color = "bg-red-500";
  } else if (score <= 90) {
    resilienceLevel = "Below Average";
    color = "bg-orange-500";
  } else if (score <= 120) {
    resilienceLevel = "Moderate";
    color = "bg-yellow-500";
  } else {
    resilienceLevel = "High";
    color = "bg-green-500";
  }

  const progressPercent = Math.min((score / maxScore) * 100, 100);

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

          {/* Score */}
          <div className="text-center">
            <Typography className="text-sm text-gray-500">
              Total Score
            </Typography>
            <Typography variant="h2" className="font-extrabold">
              {score}
            </Typography>
            <Typography className="text-xs text-gray-500">
              out of {maxScore}
            </Typography>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full ${color} transition-all`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0</span>
              <span>60</span>
              <span>90</span>
              <span>120</span>
              <span>150</span>
            </div>
          </div>

          {/* Level */}
          <div className="text-center">
            <Typography className="text-sm text-gray-500">
              Resilience Level
            </Typography>
            <Typography variant="h6" className="font-semibold">
              {resilienceLevel} Resilience
            </Typography>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button fullWidth color="blue" onClick={() => setShowAI(true)}>
              View AI Recommendations
            </Button>

            <Button
              fullWidth
              color="green"
              onClick={() =>
                window.open(
                  "http://127.0.0.1:8000/assessment/download",
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
