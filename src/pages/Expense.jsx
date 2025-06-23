import { Form } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { useActionData } from "react-router-dom";
//icons
import { SlWallet } from "react-icons/sl";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import box from "../assets/images/folder.png";
import { PiEyeBold } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";

//components
import { ExtensesPieChart } from "../components";

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

//date-fns - library
import { differenceInDays, differenceInHours, parseISO } from "date-fns";
//action
export const action = async ({ request }) => {
  const formData = await request.formData();
  const expenseTitle = formData.get("expenseTitle");
  const amaunt = formData.get("amaunt");
  const category = formData.get("category");
  const expenseDate = formData.get("date");
  const note = formData.get("note");

  return { expenseDate, expenseTitle, amaunt, category, note, submitted: true };
};
//main function
function Expense() {
  const { user } = useGlobalContext();
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
  const [foodCategory, setFoodCategory] = useState(false);
  const [transportCategory, setTransportCategory] = useState(false);
  const [technologiaCategory, setTecnologiaCategory] = useState(false);
  const [entertainmentCategory, setEntertainmentCategory] = useState(false);
  const [otherCategory, setOtherCategory] = useState(false);
  const [lastDay, setLastDay] = useState(false);
  const [last7Days, setLast7Days] = useState(false);
  const [lastMonth, setLastMonth] = useState(false);

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
      await addDocument("Expenses", { ...actionData, userId: user.uid });
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
  const mapData = useMemo(() => {
    if (Array.isArray(collectionData) && collectionData.length > 0) {
      if (foodCategory) {
        return collectionData.filter((data) => data.category === "Food");
      }
      if (transportCategory) {
        return collectionData.filter((data) => data.category === "Transport");
      }
      if (technologiaCategory) {
        return collectionData.filter((data) => data.category === "Technologia");
      }
      if (entertainmentCategory) {
        return collectionData.filter(
          (data) => data.category === "Entertainment"
        );
      }
      if (otherCategory) {
        return collectionData.filter((data) => data.category === "Other");
      }

      if (lastDay) {
        return collectionData.filter((data) => {
          const today = new Date();
          const date = parseISO(data.expenseDate);
          const diff = differenceInDays(today, date);
          return diff >= 0 && diff <= 1;
        });
      }
      if (last7Days) {
        return collectionData.filter((data) => {
          const today = new Date();
          const date = parseISO(data.expenseDate);
          const diff = differenceInDays(today, date);
          return diff >= 0 && diff <= 7;
        });
      }
      if (lastMonth) {
        return collectionData.filter((data) => {
          const today = new Date();
          const date = parseISO(data.expenseDate);
          const diff = differenceInDays(today, date);
          return diff >= 0 && diff <= 30;
        });
      }

      return collectionData;
    }
  }, [
    collectionData,
    foodCategory,
    transportCategory,
    technologiaCategory,
    entertainmentCategory,
    otherCategory,
    lastDay,
    last7Days,
    lastMonth,
  ]);

  const mapDataForChart = useMemo(() => {
    if (Array.isArray(collectionData) && collectionData.length > 0) {
      return collectionData;
    }
  }, [collectionData]);

  //title ni qisqartirish
  const shortTitle = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  //delete expense
  const deleteExpense = (id) => {
    deleteDocument("Expenses", id);
  };

  //expense edit
  const modalFormSubmit = async (e) => {
    setIsSubmitted(true);
    const newTitle = e.target.modalTitle.value;
    const newAmaunt = e.target.cost.value;
    const newCategory = e.target.modalCategory.value;
    const newDate = e.target.modalDate.value;
    const newNote = e.target.modalNote.value;

    const EditingData = doc(db, "Expenses", expenseData._id);

    await updateDoc(EditingData, {
      expenseTitle: newTitle,
      amaunt: newAmaunt,
      category: newCategory,
      expenseDate: newDate,
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

        setTotalSum(sum.toFixed(2));
        setMaxSum(sumMax.toFixed(2));
      }
  }, [collectionData]);

  //category filterni dinamic qilish
  const categoryFilter = useMemo(() => {
    if (foodCategory) return "Food";
    if (transportCategory) return "Transport";
    if (technologiaCategory) return "Technologia";
    if (entertainmentCategory) return "Entert...";
    if (otherCategory) return "Other";
    return "Category  ";
  }, [
    foodCategory,
    transportCategory,
    technologiaCategory,
    entertainmentCategory,
    otherCategory,
  ]);

  //date filter ni dinamik qilish
  const dateFilter = useMemo(() => {
    if (lastDay) return "A day";
    if (last7Days) return "7 days";
    if (lastMonth) return "A month";
    return "From";
  }, [lastDay, last7Days, lastMonth]);

  // search orqali filter qilish
  const searchSubmit = () => {
    console.log("search button bosildi");
  };
  return (
    <div className="w-full h-auto mb-20">
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
              className=" col-span-2 lg:col-span-2 input input-bordered w-full "
            />
            <input
              required
              type="number"
              name="amaunt"
              step="any"
              placeholder="Amaunt ($)"
              className="col-span-1 row-span-1 input input-bordered w-full "
            />
            <select
              className="select select-bordered w-full  col-span-1 row-span-1"
              required
              name="category"
              defaultValue=""
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

            <label className="input input-bordered flex items-center col-span-1 lg:col-span-2 gap-2">
              <input
                type="date"
                className="grow"
                placeholder="Date"
                name="date"
              />
            </label>
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
        <div className="col-span-10  shadow-md rounded-xl sm:col-span-5 lg:col-span-4 xl:col-span-3 bg-base-100 lg:row-span-2 p-2 lg:p-4">
          <h2 className="font-bold md:text-2xl lg:text-3xl ps-4">
            Expenses by Category
          </h2>
          <ExtensesPieChart mapDataForChart={mapDataForChart} />
        </div>

        {/* =================================== Total section ====================================================== */}
        <div className="col-span-10 sm:col-span-5 shadow-md lg:col-span-6 xl:col-span-7  bg-base-100 rounded-xl flex flex-row sm:flex-col lg:flex-row  lg:justify-evenly  p-5">
          <div className="total lg:border-e-2  lg:pe-5 flex-1 flex flex-col  gap-4 lg:gap-2">
            <h2 className="font-bold text-lg sm:text-2xl">Total Spent</h2>
            <span className="flex items-center gap-8 text-lg sm:text-2xl font-bold">
              <SlWallet className="w-10 h-10 sm:w-14 sm:h-14 opacity-40 text-primary" />{" "}
              ${totalSum}{" "}
            </span>
          </div>

          <div className="highest flex-1 flex flex-col gap-4 lg:ps-5 ">
            <h2 className="font-bold text-lg sm:text-2xl">Highest Expense</h2>
            <span className="flex items-center gap-8 text-lg sm:text-2xl font-bold">
              {" "}
              <RiMoneyPoundCircleLine className="w-10 h-10 sm:w-14 sm:h-14 opacity-40 text-primary " />{" "}
              ${maxSum}
            </span>
          </div>
        </div>
        {/* ==================================== Filter section ===================================================================== */}
        <div className="filter-senction shadow-md  col-span-10 sm:col-span-6 xl:col-span-5 bg-base-100 rounded-lg p-4 flex  items-center gap-1 md:gap-3">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              <span className="hidden md:inline-block">{categoryFilter}</span>{" "}
              <span className="md:hidden">
                <FaFilter />
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-auto p-2 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    setTransportCategory(false);
                    setTecnologiaCategory(false);
                    setEntertainmentCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(false);
                    setLastDay(false);
                    setLast7Days(false);
                    setLastMonth(false);
                  }}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTransportCategory(false);
                    setTecnologiaCategory(false);
                    setEntertainmentCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(true);
                  }}
                >
                  Food
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTecnologiaCategory(false);
                    setEntertainmentCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(false);
                    setTransportCategory(true);
                  }}
                >
                  Transport
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTransportCategory(false);
                    setTecnologiaCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(false);
                    setEntertainmentCategory(true);
                  }}
                >
                  Entertainment
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTransportCategory(false);
                    setEntertainmentCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(false);
                    setTecnologiaCategory(true);
                  }}
                >
                  Technologia
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTransportCategory(false);
                    setEntertainmentCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(false);
                    setTecnologiaCategory(false);
                    setOtherCategory(true);
                  }}
                >
                  Other
                </button>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1 ">
              <span className="flex gap-1 whitespace-nowrap">{dateFilter}</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    setTransportCategory(false);
                    setEntertainmentCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(false);
                    setTecnologiaCategory(false);
                    setOtherCategory(false);
                    setLastDay(false);
                    setLast7Days(false);
                    setLastMonth(false);
                  }}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTransportCategory(false);
                    setEntertainmentCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(false);
                    setTecnologiaCategory(false);
                    setOtherCategory(false);
                    setLastDay(true);
                  }}
                >
                  Last a day
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTransportCategory(false);
                    setEntertainmentCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(false);
                    setTecnologiaCategory(false);
                    setOtherCategory(false);
                    setLastDay(false);
                    setLast7Days(true);
                  }}
                >
                  Last 7 days
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTransportCategory(false);
                    setEntertainmentCategory(false);
                    setOtherCategory(false);
                    setFoodCategory(false);
                    setTecnologiaCategory(false);
                    setOtherCategory(false);
                    setLastDay(false);
                    setLast7Days(false);
                    setLastMonth(true);
                  }}
                >
                  Last a month
                </button>
              </li>
            </ul>
          </div>

          <Form method="post" className="w-full flex " onSubmit={searchSubmit}>
            <label className="input input-bordered w-full max-w-xl pe-10 flex relative">
              <input type=" text" className="w-full" placeholder="Search" />
              <button className="bg-gray-50 h-full rounded-e-lg absolute border-none btn-sm right-0 bottom-0 top-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </Form>
        </div>

        {/* ===================== Some content ======================================== */}
        <div className="some-content shadow-md hidden sm:block col-span-4 xl:col-span-5 bg-base-100 p-4 rounded-lg">
          1
        </div>

        {/* =============================== Expenses ===================================================
         */}
        <div className="expenses relative shadow-md  min-h-[65vh] col-span-10 p-3 sm:p-4 bg-base-100  h-auto rounded-xl overflow-x-auto md:overflow-x-hidden ">
          {!collectionData && (
            <span className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </span>
          )}
          <h1 className="font-bold md:text-3xl md-4 md:mb-10">Expense List</h1>
          <div className="min-w-[500px] md:min-w-fit  pb-20">
            {/* ==================== table ====================================== */}
            <table className="table table-fixed">
              {/* head */}
              <thead>
                <tr>
                  <th colSpan={2} className="md:text-xl text-center">
                    Title
                  </th>
                  <th className=" w-14"></th>
                  <th className="hidden lg:table-cell lg:text-xl">Category</th>
                  <th className="md:text-xl">Price</th>
                  <th className="hidden lg:table-cell md:text-xl">Date</th>
                  <th className="md:text-xl">Options</th>
                </tr>
              </thead>
              {/* =============== table body =================================================== */}
              <tbody className="border-b">
                {/* row 1 */}
                {mapData?.map((collect) => {
                  return (
                    <tr key={collect._id}>
                      <td className="ps-10" colSpan={2}>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold lg:text-xl opacity-80">
                              {shortTitle(collect.expenseTitle, 35)}
                            </div>
                            <div className="text-sm opacity-50 lg:hidden">
                              {collect.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="w-14"></td>
                      <td className="hidden lg:table-cell lg:font-medium text-lg text-warning">
                        {collect.category}
                      </td>
                      <td className="lg:hidden ">
                        $ {collect.amaunt}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {collect.expenseDate}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell lg:font-semibold text-lg text-red-400">
                        $ {collect.amaunt}
                      </td>
                      <td className="hidden lg:table-cell lg:font-semibold text-lg text-gray-400">
                        {collect.expenseDate}
                      </td>
                      <th className="relative flex justify-start gap-5 items-center">
                        <button
                          onClick={() => {
                            setExpenseData(collect);
                            document.getElementById("expense_view").showModal();
                          }}
                        >
                          <PiEyeBold className="w-5 h-5" />
                        </button>
                        <div className="dropdown  dropdown-end">
                          <div tabIndex={0} role="button" className="m-1">
                            <CiMenuKebab className="w-5 h-5 lg:w-7 lg:h-7" />
                          </div>

                          <ul
                            tabIndex={-1}
                            className="dropdown-content overflow-auto z-50 menu bg-base-100 rounded-box w-32 p-2 shadow absolute"
                          >
                            <li>
                              <button
                                onClick={() => {
                                  document
                                    .getElementById("expense_modal")
                                    .showModal();
                                  setExpenseData(collect);
                                }}
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => deleteExpense(collect._id)}
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </th>
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

              <label className="input input-bordered flex items-center col-span-1  gap-2">
                <input
                  type="date"
                  className="grow"
                  placeholder="Date"
                  name="modalDate"
                  defaultValue={expenseData?.expenseDate}
                />
              </label>
              <div className="col-span-1  row-span-1 w-full flex  gap-4">
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
    </div>
  );
}

export default Expense;
