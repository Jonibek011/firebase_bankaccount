import { useState } from "react";
import { Sidebar } from "../components";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Rootlayout() {
  return (
    <div className="h-screen flex ">
      <Sidebar />
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Navbar />
        <main className="px-[3%] max-w-screen-xl mx-auto  w-full overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Rootlayout;
