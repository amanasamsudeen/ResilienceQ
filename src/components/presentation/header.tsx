import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";
import Navbar from "../navbar";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

export function HeroPresentation() {
  return (
    <ThemeProvider>
      <Navbar />

      <header className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
        {/* Decorative Blobs */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>

        <div className="container mx-auto grid min-h-screen items-center px-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-center lg:text-left ">
            <Typography
              variant="small"
              className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-1 font-bold uppercase text-blue-600"
            >
              Scientifically Validated Assessment
            </Typography>

            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-6 font-black leading-tight lg:mr-20"
            >
              Discover Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Psychological Resilience
              </span>
            </Typography>

            <Typography
              variant="lead"
              color="blue-gray"
              className=" lg:pr-24 text-gray-600"
            >
              This self-evaluation platform is developed from the Bharathiar
              University Resilience Scale (BURS-2014) to help you understand
              your level of psychological resilience. It encourages reflection
              on how you adapt to adversity, stress, uncertainty, and
              life-changing psychological challenges while effectively coping,
              recovering, and maintaining mental well-being.
            </Typography>

            <div className="flex flex-wrap justify-center lg:justify-start">
              <Typography className=" py-1 font-bold uppercase text-blue-600">
                Are you ready to assess your resilience?
              </Typography>
              {/* <a href="quiz">
                <Button
                  size="lg"
                  color="blue"
                  className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  Start Assessment
                  <ArrowSmallRightIcon className="h-5 w-5" />
                </Button>
              </a> */}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative rounded-3xl bg-white/60 p-4 backdrop-blur-xl shadow-2xl">
              <img
                src="girl.jpg"
                alt="Resilience Assessment"
                className="w-full max-w-xl rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Wave Shape */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 40L48 53.3C96 67 192 93 288 96C384 99 480 79 576 64C672 49 768 35 864 37.3C960 40 1056 60 1152 64C1248 68 1344 56 1392 50.7L1440 45V120H0V40Z"
            fill="white"
          />
        </svg>
      </header>
    </ThemeProvider>
  );
}

export default HeroPresentation;
