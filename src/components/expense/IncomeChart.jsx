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
import { useEffect, useState } from "react";
import { useAllCollection } from "../../hooks/useAllCollection";

export default function IncomeChart() {
  const { user } = useGlobalContext();
  const { data: collectionData } = useAllCollection("Expenses", [
    "userId",
    "==",
    user.uid,
  ]);

  const { data: incomes } = useAllCollection("Incomes", [
    "userId",
    "==",
    user.uid,
  ]);

  const [jan, setJan] = useState({ income: 0, expense: 0 });
  const [feb, setFeb] = useState({ income: 0, expense: 0 });
  const [mar, setMar] = useState({ income: 0, expense: 0 });
  const [apr, setApr] = useState({ income: 0, expense: 0 });
  const [may, setMay] = useState({ income: 0, expense: 0 });
  const [jun, setJun] = useState({ income: 0, expense: 0 });
  const [jul, setJul] = useState({ income: 0, expense: 0 });
  const [aug, setAug] = useState({ income: 0, expense: 0 });
  const [sep, setSep] = useState({ income: 0, expense: 0 });
  const [okt, setOkt] = useState({ income: 0, expense: 0 });
  const [nov, setNov] = useState({ income: 0, expense: 0 });
  const [dec, setDec] = useState({ income: 0, expense: 0 });

  const getMonthlySpend = (mainData, month) => {
    const filterData = mainData.filter((item) => item.month === month);
    let count = 0;
    if (filterData.length > 0) {
      filterData.forEach((item) => {
        count += Number(item.amaunt);
      });
    }
    return count;
  };

  const getMonthlyIncome = (mainData, month) => {
    const filterData = mainData.filter((item) => {
      const date = item.timeStamp.toDate();
      return date.getMonth() === month;
    });
    let count = 0;
    if (filterData.length > 0) {
      filterData.forEach((item) => {
        count += Number(item.income);
      });
    }
    return count;
  };
  //oyma oy expenselarni hisoblash
  useEffect(() => {
    if (Array.isArray(collectionData) && collectionData.length > 0) {
      const now = new Date();
      const currentYear = now.getFullYear();
      const filteredData = collectionData.filter(
        (collect) => collect.year === currentYear
      );
      const filterJan = getMonthlySpend(filteredData, 0);
      const filterFeb = getMonthlySpend(filteredData, 1);
      const filterMar = getMonthlySpend(filteredData, 2);
      const filterApr = getMonthlySpend(filteredData, 3);
      const filterMay = getMonthlySpend(filteredData, 4);
      const filterJun = getMonthlySpend(filteredData, 5);
      const filterJul = getMonthlySpend(filteredData, 6);
      const filterAug = getMonthlySpend(filteredData, 7);
      const filterSep = getMonthlySpend(filteredData, 8);
      const filterOkt = getMonthlySpend(filteredData, 9);
      const filterNov = getMonthlySpend(filteredData, 10);
      const filterDec = getMonthlySpend(filteredData, 11);

      setJan((prev) => {
        return { ...prev, expense: filterJan };
      });

      setFeb((prev) => {
        return { ...prev, expense: filterFeb };
      });
      setMar((prev) => {
        return { ...prev, expense: filterMar };
      });
      setApr((prev) => {
        return { ...prev, expense: filterApr };
      });
      setMay((prev) => {
        return { ...prev, expense: filterMay };
      });
      setJun((prev) => {
        return { ...prev, expense: filterJun };
      });
      setJul((prev) => {
        return { ...prev, expense: filterJul };
      });
      setAug((prev) => {
        return { ...prev, expense: filterAug };
      });
      setSep((prev) => {
        return { ...prev, expense: filterSep };
      });
      setOkt((prev) => {
        return { ...prev, expense: filterOkt };
      });
      setNov((prev) => {
        return { ...prev, expense: filterNov };
      });
      setDec((prev) => {
        return { ...prev, expense: filterDec };
      });
    }
  }, [collectionData]);

  useEffect(() => {
    if (Array.isArray(incomes) && incomes.length > 0) {
      const now = new Date();
      const currentYear = now.getFullYear();
      const filteredData = incomes.filter((income) => {
        const date = income.timeStamp.toDate();
        return date.getFullYear() === currentYear;
      });

      const filterJan = getMonthlyIncome(filteredData, 0);
      const filterFeb = getMonthlyIncome(filteredData, 1);
      const filterMar = getMonthlyIncome(filteredData, 2);
      const filterApr = getMonthlyIncome(filteredData, 3);
      const filterMay = getMonthlyIncome(filteredData, 4);
      const filterJun = getMonthlyIncome(filteredData, 5);
      const filterJul = getMonthlyIncome(filteredData, 6);
      const filterAug = getMonthlyIncome(filteredData, 7);
      const filterSep = getMonthlyIncome(filteredData, 8);
      const filterOkt = getMonthlyIncome(filteredData, 9);
      const filterNov = getMonthlyIncome(filteredData, 10);
      const filterDec = getMonthlyIncome(filteredData, 11);

      setJan((prev) => {
        return { ...prev, expense: filterJan };
      });

      setFeb((prev) => {
        return { ...prev, income: filterFeb };
      });
      setMar((prev) => {
        return { ...prev, income: filterMar };
      });
      setApr((prev) => {
        return { ...prev, income: filterApr };
      });
      setMay((prev) => {
        return { ...prev, income: filterMay };
      });
      setJun((prev) => {
        return { ...prev, income: filterJun };
      });
      setJul((prev) => {
        return { ...prev, income: filterJul };
      });
      setAug((prev) => {
        return { ...prev, income: filterAug };
      });
      setSep((prev) => {
        return { ...prev, income: filterSep };
      });
      setOkt((prev) => {
        return { ...prev, income: filterOkt };
      });
      setNov((prev) => {
        return { ...prev, income: filterNov };
      });
      setDec((prev) => {
        return { ...prev, income: filterDec };
      });
    }
  }, [incomes]);

  const data = [
    { month: "Jan", income: jan.income, expense: jan.expense },
    { month: "Feb", income: feb.income, expense: feb.expense },
    { month: "Mar", income: mar.income, expense: mar.expense },
    { month: "Apr", income: apr.income, expense: apr.expense },
    { month: "May", income: may.income, expense: may.expense },
    { month: "Jun", income: jun.income, expense: jun.expense },
    { month: "Jul", income: jul.income, expense: jul.expense },
    { month: "Aug", income: aug.income, expense: aug.expense },
    { month: "Sep", income: sep.income, expense: sep.expense },
    { month: "Oct", income: okt.income, expense: okt.expense },
    { month: "Nov", income: nov.income, expense: nov.expense },
    { month: "Dec", income: dec.income, expense: dec.expense },
  ];

  const formatK = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };

  const { isDark } = useGlobalContext();

  return (
    <div
      className={`w-full h-[130px] border border-gray-400/10 bg-gradient-to-t    ${
        isDark ? "from-purple-200" : "from-slate-800"
      } to-transparent rounded-xl  pb-4`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barSize={18}
          barGap={2}
          margin={{ left: -10, bottom: -15, top: 10 }}
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
            radius={[3, 3, 0, 0]}
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
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
