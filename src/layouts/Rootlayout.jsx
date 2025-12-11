import { Footer, Sidebar } from "../components";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Rootlayout() {
  const location = useLocation();
  const hideFooter = location.pathname.endsWith("/");
  return (
    <div className="h-screen flex ">
      {!hideFooter && <Sidebar />}
      <div className="flex flex-col flex-1 transition-all duration-300 bg-base-200   ">
        {!hideFooter && <Navbar />}
        <main className=" relative w-full overflow-x-auto overflow-y-auto h-auto">
          <Outlet />
          {!hideFooter && <Footer />}
        </main>
      </div>
    </div>
  );
}

export default Rootlayout;
