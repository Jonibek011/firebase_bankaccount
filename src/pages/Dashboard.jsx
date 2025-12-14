import { LuSearch } from "react-icons/lu";
import { BsBellFill } from "react-icons/bs";
import ellipses from "../assets/images/Ellipse 3.png";

import { LiaBalanceScaleSolid } from "react-icons/lia";
import { TbUserDollar } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineFall } from "react-icons/ai";
//components
// import EarningChart from "../components/EarningChart";
// import useWindowSize from "../hooks/useWindowSize";
import useGlobalContext from "../hooks/useGlobalContext";
import ExpensesPieChart from "../components/ExtensesPieChart";
import { useEffect, useMemo, useState } from "react";
import { useAllCollection } from "../hooks/useAllCollection";
import { useContext } from "react";
import { MainIncomContext } from "../context/IncomeContext";
import { isWithinInterval } from "date-fns";
import { useFirestore } from "../hooks/useFirestore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
//main function
function Dashboard() {
  // const { width, height } = useWindowSize();
  const [date, setDate] = useState(new Date());
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [monthlySaving, setMonthlySaving] = useState(0);
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [incomeCompare, setIncomeCompare] = useState(0);
  const [lastMonthExpenses, setLastMonthExpenses] = useState(0);
  const [expenseCompare, setExpenseCompare] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);
  const [maxCategory, setMaxCategory] = useState("");
  const [weeklyExpense, setWeeklyExpense] = useState(0);
  const [lastWeekExpense, setLastWeekExpense] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [category, setCategory] = useState("");
  const [limitAmaunt, setLimitAmaunt] = useState("");
  const [limitLoader, setLimitLoader] = useState(false);
  const [limitData, setLimitData] = useState(null);

  const [tasks, setTasks] = useState(null);
  const { user } = useGlobalContext();
  const { incomes } = useContext(MainIncomContext);
  const { addOrUpdateLimit } = useFirestore();

  useEffect(() => {
    if (!Array.isArray(incomes)) {
      setMonthlyIncome(0);
      setLastMonthIncome(0);
      return;
    }

    const now = new Date();
    const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(firstOfThisMonth.getTime() - 1);

    // yordamchi: timestampni Date ga aylantiradi (Firestore Timestamp yoki Date/string)
    const toDateSafe = (ts) => {
      if (!ts) return null;
      if (typeof ts.toDate === "function") return ts.toDate();
      const d = new Date(ts);
      return isNaN(d.getTime()) ? null : d;
    };

    const monthIncomeItems = incomes.filter((item) => {
      const incomeTime = toDateSafe(item?.timeStamp);
      if (!incomeTime) return false;
      return isWithinInterval(incomeTime, {
        start: firstOfThisMonth,
        end: now,
      });
    });

    const lastMonthIncomeItems = incomes.filter((item) => {
      const incomeTime = toDateSafe(item?.timeStamp);
      if (!incomeTime) return false;
      return isWithinInterval(incomeTime, {
        start: firstOfLastMonth,
        end: endOfLastMonth,
      });
    });

    const monthlyEarn = monthIncomeItems.reduce(
      (acc, it) => acc + Number(it.income || 0),
      0
    );
    const lastMonthlyEarn = lastMonthIncomeItems.reduce(
      (acc, it) => acc + Number(it.income || 0),
      0
    );

    setMonthlyIncome(monthlyEarn);
    setLastMonthIncome(lastMonthlyEarn);

    // Hech qachon non-function qaytarmaymiz!
    return () => {
      // agar kelajakda listener yoki interval bo'lsa, shu yerda tozalashni bajarasiz
    };
  }, [incomes]);

  useEffect(() => {
    if (monthlyIncome > lastMonthIncome && lastMonthIncome > 0) {
      setIncomeCompare((monthlyIncome / lastMonthIncome).toFixed(1));
    } else if (lastMonthIncome > monthlyIncome && monthlyIncome > 0) {
      setIncomeCompare((lastMonthIncome / monthlyIncome).toFixed(1));
    } else {
      setIncomeCompare(null);
    }
  }, [monthlyIncome, lastMonthIncome]);

  const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Okt",
    11: "Nov",
    12: "Dec",
  };
  const days = {
    1: "Sun",
    2: "Mon",
    3: "Tue",
    4: "Wed",
    5: "Thir",
    6: "Fri",
    7: "Sat",
  };

  const weakDay = date.getDay();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  //firebasedan data olish
  const { data: collectionData } = useAllCollection("Expenses", [
    "userId",
    "==",
    user.uid,
  ]);

  //firebasedan limit olish
  const { data: collectionLimit } = useAllCollection("expenseLimits", [
    "userId",
    "==",
    user.uid,
  ]);

  useEffect(() => {
    setLimitData(collectionLimit[0]?.limits);
  }, [collectionLimit]);

  //collectionDatadan categoriya bo'yicha expenselarni olish
  const getExByCategory = (category) => {
    const toDateSafe = (ts) => {
      if (!ts) return null;
      if (typeof ts.toDate === "function") return ts.toDate();
      const d = new Date(ts);
      return isNaN(d.getTime()) ? null : d;
    };
    const filteredData = collectionData.filter((item) => {
      const now = new Date();
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const itemTime = toDateSafe(item?.timeStamp);

      return isWithinInterval(itemTime, { start: firstOfMonth, end: now });
    });
    let allSum = 0;
    if (filteredData.length > 0) {
      const filterByCategory = filteredData.filter((item) => {
        return item.category === category;
      });

      filterByCategory.forEach((item) => {
        allSum += Number(item.amaunt);
      });
    }

    return allSum;
  };
  //firebase dan tasklarni olish
  const filterData = useMemo(() => ["userId", "==", user.uid], [user.uid]);
  const { data: taskData } = useAllCollection("Tasks", filterData);

  const mapDataForChart = useMemo(() => {
    if (Array.isArray(collectionData) && collectionData.length > 0) {
      return collectionData;
    }
  }, [collectionData]);

  useEffect(() => {
    setDate(new Date());
    const interval = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  //Monthly expense
  useEffect(() => {
    if (collectionData.length == 0) return;

    const today = new Date();
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const filteredExpenses = collectionData.filter((item) => {
      const expenseTime = item.timeStamp.toDate();
      return isWithinInterval(expenseTime, { start: firstOfMonth, end: today });
    });

    let expenseAmaunt = 0;
    filteredExpenses.forEach((item) => {
      expenseAmaunt += Number(item.amaunt);
    });

    const filteredLastMonth = collectionData.filter((item) => {
      const expenseTime = item.timeStamp.toDate();
      const firstOLastfMonth = new Date(
        today.getFullYear,
        today.getMonth - 1,
        1
      );
      return isWithinInterval(expenseTime, {
        start: firstOLastfMonth,
        end: new Date(firstOfMonth.getTime() - 1),
      });
    });

    let lastMonthExpense = 0;
    filteredLastMonth.forEach((item) => {
      lastMonthExpense += Number(item.amaunt);
    });
    setMonthlyExpense(expenseAmaunt);
    setLastMonthExpenses(lastMonthExpense);
    return () => {};
  }, [collectionData]);

  useEffect(() => {
    if (monthlyExpense > lastMonthExpenses && lastMonthExpenses > 0) {
      setIncomeCompare((monthlyExpense / lastMonthExpenses).toFixed(1));
    } else if (lastMonthExpenses > monthlyExpense && monthlyExpense > 0) {
      setIncomeCompare((lastMonthExpenses / monthlyExpense).toFixed(1));
    } else {
      setExpenseCompare(null);
    }
  }, [monthlyExpense, lastMonthExpenses]);

  useEffect(() => {
    if (!collectionData || collectionData.length == 0) return;
    const numbers = collectionData.map((item) => {
      return item.amaunt;
    });

    const max = Math.max(...numbers);
    const filter = collectionData.filter((item) => item.amaunt == max);

    const maxCategories = filter[0].category;

    setMaxCategory(maxCategories);
    setMaxExpense(max);
  }, [collectionData]);

  useEffect(() => {
    if (monthlyIncome > monthlyExpense) {
      setMonthlySaving(monthlyIncome - monthlyExpense);
    }
  }, [monthlyIncome, monthlyExpense]);

  useEffect(() => {
    // Weekly expense
    const today = new Date();
    const oneWeekExpense = new Date();
    oneWeekExpense.setDate(today.getDate() - 7);
    const filterData = collectionData.filter((item) => {
      const expenseTime = new Date(item.timeStamp.seconds * 1000);
      return isWithinInterval(expenseTime, {
        start: oneWeekExpense,
        end: today,
      });
    });

    let weeklySum = 0;
    filterData.forEach((item) => {
      weeklySum += Number(item.amaunt);
    });

    //Last week expense
    const lastweak = new Date();
    lastweak.setDate(today.getDate() - 14);

    const filterLaseWeek = collectionData.filter((item) => {
      const expenseDate = item.timeStamp.toDate();
      return isWithinInterval(expenseDate, {
        start: lastweak,
        end: oneWeekExpense,
      });
    });

    let twoWeeksAgo = 0;
    filterLaseWeek.forEach((item) => {
      twoWeeksAgo += Number(item.amaunt);
    });

    //week Income
    const filterIncome = incomes.filter((item) => {
      const expenseDate = item.timeStamp.toDate();
      return isWithinInterval(expenseDate, {
        start: oneWeekExpense,
        end: today,
      });
    });

    let lastIncome = 0;
    filterIncome.forEach((item) => {
      lastIncome += Number(item.income);
    });

    //last week income

    setWeeklyIncome(lastIncome);

    setWeeklyExpense(weeklySum);
    setLastWeekExpense(twoWeeksAgo);
  }, [collectionData, incomes]);

  // Tasks section uchun
  useEffect(() => {
    if (!taskData) return;

    if (taskData.length > 2) {
      const filterTask = taskData.slice(-3);
      setTasks(filterTask);
    }
  }, [taskData]);

  const shortenText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // to get display name
  const getDisplayname = (text) => {
    const arr = text.split(" ");
    return arr[0];
  };

  // Category lar orqali limit o'rnatish
  const handleSetLimit = async () => {
    if (!limitAmaunt || category === "") {
      toast.error("Fields can't be empty");
      return;
    } else if (limitAmaunt === 0) {
      toast.error("Limit can't be less than 0!");
      return;
    }
    setLimitLoader(true);
    await addOrUpdateLimit(user.uid, category, limitAmaunt);
    setLimitLoader(false);
    setLimitAmaunt("");
    setCategory("");
  };

  return (
    <section className="flex max-w-[1500px] mx-auto flex-col lg:flex-row w-full lg:h-[calc(100vh-70px)] bg-base-100/80">
      <div className="flex order-2 lg:order-1 flex-col gap-5 min-w-64 lg:h-[calc(100vh-70px)] overflow-y-auto bg-base-100 border border-t-0 border-b-0 border-base-content/10 p-6">
        <div>
          <h2 className="font-medium text-lg">Monthly Statistics</h2>
          <p className="text-sm text-gray-400">
            {days[weakDay + 1]}, {day < 10 ? "0" + day : day}{" "}
            {months[month + 1]}, {year}, {hour < 10 ? "0" + hour : hour}:
            {minute < 10 ? "0" + minute : minute} AM
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 md:flex-row lg:flex-col ">
            <div className="card md:flex-1 lg:flex-none rounded-lg px-5 py-3 bg-orange-400/5 shadow-md shadow-purple-400/40">
              <div className="border-b border-base-content/10 flex justify-between items-center py-2">
                <h3 className="font-medium">Income</h3>
                <span className="badge badge-sm  bg-base-200 font-medium text-base-content/50 rounded-sm py-2 px-2">
                  Month
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold">$ {monthlyIncome}</h2>
                  {incomeCompare && (
                    <span className="text-red-500 self-end">
                      {incomeCompare}%
                    </span>
                  )}
                </div>
                <p className="text-sm font-normal text-gray-400">
                  Compered to ${lastMonthIncome} last month
                </p>
                <div className="flex text-sm justify-between items-center font-semibold text-base-content/70">
                  <span>Weekly Income</span>
                  <span>${weeklyIncome}</span>
                </div>
              </div>
            </div>

            <div className="card md:flex-1 lg:flex-none rounded-lg px-5 py-3 bg-base-100 shadow-md bg-green-400/5  shadow-green-400/20">
              <div className="border-b border-base-content/10 flex justify-between items-center py-2">
                <h3 className="font-medium">Expenses</h3>
                <span className="badge badge-sm  bg-base-200 font-medium text-base-content/50 rounded-sm py-2 px-2">
                  Month
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold">$ {monthlyExpense}</h2>
                  {expenseCompare && (
                    <span className="text-green-500 self-end">
                      {expenseCompare}%
                    </span>
                  )}
                </div>
                <p className="text-sm font-normal text-gray-400">
                  Compered to ${lastMonthExpenses} last month
                </p>
                <div className="flex text-sm justify-between items-center font-semibold text-base-content/70">
                  <span>Last weak expenses</span>
                  <span>${lastWeekExpense}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart rounded-lg px-5 py-3  flex flex-col gap-5 bg-pink-400/5 shadow-md shadow-pink-400/20">
            <h2 className="py-3 border-b border-base-content/10 font-medium flex flex-col text-center ">
              <span>Where do you spend money? </span>{" "}
              <span className="text-xs font-normal text-gray-400">
                (this month)
              </span>
            </h2>

            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 "></span>
                <span className="font-medium text-base-content/70">Food</span>
              </div>{" "}
              <div className="relative w-full flex-1  h-2">
                <span className="text-[11px] font-medium text-gray-400 absolute top-[-200%] left-[50%] translate-x-[-50%]">
                  {getExByCategory("Food") || 0} /{limitData?.Food ?? 100}
                </span>{" "}
                <span className=" bg-gray-200 rounded-full w-full h-full absolute top-0 left-0  overflow-x-hidden">
                  <span
                    style={{
                      width: `${(
                        ((getExByCategory("Food") || 0) /
                          (limitData?.Food ?? 100)) *
                        100
                      ).toFixed(0)}%`,
                    }}
                    className="absolute left-0 h-full  bg-green-500"
                  ></span>{" "}
                </span>{" "}
              </div>
              <span className="text-sm font-medium">
                {(
                  ((getExByCategory("Food") || 0) / (limitData?.Food ?? 100)) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>

            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500 "></span>
                <span className="font-medium text-base-content/70">
                  Transport
                </span>
              </div>
              <div className="relative w-full flex-1  h-2">
                <span className="text-[11px] font-medium text-gray-400 absolute top-[-200%] left-[50%] translate-x-[-50%]">
                  {getExByCategory("Transport") || 0}/
                  {limitData?.Transport ?? 100}
                </span>{" "}
                <span className=" bg-gray-200 rounded-full w-full h-full absolute top-0 left-0  overflow-x-hidden">
                  <span
                    style={{
                      width: `${(
                        ((getExByCategory("Transport") || 0) /
                          (limitData?.Transport ?? 100)) *
                        100
                      ).toFixed(0)}%`,
                    }}
                    className="absolute left-0 h-full  bg-purple-500"
                  ></span>{" "}
                </span>{" "}
              </div>
              <span className="text-sm font-medium">
                {(
                  ((getExByCategory("Transport") || 0) /
                    (limitData?.Transport ?? 100)) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>

            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 "></span>
                <span className="font-medium text-base-content/70">
                  Entertainment
                </span>
              </div>
              <div className="relative w-full flex-1  h-2">
                <span className="text-[11px] font-medium text-gray-400 absolute top-[-200%] left-[50%] translate-x-[-50%]">
                  {getExByCategory("Entertainment") || 0}/
                  {limitData?.Entertainment ?? 100}
                </span>{" "}
                <span className=" bg-gray-200 rounded-full w-full h-full absolute top-0 left-0  overflow-x-hidden">
                  <span
                    style={{
                      width: `${(
                        ((getExByCategory("Entertainment") || 0) /
                          (limitData?.Entertainment ?? 100)) *
                        100
                      ).toFixed(0)}%`,
                    }}
                    className="absolute left-0 h-full  bg-orange-500"
                  ></span>{" "}
                </span>{" "}
              </div>
              <span className="text-sm font-medium">
                {(
                  ((getExByCategory("Entertainment") || 0) /
                    (limitData?.Entertainment ?? 100)) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>

            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 "></span>
                <span className="font-medium text-base-content/70">
                  Technology
                </span>
              </div>
              <div className="relative w-full flex-1  h-2">
                <span className="text-[11px] font-medium text-gray-400 absolute top-[-200%] left-[50%] translate-x-[-50%]">
                  {getExByCategory("Technology") || 0}/
                  {limitData?.Technology ?? 100}
                </span>{" "}
                <span className=" bg-gray-200 rounded-full w-full h-full absolute top-0 left-0  overflow-x-hidden">
                  <span
                    style={{
                      width: `${(
                        ((getExByCategory("Technology") || 0) /
                          (limitData?.Technology ?? 100)) *
                        100
                      ).toFixed(0)}%`,
                    }}
                    className="absolute left-0 h-full  bg-blue-500"
                  ></span>{" "}
                </span>{" "}
              </div>
              <span className="text-sm font-medium">
                {(
                  ((getExByCategory("Technology") || 0) /
                    (limitData?.Technology ?? 100)) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>

            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 "></span>
                <span className="font-medium text-base-content/70">Other</span>
              </div>
              <div className="relative w-full flex-1  h-2">
                <span className="text-[11px] font-medium text-gray-400 absolute top-[-200%] left-[50%] translate-x-[-50%]">
                  {getExByCategory("Other") || 0}/{limitData?.Other ?? 100}
                </span>{" "}
                <span className=" bg-gray-200 rounded-full w-full h-full absolute top-0 left-0  overflow-x-hidden">
                  <span
                    style={{
                      width: `${(
                        ((getExByCategory("Other") || 0) /
                          (limitData?.Other ?? 100)) *
                        100
                      ).toFixed(0)}%`,
                    }}
                    className="absolute left-0 h-full  bg-red-500"
                  ></span>{" "}
                </span>{" "}
              </div>
              <span className="text-sm font-medium">
                {(
                  ((getExByCategory("Other") || 0) /
                    (limitData?.Other ?? 100)) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-sm btn-outline btn-primary rounded-md w-full">
                Check limits
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex-1 order-1 lg:order-2  p-5 flex flex-col gap-4 w-full    md:pb-10 lg:min md:h-[calc(100vh-70px)] overflow-y-auto bg-purple-400/5">
        {/* ============================ High section ================================= */}
        <div className="w-full flex gap-10 justify-between items-center">
          <h2 className="text-lg font-medium">
            Hello {getDisplayname(user.displayName)} ✌
          </h2>
          <div className="flex gap-10 items-center">
            <span className="relative">
              <span className="absolute right-[0px] border-2 border-base-100 top-0 w-[10px] h-[10px] rounded-full bg-red-600"></span>
              <BsBellFill className="w-6 h-6 text-base-content/55" />
            </span>
            <label className=" hidden rounded-md px-4 h-10 max-w-sm w-full sm:flex items-center bg-base-100 shadow-md focus:outline-none focus:ring-0 focus:shadow-none">
              <input
                type="search"
                className="flex-1 px-4 focus:outline-none focus:ring-0 focus:shadow-none text-base-content bg-transparent"
                placeholder="Search here"
              />
              <span>
                <LuSearch className="w-5 h-5 text-base-content/50" />
              </span>
            </label>
          </div>
        </div>
        {/* ================================== Middle section ============================= */}
        <div className=" p-5       max-w-[90vw] lg:max-w-full   lg:w-[calc(100vw-450px)] flex gap-8 flex-wrap  ">
          <div className="flex-1 shadow-md bg-white py-4   rounded-md min-w-[300px]    border-elg:pe-2  ">
            <div className={`flex px-4 gap-8`}>
              <p
                className={` flex justify-center items-center bg-gradient-to-br from-purple-400 to-purple-700 w-14 h-14  rounded-xl  `}
              >
                <LiaBalanceScaleSolid className={`w-8 h-8 text-white `} />
              </p>
              <div className="flex items-center justify-center flex-col gap-1">
                <p className="text-gray-400">Monthly Savings</p>
                <h2 className={`text-4xl  font-bold`}>${monthlySaving}</h2>
                <p>
                  <span className="text-green-600 font-medium">16% </span>this
                  month
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 shadow-md  rounded-md min-w-[300px]     py-8 bg-base-100 lg:pe-2  ">
            <div className={`flex items-center justify-center gap-8`}>
              <p
                className={` flex justify-center items-center bg-gradient-to-br  from-red-500/10 to-red-300 w-24 h-24  rounded-2xl`}
              >
                <AiOutlineFall className={`w-14 h-14 text-red-600 `} />
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Weakly expense</p>
                <h2 className={`text-4xl font-bold`}>${weeklyExpense}</h2>
                <p>
                  <span className="text-red-600 font-medium">14% </span>this
                  week
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 shadow-md  rounded-md  min-w-[300px]    py-8 bg-white lg:pe-2  ">
            <div className={`flex justify-center items-center gap-8 `}>
              <p
                className={` flex justify-center items-center bg-gradient-to-b from-green-500/10 to-green-300/10 w-24 h-24  rounded-full`}
              >
                <BsCurrencyDollar className={`w-14 h-14  text-green-600 `} />
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Highest Expense</p>
                <h2 className={`text-4xl  font-bold`}>${maxExpense}</h2>
                <p className="text-green-500 flex items-center gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>{" "}
                  {maxCategory}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================= Table =================================== */}
        <div className=" max-w-full  lg:w-[calc(100vw-396px)] rounded-xl p-8 shadow-md   bg-base-100  ">
          <div className="w-full">
            <h2 className="text-xl font-semibold">Recent Task Status</h2>
            <div className="task-table overflow-x-auto max-w-[80vw]  ">
              <table className="table  min-w-[800px] ">
                <thead>
                  <tr className="text-base-content/30  text-[16px]">
                    <th className="font-medium">No.</th>
                    <th className="font-medium">Task title</th>
                    <th className="font-medium">Task status</th>
                    <th className="font-medium">Due date</th>
                    <th className="font-medium">Task date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {!tasks && (
                    <>
                      <tr>
                        <td>01</td>
                        <td>
                          <span className="badge px-5 py-3 rounded-md bg-gray-50 border-none">
                            6465
                          </span>
                        </td>
                        <td className="flex gap-4 items-center">
                          <img
                            src={ellipses}
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <h2 className="text-[16px] font-medium">
                            Alex Noman
                          </h2>
                        </td>
                        <td className="">
                          <div className="flex items-center gap-4">
                            <span className="w-3 h-3 rounded-full bg-green-500 outline outline-1 outline-green-500 outline-offset-1"></span>
                            <p className="text-[16px] text-base-content/50 font-medium">
                              Completed
                            </p>
                          </div>
                        </td>
                        <td>01.01.2026</td>
                        <td className="text-end">
                          <button className="btn btn-sm px-6 bg-blue-500 hover:bg-blue-600 text-white">
                            Details
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td>
                          <span className="badge px-5 py-3 rounded-md bg-gray-50 border-none">
                            6465
                          </span>
                        </td>
                        <td className="flex gap-4 items-center">
                          <img
                            src={ellipses}
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <h2 className="text-[16px] font-medium">
                            Razib Rahman
                          </h2>
                        </td>
                        <td className="">
                          <div className="flex items-center gap-4">
                            <span className="w-3 h-3 rounded-full bg-blue-500 outline outline-1 outline-blue-500 outline-offset-1"></span>
                            <p className="text-[16px] text-base-content/50 font-medium">
                              Pending
                            </p>
                          </div>
                        </td>
                        <td>01.01.2026</td>
                        <td className="text-end">
                          <button className="btn btn-sm px-6 bg-blue-500 hover:bg-blue-600 text-white">
                            Details
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td>
                          <span className="badge px-5 py-3 rounded-md bg-gray-50 border-none">
                            6465
                          </span>
                        </td>
                        <td className="flex gap-4 items-center">
                          <img
                            src={ellipses}
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <h2 className="text-[16px] font-[500]">
                            Luke Norton
                          </h2>
                        </td>
                        <td className="">
                          <div className="flex items-center gap-4">
                            <span className="w-3 h-3 rounded-full bg-red-500 outline outline-1 outline-red-500 outline-offset-1"></span>
                            <p className="text-[16px] text-base-content/50 font-medium">
                              On route
                            </p>
                          </div>
                        </td>
                        <td>01.01.2026</td>
                        <td className="text-end">
                          <button className="btn btn-sm px-6 bg-blue-500 hover:bg-blue-600 text-white">
                            Details
                          </button>
                        </td>
                      </tr>
                    </>
                  )}
                  {tasks?.map((task, index) => {
                    return (
                      <tr key={task.id}>
                        <td>{index + 1}</td>
                        <td>
                          <span className="  py-3 rounded-md font-semibold text-[16px] text-base-content/80 border-none">
                            {shortenText(task.taskTitle, 30)}
                          </span>
                        </td>
                        <td className="flex gap-4 items-center">
                          <div className="flex items-center gap-4">
                            <span
                              className={`w-3 h-3 rounded-full ${
                                task.status == "Pending"
                                  ? " bg-red-500 outline outline-1 outline-red-500"
                                  : " bg-blue-500 outline outline-1 outline-blue-500"
                              } outline-offset-1`}
                            ></span>
                            <p className="text-[16px] text-base-content/50 font-medium">
                              {task.status}
                            </p>
                          </div>
                        </td>
                        <td className="">
                          <p className="text-[16px] text-base-content/50 font-medium">
                            {task.taskDate}
                          </p>
                          {/* <img
                            src={ellipses}
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <h2 className="text-[16px] font-[500]">
                            Luke Norton
                          </h2> */}
                        </td>
                        <td>
                          <p className="text-[16px] text-base-content/50 font-medium">
                            {task.date}
                          </p>
                        </td>
                        <td className="text-end">
                          <Link
                            to="/tasks"
                            className="btn btn-sm px-6 bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row gap-8">
          {" "}
          <div className="flex-1 bg-base-100 rounded-xl shadow-md p-4 flex flex-col gap-4">
            <h2 className="font-semibold text-xl text-center ">
              Set monthly Expense limit{" "}
              <span className="text-sm font-normal italic">default ($100)</span>
            </h2>
            <div className="w-full h-full flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-gray-400">Choose category</span>
                <div className="dropdown dropdown-end w-full">
                  <div
                    tabIndex={0}
                    role="button"
                    className="w-full h-10 rounded-md border border-base-content/30 shadow-sm flex items-center px-5 font-medium text-base-content/80"
                  >
                    {category || (
                      <span className="font-normal text-gray-400">
                        Category
                      </span>
                    )}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-md z-[1] w-full p-2 shadow"
                  >
                    <li onClick={() => setCategory("Food")}>
                      <a className="font-medium text-[15px]">Food</a>
                    </li>
                    <li onClick={() => setCategory("Transport")}>
                      <a className="font-medium text-[15px]">Transport</a>
                    </li>
                    <li onClick={() => setCategory("Entertainment")}>
                      <a className="font-medium text-[15px]">Entertainment</a>
                    </li>
                    <li onClick={() => setCategory("Technology")}>
                      <a className="font-medium text-[15px]">Technology</a>
                    </li>
                    <li onClick={() => setCategory("Other")}>
                      <a className="font-medium text-[15px]">Other</a>
                    </li>
                  </ul>
                </div>
              </div>

              <label className="flex flex-col ">
                <span className="text-gray-400">Set limit </span>
                <input
                  value={limitAmaunt}
                  onChange={(e) => setLimitAmaunt(e.target.value)}
                  type="number"
                  step="any"
                  placeholder="Enter number ($)"
                  className="input input-sm shadow-sm w-full h-10 text-[16px] px-5 bordered border-base-content/30 rounded-md focus:outline-none focus:ring-none"
                />
              </label>
              <div className="w-full flex justify-end">
                <button
                  onClick={handleSetLimit}
                  disabled={limitLoader}
                  className="btn btn-sm w-36 h-10 bg-blue-500 hover:bg-blue-600 text-white text-[15px]"
                >
                  {limitLoader && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}{" "}
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-base-100 shadow-md rounded-lg">
            <ExpensesPieChart mapDataForChart={mapDataForChart} />{" "}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
