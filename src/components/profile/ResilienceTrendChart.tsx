import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Jan", score: 45 },
  { date: "Feb", score: 60 },
  { date: "Mar", score: 70 },
];

export default function ResilienceTrendChart() {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Resilience Trend</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#6366f1" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
