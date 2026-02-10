import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";
import Navbar from "../navbar";
import {
  SparklesIcon,
  HeartIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export function HeroSectionTwo() {
  return (
    <ThemeProvider>
      <Navbar />
      <header className="relative w-screen bg-gradient-to-br from-blue-50 to-white px-8 py-12 overflow-hidden">
        <div className="container mx-auto grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left relative z-10">
            <div className="mb-8 inline-flex items-center rounded-lg border border-blue-200 bg-white py-1 pl-1 pr-3 shadow-sm">
              <Typography
                variant="small"
                className="mr-3 rounded-md bg-blue-600 py-0.5 px-3 font-medium text-white"
              >
                Scientifically Validated
              </Typography>
              <Typography
                color="blue-gray"
                variant="small"
                className="!flex !items-center !font-semibold"
              >
                Based on BURS-2014 | Bharathiar University
              </Typography>
            </div>

            <Typography className="mb-6 text-lg leading-relaxed text-blue-gray-800 lg:pr-20">
              <strong>ResilienceQ</strong> is an interactive, AI-supported
              digital self-assessment and quiz-based platform developed from the
              scientifically validated{" "}
              <strong>
                Bharathiar University Resilience Scale (BURS-2014)
              </strong>{" "}
              by Prof.N. Annalakshmi Narayanan. The platform is designed for
              students, young adults, educators, counselors, mental-health
              professionals, and researchers to assess individual resilience
              across multiple psychological domains in an engaging and
              accessible format.
            </Typography>

            <Typography className="mb-6 text-lg leading-relaxed text-blue-gray-700 lg:pr-20">
              Through structured quiz interactions, users gain deeper
              self-awareness, build self-confidence, strengthen emotional
              regulation, and identify personal coping patterns. ResilienceQ
              promotes positive self-reflection, adaptive thinking,
              problem-solving skills, and a hopeful future
              orientation—supporting individuals in navigating stress,
              adversity, and life transitions more effectively.
            </Typography>

            <Typography className="text-lg leading-relaxed text-blue-gray-700 lg:pr-20">
              For educators and researchers, ResilienceQ provides a standardized
              and validated resilience assessment tool suitable for screening,
              academic research, program evaluation, and large-scale data
              collection, bridging scientific credibility with real-world
              application to foster resilience development at scale.
            </Typography>
          </div>

          {/* RIGHT VISUAL SECTION */}
          <div className="relative hidden lg:block">
            {/* Main Image */}
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              alt="Psychological resilience"
              className="rounded-3xl shadow-2xl w-[420px] ml-auto"
            />

            {/* Floating Image */}
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
              alt="Self reflection"
              className="absolute -bottom-16 right-52 w-56 rounded-2xl shadow-xl"
            />

            {/* Feature Cards */}
            <Card className="absolute -top-10 right-24 p-4 w-56 shadow-lg">
              <div className="flex items-center gap-3">
                <SparklesIcon className="h-6 w-6 text-blue-600" />
                <Typography variant="h6">Self-Awareness</Typography>
              </div>
              <Typography className="mt-2 text-sm text-gray-600">
                Insight into personal resilience strengths and vulnerabilities.
              </Typography>
            </Card>

            <Card className="absolute top-36 -right-6 p-4 w-56 shadow-lg">
              <div className="flex items-center gap-3">
                <HeartIcon className="h-6 w-6 text-pink-500" />
                <Typography variant="h6">Emotional Regulation</Typography>
              </div>
              <Typography className="mt-2 text-sm text-gray-600">
                Identification of coping styles and emotional balance.
              </Typography>
            </Card>

            <Card className="absolute bottom-0 right-12 p-4 w-56 shadow-lg">
              <div className="flex items-center gap-3">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
                <Typography variant="h6">Validated Measurement</Typography>
              </div>
              <Typography className="mt-2 text-sm text-gray-600">
                Reliable scores suitable for research and screening.
              </Typography>
            </Card>
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
}

export default HeroSectionTwo;
