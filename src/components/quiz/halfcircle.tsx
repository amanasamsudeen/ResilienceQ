import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";

type Props = {
  score: number;
  maxScore: number;
  colorClass: string;
};

export default function HalfCircleGauge({
  score,
  maxScore,
  colorClass,
}: Props) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // 🔥 Bigger size
  const radius = 180; // increased
  const stroke = 18; // thicker arc
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius;

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const step = 16;
    const increment = score / (duration / step);

    const interval = setInterval(() => {
      start += increment;
      if (start >= score) {
        start = score;
        clearInterval(interval);
      }
      setAnimatedScore(start);
    }, step);

    return () => clearInterval(interval);
  }, [score]);

  const progress = Math.min(animatedScore / maxScore, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex justify-center w-full py-6">
      <div className="relative w-full max-w-md">
        {" "}
        {/* controls width */}
        <svg
          className="w-full h-auto -mt-24"
          viewBox={`0 0 ${radius * 2} ${radius}`}
        >
          {/* Background arc */}
          <path
            d={`
              M ${stroke} ${radius}
              A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - stroke} ${radius}
            `}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />

          {/* Progress arc */}
          <path
            d={`
              M ${stroke} ${radius}
              A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - stroke} ${radius}
            `}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-700 ease-out`}
          />
        </svg>
        {/* 🔥 Centered Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-2">
          <Typography variant="h2" className="font-bold">
            {Math.round(animatedScore)}
          </Typography>
          <Typography className="text-xl text-gray-500 font-bold">
            / {maxScore}
          </Typography>
        </div>
      </div>
    </div>
  );
}
