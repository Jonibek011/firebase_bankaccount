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

//hooks
import useWindowSize from "../../hooks/useWindowSize";
// =============== MAIN FUNCTION ============================
export default function IncomeChart({ allIncomes, collections }) {
  //windowsize
  const { width } = useWindowSize();
  // const { user } = useGlobalContext();
  // const { data: collectionData } = useAllCollection("Expenses", [
  //   "userId",
  //   "==",
  //   user.uid,
  // ]);

  // const { data: incomes } = useAllCollection("Incomes", [
  //   "userId",
  //   "==",
  //   user.uid,
  // ]);

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
  // //oyma oy expenselarni hisoblash

  useEffect(() => {
    if (Array.isArray(allIncomes) && allIncomes?.length > 0) {
      const filterJan = getMonthlyIncome(allIncomes, 0);
      const filterFeb = getMonthlyIncome(allIncomes, 1);
      const filterMar = getMonthlyIncome(allIncomes, 2);
      const filterApr = getMonthlyIncome(allIncomes, 3);
      const filterMay = getMonthlyIncome(allIncomes, 4);
      const filterJun = getMonthlyIncome(allIncomes, 5);
      const filterJul = getMonthlyIncome(allIncomes, 6);
      const filterAug = getMonthlyIncome(allIncomes, 7);
      const filterSep = getMonthlyIncome(allIncomes, 8);
      const filterOkt = getMonthlyIncome(allIncomes, 9);
      const filterNov = getMonthlyIncome(allIncomes, 10);
      const filterDec = getMonthlyIncome(allIncomes, 11);

      const exJan = getMonthlySpend(collections, 0);
      const exFeb = getMonthlySpend(collections, 1);
      const exMar = getMonthlySpend(collections, 2);
      const exApr = getMonthlySpend(collections, 3);
      const exMay = getMonthlySpend(collections, 4);
      const exJun = getMonthlySpend(collections, 5);
      const exJul = getMonthlySpend(collections, 6);
      const exAug = getMonthlySpend(collections, 7);
      const exSep = getMonthlySpend(collections, 8);
      const exOkt = getMonthlySpend(collections, 9);
      const exNov = getMonthlySpend(collections, 10);
      const exDec = getMonthlySpend(collections, 11);

      setJan(() => {
        return { income: filterJan, expense: exJan };
      });

      setFeb(() => {
        return { income: filterFeb, expense: exFeb };
      });
      setMar(() => {
        return { income: filterMar, expense: exMar };
      });
      setApr(() => {
        return { income: filterApr, expense: exApr };
      });
      setMay(() => {
        return { income: filterMay, expense: exMay };
      });
      setJun(() => {
        return { income: filterJun, expense: exJun };
      });
      setJul(() => {
        return { income: filterJul, expense: exJul };
      });
      setAug(() => {
        return { income: filterAug, expense: exAug };
      });
      setSep(() => {
        return { income: filterSep, expense: exSep };
      });
      setOkt(() => {
        return { income: filterOkt, expense: exOkt };
      });
      setNov(() => {
        return { income: filterNov, expense: exNov };
      });
      setDec(() => {
        return { income: filterDec, expense: exDec };
      });
    }
  }, [allIncomes, collections]);

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
    <div className={`w-full h-64 md:h-80 lg:h-96 bg-base-100 rounded-xl  pb-4`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={40} barGap={2} margin={{ top: 10 }}>
          <CartesianGrid strokeDasharray="4 4" vertical="4 4" />

          <XAxis
            dataKey="month"
            tick={{
              fill: isDark ? "#313647" : "#FFFFFF",
              fontSize: width < 500 ? 10 : width < 600 ? 12 : 16,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
            tick={{
              fill: isDark ? "#313647" : "#FFFFFF",
              fontSize: width < 500 ? 10 : width < 600 ? 12 : 16,
            }}
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
              fontSize={width < 500 ? 10 : width < 600 ? 12 : 16}
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
