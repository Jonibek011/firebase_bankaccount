import { Form } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { useActionData } from "react-router-dom";
//icons
import { SlWallet } from "react-icons/sl";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import box from "../assets/images/folder.png";
import { PiEyeBold } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { LuCircleDollarSign } from "react-icons/lu";

//components
import { ExtensesPieChart, Exchange } from "../components";
import LimitBar from "../components/LimitBar";
//firebase
import { useFirestore } from "../hooks/useFirestore";
import { useAllCollection } from "../hooks/useAllCollection";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

//react
import { useEffect, useMemo, useRef, useState } from "react";
//Global context
import useGlobalContext from "../hooks/useGlobalContext";
import toast from "react-hot-toast";
//hooks
import { useDebounce } from "../hooks/useDebounce";
//date-fns - library
import { differenceInDays, isWithinInterval, parseISO } from "date-fns";
import { BiWallet } from "react-icons/bi";
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
  const { user, dispatch } = useGlobalContext();
  //action data
  const actionData = useActionData();
  //addDocument
  const { addDocument, deleteDocument } = useFirestore();
  const formRef = useRef();
  const lastHandledAction = useRef(null);
  const modalFormRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expenseData, setExpenseData] = useState(null);
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
      setMapData(collectionData);
      setOriginalData(collectionData);
    }
  }, [collectionData]);

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
        setMaxSum(sumMax.toFixed(2));
      }
  }, [collectionData]);

  //category filterni dinamic qilish
  const filterByCategory = (category) => {
    const newData = originalData.filter((item) => {
      return item.category === category;
    });
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

    setMapData(filteredData);
    setStartDateFilter("");
    setEndDateFilter("");
    document.getElementById("filter-modal").close();
  };
  return (
    <div className="w-full h-auto mb-5">
      <h2 className="hidden sm:block font-semibold text-3xl sm:text-5xl my-6">
        Expenses
      </h2>
      <div className="main-container grid grid-cols-10 grid-rows-none auto-rows-auto  w-full  gap-4 lg:gap-5  ">
        {/* ==================== Add card ====================================================== */}
        <div className="add-card shadow-md  bg-base-100 w-full rounded-xl p-2 sm:p-4 col-span-10 lg:col-span-6 xl:col-span-7 h-auto">
          <h3 className="text-xl sm:text-3xl font-semibold mb-5">
            Add Expense
          </h3>
          <Form
            ref={formRef}
            method="post"
            className="grid grid-cols-2 lg:grid-cols-3 grid-rows-4 lg:grid-rows-3 gap-2 sm:gap-5 "
          >
            <input
              required
              type="text"
              name="expenseTitle"
              placeholder="Title"
              className=" col-span-2 lg:col-span-3 input input-bordered w-full "
            />
            <input
              required
              type="number"
              name="amaunt"
              step="any"
              placeholder="Amaunt ($)"
              className="col-span-1 row-span-1 input input-bordered w-full "
            />

            <div className="dropdown col-span-1 ">
              <div
                tabIndex={0}
                role="button"
                className=" input input-bordered flex justify-between items-center "
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
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button
                    onClick={() => setCategory("Food")}
                    type="button"
                    className="font-medium"
                  >
                    Food
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("Transport")}
                    type="button"
                    className="font-medium"
                  >
                    Transport
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("Entertainment")}
                    type="button"
                    className="font-medium"
                  >
                    Entertainment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("Technology")}
                    type="button"
                    className="font-medium"
                  >
                    Technology
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("Other")}
                    type="button"
                    className="font-medium"
                  >
                    Other
                  </button>
                </li>
              </ul>
            </div>

            <div className="dropdown col-span-1">
              <div
                tabIndex={0}
                role="button"
                className=" input input-bordered flex justify-between items-center "
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
                className=" input input-bordered w-full flex-grow flex-1"
              />
              <button
                disabled={isSubmitted}
                className="btn  bg-sky-600 hover:bg-sky-500 text-white hidden lg:inline-block"
              >
                Add
              </button>
            </div>

            <button
              disabled={isSubmitted}
              className="lg:hidden btn col-span-2 row-span-1 bg-sky-600 hover:bg-sky-500 text-white"
            >
              Add
            </button>
          </Form>
        </div>

        {/* =========================== Chart card =============================================================== */}
        <div className="col-span-10  shadow-md rounded-xl md:col-span-5 lg:col-span-4 xl:col-span-3 bg-base-100 lg:row-span-2 p-2 lg:p-4">
          <h2 className="font-bold md:text-2xl lg:text-3xl ps-4">
            Expenses by Category
          </h2>
          <ExtensesPieChart mapDataForChart={mapDataForChart} />
        </div>

        {/* =================================== Total section ====================================================== */}
        <div className="col-span-10 md:col-span-5  lg:col-span-6 xl:col-span-7   overflow-x-auto   ">
          <div className="flex md:flex-col lg:flex-row gap-4  rounded-xl min-w-[800px] md:min-w-[300px]">
            <div className="card bg-base-100 flex-1  px-8 py-5 flex justify-center items-center">
              <p className="flex justify-center items-center">
                <BiWallet className="w-9 h-9 text-orange-600" />
              </p>
              <p className="text-2xl font-bold text-center text-orange-600">
                ${totalSum}
              </p>
              <h2 className="text-lg font-semibold text-center">Total Spent</h2>
            </div>
            <div className="card bg-base-100 flex-1 px-8 py-5 flex flex-col gap-1 justify-center items-center">
              <p className="flex justify-center items-center">
                <RiMoneyPoundCircleLine className="w-9 h-9 text-green-500" />
              </p>
              <p className="text-2xl font-bold text-center text-green-500">
                ${maxSum}
              </p>
              <h2 className="text-lg font-semibold text-center">
                Highest Spent
              </h2>
            </div>

            <div className="card bg-base-100 flex-1 px-8 py-5 flex flex-col gap-1 justify-center items-center">
              <p className="flex justify-center items-center">
                <LuCircleDollarSign className="w-9 h-9 text-purple-500" />
              </p>
              <p className="text-2xl font-bold text-center text-purple-500">
                ${monthlyExpense}
              </p>
              <h2 className="text-lg font-semibold text-center">This month</h2>
            </div>
          </div>

          {/* <div className="flex-1">
            <LimitBar />
          </div> */}
        </div>
        {/* ==================================== Filter section ===================================================================== */}
        <div className="filter-senction shadow-md  col-span-10 order-2 lg:order-1 lg:col-span-5 bg-base-100 rounded-lg p-4 flex  items-center gap-1 md:gap-3">
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
                  Food
                </button>
              </li>
              <li>
                <button
                  onClick={() => filterByCategory("Transport")}
                  className="font-medium"
                >
                  Transport
                </button>
              </li>
              <li>
                <button
                  onClick={() => filterByCategory("Entertainment")}
                  className="font-medium"
                >
                  Entertainment
                </button>
              </li>
              <li>
                <button
                  onClick={() => filterByCategory("Technology")}
                  className="font-medium"
                >
                  Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => filterByCategory("Other")}
                  className="font-medium"
                >
                  Other
                </button>
              </li>
            </ul>
          </div>
          <button
            onClick={() => document.getElementById("filter-modal").showModal()}
            className="btn btn-sm flex gap-1  bg-blue-500 hover:bg-blue-600 text-white"
          >
            <span>
              <FaFilter className="w-3 h-3" />
            </span>{" "}
            <span>Date</span>
          </button>
          <button
            onClick={() => setMapData(originalData)}
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

        {/* ===================== Some content ======================================== */}
        <div className="change-curracy shadow-md order-1 lg:order-2 flex  items-center col-span-10 lg:col-span-5 bg-base-100 p-4 rounded-lg">
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
                  <th></th>

                  <th className="table-cell text-lg">Category</th>
                  <th className="text-lg">Price</th>
                  <th className="table-cell text-lg">Type</th>
                  <th className="table-cell ext-lg">Date</th>
                  <th className="table-cell text-lg">Time</th>

                  <th className="md:text-lg">Options</th>
                </tr>
              </thead>
              {/* =============== table body =================================================== */}
              <tbody className="border-b border-neutral/10 ">
                {/* row 1 */}
                {mapData?.map((collect) => {
                  return (
                    <tr key={collect._id} className="hover:bg-info/10">
                      <td colSpan={2} className="ps-10">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold text-lg opacity-80">
                              {shortTitle(collect.expenseTitle, 35)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="w-14"></td>
                      <td className={` table-cell  font-medium  `}>
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
                        className={`table-cell font-semibold text-lg ${
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
                        <span className="font-semibold text-gray-400 text-center">
                          {collect.expenseType || "-"}
                        </span>
                      </td>
                      <td className="table-cell font-medium   text-gray-400">
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
                      <td className="relative flex justify-start ps-10 gap-5 items-center">
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
    </div>
  );
}

export default Expense;
