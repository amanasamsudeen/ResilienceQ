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

export default function AdminQuizAnalytics() {
  /* =========================
     DUMMY STATS DATA
  ========================== */

  const stats = {
    total_quizzes: 12,
    total_attempts: 5420,
    average_score: 72,
    completion_rate: 84,
  };

  /* =========================
     CHART DATA
  ========================== */

  const quizAttemptsData = {
    labels: ["Stress Test", "Anxiety Check", "Burnout Quiz", "Mood Test"],
    datasets: [
      {
        label: "Attempts",
        data: [1400, 1100, 980, 1940],
        backgroundColor: "#4f46e5",
        borderRadius: 8,
      },
    ],
  };

  const averageScoreTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Average Score",
        data: [65, 68, 70, 72, 75, 72],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const riskDistributionData = {
    labels: ["Low Risk", "Medium Risk", "High Risk"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  /* =========================
     TABLE DATA
  ========================== */

  const recentAttempts = [
    {
      id: 1,
      user: "John Doe",
      quiz: "Stress Test",
      date: "2025-02-01",
      score: 82,
      risk: "Low",
      status: "Completed",
    },
    {
      id: 2,
      user: "Sarah Smith",
      quiz: "Anxiety Check",
      date: "2025-02-03",
      score: 68,
      risk: "Medium",
      status: "Completed",
    },
    {
      id: 3,
      user: "Michael Lee",
      quiz: "Burnout Quiz",
      date: "2025-02-05",
      score: 45,
      risk: "High",
      status: "Completed",
    },
    {
      id: 4,
      user: "Emily Davis",
      quiz: "Mood Test",
      date: "2025-02-08",
      score: 0,
      risk: "-",
      status: "Incomplete",
    },
  ];

  /* =========================
     CSV DOWNLOAD FUNCTIONS
  ========================== */

  const downloadCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const downloadSingleUser = (attempt) => {
    downloadCSV([attempt], `${attempt.user}_report.csv`);
  };

  const downloadAllUsers = () => {
    downloadCSV(recentAttempts, "all_users_quiz_reports.csv");
  };

  const getRiskStyle = (risk) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "High":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quiz Analytics</h1>
          <p className="text-gray-500 mt-1">
            Insights into quiz performance and user assessment trends
          </p>
        </div>

        {/* Download All Button */}
        <button
          onClick={downloadAllUsers}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          Download All Reports (CSV)
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Quizzes"
          value={stats.total_quizzes}
          color="text-indigo-600"
        />
        <StatCard
          title="Total Attempts"
          value={stats.total_attempts}
          color="text-blue-600"
        />
        <StatCard
          title="Average Score"
          value={`${stats.average_score}%`}
          color="text-green-600"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completion_rate}%`}
          color="text-yellow-500"
        />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-6">Recent Quiz Attempts</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Quiz</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Risk</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Download</th>
              </tr>
            </thead>

            <tbody>
              {recentAttempts.map((attempt) => (
                <tr
                  key={attempt.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {attempt.user}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{attempt.quiz}</td>
                  <td className="px-6 py-4 text-gray-600">{attempt.date}</td>
                  <td className="px-6 py-4 font-semibold">{attempt.score}%</td>
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
                      Download CSV
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-6">
          Quiz Attempts Distribution
        </h2>
        <Bar data={quizAttemptsData} />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-6">Average Score Trend</h2>
        <Line data={averageScoreTrend} />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-6">Risk Level Distribution</h2>
        <div className="max-w-md">
          <Pie data={riskDistributionData} />
        </div>
      </div>

      {/* Table */}
    </div>
  );
}

/* =========================
   STAT CARD COMPONENT
========================= */

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
}
