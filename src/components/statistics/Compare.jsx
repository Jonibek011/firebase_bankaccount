import React, { useEffect, useState } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
function Compare({ collections, allIncomes }) {
  const { t } = useTranslation();
  const [array, setArray] = useState([]);
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const oylar = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Octr",
    "Nov",
    "Dec",
  ];
  console.log(allIncomes);
  useEffect(() => {
    const arr = [];
    months?.forEach((month) => {
      const filtercollections = collections.filter(
        (collect) => collect.month == month
      );

      const filterincomes = allIncomes?.filter((incomes) => {
        return incomes.timeStamp.toDate().getMonth() == month;
      });

      let sum = 0;
      let sum1 = 0;

      if (filterincomes?.length > 0) {
        filterincomes.forEach((filter) => {
          sum1 += Number(filter.income);
        });
      }

      if (filtercollections?.length > 0) {
        filtercollections.forEach((filter) => {
          sum += Number(filter.amaunt);
        });
      }

      arr.push({ month: month, expense: sum, income: sum1 });
    });

    setArray(arr);
  }, [collections, allIncomes]);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-[16px] text-base-content">
            <th>{t("subStat.month")}</th>
            <th>{t("subStat.income")}</th>
            <th>{t("subStat.expense")}</th>
            <th>{t("subStat.distance")}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {array?.length > 0 &&
            array.map((arr) => {
              if (arr.income == 0 && arr.expense == 0) return;
              let sum = arr.income - arr.expense;
              let status = true;
              if (sum == 0 || sum < 0) {
                sum = Math.abs(sum);
                status = false;
              }
              return (
                <tr key={arr.month} className="hover:bg-blue-200/10">
                  <td className="text-[16px]">{oylar[arr.month]}</td>
                  <td className="text-[16px] text-blue-700">${arr.income}</td>
                  <td className="text-[16px] text-purple-700">
                    ${arr.expense}
                  </td>
                  <td
                    className={`text-[16px] ${
                      status ? "text-green-700" : "text-red-500"
                    } `}
                  >
                    ${sum}
                  </td>
                  <td className=" text-[16px]">
                    {status ? (
                      <div className="rounded-full inline-flex justify-center items-center gap-2    px-3 py-2 bg-green-400/20">
                        <span className="text-green-600">
                          <FaArrowTrendUp />
                        </span>
                        <span className="text-green-600 ">
                          {t("subStat.positive")}
                        </span>
                      </div>
                    ) : (
                      <div className="rounded-full inline-flex justify-center items-center gap-2    px-3 py-2 bg-red-400/20">
                        <span className="text-red-600">
                          <FaArrowTrendDown />
                        </span>
                        <span className="text-red-600 ">
                          {t("subStat.negative")}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Compare;
