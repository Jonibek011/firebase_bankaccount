import React from "react";
//icons
import { BiWallet } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuTarget } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
function Fund() {
  return (
    <div className="w-full h-full px-2 md:px-[5%] lg:px-[10%] xl:px-[10%] 2xl:px-[15%] flex flex-col gap-5 py-10">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-gradient-to-br flex justify-center items-center from-indigo-500 to-purple-700 from-0% rounded-2xl">
          <BiWallet className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-[#18181B]">All funds</h2>
          <p className="text-lg font-thin text-[#18181B]">
            Manage your financial goals
          </p>
        </div>
      </div>
      <div className="fund-container w-full bg-base-100 rounded-xl p-5   shadow border flex flex-col gap-5">
        <p className="font-normal  text-slate-500">
          In this section, you can create and track your savings for different
          goals. Set a target amount for each savings and keep track of the
          progress.
        </p>
        <div className="card-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="card border-none p-4 rounded-3xl flex flex-col gap-3 bg-gradient-to-br from-blue-100/50 to-blue-200/50 ">
            <p className="flex gap-2 items-center">
              <FaArrowTrendUp className="w-5 h-5 text-blue-500" />{" "}
              <span>Total saved</span>
            </p>
            <p className="text-lg">$27000.0</p>
          </div>
          <div className="card border-none p-4 rounded-3xl flex flex-col gap-3 bg-gradient-to-br from-purple-100/50 to-purple-200/50 ">
            <p className="flex gap-2 items-center">
              <LuTarget className="w-5 h-5 text-purple-500" />{" "}
              <span>Total goals</span>
            </p>
            <p className="text-lg">$85000.0</p>
          </div>
          <div className="card border-none p-4 rounded-3xl flex flex-col gap-3 bg-gradient-to-br from-green-100/50 to-green-200/50 ">
            <p className="flex gap-2 items-center">
              <BiWallet className="w-5 h-5 text-green-500" />{" "}
              <span>Number of funds</span>
            </p>
            <p className="text-lg">3</p>
          </div>
        </div>
      </div>

      <div className="md:mt-4 flex justify-between items-center">
        <p className="text-[#18181B]">My funds</p>
        <button className="rounded-md px-8 py-2 bg-[#18181B] hover:bg-[#303036] text-white">
          + New fund
        </button>
      </div>

      <div className="fund-cards grid gap-3 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="card overflow-hidden relative shadow-xl pt-12 px-3 md:px-4 xl:px-5 pb-6 rounded-2xl bg-base-100 flex flex-col gap-6">
          <span className="absolute w-full h-3 left-0 top-0 bg-blue-500 "></span>
          <div className="card-header flex justify-between items-center gap-5">
            <div className="flex gap-4 items-center">
              <div className="image w-14 h-14 rounded-md bg-slate-100 "></div>
              <div>
                <h2 className="font-medium">For electro car</h2>
                <p>30.0% completed</p>
              </div>
            </div>
            <button className="">
              <GoTrash className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className=" w-full h-4 rounded-full overflow-hidden relative bg-gray-200">
            <span className="absolute top-0 left-0 w-[30%] h-full bg-[#303036] inline-block"></span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span>Current amount:</span>
              <span>$5000.0</span>
            </div>
            <div className="flex justify-between">
              <span>Goal:</span>
              <span>$8000.0</span>
            </div>
            <div className="flex justify-between">
              <span>Left:</span>
              <span className="text-red-500">$3000.0</span>
            </div>
          </div>
          <div className="buttons flex gap-2">
            <button className="py-2 flex-1 btn bg-transparent hover:bg-slate-400/50 shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-slate-200/50">
              + 50$
            </button>
            <button className="py-2 flex-1 btn bg-transparent hover:bg-slate-400/50 shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-slate-200/50">
              + 100$
            </button>
            <button className="py-2 flex-1 btn bg-[#18181B] hover:bg-[#2f2f36] shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-none text-white">
              + 1K
            </button>
          </div>
        </div>

        <div className="card overflow-hidden relative shadow-xl pt-12 px-3 md:px-4 xl:px-5 pb-6 rounded-2xl bg-base-100 flex flex-col gap-6">
          <span className="absolute w-full h-3 left-0 top-0 bg-blue-500 "></span>
          <div className="card-header flex justify-between items-center gap-5">
            <div className="flex gap-4 items-center">
              <div className="image w-14 h-14 rounded-md bg-slate-100 "></div>
              <div>
                <h2 className="font-medium">For electro car</h2>
                <p>30.0% completed</p>
              </div>
            </div>
            <button className="">
              <GoTrash className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className=" w-full h-4 rounded-full overflow-hidden relative bg-gray-200">
            <span className="absolute top-0 left-0 w-[30%] h-full bg-[#303036] inline-block"></span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span>Current amount:</span>
              <span>$5000.0</span>
            </div>
            <div className="flex justify-between">
              <span>Goal:</span>
              <span>$8000.0</span>
            </div>
            <div className="flex justify-between">
              <span>Left:</span>
              <span className="text-red-500">$3000.0</span>
            </div>
          </div>
          <div className="buttons flex gap-2">
            <button className="py-2 flex-1 btn bg-transparent hover:bg-slate-400/50 shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-slate-200/50">
              + 50$
            </button>
            <button className="py-2 flex-1 btn bg-transparent hover:bg-slate-400/50 shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-slate-200/50">
              + 100$
            </button>
            <button className="py-2 flex-1 btn bg-[#18181B] hover:bg-[#2f2f36] shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-none text-white">
              + 1K
            </button>
          </div>
        </div>

        <div className="card overflow-hidden relative shadow-xl pt-12 px-3 md:px-4 xl:px-5 pb-6 rounded-2xl bg-base-100 flex flex-col gap-6">
          <span className="absolute w-full h-3 left-0 top-0 bg-blue-500 "></span>
          <div className="card-header flex justify-between items-center gap-5">
            <div className="flex gap-4 items-center">
              <div className="image w-14 h-14 rounded-md bg-slate-100 "></div>
              <div>
                <h2 className="font-medium">For electro car</h2>
                <p>30.0% completed</p>
              </div>
            </div>
            <button className="">
              <GoTrash className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className=" w-full h-4 rounded-full overflow-hidden relative bg-gray-200">
            <span className="absolute top-0 left-0 w-[30%] h-full bg-[#303036] inline-block"></span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span>Current amount:</span>
              <span>$5000.0</span>
            </div>
            <div className="flex justify-between">
              <span>Goal:</span>
              <span>$8000.0</span>
            </div>
            <div className="flex justify-between">
              <span>Left:</span>
              <span className="text-red-500">$3000.0</span>
            </div>
          </div>
          <div className="buttons flex gap-2">
            <button className="py-2 flex-1 btn bg-transparent hover:bg-slate-400/50 shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-slate-200/50">
              + 50$
            </button>
            <button className="py-2 flex-1 btn bg-transparent hover:bg-slate-400/50 shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-slate-200/50">
              + 100$
            </button>
            <button className="py-2 flex-1 btn bg-[#18181B] hover:bg-[#2f2f36] shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-none text-white">
              + 1K
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fund;
