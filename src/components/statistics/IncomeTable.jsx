import React from "react";
import { useTranslation } from "react-i18next";
function IncomeTable({ allIncomes }) {
  const { t } = useTranslation();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-[16px] text-base-content">
            <th>{t("subStat.description")}</th>
            <th>{t("subStat.quantity")}</th>
            <th>{t("subStat.source")}</th>
            <th>{t("subStat.time")}</th>
            <th>{t("subStat.date")}</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {allIncomes?.map((income) => {
            const date = income.timeStamp.toDate();
            const hour = date.getHours();
            const min = date.getMinutes();
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            const time = `${hour < 10 ? "0" + hour : hour}:${
              min < 10 ? "0" + min : min
            } `;

            const sana = `${day < 10 ? "0" + day : day}.${
              month < 10 ? "0" + (month + 1) : month + 1
            }.${year}`;

            console.log(day);
            return (
              <tr key={income.id} className="hover:bg-blue-200/10">
                <td className="text-[16px]">{income.incomeNote}</td>
                <td className="text-[16px] text-blue-700">${income.income}</td>
                <td className="text-[16px] text-purple-700">
                  {income.incomeType}
                </td>
                <td className="text-[16px] text-green-700 ">{time}</td>
                <td className=" text-[16px]">{sana}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default IncomeTable;
