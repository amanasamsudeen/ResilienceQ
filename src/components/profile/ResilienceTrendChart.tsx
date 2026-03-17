import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function ResilienceTrendChart() {
  const [data, setData] = useState<any[]>([]);
  const [insight, setInsight] = useState("");

  const API_URL = import.meta.env.PUBLIC_API_URL;

  useEffect(() => {
    fetchQuizHistory();
  }, []);

  const fetchQuizHistory = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_URL}/assessment/history`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      // Transform backend data for chart
      const formattedData = result.map((item: any) => ({
        date: new Date(item.created_at).toLocaleDateString(),
        score: item.score,
        level: item.level,
      }));

      setData(formattedData);

      // Send data to AI for insight generation
      fetchAIInsight(formattedData);
    } catch (error) {
      console.error("Error fetching quiz history", error);
    }
  };

  const fetchAIInsight = async (trendData: any[]) => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_URL}/ai/resilience-insight`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          history: trendData,
        }),
      });

      const result = await response.json();

      setInsight(result.insight);
    } catch (error) {
      console.error("AI insight error", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 w-full">
      <h3 className="text-xl font-semibold mb-4">Resilience Trend</h3>

      {/* Chart */}
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: any, name: any, props: any) => [
                `Score: ${value}`,
                `Level: ${props.payload.level}`,
              ]}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insight Section */}
      {insight && (
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h4 className="font-semibold text-indigo-700 mb-2">
            AI Resilience Coach Insight
          </h4>
          <p className="text-gray-700 leading-relaxed">{insight}</p>
        </div>
      )}
    </div>
  );
}
