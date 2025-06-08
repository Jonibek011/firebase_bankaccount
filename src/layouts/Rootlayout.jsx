import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Rootlayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Rootlayout;
