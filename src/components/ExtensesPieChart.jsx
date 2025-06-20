import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Namuna xarajatlar
const data = [
  { name: "Food", value: 350 },
  { name: "Transport", value: 200 },
  { name: "Entertainment", value: 150 },
  { name: "Other", value: 100 },
];

// Ranglar
const COLORS = ["#4FD1C5", "#63B3ED", "#F6AD55", "#FC8181"];

const ExpensesPieChart = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesPieChart;
