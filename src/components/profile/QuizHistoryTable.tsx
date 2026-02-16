import React, { useEffect, useState } from "react";

interface QuizHistory {
  id: number;
  date: string;
  score: number;
  level: "Low" | "Moderate" | "High";
  created_at: string;
}

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

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const token = localStorage.getItem("token");
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
            </tr>
          </thead>

          <tbody>
            {quizHistory.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No quiz attempts found.
                </td>
              </tr>
            ) : (
              quizHistory.map((quiz) => (
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

                  {/* <td className="px-4 py-3">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Download
                    </button>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizHistoryTable;
