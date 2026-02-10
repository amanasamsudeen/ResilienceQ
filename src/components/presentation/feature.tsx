import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  BeakerIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UserCircleIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

function FeatureCard({ icon: Icon, title, children }) {
  return (
    <Card
      shadow={false}
      className="group relative rounded-2xl border border-blue-gray-100 bg-white/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <CardBody className="text-center px-8 py-10">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
          <Icon className="h-8 w-8" />
        </div>

        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-3 font-semibold"
        >
          {title}
        </Typography>

        <Typography className="font-normal text-gray-600 leading-relaxed">
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
}

const features = [
  {
    icon: BeakerIcon,
    title: "Science-Based",
    description:
      "Built on validated psychological research and standardized resilience frameworks.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Private & Secure",
    description:
      "Your responses are confidential and protected with secure data handling practices.",
  },
  {
    icon: LightBulbIcon,
    title: "Actionable Insights",
    description:
      "Clear, personalized feedback to help you strengthen your resilience skills.",
  },
  {
    icon: UserCircleIcon,
    title: "Self-Awareness",
    description:
      "Understand your emotional patterns and coping mechanisms more deeply.",
  },
  {
    icon: ChartBarIcon,
    title: "Goal-Oriented Growth",
    description: "Identify areas for improvement and track progress over time.",
  },
  {
    icon: SparklesIcon,
    title: "Personalized Guidance",
    description:
      "Tailored recommendations based on your unique assessment profile.",
  },
];

export function FeatureLanding() {
  return (
    <section className="relative px-4 py-24 bg-gradient-to-b from-white to-blue-50">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
      </div>

      {/* Heading */}
      <div className="container mx-auto mb-20 text-center">
        <Typography
          variant="h3"
          color="blue-gray"
          className="mb-4 font-extrabold"
        >
          Why Measure <span className="text-blue-600">Resilience?</span>
        </Typography>

        <Typography className="mx-auto max-w-2xl text-gray-600">
          Measuring resilience helps you understand how you respond to stress,
          adapt to change, and grow stronger through challenges.
        </Typography>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon, title, description }) => (
          <FeatureCard key={title} icon={icon} title={title}>
            {description}
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}

export default FeatureLanding;
