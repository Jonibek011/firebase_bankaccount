import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExpensesPieChart = ({ mapData = [] }) => {
  const obj = {};

  mapData.forEach((data) => {
    if (Object.hasOwn(obj, data.category)) {
      obj[data.category] += Number(data.amaunt);
    } else {
      obj[data.category] = Number(data.amaunt);
    }
  });

  // Namuna xarajatlar
  const data = [
    { name: "Food", value: obj?.Food ? obj.Food : 0 },
    { name: "Transport", value: obj?.Transport ? obj.Transport : 0 },
    { name: "Technologiya", value: obj?.Technologia ? obj.Technologia : 0 },
    {
      name: "Entertainment",
      value: obj?.Entertainment ? obj.Entertainment : 0,
    },
    { name: "Other", value: obj?.Other ? obj.Other : 1 },
  ];

  // Ranglar
  const COLORS = ["#4FD1C5", "#63B3ED", "#B13BFF", "#FC8181", "#F42362"];

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
            label={({ name, percent }) => ` (${(percent * 100).toFixed(0)}%)`}
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
