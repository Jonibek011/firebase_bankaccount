import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "May", current: 300000, lastYear: 150000 },
  { month: "Jun", current: 180000, lastYear: 160000 },
  { month: "Jul", current: 220000, lastYear: 170000 },
  { month: "Aug", current: 250000, lastYear: 180000 },
  { month: "Sep", current: 230000, lastYear: 190000 },
  { month: "Oct", current: 270000, lastYear: 210000 },
];

export default function EarningChart() {
  return (
    <div className="w-full h-[95%] bg-base-100 p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Earning Summary</h2>
        <p className="text-sm text-gray-500">Mar 2022 – Oct 2022</p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />

          <Area
            type="monotone"
            dataKey="lastYear"
            stroke="#94a3b8"
            strokeDasharray="4 4"
            fill="url(#colorLastYear)"
          />
          <Area
            type="monotone"
            dataKey="current"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#colorCurrent)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex gap-6 text-sm mt-3 text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          Last 6 months
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 border-2 border-gray-400 rounded-full"></span>
          Same period last year
        </div>
      </div>
    </div>
  );
}
