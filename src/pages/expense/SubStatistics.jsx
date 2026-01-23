import React, { useEffect, useMemo, useState } from "react";
//import params
import { useParams } from "react-router-dom";
//useTranslation
import { useTranslation } from "react-i18next";
//icons
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";
import { FiCreditCard } from "react-icons/fi";
import { TbPig } from "react-icons/tb";

//contenxt
import useGlobalContext from "../../hooks/useGlobalContext";

//components
import BarChart from "../../components/statistics/BarChart";
import PieChart1 from "../../components/statistics/PieChart";
import LineChart1 from "../../components/statistics/LineChart";
import Compare from "../../components/statistics/Compare";
import IncomeTable from "../../components/statistics/IncomeTable";

//hooks
import useWindowSize from "../../hooks/useWindowSize";
import { useAllCollection } from "../../hooks/useAllCollection";

// ============= MAIN FUNCTION =======================================
function SubStatistics() {
  //states
  const [allIncomesSum, setAllIncomesSum] = useState(0);
  const [allExpenseSum, setAllExpenseSum] = useState(0);
  const [expenseMonths, setExpenseMonths] = useState([]);
  const [incomeMonths, setIncomeMonths] = useState([]);
  const [monthlyHighExpense, setMonthlyHighExpense] = useState({
    count: 0,
    mon: "",
  });
  const [highCategory, setHighCategory] = useState("");
  const { year: yearParam } = useParams();
  //windowsize
  const { width } = useWindowSize();
  //translation
  const { t } = useTranslation();

  //isDark
  const { isDark, user } = useGlobalContext();

  //collectionData
  const { data: collectionData } = useAllCollection("Expenses", [
    "userId",
    "==",
    user.uid,
  ]);

  //incomes
  const { data: incomes } = useAllCollection("Incomes", [
    "userId",
    "==",
    user.uid,
  ]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //YIl bo'yicha expense larni ajratib olish
  const collections = useMemo(() => {
    if (Array.isArray(collectionData) && collectionData.length > 0) {
      return collectionData.filter((item) => item.year == Number(yearParam));
    }

    return [];
  }, [yearParam, collectionData]);

  //yil bo'yicha incomelarni ajratib olish
  const allIncomes = useMemo(() => {
    if (Array.isArray(incomes) && incomes.length > 0) {
      return incomes.filter((item) => {
        return item.timeStamp.toDate().getFullYear() == Number(yearParam);
      });
    }
  }, [incomes, yearParam]);

  useEffect(() => {
    if (!allIncomes || !collections) return;
    let incomesSum = 0;
    allIncomes.forEach((incomes) => {
      incomesSum += Number(incomes.income);
    });

    let collectSum = 0;
    collections.forEach((collect) => {
      collectSum += Number(collect.amaunt);
    });

    setAllIncomesSum(incomesSum.toFixed(2));
    setAllExpenseSum(collectSum.toFixed(2));

    //o'rtacha xarajat
    const averageEx = Array.from(
      new Set(collections.map((collect) => collect.month))
    ).sort((a, b) => a - b);

    const averageIn = Array.from(
      new Set(
        allIncomes.map((incomes) => incomes.timeStamp.toDate().getMonth())
      )
    ).sort((a, b) => a - b);

    setExpenseMonths(averageEx);
    setIncomeMonths(averageIn);
  }, [collections, allIncomes]);

  //Eng kop xarajat qilingan oyni hisoblash
  useEffect(() => {
    if (!collections) return;
    const m = { count: 0, mon: "" };
    months.forEach((month, index) => {
      const filteredCollections = collections.filter(
        (item) => item.month == index
      );
      let num = 0;
      filteredCollections.forEach((i) => {
        num += Number(i.amaunt);
      });

      if (num > m.count) {
        m.count = num;
        m.mon = month;
      }
    });

    const arr = collections.map((item) => {
      return Number(item.amaunt);
    });
    const num = Math.max(...arr);
    const filter = collections.filter((item) => item.amaunt == num);
    const category1 = filter[0]?.category;

    setHighCategory(category1);

    setMonthlyHighExpense(m);
  }, [collections]);

  return (
    <section className="main-statistics">
      <div className="stat-container flex flex-col gap-6 lg:gap-8">
        <div className="cards grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {/* ======================================== Card 1 ===================================== */}
          <div
            className={`card flex-flex-col shadow-lg gap-4 rounded-xl p-5 bg-gradient-to-br ${
              isDark
                ? "from-blue-500 to-blue-600"
                : "from-blue-900 to-indigo-900"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="w-12 h-12 inline-flex justify-center items-center bg-blue-200/20 rounded-xl">
                <FaArrowTrendUp className="w-6 h-6 text-white" />
              </span>
              <span className="text-white/80">{t("subStat.all")}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl lg:text-2xl xl:text-3xl text-white font-medium">
                ${allIncomesSum ? allIncomesSum : "00.0"}
              </p>
              <p className="text-white/80">{t("subStat.income")}</p>
            </div>
          </div>
          {/* ======================================== Card 2 ===================================== */}
          <div
            className={`card flex-flex-col shadow-lg gap-4 rounded-xl p-5 bg-gradient-to-br ${
              isDark
                ? "from-purple-500 to-purple-600"
                : "from-purple-800 to-purple-950"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="w-12 h-12 inline-flex justify-center items-center bg-purple-200/20 rounded-xl">
                <FaArrowTrendDown className="w-6 h-6 text-white" />
              </span>
              <span className="text-white/80">{t("subStat.all")}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl lg:text-2xl xl:text-3xl text-white font-medium">
                ${allExpenseSum ? allExpenseSum : "00.0"}
              </p>
              <p className="text-white/80">{t("subStat.expense")}</p>
            </div>
          </div>
          {/* ======================================== Card 3 ===================================== */}
          <div
            className={`card flex-flex-col shadow-lg gap-4 rounded-xl p-5 bg-gradient-to-br ${
              isDark
                ? "from-green-500 to-green-600"
                : "from-green-800 to-green-950"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="w-12 h-12 inline-flex justify-center items-center bg-green-200/20 rounded-xl">
                <TbPigMoney className="w-6 h-6 text-white" />
              </span>
              <span className="text-white/80">{t("subStat.saved")}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl lg:text-2xl xl:text-3xl text-white font-medium">
                ${allIncomesSum - allExpenseSum}
              </p>
              <p className="text-white/80">
                {(
                  ((allIncomesSum - allExpenseSum) / allIncomesSum) *
                  100
                ).toFixed(1)}
                % {t("subStat.rate")}
              </p>
            </div>
          </div>
          {/* ======================================== Card 4 ===================================== */}
          <div
            className={`card flex-flex-col shadow-lg gap-4 rounded-xl p-5 bg-gradient-to-br ${
              isDark
                ? "from-orange-500 to-orange-600"
                : "from-orange-800 to-orange-950"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="w-12 h-12 inline-flex justify-center items-center bg-orange-200/20 rounded-xl">
                <IoWalletOutline className="w-6 h-6 text-white" />
              </span>
              <span className="text-white/80">{t("subStat.average")}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl lg:text-2xl xl:text-3xl text-white font-medium">
                ${(allExpenseSum / incomeMonths.length).toFixed(1) || "0.00"}
              </p>
              <p className="text-white/80">{t("subStat.monthlyExpense")}</p>
            </div>
          </div>
        </div>

        <div className="bar-chart py-4 md:py-5 lg:py-6 bg-base-100 border-2 shadow border-base-content/10 rounded-xl">
          <h2 className="text-xl md:text-2xl font-medium px-6 mb-3 lg:mb-8">
            {t("subStat.barTitle")}
          </h2>
          <BarChart allIncomes={allIncomes} collections={collections} />
          <div className="flex gap-4 justify-center items-center">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-900 inline-block"></span>
              <span className="text-purple-700 font-medium">
                {t("subStat.income")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 inline-block"></span>
              <span className="text-red-500 font-medium">
                {t("subStat.expense")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 xl:gap-8">
          <div className="flex-1 p-4 md:p-6 bg-base-100 rounded-xl border-2 border-base-content/10 shadow">
            <h2 className="text-xl lg:text-2xl font-medium">
              {t("subStat.pieTitle")}
            </h2>
            <PieChart1 collections={collections} />
          </div>

          <div className="flex-1 p-4 md:p-6 border-2 border-base-content/10 bg-base-100 shadow rounded-xl flex flex-col gap-5 md:gap-6">
            <h2>{t("subStat.lineTitle")}</h2>
            <div className="flex flex-col gap-4">
              <h2 className="font-medium text-xl">{t("subStat.lineTitle2")}</h2>
              <LineChart1 collectionData={collectionData} />
            </div>
            <div className="cards flex flex-col gap-4">
              {/* ========================================================= */}
              <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-400/10 flex gap-4">
                <div>
                  <LuDollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("subStat.card1Title")}</p>
                  <p className="text-blue-600 font-medium">
                    ${(allIncomesSum / incomeMonths.length).toFixed(1)}
                  </p>
                </div>
              </div>
              {/* ========================================================= */}
              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-400/10 flex gap-4">
                <div>
                  <FiCreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("subStat.card2Title")}</p>
                  <p className="text-purple-600 font-medium">
                    {monthlyHighExpense.mon}
                  </p>
                </div>
              </div>
              {/* ========================================================= */}
              <div className="p-4 rounded-xl border border-green-500/30 bg-green-400/10 flex gap-4">
                <div>
                  <TbPig className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("subStat.card3Title")}</p>
                  <p className="text-green-600 font-medium">
                    {(
                      ((allIncomesSum - allExpenseSum) / allIncomesSum) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>
              {/* ========================================================= */}
              <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-400/10 flex gap-4">
                <div>
                  <FaArrowTrendUp className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("subStat.card4Title")}</p>
                  <p className="text-orange-600 font-medium">{highCategory}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="taqqoslash-jadvali bg-base-100 rounded-xl p-5 border-2 border-base-content/10 shadow flex flex-col gap-6">
          <h3>{t("subStat.tableTitle")}</h3>
          <div>
            <Compare collections={collections} allIncomes={allIncomes} />
          </div>
        </div>

        <div className="rounded-xl bg-base-100 border-2 border-base-content/10 p-4 md:-6">
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-medium">{t("subStat.income")}</h2>
            <IncomeTable allIncomes={allIncomes} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubStatistics;
