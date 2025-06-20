import { Form } from "react-router-dom";
import { Chart } from "../components";

//icons
import { SlWallet } from "react-icons/sl";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
//components
import { ExtensesPieChart } from "../components";

function Expense() {
  return (
    <div className="w-full h-auto mb-20">
      <h2 className="hidden sm:block font-semibold text-3xl sm:text-5xl my-6">
        Expenses
      </h2>
      <div className="main-container grid grid-cols-10 grid-rows-none auto-rows-auto  w-full  gap-4 lg:gap-5  ">
        {/* ==================== Add card ====================================================== */}
        <div className="add-card bg-base-100 w-full rounded-xl p-2 sm:p-4 col-span-10 lg:col-span-6 xl:col-span-7 h-auto">
          <h3 className="text-xl sm:text-3xl font-semibold mb-5">
            Add Expense
          </h3>
          <Form
            action="."
            method="post"
            className="grid grid-cols-2 lg:grid-cols-3 grid-rows-4 lg:grid-rows-3 gap-2 sm:gap-5 "
          >
            <input
              type="text"
              name="expenseTitle"
              placeholder="Title"
              className=" col-span-2 lg:col-span-2 input input-bordered w-full "
            />
            <input
              type="number"
              name="amaunt"
              placeholder="Amaunt"
              className="col-span-1 row-span-1 input input-bordered w-full "
            />
            <select className="select select-bordered w-full  col-span-1 row-span-1">
              <option disabled selected>
                Category
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
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
                name="category"
                placeholder="Note"
                className=" input input-bordered w-full flex-grow flex-1"
              />
              <button className="btn  bg-sky-600 text-white hidden lg:inline-block">
                Add
              </button>
            </div>

            <button className="lg:hidden btn col-span-2 row-span-1 bg-sky-600 text-white">
              Add
            </button>
          </Form>
        </div>

        {/* =========================== Chart card =============================================================== */}
        <div className="col-span-10 rounded-xl sm:col-span-5 lg:col-span-4 xl:col-span-3 bg-base-100 lg:row-span-2 p-2 lg:p-4">
          <h2 className="font-bold md:text-2xl lg:text-3xl">
            Expenses by Category
          </h2>
          <ExtensesPieChart />
        </div>

        {/* =================================== Total section ====================================================== */}
        <div className="col-span-10 sm:col-span-5 lg:col-span-6 xl:col-span-7  bg-base-100 rounded-xl flex flex-row sm:flex-col lg:flex-row  lg:justify-evenly  p-5">
          <div className="total lg:border-e-2  lg:pe-5 flex-1 flex flex-col  gap-4 lg:gap-2">
            <h2 className="font-bold text-lg sm:text-2xl">Total Spent</h2>
            <span className="flex items-center gap-8 text-lg sm:text-2xl font-bold">
              <SlWallet className="w-10 h-10 sm:w-14 sm:h-14 opacity-40 text-primary" />{" "}
              $95.00{" "}
            </span>
          </div>

          <div className="highest flex-1 flex flex-col gap-4 lg:ps-5 ">
            <h2 className="font-bold text-lg sm:text-2xl">Highest Expense</h2>
            <span className="flex items-center gap-8 text-lg sm:text-2xl font-bold">
              {" "}
              <RiMoneyPoundCircleLine className="w-10 h-10 sm:w-14 sm:h-14 opacity-40 text-primary " />{" "}
              $50.00
            </span>
          </div>
        </div>
        {/* ==================================== Filter section ===================================================================== */}
        <div className="filter-senction col-span-10 sm:col-span-6 xl:col-span-5 bg-base-100 rounded-lg p-4 flex gap-3">
          <select
            defaultValue="Category"
            className="select select-bordered font-medium"
          >
            <option disabled={true}>Category</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>

          <select
            defaultValue="From"
            className="select select-bordered font-medium"
          >
            <option disabled={true}>From</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>

          <label className="input input-bordered flex items-center gap-2 flex-1 min-w-20">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        {/* ===================== Some content ======================================== */}
        <div className="some-content hidden sm:block col-span-4 xl:col-span-5 bg-base-100 p-4 rounded-lg">
          1
        </div>

        {/* =============================== Expenses ===================================================
         */}
        <div className="expenses col-span-10 p-3 sm:p-4 bg-base-100 min-h-[50vh] rounded-xl overflow-x-auto md:overflow-x-hidden ">
          <h1 className="font-bold md:text-3xl md-4 md:mb-10">Expense List</h1>
          <div className="overflow-x-auto md:overflow-x-hidden min-w-[600px] overflow-y-hidden">
            {/* ==================== table ====================================== */}
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="md:text-xl">Title</th>
                  <th className="hidden lg:table-cell lg:text-xl">Category</th>
                  <th className="md:text-xl">Price</th>
                  <th className="hidden lg:table-cell md:text-xl">Date</th>
                  <th className="md:text-xl">Options</th>
                </tr>
              </thead>
              {/* =============== table body =================================================== */}
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold lg:text-lg">
                          Expense title Titlt tltlt elt t
                        </div>
                        <div className="text-sm opacity-50 lg:hidden">
                          Category
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell lg:font-medium text-lg text-warning">
                    Food
                  </td>
                  <td className="lg:hidden ">
                    $ 14.90
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      13:42, 20.06.2025
                    </span>
                  </td>
                  <td className="hidden lg:table-cell lg:font-semibold text-lg text-red-400">
                    $ 14.90
                  </td>
                  <td className="hidden lg:table-cell lg:font-semibold text-lg text-gray-400">
                    13:42, 20.06.2025
                  </td>
                  <th>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn m-1">
                        Click
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
                        <li>
                          <a>Item 1</a>
                        </li>
                        <li>
                          <a>Item 2</a>
                        </li>
                      </ul>
                    </div>
                  </th>
                </tr>
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expense;
