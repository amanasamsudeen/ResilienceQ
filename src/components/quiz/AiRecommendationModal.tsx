import {
  Dialog,
  DialogBody,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState, useCallback } from "react";

// Matches the Pydantic schema from your Gemini backend
type RecommendationItem = {
  title: string;
  description: string;
};

type RecommendationData = {
  resilience_state: string;
  recommendations: RecommendationItem[];
  encouragement: string;
};

type Props = {
  resilienceLevel: string;
  score: number;
  answers: (number | null)[];
  onClose: () => void;
};

export default function AIRecommendationModal({
  resilienceLevel,
  score,
  answers,
  onClose,
}: Props) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [recommendation, setRecommendation] =
    useState<RecommendationData | null>(null);

  const API_URL = import.meta.env.PUBLIC_API_URL;

  const fetchAI = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/ai/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resilience_level: resilienceLevel,
          total_score: score,
          answers,
        }),
      });

      if (!res.ok) throw new Error("AI Analysis failed");

      const data = await res.json();
      // data should now be the full RecommendationData object from Gemini response.parsed
      setRecommendation(data);
    } catch (err) {
      setError(
        "Unable to generate AI recommendations. Please try again later.",
      );
      console.error("AI Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL, resilienceLevel, score, answers]);

  useEffect(() => {
    fetchAI();
  }, [fetchAI]);

  const handleClose = () => {
    if (downloading) return;
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      size="xl"
      className="!bg-black/40 backdrop-blur-sm outline-none"
    >
      <DialogBody className="p-0 h-[85vh] md:h-[90vh] flex flex-col rounded-2xl overflow-hidden font-sans">
        {/* Header Section */}
        <div className="px-6 py-8 md:px-10 bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 text-white shadow-md">
          <Typography
            variant="h3"
            className="font-black text-center tracking-tight"
          >
            AI Resilience Insights
          </Typography>
          <Typography className="text-center text-blue-50 mt-2 opacity-90 font-medium">
            Personalized guidance powered by Gemini Flash
          </Typography>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 bg-slate-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Spinner className="h-16 w-16 text-blue-600" />
              <Typography className="text-gray-500 mt-6 font-medium animate-pulse">
                Analyzing your resilience profile...
              </Typography>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 my-10">
              <Typography className="text-red-800 font-bold mb-1">
                Connection Error
              </Typography>
              <Typography className="text-red-700 text-sm">{error}</Typography>
              <Button
                size="sm"
                color="red"
                variant="text"
                className="mt-4"
                onClick={fetchAI}
              >
                Retry Analysis
              </Button>
            </div>
          ) : (
            recommendation && (
              <div className="space-y-10">
                {/* Stats Summary */}
                <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-blue-100 gap-4">
                  <div>
                    <Typography className="text-xs uppercase tracking-widest text-blue-500 font-bold">
                      Current Level
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-black text-slate-800"
                    >
                      {resilienceLevel}
                    </Typography>
                  </div>
                  <div className="h-12 w-px bg-gray-200 hidden md:block" />
                  <div>
                    <Typography className="text-xs uppercase tracking-widest text-blue-500 font-bold">
                      Resilience Score
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-black text-slate-800"
                    >
                      {score} / 150
                    </Typography>
                  </div>
                </div>

                {/* Resilience State Description */}
                <section>
                  <Typography
                    variant="h5"
                    className="text-slate-900 font-bold mb-3 flex items-center gap-2"
                  >
                    <span className="w-2 h-8 bg-blue-600 rounded-full" />
                    Your Resilience State
                  </Typography>
                  <Typography className="text-slate-600 leading-relaxed text-lg bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    {recommendation.resilience_state}
                  </Typography>
                </section>

                {/* Actionable Recommendations */}
                <section>
                  <Typography
                    variant="h5"
                    className="text-slate-900 font-bold mb-6 flex items-center gap-2"
                  >
                    <span className="w-2 h-8 bg-cyan-500 rounded-full" />
                    Personalized Strategies
                  </Typography>
                  <div className="grid grid-cols-1 gap-4">
                    {recommendation.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="group hover:scale-[1.01] transition-transform duration-200 bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-50 text-blue-700 font-bold rounded-lg w-8 h-8 flex items-center justify-center shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <Typography
                              variant="h6"
                              className="font-bold text-slate-800 mb-1"
                            >
                              {rec.title}
                            </Typography>
                            <Typography className="text-slate-600 text-sm leading-relaxed">
                              {rec.description}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Encouragement Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-100 relative overflow-hidden">
                  <div className="relative z-10">
                    <Typography
                      variant="h5"
                      className="text-indigo-900 font-black mb-3"
                    >
                      A Final Thought
                    </Typography>
                    <Typography className="text-indigo-800/80 italic leading-relaxed font-medium">
                      "{recommendation.encouragement}"
                    </Typography>
                  </div>
                  <div className="absolute -bottom-10 -right-10 text-indigo-200/30 font-black text-9xl select-none">
                    “
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-10 py-5 bg-white border-t border-slate-100 flex justify-end gap-3 items-center">
          <Button
            variant="text"
            color="blue-gray"
            onClick={handleClose}
            className="font-bold"
          >
            Finish Review
          </Button>
          <Button
            className="bg-blue-600 hover:shadow-blue-200"
            onClick={() => window.print()} // Quick alternative to custom PDF logic
            disabled={loading || !!error}
          >
            Print Results
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
