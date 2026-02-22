import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import {
  ShieldCheckIcon,
  SparklesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export function AstroSection() {
  return (
    <section className="py-12 px-6 lg:py-12">
      <div className="container mx-auto">
        <Card
          shadow={false}
          className="flex flex-col-reverse overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 md:flex-row md:gap-10"
        >
          {/* Left Content */}
          <CardBody className="md:py-20 md:px-16 md:w-7/12">
            {/* Trust Indicators */}
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <ShieldCheckIcon className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  Scientifically Validated
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <ChartBarIcon className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  Evidence-Based Scoring
                </span>
              </div>
            </div>

            <Typography variant="h2" color="white" className="mb-6 font-bold">
              Ready to Discover Your{" "}
              <span className="text-blue-200">Resilience?</span>
            </Typography>

            <Typography variant="lead" color="white" className="mb-8">
              Take a quick, research-backed psychological assessment to
              understand how you adapt to stress, recover from setbacks, and
              grow through challenges.
            </Typography>

            {/* Feature Highlights */}
            <div className="space-y-3 text-white/90">
              <div className="flex items-center gap-3">
                <SparklesIcon className="h-5 w-5" />
                <span>30-question standardized resilience scale</span>
              </div>
              <div className="flex items-center gap-3">
                <ChartBarIcon className="h-5 w-5" />
                <span>Instant scoring & severity level</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Private & confidential results</span>
              </div>
            </div>
            <a href="/quiz">
              <Button
                size="lg"
                color="white"
                className="mt-12 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
              >
                Start Assessment
              </Button>
            </a>
          </CardBody>

          {/* Right Visual */}
          <div className="relative grid h-72 place-items-center md:h-auto md:w-5/12">
            <img
              src="success.jpg"
              alt="Resilience Illustration"
              className="h-full w-full object-cover md:absolute"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}

export default AstroSection;
