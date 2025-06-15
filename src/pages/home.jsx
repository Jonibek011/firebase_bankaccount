//react-icons
import { MdError } from "react-icons/md";

function home() {
  return (
    <div className=" grid grid-cols-2 grid-row-8 sm:grid-rows-10 lg:grid-rows-11 min-h-screen h-[110vh] sm:h-[140vh] min-w-full gap-2 md:gap-5 py-5 md:py-10">
      {/* ======================= First content ==================================== */}
      <div className="layouts border border-base-200 shadow-sm rounded-md   col-span-full bg-yellow-50 px-4  md:px-5 lg:px-10   flex items-center">
        <div className="upper-content flex justify-between items-center   w-full">
          <h2 className="flex gap-2 md:gap-3 items-center text-black ">
            <MdError className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-yellow-500" />{" "}
            <span className="text-black text-lg sm:text-3xl md:text-3xl lg:text-4xl font-semibold flex md:flex-col lg:flex-col lg:gap-2">
              {" "}
              2 tasks due <span> tomorrow</span>
            </span>
          </h2>
          <div className="buttons flex gap-4">
            <button className="btn bg-indigo-600 hover:bg-indigo-500 text-sm  sm:text-lg lg:text-lg text-base-100 btn-md xl:btn-lg">
              NewTask
            </button>
            <button className=" hidden sm:inline-block btn bg-green-700 text-base-100 hover:bg-green-600 text- lg:text-lg btn-md xl:btn-lg">
              Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* ==================== Second Content ============================== */}
      <div className="rounded-md border border-base-200 bg-base-100 shadow-sm row-span-2 p-5 md:p-10 flex flex-col justify-center gap-4">
        <h2 className="text-lg md:text-3xl font-medium text-gray-500">
          Task Completed
        </h2>
        <p className="font-medium text-4xl md:text-6xl">32</p>
      </div>

      {/* ========== third content ========================================== */}
      <div className="rounded-md border border-base-200 bg-base-100 shadow-sm row-span-2 p-5 md:p-10 flex flex-col justify-center gap-4">
        <h2 className="text-lg md:text-3xl font-medium text-gray-500">
          Monthly Expenses
        </h2>
        <p className="font-medium text-4xl md:text-6xl">$4,500</p>
      </div>

      {/* ======================== Forth content ====================================== */}
      <div className="rounded-md border border-base-200 bg-base-100 shadow-sm  col-span-full row-span-3 sm:row-span-4 lg:row-span-5 ">
        <h2 className="text-2xl md:text-4xl font-medium pl-3">Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table table-sm  sm:table-lg">
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
                  <button className="btn bg-gray-400 btn-sm lg:btn-md text-xs md:text-md text-base-100 ">
                    In Progress
                  </button>
                </td>
                <td className="tabel-row ">May 25</td>
              </tr>
              {/* row 2 */}
              <tr className="hover tabel-row">
                <td className="tabel-row ">Whrite documentation</td>
                <td>
                  <button className="btn bg-indigo-500 btn-sm lg:btn-md border-none text-base-100">
                    Review
                  </button>
                </td>
                <td className="tabel-row ">May 24</td>
              </tr>
              {/* row 3 */}
              <tr className="hover tabel-row">
                <td className="tabel-row ">Update dependencies</td>
                <td>
                  <button className="btn bg-gray-500  btn-sm lg:btn-md  border-none text-base-100">
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
                  <button className="btn bg-slate-500 btn-sm lg:btn-md text-xs border-none text-base-100 ">
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
      <div className="rounded-md border border-base-200 bg-base-100 shadow-sm row-span-2 sm:row-span-3 lg:row-span-4">
        5
      </div>
      <div className="rounded-md  border border-base-200 bg-base-100 shadow-sm row-span-2 sm:row-span-3 lg:row-span-4">
        6
      </div>
    </div>
  );
}

export default home;
