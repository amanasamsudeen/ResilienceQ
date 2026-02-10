import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  ScaleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  range: string;
  children: React.ReactNode;
}

function FeatureCard({ icon, title, range, children }: FeatureCardProps) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardBody className="grid justify-center text-center">
        <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-blue-600 text-white">
          {icon}
        </div>

        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-1 font-semibold"
        >
          {title}
        </Typography>

        <Typography className="mb-3 text-sm font-medium text-blue-600">
          Score Range: {range}
        </Typography>

        <Typography className="px-4 text-gray-700 leading-relaxed">
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
}

const bursLevels = [
  {
    icon: <ArrowTrendingDownIcon className="h-6 w-6" />,
    title: "Low Resilience",
    range: "30 – 60",
    description:
      "Indicates difficulty in coping with stress, slow recovery from adversity, low confidence in handling future challenges, and limited flexibility in problem-solving.",
  },
  {
    icon: <ExclamationTriangleIcon className="h-6 w-6" />,
    title: "Below Average Resilience",
    range: "61 – 90",
    description:
      "Reflects moderate struggles in managing negative events, inconsistent coping strategies, and reduced optimism during stressful situations.",
  },
  {
    icon: <ScaleIcon className="h-6 w-6" />,
    title: "Moderate Resilience",
    range: "91 – 120",
    description:
      "Represents a balanced ability to cope with challenges, learn from past experiences, and regain emotional stability over time.",
  },
  {
    icon: <SparklesIcon className="h-6 w-6" />,
    title: "High Resilience",
    range: "121 – 150",
    description:
      "Indicates strong coping skills, quick recovery to normalcy, optimism, adaptability, confidence, and effective problem-solving abilities.",
  },
];

export function FeatureSectionOne() {
  return (
    <section className="py-28 px-4 bg-gray-50">
      <div className="container mx-auto mb-20 text-center">
        <Typography color="blue" className="mb-2 font-bold text-lg">
          BURS-2014 Interpretation
        </Typography>

        <Typography variant="h2" color="blue-gray" className="mb-4">
          BURS Score Classification
        </Typography>

        <Typography
          variant="lead"
          className="mx-auto w-full px-4 text-blue-gray-700 md:w-10/12 lg:w-7/12"
        >
          The Bharathiar University Resilience Scale (BURS) yields total scores
          ranging from <strong>30 to 150</strong>, where higher scores indicate
          greater psychological resilience. The following classification helps
          interpret individual resilience levels meaningfully.
        </Typography>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {bursLevels.map(({ icon, title, range, description }) => (
          <FeatureCard key={title} icon={icon} title={title} range={range}>
            {description}
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}

export default FeatureSectionOne;
