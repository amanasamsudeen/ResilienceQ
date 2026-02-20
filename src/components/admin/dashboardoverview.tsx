import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

export default function DashboardOverview() {
  /* ========================
     DUMMY STATS
  ========================= */

  const stats = {
    total_users: 1245,
    active_users: 876,
    total_quizzes: 18,
    total_attempts: 5420,
  };

  /* ========================
     CHART DATA
  ========================= */

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users",
        data: [120, 250, 380, 520, 760, 1245],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const quizAttemptData = {
    labels: ["Stress Test", "Anxiety Check", "Burnout Quiz", "Mood Test"],
    datasets: [
      {
        label: "Attempts",
        data: [1400, 1100, 980, 1940],
        backgroundColor: "#10b981",
        borderRadius: 8,
      },
    ],
  };

  /* ========================
     HIGH RESILIENCE USERS
  ========================= */

  const resilienceUsers = [
    { id: 1, name: "John Doe", score: 95 },
    { id: 2, name: "Sarah Smith", score: 88 },
    { id: 3, name: "Michael Lee", score: 91 },
    { id: 4, name: "Emily Davis", score: 85 },
    { id: 5, name: "David Brown", score: 97 },
  ];

  // Sort ascending order
  const sortedUsers = [...resilienceUsers].sort((a, b) => a.score - b.score);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          High-level insights into platform performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.total_users}
          color="text-indigo-600"
        />
        <StatCard
          title="Active Users"
          value={stats.active_users}
          color="text-green-600"
        />
        <StatCard
          title="Total Quizzes"
          value={stats.total_quizzes}
          color="text-blue-600"
        />
        <StatCard
          title="Total Attempts"
          value={stats.total_attempts}
          color="text-yellow-500"
        />
      </div>

      {/* Charts - 2 in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <Line data={userGrowthData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Quiz Attempts</h2>
          <Bar data={quizAttemptData} />
        </div>
      </div>

      {/* High Resilience Users Table */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-6">
          High Resilience Users (Ascending Score)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">Resilience Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 font-semibold text-indigo-600">
                    {user.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ========================
   STAT CARD COMPONENT
======================== */

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
}
