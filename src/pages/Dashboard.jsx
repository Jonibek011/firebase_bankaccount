import { LuSearch } from "react-icons/lu";
import { BsBellFill } from "react-icons/bs";
import ellipses from "../assets/images/Ellipse 3.png";

import { LiaBalanceScaleSolid } from "react-icons/lia";
import { TbUserDollar } from "react-icons/tb";
//components
import EarningChart from "../components/EarningChart";
import useWindowSize from "../hooks/useWindowSize";
import { SunburstChart } from "recharts";
import { useEffect, useState } from "react";
function Dashboard() {
  const { width, height } = useWindowSize();
  const [date, setDate] = useState(new Date());

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

  // const getTime = () => {

  //   return
  // }
  useEffect(() => {
    setDate(new Date());
    const interval = setInterval(() => {
      setDate(new Date());
      console.log(date);
    }, 60000);

    return () => clearInterval(interval);
  }, []);
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
                  <h2 className="text-3xl font-bold">$ 9460.00</h2>
                  <span className="text-red-500 self-end">1.5%</span>
                </div>
                <p className="text-sm font-normal text-gray-400">
                  Compered to $9940 yesterday
                </p>
                <div className="flex text-sm justify-between items-center font-semibold text-base-content/70">
                  <span>Last week Income</span>
                  <span>$25658.00</span>
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
                  <h2 className="text-3xl font-bold">$ 5660.00</h2>
                  <span className="text-green-500 self-end">2.5%</span>
                </div>
                <p className="text-sm font-normal text-gray-400">
                  Compered to $5240 yesterday
                </p>
                <div className="flex text-sm justify-between items-center font-semibold text-base-content/70">
                  <span>Last month expenses</span>
                  <span>$25658.00</span>
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
      <div className="lg:flex-1 order-1 lg:order-2  p-5 flex flex-col gap-4 w-full   min--[100vh] md:pb-10 lg:min-h-0 md:h-[calc(100vh-70px)] overflow-y-auto ">
        {/* ============================ High section ================================= */}
        <div className="w-full flex gap-10 justify-between items-center">
          <h2 className="text-lg font-medium">Hello Name ✌</h2>
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
        <div className=" p-5 2xl:shadow-md  bg-base-100  overflow-x-auto min-h-[180px]  max-w-[90vw] lg:max-w-full   lg:w-[calc(100vw-450px)] flex gap-8 rounded-xl ">
          <div className="flex-1 shadow-md  2xl:shadow-none rounded-md  min-w-[300px]   border-e py-4 lg:pe-2  ">
            <div className={`flex justify-center items-center gap-8`}>
              <p
                className={` flex justify-center items-center bg-gradient-to-b from-green-500/10 to-green-300/10 w-24 h-24  rounded-full  `}
              >
                <LiaBalanceScaleSolid className={`w-14 h-14 text-green-600 `} />
              </p>
              <div className="flex items-center justify-center flex-col gap-1">
                <p className="text-gray-400">Monthly Savings</p>
                <h2 className={`text-4xl  font-bold`}>$5,423</h2>
                <p>
                  <span className="text-green-600 font-medium">16% </span>this
                  month
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 shadow-md 2xl:shadow-none rounded-md  min-w-[300px]   border-e py-4 lg:pe-2  ">
            <div className={`flex items-center justify-center gap-8`}>
              <p
                className={` flex justify-center items-center bg-gradient-to-b from-green-500/10 to-green-300/10 w-24 h-24  rounded-full`}
              >
                <TbUserDollar className={`w-14 h-14 text-green-600 `} />
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Weakly expense</p>
                <h2 className={`text-4xl font-bold`}>$1286</h2>
                <p>
                  <span className="text-red-600 font-medium">14% </span>this
                  week
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 shadow-md 2xl:shadow-none rounded-md  min-w-[300px]    py-4 lg:pe-2  ">
            <div className={`flex justify-center items-center gap-8 `}>
              <p
                className={` flex justify-center items-center bg-gradient-to-b from-green-500/10 to-green-300/10 w-24 h-24  rounded-full`}
              >
                <TbUserDollar className={`w-14 h-14  text-green-600 `} />
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Highest Expense</p>
                <h2 className={`text-4xl  font-bold`}>$128</h2>
                <p className="text-green-500 flex items-center gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>{" "}
                  Transport
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================= Table =================================== */}
        <div className=" max-w-full  lg:w-[calc(100vw-396px)] rounded-xl p-8 shadow-md border  bg-base-100  ">
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
                      <h2 className="text-[16px] font-medium">Alex Noman</h2>
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
                      <h2 className="text-[16px] font-medium">Razib Rahman</h2>
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
                      <h2 className="text-[16px] font-[500]">Luke Norton</h2>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex-1">
          {" "}
          <EarningChart />{" "}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
