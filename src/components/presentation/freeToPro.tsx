import React from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";

function StatsCard({ count, title, desc }) {
  return (
    <Card color="transparent" shadow={false}>
      <Typography
        variant="h1"
        className="mb-4 text-5xl text-dark font-extrabold"
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
    count: "70%",
    title: "Stress-Related Challenges",
    desc: "University students report high stress impacting academic performance and wellbeing.",
  },
  {
    count: "3x",
    title: "Higher Adaptability",
    desc: "Individuals with strong resilience adapt better to academic and life challenges.",
  },
  {
    count: "50%",
    title: "Reduced Burnout Risk",
    desc: "Resilience skills significantly lower emotional exhaustion and burnout.",
  },
  {
    count: "Early",
    title: "Self-Awareness Matters",
    desc: "Early assessment helps identify risk and encourages healthy coping strategies.",
  },
];

export function FigmaPresentation() {
  return (
    <ThemeProvider>
      <section className="h-full w-screen bg-white px-8 py-20">
        <div className="container mx-auto relative">
          {/* Heading */}
          <div className="text-left mb-12">
            <Typography
              color="blue"
              className="font-bold text-lg mb-4 uppercase"
            >
              Why Psychological Resilience Matters
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
