import React from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";

function StatsCard({ count, title, desc }) {
  return (
    <Card color="transparent" shadow={false}>
      <Typography
        variant="h1"
        className="text-5xl font-bold bg-gradient-to-r 
                   from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4"
      >
        {count}
      </Typography>
      <Typography variant="h5" color="blue-gray" className="mb-2">
        {title}
      </Typography>
      <Typography color="gray">{desc}</Typography>
    </Card>
  );
}

const stats = [
  {
    count: "10%",
    title: "Gender & Humanity Influence",
    desc: "About 10% of differences in psychological problems among orphan adolescents are explained by gender and level of humanity.",
  },
  {
    count: "80–90%",
    title: "Low Socioeconomic Background",
    desc: "Most adolescents in resilience studies come from lower socioeconomic backgrounds, and 20–30% have parents with limited literacy.",
  },
  {
    count: "13%",
    title: "Program-Based Resilience Gain",
    desc: "Around 13% of resilience improvement was directly linked to structured intervention programs, with lasting positive effects over time.",
  },
  {
    count: "50%+",
    title: "PERMA & Resilience",
    desc: "More than 50% of resilience is influenced by positive emotions, engagement, meaning, achievement, and emotional regulation.",
  },
];

export function FigmaPresentation() {
  return (
    <ThemeProvider>
      <section className="w-full bg-gradient-to-b from-white to-blue-50 py-24 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            <Typography className="font-semibold tracking-widest text-blue-600 uppercase mb-4">
              Research Insights on Resilience
            </Typography>

            <Typography
              variant="h2"
              color="blue-gray"
              className="font-bold mb-6 leading-tight"
            >
              Resilience is the Foundation of Mental Well-Being
            </Typography>

            <Typography color="gray" className="max-w-2xl mx-auto">
              Psychological resilience reflects an individual’s ability to cope
              with stress, adapt to change, and recover from adversity.
              Understanding resilience early can prevent long-term mental health
              risks and promote sustainable wellbeing.
            </Typography>
          </div>

          {/* Stats Layout */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-2xl p-8 
                           hover:shadow-xl transition duration-300"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl" />

                <Typography
                  variant="h2"
                  className="text-4xl font-extrabold text-indigo-600 mb-4"
                >
                  {item.count}
                </Typography>

                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-semibold mb-3"
                >
                  {item.title}
                </Typography>

                <Typography color="gray" className="text-sm leading-relaxed">
                  {item.desc}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}

export default FigmaPresentation;
