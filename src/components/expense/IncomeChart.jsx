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
import useGlobalContext from "../../hooks/useGlobalContext";
const data = [
  { month: "Jan", income: 1000, expense: 600 },
  { month: "Feb", income: 500, expense: 400 },
  { month: "Mar", income: 2000, expense: 1200 },
  { month: "Apr", income: 1500, expense: 900 },
  { month: "May", income: 3000, expense: 1800 },
  { month: "Jun", income: 500, expense: 300 },
  { month: "Jul", income: 0, expense: 0 },
  { month: "Aug", income: 0, expense: 0 },
  { month: "Sep", income: 0, expense: 0 },
  { month: "Oct", income: 0, expense: 0 },
  { month: "Nov", income: 0, expense: 0 },
  { month: "Dec", income: 0, expense: 0 },
];

export default function IncomeChart() {
  const formatK = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };

  const { isDark } = useGlobalContext();
  console.log(isDark);
  return (
    <div
      className={`w-full h-[130px] border border-gray-400/10 bg-gradient-to-t    ${
        isDark ? "from-purple-200" : "from-slate-800"
      } to-transparent rounded-xl py-4`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barSize={18}
          barGap={2}
          margin={{ left: -10, bottom: -15 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="month"
            tick={{ fill: isDark ? "#313647" : "#FFFFFF", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
            tick={{ fill: isDark ? "#313647" : "#FFFFFF", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value, name) => [
              `$${value}`,
              name === "income" ? "Income" : "Expense",
            ]}
          />
          <defs>
            {/* Income */}
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9F7AEA" />
              <stop offset="100%" stopColor="#553C9A" />
            </linearGradient>

            {/* Expense */}
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FCA5A5" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>

          {/* Income bar */}
          <Bar
            dataKey="income"
            fill="url(#incomeGradient)"
            radius={[5, 5, 0, 0]}
          >
            <LabelList
              dataKey="income"
              position="top"
              formatter={formatK}
              fill={isDark ? "#313647" : "#FFFFFF"}
              fontSize={10}
            />
          </Bar>

          {/* Expense bar */}
          <Bar
            dataKey="expense"
            fill="url(#expenseGradient)"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
