import { LuSearch } from "react-icons/lu";
import { BsBellFill } from "react-icons/bs";
import ellipses from "../assets/images/Ellipse 3.png";

import { LiaBalanceScaleSolid } from "react-icons/lia";
import { TbUserDollar } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
//components
// import EarningChart from "../components/EarningChart";
import useWindowSize from "../hooks/useWindowSize";
import useGlobalContext from "../hooks/useGlobalContext";
import ExpensesPieChart from "../components/ExtensesPieChart";
import { useEffect, useMemo, useState } from "react";
import { useAllCollection } from "../hooks/useAllCollection";
import { useContext } from "react";
import { MainIncomContext } from "../context/IncomeContext";
import { differenceInDays, isWithinInterval, parseISO } from "date-fns";
import { tr } from "date-fns/locale";
import { Link } from "react-router-dom";
//main function
function Dashboard() {
  const { width, height } = useWindowSize();
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

  const [tasks, setTasks] = useState(null);
  const { user } = useGlobalContext();
  const { incomes } = useContext(MainIncomContext);

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
  return (
    <section className="flex flex-col lg:flex-row w-full lg:h-[calc(100vh-70px)] bg-base-100/80">
      <div className="flex order-2 lg:order-1 flex-col gap-5 min-w-64 lg:h-[calc(100vh-70px)] overflow-y-auto bg-warning/5 p-6">
        <div>
          <h2 className="font-medium text-lg">Monthly Statistics</h2>
          <p className="text-sm text-gray-400">
            {days[weakDay + 1]}, {day < 10 ? "0" + day : day}{" "}
            {months[month + 1]}, {year}, {hour < 10 ? "0" + hour : hour}:
            {minute < 10 ? "0" + minute : minute} AM
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 md:flex-row lg:flex-col">
            <div className="card md:flex-1 lg:flex-none rounded-lg px-5 py-3 bg-base-100 shadow-lg">
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

            <div className="card md:flex-1 lg:flex-none rounded-lg px-5 py-3 bg-base-100 shadow-lg">
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

          <div className="chart rounded-lg px-5 py-3  flex flex-col gap-5 bg-base-100 shadow-lg">
            <h2 className="py-3 border-b border-base-content/10 font-medium ">
              Where do you spend money?
            </h2>
            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 "></span>
                <span className="font-medium text-base-content/70">Food</span>
              </div>{" "}
              <span className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                {" "}
                <span className="absolute top-0 left-0 h-full w-[50%] bg-green-500"></span>{" "}
              </span>{" "}
              <span className="text-sm font-medium">50%</span>
            </div>

            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500 "></span>
                <span className="font-medium text-base-content/70">
                  Transport
                </span>
              </div>
              <span className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                {" "}
                <span className="absolute top-0 left-0 h-full w-[75%] bg-purple-500"></span>{" "}
              </span>{" "}
              <span className="text-sm font-medium">75%</span>
            </div>

            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 "></span>
                <span className="font-medium text-base-content/70">
                  Entertainment
                </span>
              </div>
              <span className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                {" "}
                <span className="absolute top-0 left-0 h-full w-[43%] bg-orange-500"></span>{" "}
              </span>{" "}
              <span className="text-sm font-medium">43%</span>
            </div>

            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 "></span>
                <span className="font-medium text-base-content/70">
                  Technology
                </span>
              </div>
              <span className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                {" "}
                <span className="absolute top-0 left-0 h-full w-[86%] bg-blue-500"></span>{" "}
              </span>{" "}
              <span className="text-sm font-medium">86%</span>
            </div>

            <div className="flex gap-3 justify-between items-center">
              <div className="flex  items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 "></span>
                <span className="font-medium text-base-content/70">Other</span>
              </div>
              <span className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                {" "}
                <span className="absolute top-0 left-0 h-full w-[100%] bg-red-500"></span>{" "}
              </span>{" "}
              <span className="text-sm font-medium">100%</span>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-sm btn-outline btn-primary rounded-md w-full">
                Check limits
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex-1 order-1 lg:order-2  p-5 flex flex-col gap-4 w-full    md:pb-10 lg:min md:h-[calc(100vh-70px)] overflow-y-auto ">
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
        <div className=" p-5 2xl:shadow-md  bg-base-100  overflow-x-auto min-h-[160px] xl:min-h-[140px]  max-w-[90vw] lg:max-w-full   lg:w-[calc(100vw-450px)] flex gap-8 rounded-xl ">
          <div className="flex-1 shadow-md  2xl:shadow-none rounded-md min-w-[300px]    border-e py-0 lg:pe-2  ">
            <div className={`flex justify-center items-center gap-8`}>
              <p
                className={` flex justify-center items-center bg-gradient-to-b from-green-500/10 to-green-300/10 w-24 h-24  rounded-full  `}
              >
                <LiaBalanceScaleSolid className={`w-14 h-14 text-green-600 `} />
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
          <div className="flex-1 shadow-md 2xl:shadow-none rounded-md min-w-[300px]    border-e py-0 lg:pe-2  ">
            <div className={`flex items-center justify-center gap-8`}>
              <p
                className={` flex justify-center items-center bg-gradient-to-b from-green-500/10 to-green-300/10 w-24 h-24  rounded-full`}
              >
                <TbUserDollar className={`w-14 h-14 text-green-600 `} />
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
          <div className="flex-1 shadow-md 2xl:shadow-none rounded-md  min-w-[300px]    py-0 lg:pe-2  ">
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
                    console.log(task);
                    return (
                      <tr key={task.id}>
                        <td>{index + 1}</td>
                        <td>
                          <span className="  py-3 rounded-md font-semibold text-[16px] text-neutral/80 border-none">
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
          <div className="flex-1"></div>
          <div className="flex-1 bg-base-100 shadow-md rounded-lg">
            <ExpensesPieChart mapDataForChart={mapDataForChart} />{" "}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
