import { Card, Typography, Button } from "@material-tailwind/react";

export default function InstructionsTab({ onNext }) {
  return (
    <Card className="p-8 space-y-6">
      <Typography variant="h4" className="font-bold text-center">
        Welcome to <span className="text-blue-600">ResilienceQ</span>
      </Typography>

      <Typography className="text-gray-700 leading-relaxed">
        <strong>ResilienceQ</strong> is an interactive, quiz-based
        self-assessment platform designed to evaluate an individual’s level of
        psychological resilience in everyday life. It consists of 30 statements
        covering key resilience domains, including emotional balance,
        adaptability, persistence, recovery from failure, and coping with stress
        and adversity. The assessment includes both positive and negative
        statements to ensure balanced and accurate reflection.{" "}
        <strong>ResilienceQ</strong> provides a structured framework for
        understanding how individuals adapt, cope, recover, and maintain mental
        well-being in the face of life’s challenges.
      </Typography>

      <Card className="p-6 border border-gray-200 bg-white shadow-none">
        <Typography className="mb-3 font-semibold text-gray-700">
          How to Respond to Each Statement
        </Typography>

        <Typography className="text-gray-600 mb-6 text-sm">
          Select the number that best describes how each statement applies to
          you.
        </Typography>

        <div className="space-y-3">
          <div className="flex items-center gap-4 rounded-lg bg-green-50 border border-green-200 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white text-lg font-bold">
              5
            </span>
            <div>
              <p className="font-semibold text-green-800">Most appropriate</p>
              <p className="text-sm text-green-700">
                This statement strongly describes you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-lime-50 border border-lime-200 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-500 text-white text-lg font-bold">
              4
            </span>
            <div>
              <p className="font-semibold text-lime-800">
                Appropriate to a large extent
              </p>
              <p className="text-sm text-lime-700">Describes you quite well</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-gray-900 text-lg font-bold">
              3
            </span>
            <div>
              <p className="font-semibold text-yellow-800">
                Moderately appropriate
              </p>
              <p className="text-sm text-yellow-700">Somewhat describes you</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-orange-50 border border-orange-200 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white text-lg font-bold">
              2
            </span>
            <div>
              <p className="font-semibold text-orange-800">
                Marginally appropriate
              </p>
              <p className="text-sm text-orange-700">Rarely describes you</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-red-50 border border-red-200 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white text-lg font-bold">
              1
            </span>
            <div>
              <p className="font-semibold text-red-800">
                Not at all appropriate
              </p>
              <p className="text-sm text-red-700">Does not describe you</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-slate-50 border border-gray-200 shadow-none">
        <h3 class="mb-6 text-lg font-semibold text-gray-700">
          Steps to Complete the Assessment
        </h3>

        <div class="space-y-6">
          <div class="group relative flex items-start gap-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 text-white font-bold shadow-md">
              01
            </div>

            <div class="w-full">
              <span class="inline-flex items-center gap-2 mb-2 rounded-xl bg-indigo-500 px-4 py-1 text-sm font-semibold text-white">
                Read
              </span>
              <div
                class="rounded-xl bg-white p-4 shadow-sm border-l-4 border-transparent
                 transition-all duration-300
                 group-hover:border-indigo-500
                 group-hover:shadow-md group-hover:-translate-y-0.5"
              >
                <p class="text-sm text-gray-700">
                  Read each statement carefully to understand what it asks. Take
                  a moment to reflect before choosing your response.
                </p>
              </div>
            </div>
          </div>

          <div class="group relative flex items-start gap-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-white font-bold shadow-md">
              02
            </div>

            <div class="w-full">
              <span class="inline-flex items-center gap-2 mb-2 rounded-xl bg-sky-500 px-4 py-1 text-sm font-semibold text-white">
                Select
              </span>
              <div
                class="rounded-xl bg-white p-4 shadow-sm border-l-4 border-transparent
                 transition-all duration-300
                 group-hover:border-sky-500
                 group-hover:shadow-md group-hover:-translate-y-0.5"
              >
                <p class="text-sm text-gray-700">
                  Choose one option from 1 to 5 that best represents your usual
                  thoughts or behaviour.
                </p>
              </div>
            </div>
          </div>

          <div class="group relative flex items-start gap-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500 text-white font-bold shadow-md">
              03
            </div>

            <div class="w-full">
              <span class="inline-flex items-center gap-2 mb-2 rounded-xl bg-teal-500 px-4 py-1 text-sm font-semibold text-white">
                Respond
              </span>
              <div
                class="rounded-xl bg-white p-4 shadow-sm border-l-4 border-transparent
                 transition-all duration-300
                 group-hover:border-teal-500
                 group-hover:shadow-md group-hover:-translate-y-0.5"
              >
                <p class="text-sm text-gray-700">
                  Answer all questions honestly and independently to ensure
                  meaningful results.
                </p>
              </div>
            </div>
          </div>

          <div class="group relative flex items-start gap-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-700 text-white font-bold shadow-md">
              04
            </div>

            <div class="w-full">
              <span class="inline-flex items-center gap-2 mb-2 rounded-xl bg-purple-700 px-4 py-1 text-sm font-semibold text-white">
                Reflect
              </span>
              <div
                class="rounded-xl bg-white p-4 shadow-sm border-l-4 border-transparent
                 transition-all duration-300
                 group-hover:border-purple-700
                 group-hover:shadow-md group-hover:-translate-y-0.5"
              >
                <p class="text-sm text-gray-700">
                  Do not overthink any statement. Trust your natural reaction to
                  each item.
                </p>
              </div>
            </div>
          </div>

          <div class="group relative flex items-start gap-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-white font-bold shadow-md">
              05
            </div>

            <div class="w-full">
              <span class="inline-flex items-center gap-2 mb-2 rounded-xl bg-green-500 px-4 py-1 text-sm font-semibold text-white">
                Submit
              </span>
              <div
                class="rounded-xl bg-white p-4 shadow-sm border-l-4 border-transparent
                 transition-all duration-300
                 group-hover:border-green-500
                 group-hover:shadow-md group-hover:-translate-y-0.5"
              >
                <p class="text-sm text-gray-700">
                  Submit the assessment to view your resilience score and
                  understand your current resilience profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <Typography
          variant="h6"
          className="mb-6 text-lg font-semibold text-gray-700"
        >
          Resilience Score Classification
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Card className="p-4 border-l-4 border-red-500">
            <p className="font-semibold mb-1">30 – 60 : Low Resilience</p>
            <p className="text-gray-700">
              Indicates difficulty in coping with stress, slow recovery from
              adversity, low confidence in handling future challenges, and
              limited flexibility in problem-solving.
            </p>
          </Card>

          <Card className="p-4 border-l-4 border-orange-500">
            <p className="font-semibold mb-1">
              61 – 90 : Below Average Resilience
            </p>
            <p className="text-gray-700">
              Reflects moderate struggles in managing negative events,
              inconsistent coping strategies, and reduced optimism during
              stressful situations.
            </p>
          </Card>

          <Card className="p-4 border-l-4 border-yellow-500">
            <p className="font-semibold mb-1">
              91 – 120 : Average / Moderate Resilience
            </p>
            <p className="text-gray-700">
              Represents a balanced ability to cope with challenges, learn from
              past experiences, and gradually regain emotional stability.
            </p>
          </Card>

          <Card className="p-4 border-l-4 border-green-500">
            <p className="font-semibold mb-1">121 – 150 : High Resilience</p>
            <p className="text-gray-700">
              Indicates strong coping skills, quick recovery to normalcy,
              optimism, adaptability, confidence, and effective problem-solving
              abilities.
            </p>
          </Card>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button color="blue" size="lg" onClick={onNext}>
          Continue to Personal Details
        </Button>
      </div>
    </Card>
  );
}
