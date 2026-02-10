import React from "react";
import { Typography } from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";
import {
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

function StepItem({ icon: Icon, step, title, description }) {
  return (
    <div className="relative flex items-start gap-4 group">
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <div>
        <Typography className="text-sm font-bold text-blue-600 mb-1">
          Step {step}
        </Typography>
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-1 font-semibold"
        >
          {title}
        </Typography>
        <Typography className="text-gray-600 max-w-sm">
          {description}
        </Typography>
      </div>
    </div>
  );
}

export function DevPresentation() {
  return (
    <ThemeProvider>
      <section className="relative bg-white py-24">
        <div className="container mx-auto mb-20 text-center">
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-4 font-extrabold"
          >
            How it <span className="text-blue-600">Works?</span>
          </Typography>
        </div>

        <div className="container mx-auto flex flex-col items-center gap-16 md:flex-row">
          {/* Left Content */}
          <div className="md:w-1/2">
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-6 leading-tight"
            >
              Simple. Scientific. Insightful.
            </Typography>

            <Typography color="blue-gray" className="mb-10 max-w-lg">
              Our process is designed to be quick, evidence-based, and easy to
              understand—helping you gain meaningful psychological insights.
            </Typography>
          </div>

          {/* Right Steps */}
          <div className="md:w-1/2 space-y-10">
            <StepItem
              icon={ClipboardDocumentCheckIcon}
              step="1"
              title="Take the Assessment"
              description="Answer 30 carefully designed questions about how you respond to stress and challenges."
            />

            <StepItem
              icon={ChartBarIcon}
              step="2"
              title="Get Your Score"
              description="Your responses are scientifically analyzed to calculate your resilience level."
            />

            <StepItem
              icon={SparklesIcon}
              step="3"
              title="Receive Insights"
              description="View personalized recommendations to strengthen your psychological resilience."
            />
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}

export default DevPresentation;
