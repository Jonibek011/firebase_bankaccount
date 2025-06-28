import { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExpensesPieChart = ({ mapDataForChart = [] }) => {
  const obj = {};

  mapDataForChart.forEach((data) => {
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

// import { useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";

// const ExpensesBarChart = ({ mapDataForChart = [] }) => {
//   const obj = {};

//   mapDataForChart.forEach((data) => {
//     if (Object.hasOwn(obj, data.category)) {
//       obj[data.category] += Number(data.amaunt);
//     } else {
//       obj[data.category] = Number(data.amaunt);
//     }
//   });

//   // Bar chart uchun ma'lumotlar
//   const data = [
//     { name: "Food", value: obj?.Food || 0 },
//     { name: "Transport", value: obj?.Transport || 0 },
//     { name: "Technologiya", value: obj?.Technologiya || 0 },
//     { name: "Entertainment", value: obj?.Entertainment || 0 },
//     { name: "Other", value: obj?.Other || 0 },
//   ];

//   const COLORS = ["#4FD1C5", "#63B3ED", "#B13BFF", "#FC8181", "#F42362"];

//   return (
//     <div className="w-full h-80">
//       <ResponsiveContainer>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="value">
//             {data.map((entry, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ExpensesBarChart;
