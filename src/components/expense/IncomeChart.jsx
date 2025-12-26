import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

const data = [
  { month: "Jan", amount: 0 },
  { month: "Feb", amount: 0 },
  { month: "Mar", amount: 2400 },
  { month: "Apr", amount: 3000 },
  { month: "May", amount: 2600 },
  { month: "Jun", amount: 3400 },
  { month: "Jul", amount: 4200 },
  { month: "Aug", amount: 3900 },
  { month: "Sep", amount: 4600 },
  { month: "Oct", amount: 5200 },
  { month: "Nov", amount: 4800 },
  { month: "Dec", amount: 5100 },
];

export default function IncomeChart() {
  const formatK = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };
  return (
    <div className="w-full h-[150px] bg-blue-700 -gradient-to-br from-indigo-700 to-purple-700 rounded-2xl py-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* Pastki qator: oylar */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#cbd5f5", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Chap tomon: 1k, 2k, 3k */}
          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
            tick={{ fill: "#cbd5f5", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => [`$${value}`, "Income"]}
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />

          {/* Ustunlar */}
          <Bar
            dataKey="amount"
            fill="#67B2D8"
            radius={[5, 5, 0, 0]} // 👈 rounded top
          >
            {/* Ustun tepasidagi summa */}
            <LabelList
              dataKey="amount"
              position="top"
              formatter={(value) => formatK(value)}
              fill="#e9d5ff"
              fontSize={10}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
