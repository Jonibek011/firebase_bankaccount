import { useEffect, useMemo } from "react";
// i18next imports
import { useTranslation } from "react-i18next";
// hooks
import { useAllCollection } from "../../hooks/useAllCollection";
//icons
import { LuArrowLeft, LuCalendarCheck2 } from "react-icons/lu";
//context
import useGlobalContext from "../../hooks/useGlobalContext";
import { Link, NavLink, Outlet, replace } from "react-router-dom";

//react router dom
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
//=========== MAIN FUNCTION ==================================================
function Statistics() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  // user from globalContext
  const { user } = useGlobalContext();
  // collectionData
  const { data: collectionData } = useAllCollection("Expenses", [
    "userId",
    "==",
    user.uid,
  ]);

  const { data: allIncomes } = useAllCollection("Incomes", [
    "userId",
    "==",
    user.uid,
  ]);

  // collectiondan qaysi yillar malumoti borligini olish
  const years = useMemo(() => {
    if (!collectionData) return [];

    return Array.from(
      new Set(
        collectionData.map((collect) =>
          collect.timeStamp.toDate().getFullYear()
        )
      )
    ).sort((a, b) => a - b);
  }, [collectionData]);

  //Default year ni aniqlash
  const defaultYear = years.length === 1 ? years[0] : years[years.length - 1];

  //URL da param bormi
  useEffect(() => {
    const hasYearInUrl = years.some((year) =>
      location.pathname.endsWith(`/${year}`)
    );

    if (!hasYearInUrl && defaultYear) {
      navigate(`/expense/statistics/${defaultYear}`, { replace: true });
    }
  }, [years, location.pathname, navigate, defaultYear]);

  return (
    <div className="p-[2%] md:px-[5%] max-w-screen-2xl mx-auto w-full">
      <div className="statistic-container flex flex-col gap-5">
        <div>
          <Link
            to="/expense"
            className=" border border-base-content/10 px-2 py-1 inline-block rounded-md bg-gray-600/5 "
          >
            <FaArrowLeftLong />
          </Link>
          <h2 className="text-2xl font-semibold text-base-content">
            {t("statistics.upperTitle")}
          </h2>
          <p className=" text-base-content">{t("statistics.upperSubtitle")}</p>
        </div>
        <div className="border-2 flex justify-between items-center md:mt-4 border-base-content/20 shadow px-5 py-6 bg-base-100  rounded-xl ">
          <div className="flex items-center gap-2">
            <span>
              <LuCalendarCheck2 className="w-6 h-6 text-blue-500" />
            </span>
            <span className="md:text-lg">{t("statistics.selectYear")}</span>
          </div>
          <div className="flex items-center">
            {!years && (
              <div className="flex gap-1">
                <span className="loading loading-spinner loading-sm "></span>{" "}
                <span className="text-base-content">Loading...</span>{" "}
              </div>
            )}
            {years.map((year) => {
              return (
                <NavLink
                  key={year}
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-base-content text-base-100 px-3 py-1"
                      : "px-3 py-1"
                  }
                  to={`/expense/statistics/${year}`}
                >
                  {year}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="full-statistics">
          {(collectionData?.length == 0 || allIncomes?.length == 0) && (
            <>
              <div className="rounded-lg  bg-base-100 w-full shadow-lg p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <span className="loading loading-ring loading-lg text-info"></span>
                  </div>
                  <h2 className="text-center text-2xl lg:text-3xl font-semibold">
                    {t("noStat.title")}
                  </h2>
                  <p className="lg:text-lg max-w-lg mx-auto text-center">
                    {t("noStat.description")}
                  </p>
                </div>
                <div className="cards max-w-xl mx-auto w-full grid grid-cols-3 gap-4 ">
                  <div className="card p-4 rounded-xl bg-blue-500/10 flex flex-row gap-3">
                    <div className="w-6 h-6 min-w-6 rounded-full bg-blue-600 flex justify-center items-center ">
                      <span className="text-white ">1</span>
                    </div>
                    <div>
                      <h2 className="font-semibold">
                        {t("noStat.card1Title")}
                      </h2>
                      <p className="text-[12px]">
                        {t("noStat.card1Description")}
                      </p>
                    </div>
                  </div>

                  <div className="card p-4 rounded-xl bg-purple-500/10 flex flex-row gap-3">
                    <div className="w-6 h-6 min-w-6 rounded-full bg-purple-600 flex justify-center items-center ">
                      <span className="text-white ">2</span>
                    </div>
                    <div>
                      <h2 className="font-semibold">
                        {t("noStat.card2Title")}
                      </h2>
                      <p className="text-[12px]">
                        {t("noStat.card2Description")}
                      </p>
                    </div>
                  </div>

                  <div className="card p-4 rounded-xl bg-green-500/10 flex flex-row gap-3">
                    <div className="w-6 h-6 min-w-6 rounded-full bg-green-600 flex justify-center items-center ">
                      <span className="text-white ">3</span>
                    </div>
                    <div>
                      <h2 className="font-semibold">
                        {t("noStat.card3Title")}
                      </h2>
                      <p className="text-[12px]">
                        {t("noStat.card3Description")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="loading loading-dots loading-lg text-primary"></span>
                </div>
              </div>
              <p className="text-sm text-center mt-3">💡 {t("noStat.tip")}</p>
            </>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Statistics;
