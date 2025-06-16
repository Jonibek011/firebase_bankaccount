//react-icons
import { MdError } from "react-icons/md";
import { Chart } from "../components";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className=" grid grid-cols-2 grid-row-8 sm:grid-rows-10 lg:grid-rows-11 min-h-screen h-auto  min-w-full gap-2 md:gap-5 py-5 md:py-10">
      {/* ======================= First content ==================================== */}
      <div className="layouts border border-base-200 shadow-sm rounded-md   col-span-full bg-yellow-50 px-4  md:px-5 lg:px-10   flex items-center">
        <div className="upper-content flex justify-between items-center   w-full py-3">
          <h2 className="flex gap-2 md:gap-3 items-center text-black ">
            <MdError className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-yellow-500" />{" "}
            <span className="text-black text-lg sm:text-3xl md:text-3xl lg:text-4xl font-semibold flex md:flex-col lg:flex-col lg:gap-2">
              {" "}
              2 tasks due <span> tomorrow</span>
            </span>
          </h2>
          <div className="buttons flex gap-4">
            <Link
              to="/tasks"
              className="btn  bg-indigo-600 hover:bg-indigo-500 text-sm  sm:text-lg lg:text-lg text-base-100 btn-sm md:btn-md xl:btn-lg"
            >
              NewTask
            </Link>
            <button className=" hidden sm:inline-block btn bg-blue-700 text-base-100 hover:bg-blue-600 text- lg:text-lg btn-md xl:btn-lg">
              Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* ==================== Second Content ============================== */}
      <div className="rounded-md border border-base-200 bg-blue-400 md:bg-base-100  shadow-sm row-span-2 p-5 md:p-10 flex flex-col justify-center gap-4">
        <h2 className="text-lg md:text-3xl font-medium text-base-content">
          Task Completed
        </h2>
        <p className="font-medium text-4xl md:text-6xl">32</p>
      </div>

      {/* ========== third content ========================================== */}
      <div className="rounded-md border border-base-200 bg-green-400 md:bg-base-100 shadow-sm row-span-2 p-5 md:p-10 flex flex-col justify-center gap-4">
        <h2 className="text-lg md:text-3xl font-medium text-base-content">
          Monthly Expenses
        </h2>
        <p className="font-medium text-4xl md:text-6xl">$4,500</p>
      </div>

      {/* ======================== Forth content ====================================== */}
      <div className="rounded-md border border-base-200 bg-base-100 shadow-sm md:py-7 lg:py-10 col-span-full row-span-3 sm:row-span-4 lg:row-span-5 ">
        <h2 className="text-2xl md:text-4xl font-medium pl-5">Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table table-sm  sm:table-md">
            {/* head */}
            <thead>
              <tr className="text-lg md:text-3xl">
                <th>Task</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover  ">
                <td className="tabel-row ">Design homepage</td>
                <td>
                  <button className="btn bg-blue-700 hover:bg-blue-600 btn-sm lg:btn-md text-xs md:text-md text-base-100 ">
                    In Progress
                  </button>
                </td>
                <td className="tabel-row ">May 25</td>
              </tr>
              {/* row 2 */}
              <tr className="hover tabel-row">
                <td className="tabel-row ">Whrite documentation</td>
                <td>
                  <button className="btn bg-indigo-600 hover:bg-indigo-500 btn-sm lg:btn-md border-none text-base-100">
                    Review
                  </button>
                </td>
                <td className="tabel-row ">May 24</td>
              </tr>
              {/* row 3 */}
              <tr className="hover tabel-row">
                <td className="tabel-row ">Update dependencies</td>
                <td>
                  <button className="btn bg-blue-800 hover:bg-blue-700  btn-sm lg:btn-md  border-none text-base-100">
                    {" "}
                    Completed
                  </button>
                </td>
                <td className="tabel-row "> 22 May</td>
              </tr>
              {/* row 4*/}
              <tr className="hover tabel-row">
                <td className="tabel-row ">Fix navbar issue</td>
                <td>
                  <button className="btn bg-slate-500 hover:bg-slate-400 btn-sm lg:btn-md text-xs border-none text-base-100 ">
                    {" "}
                    In Progress
                  </button>
                </td>
                <td className="tabel-row ">20 May</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-md border border-base-200 bg-base-100 p-5 shadow-sm col-span-2 sm:col-span-1 row-span-2 sm:row-span-3 lg:row-span-4">
        <h3 className="text-3xl font-medium">Expenses</h3>
        <Chart />
      </div>
      <div className="rounded-md  border p-8 border-base-200 bg-base-100 shadow-sm col-span-2 sm:col-span-1 row-span-2 sm:row-span-3 lg:row-span-4">
        <h3 className="text-3xl font-medium">Expenses</h3>
        <div className="chart-info flex flex-col justify-evenly w-full h-full ">
          <p className="px-[50%] text-lg font-semibold flex items-center gap-3">
            <span className="min-w-4 h-4 rounded-full bg-[#0088FE] inline-block border"></span>{" "}
            Marketing
          </p>
          <p className="px-[50%] text-lg font-semibold flex items-center gap-3">
            <span className="min-w-4 h-4 rounded-full bg-[#00C49F] inline-block border"></span>{" "}
            Salaries
          </p>
          <p className="px-[50%] text-lg font-semibold flex items-center gap-3">
            <span className="min-w-4 h-4 rounded-full bg-[#FFBB28] inline-block border"></span>{" "}
            Office
          </p>
          <p className="px-[50%] text-lg font-semibold flex items-center gap-3">
            <span className="min-w-4 h-4 rounded-full bg-[#FF8042] inline-block border"></span>{" "}
            Software
          </p>
          <p className="px-[50%] text-lg font-semibold flex items-center gap-3">
            <span className="min-w-4 h-4 rounded-full bg-[#AA00FF] inline-block border"></span>{" "}
            Other
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
