import React from "react";
import { Typography, Button } from "@material-tailwind/react";

export function FeatureSectionThree() {
  return (
    <section className="bg-gray-50 ">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Typography
            variant="small"
            className="mb-2 font-bold uppercase tracking-wider text-blue-600"
          >
            What is BURS?
          </Typography>
          <Typography variant="h2" className="text-4xl font-bold text-gray-900">
            Bharathiar University Resilience Scale (BURS–2014)
          </Typography>
          <Typography className="mt-4 text-gray-600 max-w-2xl mx-auto">
            A standardized psychological tool to measure resilience among
            college and university students.
          </Typography>
        </div>

        {/* Section 1 */}
        <div className="mb-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Typography variant="h4" className="font-semibold text-gray-900">
              Overview
            </Typography>

            <Typography className="text-gray-700">
              The BURS–2014, developed by{" "}
              <strong>Prof. N. Annalakshmi Narayanan</strong>, consists of 30
              self-report items rated on a 5-point Likert scale. Scores range
              from 30 to 150, with higher scores indicating greater resilience.
            </Typography>

            <div className="space-y-6">
              <Typography variant="h4" className="font-semibold text-gray-900">
                Key Domains Assessed
              </Typography>

              <Typography className="text-gray-700">
                BURS evaluates multiple dimensions of resilience reflecting how
                individuals cope with stress, adversity, and challenges.
              </Typography>

              <div className="mt-6 space-y-3">
                {[
                  "Recovery to normalcy",
                  "Responses to adversity & risk",
                  "Perception of past negative experiences",
                  "Problem definition & problem-solving",
                  "Openness & flexibility",
                  "Hope & confidence in coping with future",
                ].map((domain) => (
                  <div
                    key={domain}
                    className="block px-4 py-2 rounded-full text-sm font-medium 
                 bg-blue-50 text-blue-700 
                 hover:bg-blue-100 transition duration-300"
                  >
                    {domain}
                  </div>
                ))}
              </div>

              <Typography className="text-sm text-gray-600">
                Strong reliability and validity make BURS suitable for research
                and applied psychological assessment.
              </Typography>
            </div>
            {/* Download PDF Button */}
            <a href="/BURS-2014.pdf" download className="inline-block">
              <Button size="lg" color="blue" className="shadow-md">
                Download BURS PDF
              </Button>
            </a>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1548705085-101177834f47?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Resilience Domains"
              className="w-full h-[24rem] object-cover transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSectionThree;
