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
      <section className="h-full w-screen bg-white px-8 pt-16">
        <div className="container mx-auto relative">
          {/* Heading */}
          <div className="text-left mb-12">
            <Typography
              color="blue"
              className="font-bold text-lg mb-4 uppercase"
            >
              Research Insights on Resilience
            </Typography>

            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-6 leading-tight"
            >
              Resilience is the Foundation of Mental Well-Being
            </Typography>

            <Typography color="blue-gray" className="mb-6 lg:w-[32rem]">
              Psychological resilience reflects an individual’s ability to cope
              with stress, adapt to change, and recover from adversity.
              Understanding resilience early can prevent long-term mental health
              risks and promote sustainable wellbeing.
            </Typography>
          </div>

          {/* Content */}
          <div className="lg:flex relative items-center">
            <div className="lg:w-1/2">
              <div className="grid gap-y-16 gap-x-8 grid-cols-2 mb-10">
                {stats.map((props, key) => (
                  <StatsCard key={key} {...props} />
                ))}
              </div>

              {/* <Button color="dark" className="flex items-center">
                Take the Resilience Assessment
              </Button> */}
            </div>

            {/* Visual */}
            <img
              src="career.jpg"
              alt="resilience illustration"
              className="lg:w-1/2 rounded-3xl hidden md:flex ml-auto lg:absolute -right-32 -top-24 shadow-lg"
            />
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}

export default FigmaPresentation;
