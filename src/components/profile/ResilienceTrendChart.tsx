import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ResilienceTrendChart() {
  const [data, setData] = useState<any[]>([]);
  const [insight, setInsight] = useState("");

  useEffect(() => {
    fetchQuizHistory();
  }, []);

  const fetchQuizHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/assessment/history",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      // Transform backend data for chart
      const formattedData = response.data.map((item: any) => ({
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
      const response = await axios.post(
        "http://localhost:8000/ai/resilience-insight",
        {
          history: trendData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      setInsight(response.data.insight);
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
