import { Link } from "react-router-dom";
import useGlobalContext from "../hooks/useGlobalContext";

//react-icons
import { IoMdMailUnread } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { PiLinkedinLogoFill } from "react-icons/pi";

//action
export const action = async ({ request }) => {
  const formData = await request.formData();
  const city = formData.get("cityName");
  if (city?.trim()) {
    return { city, result: "success" };
  }
};
//components
import { Weather } from "../components";
function home() {
  //user
  const { user } = useGlobalContext();
  return (
    <section className="home overflow-hidden w-full min-h-screen bg-white  p-5 md:p-10 relative  ">
      {/* <img
        src="./main_bg2.png"
        alt=""
        className="absolute top-0 left-0 right-0  -z-0"
      /> */}

      <div className="home-container  relative z-10 flex flex-col gap-14">
        <span className="absolute backspan w-[150vw] h-48 left-0  -top-14 rotate-3 z-0 hidden md:inline-block"></span>
        <div className="flex  items-center ">
          <div className="social-media relative z-10 ps-5  flex-1 flex items-center mt-5 md:mt-0 gap-5  md:gap-10   ">
            <Link className="h-8 w-8 md:w-12 md:h-12  bg-[rgba(255,101,101,0.9)] rounded-full inline-flex justify-center items-center">
              <span className="">
                <IoMdMailUnread className="md:w-6 md:h-6 text-base-content" />
              </span>
            </Link>
            <Link className=" h-8 w-8 md:w-12 md:h-12  bg-[rgba(255,101,101,0.9)] rounded-full inline-flex justify-center items-center">
              <span>
                <FaTelegramPlane className="md:w-6 md:h-6 text-base-content" />
              </span>
            </Link>
            <Link className=" h-8 w-8 md:w-12 md:h-12  bg-[rgba(255,101,101,0.9)] rounded-full inline-flex justify-center items-center">
              <span>
                <PiLinkedinLogoFill className="md:w-6 md:h-6 text-base-content" />
              </span>
            </Link>
          </div>
          <h2 className="hidden relative z-10  md:flex justify-end font-semibold text-sm pe-4 md:text-lg text-base-content">
            Wellcome {user.displayName}
          </h2>
        </div>
        <div className="home-content  w-full flex relative  h-[45vh] xl:h-[60vh] ">
          <img
            src="76690151.png"
            alt=""
            className="lg:w-[500px]   xl:w-[700px] absolute z-[1] -bottom-[20%] opacity-75 lg:bottom-0 xl:bottom-5 md:opacity-20 lg:opacity-100 right-0"
          />
          <img
            src="graph (1).png"
            alt=""
            className="absolute md:hidden min-w-[150vw] -left-[20%] opacity-50 bottom-[40%] md:w-0 lg:w-full  md:bottom-[50%] lg:-bottom-28  xl:bottom-0 md:-left-[30%] lg:-left-[35%] xl:-left-[30%]   xl:w-[1500px] z-0 md:opacity-100 "
          />

          <div className="wellcome-section flex-1 flex flex-col gap-5 md:gap-10 relative z-10">
            <h1 className="font-medium text-4xl md:text-7xl text-base-content">
              Hello, <br /> Wellcome to <br /> LifeHub
            </h1>
            <p className="font-normal text-lg text-base-content">
              Your all-in-one platform for a better life.
            </p>
            <div>
              <Link
                to="dashboard"
                className="bg-gradient-to-r   from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 transition-colors duration-300 py-3 rounded-md  border-none text-slate-50 hover:bg-blue-700 text-xl btn-md font-normal px-10"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* ============= Weather ========================= */}
          {/* <Weather /> */}
        </div>
        {/* =============== About us ====================================== */}
        <div className="about border shadow-md w-ful rounded-3xl bg-base-100 p-10 flex flex-col">
          <div className="about-content-1 flex flex-col md:flex-row">
            <div className="what-we-do  flex flex-1 border-b md:border-b-0 pb-3 md:pb-0 md:border-r mb-4">
              <div className="img-container w-[30%]">
                <img src="./megaphone.png" alt="img" className="max-w-[90%]" />
              </div>
              <div>
                <h2 className="font-medium text-2xl md:text-3xl">What we do</h2>
                <p className="text-xl md:text-2xl">
                  Providing life-management support
                </p>
              </div>
            </div>

            <div className="our-mission flex-1 flex pb-3 md:pb-0">
              <div className="img-container w-[25%]">
                <img src="star-medal.png" alt="" className="max-w-[90%]" />
              </div>
              <div>
                <h2 className="font-medium text-2xl md:text-3xl">
                  Our Mission
                </h2>
                <p className="text-xl md:text-2xl">
                  Empowering people to live better
                </p>
              </div>
            </div>
          </div>

          <div className="about-content-2 border-t pt-5 flex">
            <div className="w-[30%] md:w-[13%] ">
              <img
                src="targeted.png"
                className="max-w-[90%] md:max-w-[70%]"
                alt="img"
              />
            </div>
            <div>
              <h2 className=" text-2xl md:text-3xl ml-2 md:ml-0 font-medium">
                Our Values
              </h2>
              <p className="text-xl md:text-2xl ml-2 md:ml-0">
                Commitment to health, education, and innovation
              </p>
            </div>
          </div>
        </div>

        {/* ====================== Card section ================================== */}
        <div className="card-section grid grid-rows-4 md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 ">
          {/* ========================= Card 1 ================================================= */}
          <div className="card-1 border shadow-md p-10 flex rounded-3xl bg-base-100 gap-3">
            <div className="img-container w-[30%] lg:w-[20%]">
              <img src="checked.png" alt="img" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-medium text-3xl">Track your tasks</h2>
              <p className="text-2xl pr-10 lg:text-center">
                Stay organizes and productive
              </p>
            </div>
          </div>
          {/* ============================ Card 2 ============================================== */}
          <div className="card-2 border shadow-md p-10 flex flex-col rounded-3xl bg-base-100 gap-3">
            <div className="img-container flex  gap-4">
              <img src="graph.png" alt="img" className="w-[23%]" />
              <h2 className="font-medium text-3xl">Manage your finances</h2>
            </div>
            <div className="">
              <p className="text-2xl lg:text-center">
                Gain-control of your monay
              </p>
            </div>
          </div>
          {/* ================================ Card 3 ============================================= */}
          <div className="card-2 border shadow-md p-10 flex flex-col rounded-3xl bg-base-100 gap-3">
            <div className="img-container flex  gap-4">
              <img src="timetable.png" alt="img" className="w-[23%]" />
              <h2 className="font-medium text-3xl">Scadule your time</h2>
            </div>
            <div className="">
              <p className="text-2xl lg:text-center">Pro-saving your time</p>
            </div>
          </div>
          {/* ===================================== Card 4 ================================================ */}
          <div className="card-2 border shadow-md p-10 flex flex-col rounded-3xl bg-base-100 gap-3">
            <div className="img-container flex  gap-4">
              <img src="seo.png" alt="img" className="w-[23%]" />
              <h2 className="font-medium text-3xl">Explore new ideas</h2>
            </div>
            <div className="">
              <p className="text-2xl lg:text-center">
                Learn and grow every day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default home;
