import {
  Dialog,
  DialogBody,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

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
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAI();
  }, []);

  const fetchAI = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ai/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resilience_level: resilienceLevel,
          total_score: score,
          answers,
        }),
      });

      if (!res.ok) throw new Error("AI failed");

      const data = await res.json();
      setRecommendation(data.recommendations);
    } catch {
      setError("Unable to generate AI recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    setDownloading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ai/recommendations/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resilience_level: resilienceLevel,
          total_score: score,
          answers,
        }),
      });

      if (!res.ok) throw new Error("PDF generation failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "AI_Resilience_Recommendations.pdf";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  };

  const handleClose = () => {
    if (downloading) return;
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={() => null}
      dismiss={false}
      size="xl"
      className="!bg-black/40 backdrop-blur-sm"
    >
      <DialogBody className="p-0 h-[90vh] flex flex-col rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-10 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <Typography variant="h3" className="font-extrabold text-center">
            AI-Powered Resilience Guidance
          </Typography>
          <Typography className="text-center text-blue-100 mt-1">
            Personalized insights based on your responses
          </Typography>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-10 py-8 bg-gray-50">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Spinner className="h-12 w-12 text-blue-600 mb-4" />
              <Typography className="text-gray-600">
                AI is analyzing your resilience profile…
              </Typography>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-300 rounded-xl p-6">
              <Typography className="text-red-700 font-medium">
                {error}
              </Typography>
            </div>
          )}

          {!loading && !error && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
              <Typography className="font-bold text-blue-700 mb-4">
                Resilience Level: {resilienceLevel}
              </Typography>
              <div className="prose prose-lg prose-blue max-w-none">
                {recommendation}
              </div>
            </div>
          )}
        </div>

        <div className="px-10 py-5 bg-white border-t flex justify-between items-center">
          <Button
            color="green"
            onClick={downloadPDF}
            disabled={loading || downloading}
          >
            {downloading ? "Preparing PDF..." : "Download PDF"}
          </Button>

          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
