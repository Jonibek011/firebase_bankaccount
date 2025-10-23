import { Footer, Sidebar } from "../components";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Rootlayout() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/");
  return (
    <div className="h-screen flex ">
      <Sidebar />
      <div className="flex flex-col flex-1 transition-all duration-300 bg-base-200   ">
        <Navbar />
        <main className="px-[3%] max-w-screen-2xl mx-auto relative w-full overflow-x-auto overflow-y-auto h-auto">
          <Outlet />
          {!hideFooter && <Footer />}
        </main>
      </div>
    </div>
  );
}

export default Rootlayout;
