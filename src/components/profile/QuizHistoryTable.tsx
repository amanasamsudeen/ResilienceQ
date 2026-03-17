import React, { useEffect, useState } from "react";

interface QuizHistory {
  id: number;
  score: number;
  level: "Low" | "Moderate" | "High";
  created_at: string;
  ai_recommendation?: string; // Added AI recommendation
}

const ROWS_PER_PAGE = 6;

const getLevelStyle = (level: string) => {
  switch (level) {
    case "Low":
      return "bg-red-100 text-red-800";
    case "Moderate":
      return "bg-yellow-100 text-yellow-800";
    case "High":
      return "bg-green-100 text-green-800";
    default:
      return "";
  }
};

const QuizHistoryTable: React.FC = () => {
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const API_URL = import.meta.env.PUBLIC_API_URL;

        const response = await fetch(`${API_URL}/assessment/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setQuizHistory(data);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizHistory();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(quizHistory.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentData = quizHistory.slice(startIndex, startIndex + ROWS_PER_PAGE);

  if (loading) {
    return <p className="mt-6 text-gray-600">Loading history...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Resilience Assessment History
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Level</th>
              {/* <th className="px-4 py-3">AI Recommendation</th> */}
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No quiz attempts found.
                </td>
              </tr>
            ) : (
              currentData.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(quiz.created_at).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    {quiz.score}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelStyle(
                        quiz.level,
                      )}`}
                    >
                      {quiz.level}
                    </span>
                  </td>

                  {/* <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">
                    {quiz.ai_recommendation
                      ? quiz.ai_recommendation.slice(0, 80) + "..."
                      : "No recommendation"}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizHistoryTable;
