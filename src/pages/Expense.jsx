import { Form, Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { useActionData } from "react-router-dom";
//icons

import { RiMoneyPoundCircleLine } from "react-icons/ri";
import box from "../assets/images/folder.png";
import { PiEyeBold } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

import { SiCodefresh } from "react-icons/si";
import { FiPlusCircle } from "react-icons/fi";

import { HiMiniArrowTrendingDown } from "react-icons/hi2";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { IoCardOutline } from "react-icons/io5";
import { BiWallet } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

//animationn
import { motion } from "framer-motion";
//context
import { MainIncomContext } from "../context/IncomeContext";
import { useContext } from "react";
//components
import { Exchange } from "../components";
import IncomeChart from "../components/expense/IncomeChart";

//firebase
import { useFirestore } from "../hooks/useFirestore";
import { useAllCollection } from "../hooks/useAllCollection";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import dollar from "../assets/images/credit-bg.png";
import card1 from "../assets/images/dashboard/3d-hand-take-out-paper-money-cash-from-wallet-removebg-preview.png";
import card2 from "../assets/expense/2211.w018.n002.1412A.p30.1412-removebg-preview.png";
import card3 from "../assets/expense/man-hand-with-money-bag-with-dollar-sign-removebg-preview.png";
import card4 from "../assets/expense/9994014-removebg-preview.png";
import fundImage from "../assets/expense/9289146-removebg-preview.png";
import incomeImage from "../assets/expense/10800827-removebg-preview.png";
//react
import { useEffect, useMemo, useRef, useState } from "react";
//Global context
import useGlobalContext from "../hooks/useGlobalContext";
import toast from "react-hot-toast";
//hooks
import { useDebounce } from "../hooks/useDebounce";
//date-fns - library
import { differenceInDays, isWithinInterval, parseISO } from "date-fns";

//action
export const action = async ({ request }) => {
  const formData = await request.formData();
  const expenseTitle = formData.get("expenseTitle");
  const amaunt = formData.get("amaunt");
  const category = formData.get("category");
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const timeStamp = new Date();

  const note = formData.get("note");

  return {
    expenseTitle,
    amaunt,
    category,
    note,
    hour,
    min,
    day,
    month,
    year,
    timeStamp,
    submitted: true,
  };
};
//main function
function Expense() {
  const { user, dispatch, isDark } = useGlobalContext();
  //action data
  const actionData = useActionData();
  //addDocument
  const { addDocument, deleteDocument } = useFirestore();
  const formRef = useRef();
  const lastHandledAction = useRef(null);
  const modalFormRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expenseData, setExpenseData] = useState("");
  const [totalSum, setTotalSum] = useState(0);
  const [maxSum, setMaxSum] = useState(0);

  const [deleteItem, setDeleteItem] = useState(null);
  const [expenseType, setExpenseType] = useState(null);
  const [category, setCategory] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [searchData, setSearchData] = useState("");
  const debouncedValue = useDebounce(searchData, 700);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [income, setIncome] = useState("");
  const [totlaIncomes, setTotalIncomes] = useState(0);
  const [nullishData, setNullishData] = useState(null);
  const [periodIncome, setPeriodIncome] = useState(0);
  const [fiterTotalMoney, setFilterTotalMoney] = useState(0);
  const [filterMaxMoney, setFilterMaxMoney] = useState(0);
  const [incomeType, setIncomeType] = useState("");
  const [incomeNote, setIncomeNote] = useState("");
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [percent, setPercent] = useState(0);
  const { incomes } = useContext(MainIncomContext);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 2) {
      const newData = originalData.filter((item) => {
        const title = item.expenseTitle ? item.expenseTitle.toLowerCase() : "";
        const search = debouncedValue.toLowerCase();

        return title.includes(search);
      });

      setMapData(newData);
    } else {
      setMapData(originalData);
    }
  }, [debouncedValue, originalData]);

  useEffect(() => {
    if (!actionData?.submitted) return;

    // Agar actionData o‘zgarmagan bo‘lsa — skip
    const isSameAction =
      JSON.stringify(lastHandledAction.current) === JSON.stringify(actionData);

    if (isSameAction) return;

    // Agar yangi actionData kelsa — ishga tushur
    lastHandledAction.current = actionData;

    (async () => {
      setIsSubmitted(true);
      await addDocument("Expenses", {
        ...actionData,
        expenseType,
        category,
        userId: user.uid,
      });
      setExpenseType(null);
      setCategory(null);
      toast.success("Success !");
      formRef.current.reset();
      setIsSubmitted(false);
    })();
  }, [actionData]);

  //firebasedan data olish
  const { data: collectionData } = useAllCollection("Expenses", [
    "userId",
    "==",
    user.uid,
  ]);
  //=========== Map main data =====================================================================
  useEffect(() => {
    if (Array.isArray(collectionData) && collectionData.length > 0) {
      dispatch({ type: "CHART", payload: collectionData });
      setMapData(collectionData);
      setOriginalData(collectionData);
    }
  }, [collectionData, dispatch]);

  useEffect(() => {
    if (!collectionData) return;
    const monthlyExpense = collectionData.filter((data) => {
      if (!data.expenseDate) return false;
      const today = new Date();
      const date = parseISO(data.expenseDate);
      const diff = differenceInDays(today, date);
      return diff >= 0 && diff <= 30;
    });

    let count = 0;
    monthlyExpense.forEach((item) => {
      count += +item.amaunt;
    });

    dispatch({ type: "MONTHLYSPEND", payload: count });
  }, [collectionData]);

  //Chart data
  const mapDataForChart = useMemo(() => {
    if (Array.isArray(collectionData) && collectionData.length > 0) {
      return collectionData;
    }
  }, [collectionData]);

  //title ni qisqartirish
  const shortTitle = (text, maxLength) => {
    if (!text) return "";
    let newText = text[0].toUpperCase() + text.slice(1);
    return newText.length > maxLength
      ? newText.slice(0, maxLength) + "..."
      : newText;
  };

  //delete expense
  const deleteExpense = () => {
    deleteDocument("Expenses", deleteItem._id);

    document.getElementById("expense-delete").close();
  };

  //expense edit
  const modalFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newTitle = e.target.modalTitle.value;
    const newAmaunt = e.target.cost.value;
    const newCategory = e.target.modalCategory.value;
    const newNote = e.target.modalNote.value;

    const EditingData = doc(db, "Expenses", expenseData._id);

    await updateDoc(EditingData, {
      expenseTitle: newTitle,
      amaunt: newAmaunt,
      category: newCategory,
      note: newNote,
    });

    setIsSubmitted(false);
    modalFormRef.current.reset();
    document.getElementById("expense_modal").close();
    setExpenseData(null);
  };

  //total Sum and highest expense
  useEffect(() => {
    if (collectionData)
      if (Array.isArray(collectionData)) {
        let sum = 0;
        const arr = collectionData.map((data) => {
          sum = sum + Number(data.amaunt);
          return Number(data.amaunt);
        });

        let sumMax = arr?.length ? Math.max(...arr) : 0;
        const today = new Date();
        const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthly = collectionData.filter((item) => {
          if (!item.timeStamp) return false;
          const expenseDate = item.timeStamp.toDate();
          return isWithinInterval(expenseDate, {
            start: firstOfMonth,
            end: today,
          });
        });

        let monthlySum = 0;
        monthly.filter((item) => {
          monthlySum += Number(item.amaunt);
        });

        setMonthlyExpense(monthlySum.toFixed(2));

        setTotalSum(sum.toFixed(2));
        setFilterTotalMoney(sum.toFixed(2));
        setMaxSum(sumMax.toFixed(2));
        setFilterMaxMoney(sumMax.toFixed(2));
      }
  }, [collectionData]);

  //category filterni dinamic qilish
  const filterByCategory = (category) => {
    const newData = originalData.filter((item) => {
      return item.category === category;
    });
    let filteredTotalSum = 0;
    newData?.forEach((item) => {
      filteredTotalSum += Number(item.amaunt);
    });

    setFilterTotalMoney(filteredTotalSum.toFixed(2));

    // Max qiymat
    const filteredMaxSum = newData?.map((item) => Number(item.amaunt) || 0);

    // Agar newData bo‘sh bo‘lsa, 0 qaytarsin
    const max = filteredMaxSum.length > 0 ? Math.max(...filteredMaxSum) : 0;

    setFilterMaxMoney(max.toFixed(2));
    setMapData(newData);
  };
  //date filter ni dinamik qilish
  const filterByDate = () => {
    const filteredData = originalData.filter((item) => {
      const expenseData = item.timeStamp.toDate();
      return isWithinInterval(expenseData, {
        start: parseISO(startDateFilter),
        end: parseISO(endDateFilter),
      });
    });

    let filteredTotalSum = 0;
    filteredData.forEach((item) => {
      filteredTotalSum += Number(item.amaunt);
    });

    setFilterTotalMoney(filteredTotalSum.toFixed(2));

    const filteredMaxSum = filteredData.map((item) => {
      return item.amaunt;
    });

    setFilterMaxMoney(Math.max(...filteredMaxSum).toFixed(2));

    const filteredIncome = incomes.filter((item) => {
      const expenseData = item.timeStamp.toDate();
      return isWithinInterval(expenseData, {
        start: parseISO(startDateFilter),
        end: parseISO(endDateFilter),
      });
    });
    let periodIncomeData = 0;
    filteredIncome.forEach((item) => {
      periodIncomeData += Number(item.income);
    });

    setMapData(filteredData);
    setPeriodIncome(periodIncomeData);
    setStartDateFilter("");
    setEndDateFilter("");
    document.getElementById("filter-modal").close();
  };

  //add income to the firestore
  const addIncome = async () => {
    setNullishData(null);
    await addDocument("Incomes", {
      income,
      incomeType,
      incomeNote,
      timeStamp: new Date(),
      userId: user.uid,
    });
    setIncome("");
    setIncomeType("");
    setIncomeNote("");
    document.getElementById("add-money").close();
  };
  // get total income
  const calculateIncome = () => {
    if (!incomes || incomes.length === 0) return;
    let income = 0;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const filterForAllSum = incomes.filter((item) => {
      const date = item.timeStamp.toDate();
      return date.getFullYear() === currentYear;
    });
    filterForAllSum.forEach((i) => {
      income += Number(i.income);
    });

    const filteredIncomes = incomes.filter((i) => {
      const date = i.timeStamp.toDate();

      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    let currentIncome = 0;
    filteredIncomes.forEach((i) => {
      currentIncome += Number(i.income);
    });

    const filteredExpenses = collectionData.filter(
      (collect) =>
        collect.month === currentMonth && collect.year === currentYear
    );
    let forBalance = 0;
    filteredExpenses.forEach((expense) => {
      forBalance += Number(expense.amaunt);
    });

    let balance = currentIncome - forBalance;
    let balancePercentage = (forBalance / currentIncome) * 100;

    setBalance(balance);
    setPercent(balancePercentage.toFixed(2));
    setCurrentMonthIncome(currentIncome);
    setTotalIncomes(income);
    setPeriodIncome(income);
  };
  useEffect(() => {
    calculateIncome();
    const intervalId = setInterval(() => {
      calculateIncome();

      return () => clearInterval(intervalId);
    }, 3600000);
  }, [incomes, collectionData]);

  //delete Incomes
  const deleteIncomes = async () => {
    try {
      for (const item of incomes) {
        await deleteDocument("Incomes", item._id);
        setNullishData(0);
      }
      document.getElementById("clean-money").close();
    } catch (err) {
      console.error("Xatolik:", err.message);
    }
  };

  const newDate = new Date();
  const thisYear = newDate.getFullYear();

  return (
    <div className="w-full pt-5 px-3 h-auto mb-5 max-w-screen-2xl mx-auto">
      <div className="main-container grid grid-cols-10 grid-rows-none auto-rows-auto  w-full  gap-4 lg:gap-5  ">
        {/* ==================== Add card ====================================================== */}
        <div className="add-card shadow-md flex flex-col justify-between   bg-base-100 w-full rounded-xl  col-span-10 lg:col-span-5 xl:col-span-6 h-auto">
          <h3 className="text-lg px-6 pt-4 sm:text-lg font-semibold text-base-content  flex items-center gap-2">
            <FiPlusCircle className="w-6 h-6 text-purple-500 " /> Add new
          </h3>
          <div className="p-2 sm:px-8 sm:py-12 rounded-xl bg-base-100">
            <Form
              ref={formRef}
              method="post"
              className="grid grid-cols-2 xl:grid-cols-3 grid-rows-4  lg:grid-rows-3 gap-2 sm:gap-5 "
            >
              <input
                required
                type="text"
                name="expenseTitle"
                placeholder="Title"
                className=" col-span-2  lg:col-span-3 input  border-purple-500/50 border-2   w-full focus:outline-purple-600 "
              />
              <input
                required
                type="number"
                name="amaunt"
                step="any"
                placeholder="Amount ($)"
                className="col-span-1  border-purple-500/50 border-2  row-span-1 input  w-full focus:outline-purple-500 "
              />

              <div className="dropdown col-span-1 ">
                <div
                  tabIndex={0}
                  role="button"
                  className=" input  border-purple-500/50 border-2 flex justify-between items-center "
                >
                  {category || (
                    <span className="text-gray-400 font-normal">Category</span>
                  )}{" "}
                  <span className="text-gray-400">
                    <IoIosArrowDown className="w-5 h-5" />
                  </span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content relative z-30 menu bg-base-100 rounded-box  w-52 p-2 shadow"
                >
                  <li>
                    <button
                      onClick={() => setCategory("Food")}
                      type="button"
                      className="font-medium"
                    >
                      🍔Food
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCategory("Transport")}
                      type="button"
                      className="font-medium"
                    >
                      🚗Transport
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCategory("Entertainment")}
                      type="button"
                      className="font-medium"
                    >
                      🎪Entertainment
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCategory("Technology")}
                      type="button"
                      className="font-medium"
                    >
                      💻Technology
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCategory("Other")}
                      type="button"
                      className="font-medium"
                    >
                      ⚙Other
                    </button>
                  </li>
                </ul>
              </div>

              <div className="dropdown col-span-1">
                <div
                  tabIndex={0}
                  role="button"
                  className="  border-purple-500/50 border-2  input  flex justify-between items-center "
                >
                  {expenseType || (
                    <span className="text-gray-400">Card or cash</span>
                  )}{" "}
                  <span className="text-gray-400">
                    <IoIosArrowDown className="w-5 h-5" />
                  </span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <button
                      onClick={() => setExpenseType("Cash")}
                      type="button"
                      className="text-medium"
                    >
                      Cash
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setExpenseType("Card")}
                      type="button"
                      className="text-medium"
                    >
                      Card
                    </button>
                  </li>
                </ul>
              </div>

              <div className="col-span-1 lg:col-span-3 row-span-1 w-full flex  gap-4">
                <input
                  type="text"
                  name="note"
                  placeholder="Note"
                  className=" border-purple-500/50 border-2 input focus:outline-purple-500  w-full flex-grow flex-1"
                />
                <button
                  disabled={isSubmitted}
                  className="btn   bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-sky-500 text-white hidden lg:flex items-center"
                >
                  <FiPlusCircle className="w-5 h-5" /> Add expense
                </button>
              </div>

              <button
                disabled={isSubmitted}
                className="flex items-center  lg:hidden btn col-span-2 row-span-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:bg-sky-500 text-white"
              >
                <FiPlusCircle className="w-4 h-4" /> Add expense
              </button>
            </Form>
          </div>
        </div>

        {/* =========================== Chart card =============================================================== */}
        <div className="col-span-10 bg-base-100 flex flex-col gap-3 shadow-md rounded-xl md:col-span-10 lg:col-span-5 xl:col-span-4 lg:row-span-1 p-2 lg:p-4 ">
          <div className="flex p-3 justify-between bg-gradient-to-r from-fuchsia-500 to-blue-500 rounded-xl items-center">
            <span className="rounded-xl text-[10px] text-white  bg-blue-500 flex justify-center items-center gap-2 px-2 py-1">
              {/* <BiWallet className="w-6 h-6 text-white" /> */}
              <span className="text-sm text-white ">
                {nullishData ?? totlaIncomes}$
              </span>
              Total/{thisYear}
            </span>

            <Link
              to="/expense/statistics"
              className="bg-gradient-to-r from-blue-400 cursor-pointer to-fuchsia-500 text-white flex items-center gap-1 rounded-full px-2 py-1 text-sm"
            >
              <SiCodefresh /> Statistics{" "}
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: 5 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <FaArrowRightLong />
              </motion.span>
            </Link>
          </div>
          <div className="flex justify-between items-center gap-6 sm:gap-10">
            <div className="relative min-w-[150px] overflow-hidden w-full p-4 rounded-xl bg-gradient-to-b from-indigo-400 to-purple-700">
              <img
                src={incomeImage}
                className="hidden sm:flex w-36 absolute -top-4 right-8 lg:top-4 lg:-right-9 2xl:-top-4 2xl:right-8"
                alt=""
              />
              <div className="group">
                <div
                  onClick={() =>
                    document.getElementById("add-money").showModal()
                  }
                  className="absolute btn p-0 btn-sm border-none  top-2 right-2 w-8 h-8 cursor-pointer flex justify-center items-center rounded-xl bg-gradient-to-t from-blue-400 to-fuchsia-500"
                >
                  <FiPlusCircle className="text-white w-5 h-5 " />
                </div>
                <span className="absolute -top-1 bg-base-100 border border-gray-400/20  text-base-content px-2 rounded-full right-5 text-[11px] opacity-0 group-hover:opacity-100 transition-all duration-700">
                  + Add income
                </span>
              </div>
              <p className="text-gray-300 text-[12px] font-thin">
                This month earn
              </p>
              <p className="font-semibold text-gray-100 text-xl">
                ${currentMonthIncome > 0 ? currentMonthIncome : "0.00"}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-300 text-[10px]">
                  Balance: ${balance > 0 ? balance.toFixed(2) : "0.00"}/Dec
                </span>
                <span className="text-gray-300 text-[9px]">
                  {percent > 0 ? percent : "0"}% spent
                </span>
              </p>
            </div>
            <div className=" h-full relative min-w-[150px] perspect">
              <div className="absolute top-1 card-1 -left-5 w-full h-full transform rotate-x-12  bg-gradient-to-br from-cyan-400 to-green-700 rounded-xl"></div>
              <div className="absolute top-0 card-2 -left-3 w-full h-full  bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl"></div>
              <Link
                to="/expense/fund"
                className="group  flex justify-center items-center absolute -top-1  card-3  -left-1 w-full h-full overflow-hidden  bg-gradient-to-br cursor-pointer from-indigo-500 via-fuchsia-500 to-purple-500 rounded-xl"
              >
                <span className="absolute  top-[-100%] group-hover:top-0 transition-all duration-300 cursor-pointer left-0 w-full h-full bg-white/20 backdrop:blur-md flex justify-center items-center text-xl font-semibold text-white">
                  + Fund
                </span>
                <img src={fundImage} className="w-24" alt="" />
              </Link>
            </div>
          </div>
          <div>
            <IncomeChart />
          </div>
        </div>

        {/* =================================== Total section ====================================================== */}
        <div className="col-span-10      ">
          <div className="py-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4  rounded-xl  md:min-w-[300px]">
            <div
              className={`card relative shadow-md bg-gradient-to-t ${
                isDark ? "from-sky-300" : "from-sky-800"
              } from-0% to-transparent flex-1 overflow-hidden px-8 py-5 flex flex-col gap-2 `}
            >
              <span className="absolute w-28 h-28 bg-red-500/20 rounded-full -top-8 -right-8"></span>
              <img src={card1} className="absolute -right-8 w-40" alt="" />
              <p className="w-12 h-12 rounded-xl flex justify-center items-center bg-red-500/10">
                <HiMiniArrowTrendingDown className="w-7 h-7 text-red-500" />
              </p>
              <p>Total spent</p>
              <p className="text-3xl font-semibold  text-base-content">
                ${fiterTotalMoney}
              </p>
              <h2 className="  ">All expenses</h2>
            </div>
            <div
              className={`card relative shadow-md bg-gradient-to-t ${
                isDark ? "from-sky-300" : "from-sky-800"
              } from-0% to-transparent flex-1 overflow-hidden px-8 py-5 flex flex-col gap-2 `}
            >
              <span className="absolute w-28 h-28 bg-orange-500/20 rounded-full -top-8 -right-8"></span>
              <img
                src={card2}
                className="absolute -right-10 bottom-3 w-40"
                alt=""
              />
              <p className="w-12 h-12 rounded-xl flex justify-center items-center bg-orange-500/10">
                <MdOutlineErrorOutline className="w-7 h-7 text-orange-500" />
              </p>
              <p>Highest spent</p>
              <p className="text-3xl font-semibold  text-base-content">
                ${filterMaxMoney || "0.00"}
              </p>
              <h2 className="  ">The high priority</h2>
            </div>

            <div
              className={`card relative shadow-md bg-gradient-to-t ${
                isDark ? "from-sky-300" : "from-sky-800"
              } from-0% to-transparent flex-1 overflow-hidden px-8 py-5 flex flex-col gap-2 `}
            >
              <span className="absolute w-28 h-28 bg-blue-500/20 rounded-full -top-8 -right-8"></span>
              <img
                src={card3}
                className="absolute -right-10 bottom-3 w-48"
                alt=""
              />
              <p className="w-12 h-12 rounded-xl flex justify-center items-center bg-blue-500/10">
                <IoCalendarClearOutline className="w-7 h-7 text-blue-500" />
              </p>
              <p>Monthly Spent</p>
              <p className="text-3xl font-semibold  text-base-content">
                ${monthlyExpense}
              </p>
              <h2 className="  ">This month</h2>
            </div>
            <div
              className={`card relative shadow-md bg-gradient-to-t ${
                isDark ? "from-sky-300" : "from-sky-800"
              } from-0% to-transparent flex-1 overflow-hidden px-8 py-5 flex flex-col gap-2 `}
            >
              <span className="absolute w-28 h-28 bg-green-500/20 rounded-full -top-8 -right-8"></span>
              <img src={card4} className="absolute -right-10 w-48" alt="" />
              <p className="w-12 h-12 rounded-xl flex justify-center items-center bg-green-500/10">
                <FaArrowTrendUp className="w-7 h-7 text-green-500" />
              </p>
              <p>Period Income</p>
              <p className="text-3xl font-semibold  text-base-content">
                ${periodIncome}
              </p>
              <h2 className="  ">Filtered period</h2>
            </div>
          </div>

          {/* <div className="flex-1">
            <LimitBar />
          </div> */}
        </div>
        {/* ==================================== Filter section ===================================================================== */}
        <div className="filter-senction flex flex-col gap-4 shadow-md  col-span-10 order-2 lg:order-1 lg:col-span-5 bg-base-100 rounded-lg p-4  md:gap-3">
          <h3 className="font-medium text-lg flex items-center gap-1">
            <LuFilter className="text-indigo-600 w-6 h-6" /> Filter section
          </h3>
          <div className="flex  items-center gap-3">
            <div className="dropdown dropdown-bottom">
              <div
                tabIndex={0}
                role="button"
                className=" bg-blue-500 hover:bg-blue-600 text-white flex text-[14px] rounded-md px-4 py-1 h-8  items-center font-medium gap-1"
              >
                <FaFilter className="w-3 h-3" /> <span>Category</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button
                    onClick={() => filterByCategory("Food")}
                    className="font-medium"
                  >
                    🍔Food
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => filterByCategory("Transport")}
                    className="font-medium"
                  >
                    🚗Transport
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => filterByCategory("Entertainment")}
                    className="font-medium"
                  >
                    🏖 Entertainment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => filterByCategory("Technology")}
                    className="font-medium"
                  >
                    📱Technology
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => filterByCategory("Other")}
                    className="font-medium"
                  >
                    ⚙Other
                  </button>
                </li>
              </ul>
            </div>
            <button
              onClick={() =>
                document.getElementById("filter-modal").showModal()
              }
              className="btn btn-sm flex gap-1  bg-blue-500 hover:bg-blue-600 text-white"
            >
              <span>
                <FaFilter className="w-3 h-3" />
              </span>{" "}
              <span>Date</span>
            </button>
            <button
              onClick={() => {
                setMapData(originalData);
                setPeriodIncome(totlaIncomes);
                setFilterTotalMoney(totalSum);
                setFilterMaxMoney(maxSum);
              }}
              className="btn  btn-success btn-sm  rounded-md text-white "
            >
              All
            </button>

            <div className="w-full hidden sm:flex ">
              <label className="input input-sm input-bordered w-full max-w-xl pe-10 flex  items-center relative">
                <input
                  type="search"
                  className=" w-full  bg-transparent"
                  placeholder="Search"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />

                <span className="absolute right-3 top-[30%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-3 w-3 opacity-70 text-neural  "
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* ===================== Some content ======================================== */}
        <div className="change-curracy shadow-md order-1  lg:order-2 flex flex-col  items-start gap-4 col-span-10 lg:col-span-5 bg-base-100 p-4 rounded-lg">
          <h3 className="font-medium flex items-center gap-2">
            <MdOutlineCurrencyExchange className="w-6 h-6 text-indigo-600" />{" "}
            Currency section
          </h3>
          <Exchange />
        </div>

        {/* =============================== Expenses ===================================================
         */}
        <div className="expenses relative shadow-md order-3   min-h-[65vh] col-span-10 p-3 sm:p-4 bg-base-100  h-auto rounded-xl overflow-x-auto md:overflow-x-hidden ">
          {!collectionData && (
            <span className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </span>
          )}
          <h1 className="font-bold md:text-3xl md-4 md:mb-10">Expense List</h1>
          <div className=" w-full max-h-[600px]  overflow-auto   pb-20 ">
            {/* ==================== table ====================================== */}
            <table className="table min-w-[1024px]   ">
              {/* head */}
              <thead>
                <tr>
                  <th colSpan={2} className="text-lg text-center">
                    Title
                  </th>

                  <th className="table-cell text-lg">Category</th>
                  <th className="text-lg">Price</th>
                  <th className="table-cell text-lg">Type</th>
                  <th className="table-cell text-lg">Date</th>
                  <th className="table-cell text-lg">Time</th>

                  <th className="table-cell text-center text-lg">Options</th>
                </tr>
              </thead>
              {/* =============== table body =================================================== */}
              <tbody className="border-b border-neutral/10 ">
                {/* row 1 */}
                {mapData?.map((collect) => {
                  return (
                    <tr key={collect._id} className="hover:bg-info/10">
                      <td colSpan={2} className="ps-6 max-w-[330px]">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-10 h-10  rounded-xl flex justify-center items-center ${
                                collect.amaunt > 100
                                  ? "bg-red-500/5"
                                  : "bg-green-500/10"
                              }`}
                            >
                              {collect.amaunt > 100 ? (
                                <HiMiniArrowTrendingDown className="w-5 h-5 text-red-500" />
                              ) : (
                                <FaArrowTrendUp className="w-5 h-5 text-green-500" />
                              )}
                            </span>
                            <div className=" ">
                              <p className="font-medium text-lg">
                                {" "}
                                {shortTitle(collect.expenseTitle, 35)}
                              </p>
                              <p> {collect.note}</p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className={` table-cell  font-  max-w-xs `}>
                        <button
                          className={`btn btn-sm w-[120px]  ${
                            collect.category === "Transport"
                              ? "btn-outline btn-info"
                              : collect.category === "Other"
                              ? "btn-outline btn-primary"
                              : collect.category === "Entertainment"
                              ? "btn-success btn-outline"
                              : collect.category === "Food"
                              ? "btn-warning btn-outline"
                              : "btn-secondary btn-outline"
                          }`}
                        >
                          {collect.category}
                        </button>
                      </td>

                      <td
                        className={`table-cell  text-lg ${
                          collect.amaunt < 50
                            ? "text-green-500"
                            : collect.amaunt < 100
                            ? "text-warning"
                            : "text-red-500"
                        }  `}
                      >
                        $ {collect.amaunt}
                      </td>
                      <td className="ps-5">
                        <span
                          className={`font-  text-center flex items-center gap-1`}
                        >
                          {collect.expenseType === "Card" ? (
                            <IoCardOutline className="w-5 h-5 text-green-500" />
                          ) : (
                            <BiWallet className="w-5 h-5 text-indigo-500" />
                          )}{" "}
                          {collect.expenseType || "-"}
                        </span>
                      </td>
                      <td className="table-cell ">
                        <span>
                          {collect.day < 10 ? "0" + collect.day : collect.day}.
                          {collect.month + 1 < 10
                            ? "0" + (collect.month + 1)
                            : collect.month + 1}
                          .{collect.year}
                        </span>
                      </td>
                      <td className="text-gray-400 font-medium">
                        <span>
                          {collect.hour < 10
                            ? "0" + collect.hour
                            : collect.hour}{" "}
                          : {collect.min < 10 ? "0" + collect.min : collect.min}
                        </span>
                      </td>
                      <td className="relative ">
                        <div className="flex justify-center gap-5 items-center">
                          <div className="dropdown  dropdown-left">
                            <div tabIndex={0} role="button" className="m-1">
                              <CiMenuKebab className="w-5 h-5 " />
                            </div>

                            <ul
                              tabIndex={-1}
                              className="dropdown-content overflow-auto z-50 menu bg-base-100 rounded-box w-32 p-2 shadow absolute"
                            >
                              <li>
                                <button
                                  onClick={() => {
                                    setExpenseData(collect);
                                    document
                                      .getElementById("expense_view")
                                      .showModal();
                                  }}
                                >
                                  <PiEyeBold className="w-4 h-4" />{" "}
                                  <span>view</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    document
                                      .getElementById("expense_modal")
                                      .showModal();
                                    setExpenseData(collect);
                                  }}
                                >
                                  <GrEdit className="text-warning" /> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    setDeleteItem(collect);
                                    document
                                      .getElementById("expense-delete")
                                      .showModal();
                                  }}
                                >
                                  <IoTrashOutline className="text-warning" />{" "}
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* foot */}
            </table>
          </div>
          {collectionData?.length === 0 && (
            <div className="w-full   flex flex-col justify-center items-center">
              <img src={box} className="w-48" alt="empty box" />
              <p className="font-medium text-2xl opacity-75 ">No expenses</p>
              <p className="text-center opacity-50 font-semibold">
                Get started by adding <br /> your first expense
              </p>
            </div>
          )}
          {mapData?.length === 0 && (
            <div className="w-full   flex flex-col justify-center items-center">
              <img src={box} className="w-48" alt="empty box" />
              <p className="font-medium text-2xl opacity-75 ">No expenses</p>
              <p className="text-center opacity-50 font-semibold">
                Get started by adding <br /> your first expense
              </p>
            </div>
          )}
        </div>
      </div>
      <dialog id="expense_modal" className="modal">
        <div className="modal-box max-w-sm lg:max-w-md">
          <h3 className="font-bold text-lg">Edit expense!</h3>

          <div className="modal-action">
            <Form
              onSubmit={modalFormSubmit}
              ref={modalFormRef}
              method="post"
              className="grid grid-cols-2  grid-rows-4  gap-2 sm:gap-5 "
            >
              <input
                required
                type="text"
                name="modalTitle"
                defaultValue={expenseData?.expenseTitle}
                placeholder="Title"
                className=" col-span-2  input input-bordered w-full "
              />
              <input
                required
                type="number"
                name="cost"
                defaultValue={expenseData?.amaunt}
                placeholder="Amaunt ($)"
                className="col-span-1 row-span-1 input input-bordered w-full "
              />
              <select
                className="select select-bordered w-full  col-span-1 row-span-1"
                required
                name="modalCategory"
                defaultValue={expenseData?.category}
              >
                <option value="" disabled>
                  Category
                </option>
                <option>Food</option>
                <option>Transport</option>
                <option>Entertainment</option>
                <option>Technologia</option>
                <option>Other</option>
              </select>

              <div className="col-span-2  row-span-1 w-full flex  gap-4">
                <input
                  type="text"
                  name="modalNote"
                  defaultValue={expenseData?.note}
                  placeholder="Note"
                  className=" input input-bordered w-full flex-grow flex-1"
                />
              </div>

              <div className="col-span-2 row-span-1 flex gap-4">
                <button
                  disabled={isSubmitted}
                  className="btn  bg-sky-600 hover:bg-sky-500 text-white flex-1"
                >
                  Save changes
                </button>

                <button
                  onClick={() => {
                    document.getElementById("expense_modal").close();
                    setExpenseData(null);
                  }}
                  className="btn  bg-sky-600 hover:bg-sky-500 text-white flex-1 "
                >
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      </dialog>
      {/* ============== Expense view modal ===================================== */}
      <dialog id="expense_view" className="modal">
        <div className="modal-box max-w-sm lg:max-w-md">
          <h3 className="font-bold text-xl text-center">
            "{expenseData?.expenseTitle}"
          </h3>
          <p className="py-4 text-center"> {expenseData?.note}</p>
          <p>
            <span className="opacity-50 font-bold">Category:</span>{" "}
            {expenseData?.category}
          </p>
          <p>
            <span className="text-sm opacity-50 font-bold">Date: </span>
            <span className="text-xs"> {expenseData?.expenseDate}</span>
          </p>
          <p>
            <span className="text-sm opacity-50 font-bold">Price: </span>
            <span className="text-xs"> {expenseData?.amaunt}$</span>
          </p>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                setExpenseData(null);
                document.getElementById("expense_view").close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="expense-delete" className="modal">
        <div className="modal-box max-w-sm">
          <div className="text-center flex justify-center items-center">
            <FaRegCircleXmark className="w-10 h-10 text-red-500" />
          </div>
          <p className="py-4 font-semibold text-2xl text-center">
            Do you want to delete this expense?
          </p>
          <div className="modal-action flex gap-5 justify-center items-center">
            <button
              onClick={() => {
                setDeleteItem(null);
                document.getElementById("expense-delete").close();
              }}
              className="btn btn-sm h-9 rounded-lg px-7  bg-blue-500 hover:bg-blue-600 text-white "
            >
              Cancel
            </button>
            <button
              className="btn btn-sm h-9 bg-red-500 hover:bg-red-600 text-white rounded-lg px-7"
              onClick={deleteExpense}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="filter-modal" className="modal">
        <div className="modal-box max-w-xs">
          <h3 className="font-bold text-lg text-center">Filter</h3>

          <div className="modal-action ">
            <div className="flex flex-col gap-4 w-full">
              <label className="flex flex-col gap-1 w-full">
                <span className="font-semibold">from</span>
                <input
                  type="date"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  required
                  className="input input-bordered w-full "
                />
              </label>

              <label className="flex flex-col gap-1 w-full">
                <span className="font-semibold ">to</span>
                <input
                  required
                  type="date"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                  className="input input-bordered w-full "
                />
              </label>
              <div className="flex gap-5 justify-end">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("filter-modal").close()
                  }
                  className="btn bg-red-500 text-white text-[16px] hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={filterByDate}
                  className="btn bg-blue-500 hover:bg-blue-600 text-white text-[16px]"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      <dialog id="clean-money" className="modal">
        <div className="modal-box max-w-sm flex flex-col gap-5">
          <h2 className="text-center font-semibold text-lg">
            Hey, please be careful. If you clean your total earned money, then
            you will not able to return it.
          </h2>
          <h2 className="text-center text-red-500 text-lg">
            Are you sure to clean?
          </h2>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => document.getElementById("clean-money").close()}
              className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white shadow-none border-none te"
            >
              Cancel
            </button>
            <button
              onClick={deleteIncomes}
              className="text-white bg-red-500 hover:bg-red-600 btn btn-sm  border-none shadow-none"
            >
              Clean
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="add-money" className="modal">
        <div className="modal-box max-w-sm py-6 flex flex-col gap-3 rounded-md">
          <span className=" flex items-center gap-1 font-medium">
            <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
            Please enter your income!
          </span>
          <div className="flex flex-col gap-2">
            <label className="flex-1 flex flex-col ">
              <span className="text-sm ">Money you earn</span>
              <input
                type="number"
                step="any"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="input input-sm border-2 border-slate-200/80 focus:outline-none w-full rounded-sm "
                placeholder="Enter number"
              />
            </label>
            <label className="flex-1 flex flex-col ">
              <span className="text-sm ">From where?</span>
              <input
                onChange={(e) => setIncomeType(e.target.value)}
                type="text"
                className="input input-sm  border-2 border-slate-200/80 w-full focus:outline-none rounded-sm"
                placeholder="Salary/business a.c."
              />
            </label>
          </div>
          <label className="flex flex-col">
            <span className="text-sm">
              Description <span className="italic">(optional)</span>
            </span>
            <textarea
              onChange={(e) => setIncomeNote(e.target.value)}
              name="textarea"
              id="textarea"
              className="textarea border-2 border-slate-200/80 focus:outline-none rounded-sm"
              placeholder="Enter note"
            ></textarea>
          </label>
          <div className="flex gap-5 justify-end">
            <button
              onClick={() => document.getElementById("add-money").close()}
              className="btn btn-sm btn-outline rounded-sm border-slate-200 font-normal"
            >
              Cancel
            </button>
            <button
              onClick={addIncome}
              className="btn btn-sm rounded-sm border-none bg-indigo-600 text-white font-normal hover:bg-indigo-700"
            >
              Save income
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Expense;
