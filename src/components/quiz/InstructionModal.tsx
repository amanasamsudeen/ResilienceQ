import {
  Dialog,
  DialogBody,
  Typography,
  Button,
  Card,
} from "@material-tailwind/react";

type Props = {
  open: boolean;
  onStart: () => void;
};

export default function InstructionModal({ open, onStart }: Props) {
  return (
    <Dialog open={open} handler={() => {}} size="lg">
      <DialogBody className="p-8 space-y-6">
        {/* Title */}
        <Typography variant="h3" className="text-center font-bold">
          Welcome to <span className="text-blue-500">ResilienceIQ</span>
        </Typography>

        {/* Intro */}

        {/* Who is it for */}
        {/* <Card className="p-4 bg-blue-50">
          <Typography variant="h6" className="mb-2">
            👥 Who Can Use ResilienceQ?
          </Typography>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li>• Students & Young Adults</li>

            <li>• Counselors</li>
            <li>• Mental Health Professionals</li>
            <li>• Researchers</li>
          </ul>
        </Card> */}

        {/* How to Answer */}
        <Card className="p-4">
          <Typography variant="h6" className="mb-2">
            📝 How to Complete the Assessment
          </Typography>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Read each statement carefully.</li>
            <li>• Select the option that best describes you.</li>
            <li>• Answer honestly — there are no right or wrong answers.</li>

            <li>• Respond based on your typical feelings and behaviors.</li>
            <li>• Gain insights into your resilience patterns.</li>
          </ul>
        </Card>

        {/* Score Classification */}
        <Typography variant="h5" className="mt-4 font-bold text-center">
          Resilience Score Classification
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border-l-4 border-red-500">
            <Typography variant="h6">30 – 60 : Low Resilience</Typography>
            {/* <Typography className="text-sm text-gray-700">
              Indicates difficulty coping with stress, slow recovery from
              adversity, low confidence, and limited flexibility in
              problem-solving.
            </Typography> */}
          </Card>

          <Card className="p-4 border-l-4 border-orange-500">
            <Typography variant="h6">
              61 – 90 : Below Average Resilience
            </Typography>
            {/* <Typography className="text-sm text-gray-700">
              Reflects moderate struggles in managing negative events,
              inconsistent coping strategies, and reduced optimism during
              stressful situations.
            </Typography> */}
          </Card>

          <Card className="p-4 border-l-4 border-yellow-500">
            <Typography variant="h6">91 – 120 : Moderate Resilience</Typography>
            {/* <Typography className="text-sm text-gray-700">
              Represents a balanced ability to cope with challenges, learn from
              experiences, and regain emotional stability over time.
            </Typography> */}
          </Card>

          <Card className="p-4 border-l-4 border-green-500">
            <Typography variant="h6">121 – 150 : High Resilience</Typography>
            {/* <Typography className="text-sm text-gray-700">
              Indicates strong coping skills, optimism, adaptability,
              confidence, quick recovery, and effective problem-solving
              abilities.
            </Typography> */}
          </Card>
        </div>

        {/* Personalized Recommendation */}

        {/* Disclaimer */}
        <Typography variant="small" color="gray" className="text-center italic">
          This assessment is intended for educational and self-awareness
          purposes only and does not replace professional psychological
          evaluation or treatment.
        </Typography>

        {/* CTA */}
        <div className="flex justify-center mt-6">
          <Button color="blue" size="lg" onClick={onStart}>
            Start Resilience Assessment
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
