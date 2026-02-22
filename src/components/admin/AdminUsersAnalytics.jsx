import { useEffect, useState } from "react";
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

export default function AdminUsersAnalytics() {
  /* =========================
     STATE
  ========================== */

  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    new_users: 0,
    inactive_users: 0,
  });

  const [users, setUsers] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const token = localStorage.getItem("access_token");

  const [userGrowthData, setUserGrowthData] = useState({
    labels: [],
    datasets: [
      {
        label: "New Users",
        data: [],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.1)",

        fill: true,
      },
    ],
  });

  const userGrowthOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // 🔥 this forces 1,2,3,4...
        },
      },
    },
  };

  useEffect(() => {
    fetchStats();
    fetchRecentUsers();
    fetchUserGrowth();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/admin/user-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch stats");

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Stats error:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchRecentUsers = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/admin/recent-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Users error:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchUserGrowth = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const API_URL = import.meta.env.PUBLIC_API_URL;

      const response = await fetch(`${API_URL}/admin/analytics/user-growth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      setUserGrowthData({
        labels: result.labels,
        datasets: [
          {
            label: "New Users",
            data: result.data,
            borderColor: "#4f46e5",
            backgroundColor: "rgba(79,70,229,0.1)",
            // tension: 1,
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const roleDistributionData = {
    labels: ["Users", "Admins"],
    datasets: [
      {
        data: [
          stats.total_users > 0 ? stats.total_users - 1 : 0,
          stats.total_users > 0 ? 1 : 0,
        ],
        backgroundColor: ["#4f46e5", "#f59e0b"],
      },
    ],
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">User Analytics</h1>
        <p className="text-gray-500 mt-1">
          Insights into user growth and engagement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={loadingStats ? "..." : stats.total_users}
          color="text-indigo-600"
        />
        <StatCard
          title="Active Users"
          value={loadingStats ? "..." : stats.active_users}
          color="text-green-600"
        />
        <StatCard
          title="New Users (30d)"
          value={loadingStats ? "..." : stats.new_users}
          color="text-blue-600"
        />
        <StatCard
          title="Inactive Users"
          value={loadingStats ? "..." : stats.inactive_users}
          color="text-red-500"
        />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-6">Recent Users</h2>

        {loadingUsers ? (
          <p className="text-gray-500">Loading users...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {currentUsers.map((user) => (
                    <tr
                      key={user.user_id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {user.full_name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">{user.email}</td>

                      <td className="px-6 py-4 capitalize">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            user.role === "admin"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-indigo-100 text-indigo-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            user.is_active
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-6 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Monthly User Growth</h2>
          <div className="mt-24">
            <Line data={userGrowthData} options={userGrowthOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Role Distribution</h2>
          <div className="max-w-sm">
            <Pie data={roleDistributionData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border md:col-span-2">
          <h2 className="text-lg font-semibold mb-4"></h2>
        </div>
      </div>
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
