import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

interface QuizAttempt {
  id: number;
  user: string;
  quiz?: string; // optional if backend doesn't send it
  date: string;
  score: number;
  risk: string;
  status: string;
}

interface PaginatedResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  data: QuizAttempt[];
}

export default function AdminQuizAnalytics() {
  /* =========================
     STATE
  ========================== */

  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);

  const limit = 6;

  const riskCounts = {
    Low: 0,
    Moderate: 0,
    High: 0,
  };

  const [stats, setStats] = useState({
    quiz_attempts: 0,
    high_risk: 0,
    moderate_risk: 0,
    low_risk: 0,
  });

  attempts.forEach((attempt) => {
    if (attempt.risk === "Low") riskCounts.Low++;
    if (attempt.risk === "Moderate") riskCounts.Moderate++;
    if (attempt.risk === "High") riskCounts.High++;
  });

  const fetchAttempts = async (pageNumber: number) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");
      const API_URL = import.meta.env.PUBLIC_API_URL;

      const response = await fetch(
        `${API_URL}/admin/quiz-attempts?page=${pageNumber}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quiz attempts");
      }

      const result: PaginatedResponse = await response.json();

      setAttempts(result.data);
      setTotalPages(result.total_pages);
    } catch (error) {
      console.error("Error fetching attempts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempts(page);
    fetchStats();
  }, [page]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://localhost:8000/admin/quiz-analytics/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch stats");

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Stats error:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const downloadCSV = (data: QuizAttempt[], filename: string) => {
    if (!data.length) return;

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${val ?? ""}"`)
        .join(","),
    );

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const downloadSingleUser = (attempt: QuizAttempt) => {
    downloadCSV([attempt], `${attempt.user}_report.csv`);
  };

  const downloadAllUsers = () => {
    downloadCSV(attempts, `quiz_reports_page_${page}.csv`);
  };

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-700";
      case "Moderate":
        return "bg-yellow-100 text-yellow-700";
      case "High":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const riskDistributionData = {
    labels: ["Low Risk", "Moderate", "High Risk"],
    datasets: [
      {
        data: [riskCounts.Low, riskCounts.Moderate, riskCounts.High],
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
    },
    cutout: "65%",
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quiz Analytics</h1>
          <p className="text-gray-500 mt-1">
            Insights into quiz performance and user assessment trends
          </p>
        </div>

        <button
          onClick={downloadAllUsers}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          Download Current Page
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Quiz Attempts"
          value={loadingStats ? "..." : stats.quiz_attempts}
          color="text-indigo-600"
        />
        <StatCard
          title="High Risk Users"
          value={loadingStats ? "..." : stats.high_risk}
          color="text-red-500"
        />
        <StatCard
          title="Moderate Risk Users"
          value={loadingStats ? "..." : stats.moderate_risk}
          color="text-orange-600"
        />
        <StatCard
          title="Low Risk Users"
          value={loadingStats ? "..." : stats.low_risk}
          color="text-green-500"
        />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-6">Recent Quiz Attempts</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Risk</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Download</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : attempts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No data found
                  </td>
                </tr>
              ) : (
                attempts.map((attempt) => (
                  <tr
                    key={attempt.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {attempt.user}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(attempt.date).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 font-semibold">{attempt.score}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getRiskStyle(
                          attempt.risk,
                        )}`}
                      >
                        {attempt.risk}
                      </span>
                    </td>

                    <td className="px-6 py-4">{attempt.status}</td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => downloadSingleUser(attempt)}
                        className="px-4 py-2 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-6">Risk Level Distribution</h2>
        <div className="max-w-md">
          <Pie data={riskDistributionData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
}
