import React from "react";
import { Typography } from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";
import {
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

function StepCard({ icon: Icon, step, title, description }) {
  return (
    <div className="relative group">
      {/* Step number */}
      <span className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-lg">
        {step}
      </span>

      <div className="flex gap-5 rounded-2xl border border-blue-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <Icon className="h-7 w-7" />
        </div>

        {/* Content */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            {title}
          </Typography>
          <Typography className="text-gray-600 max-w-sm">
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export function DevPresentation() {
  return (
    <ThemeProvider>
      <section className="relative bg-white overflow-hidden">
        {/* Section Heading */}
        <div className="container mx-auto mb-20 text-center">
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-4 font-extrabold mt-4"
          >
            How it <span className="text-blue-600">Works ?</span>
          </Typography>
          <Typography color="blue-gray" className="max-w-xl mx-auto">
            A simple, science-backed process designed to help you understand and
            strengthen your psychological resilience.
          </Typography>
        </div>

        {/* Steps Grid */}
        <div className="container mx-auto grid gap-12 md:grid-cols-2 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-blue-gray-100" />

          <StepCard
            icon={ClipboardDocumentCheckIcon}
            step="1"
            title="Take the Assessment"
            description="Complete a scientifically validated questionnaire designed to measure resilience and stress responses."
          />

          <StepCard
            icon={ChartBarIcon}
            step="2"
            title="Get Instant Insights"
            description="Your responses are analyzed instantly using standardized scoring methods."
          />

          <StepCard
            icon={ExclamationCircleIcon}
            step="3"
            title="View Severity Level"
            description="Understand whether your resilience level falls within low, moderate, or high risk categories."
          />

          <StepCard
            icon={SparklesIcon}
            step="4"
            title="Explore Personalized Support"
            description="Receive tailored recommendations, coping strategies, and resources to build resilience."
          />
        </div>

        {/* Decorative blur */}
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-100 blur-3xl opacity-40" />
      </section>
    </ThemeProvider>
  );
}

export default DevPresentation;
