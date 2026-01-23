import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
//translation
import { useTranslation } from "react-i18next";

const PieChart1 = ({ collections }) => {
  const { t } = useTranslation();
  const obj = {};

  collections.forEach((data) => {
    if (Object.hasOwn(obj, data.category)) {
      obj[data.category] += Number(data.amaunt);
    } else {
      obj[data.category] = Number(data.amaunt);
    }
  });

  // Namuna xarajatlar
  const data = [
    { name: "Food", value: obj?.Food ? obj.Food : 0 },
    { name: "Transport", value: obj?.Transport ? obj.Transport : 0 },
    { name: "Shopping", value: obj?.Shopping ? obj.Shopping : 0 },
    {
      name: "Entertainment",
      value: obj?.Entertainment ? obj.Entertainment : 0,
    },
    { name: "Housing", value: obj?.Housing ? obj.Housing : 0 },
    { name: "Health", value: obj?.Health ? obj.Health : 0 },
    { name: "Other", value: obj?.Other ? obj.Other : 0 },
  ];

  // const data = [
  //   { name: "Food", value: 1000 },
  //   { name: "Transport", value: 2000 },
  //   { name: "Entertainment", value: 1000 },
  //   { name: "Housing", value: 1500 },
  //   { name: "Shopping", value: 100 },
  //   { name: "Health", value: 1000 },
  //   { name: "Other", value: 1000 },
  // ];

  // Ranglar
  const COLORS = [
    "#4FD1C5",
    "#63B3ED",
    "#B13BFF",
    "#FC8181",
    "#F42362",
    "#75B06F",
    "#AEDEFC",
  ];

  return (
    <div className="w-full">
      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => ` (${(percent * 100).toFixed(0)}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            {/* <Legend verticalAlign="bottom" /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* =================== 1 ============================= */}
      <div className="flex flex-col gap-3">
        <div className="p-3 bg-blue-300/10 rounded-xl flex justify-between items-center text-base-content">
          <div className="flex gap-2 items-center">
            <span className="w-4 h-4 rounded-full bg-[#4FD1C5] inline-block"></span>
            <span>{t("subStat.food")}</span>
          </div>
          <p>${obj?.Food || "0.0"}</p>
        </div>
        {/* =================== 2 ============================= */}
        <div className="p-3 bg-blue-300/10 rounded-xl flex justify-between items-center text-base-content">
          <div className="flex gap-2 items-center">
            <span className="w-4 h-4 rounded-full bg-[#63B3ED] inline-block"></span>
            <span>Transport</span>
          </div>
          <p>${obj?.Transport || "0.0"}</p>
        </div>
        {/* =================== 3 ============================= */}
        <div className="p-3 bg-blue-300/10 rounded-xl flex justify-between items-center text-base-content">
          <div className="flex gap-2 items-center">
            <span className="w-4 h-4 rounded-full bg-[#B13BFF] inline-block"></span>
            <span>{t("subStat.entertainment")}</span>
          </div>
          <p>${obj?.Entertainment || "0.0"}</p>
        </div>
        {/* =================== 4 ============================= */}
        <div className="p-3 bg-blue-300/10 rounded-xl flex justify-between items-center text-base-content">
          <div className="flex gap-2 items-center">
            <span className="w-4 h-4 rounded-full bg-[#FC8181] inline-block"></span>
            <span>{t("subStat.housing")}</span>
          </div>
          <p>${obj?.Housing || "0.0"}</p>
        </div>
        {/* =================== 5 ============================= */}
        <div className="p-3 bg-blue-300/10 rounded-xl flex justify-between items-center text-base-content">
          <div className="flex gap-2 items-center">
            <span className="w-4 h-4 rounded-full bg-[#F42362] inline-block"></span>
            <span>Shopping</span>
          </div>
          <p>${obj?.Shopping || "0.0"}</p>
        </div>
        {/* =================== 6 ============================= */}
        <div className="p-3 bg-blue-300/10 rounded-xl flex justify-between items-center text-base-content">
          <div className="flex gap-2 items-center">
            <span className="w-4 h-4 rounded-full bg-[#75B06F] inline-block"></span>
            <span>{t("subStat.health")}</span>
          </div>
          <p>${obj?.Health || "0.0"}</p>
        </div>
        {/* =================== 7 ============================= */}
        <div className="p-3 bg-blue-300/10 rounded-xl flex justify-between items-center text-base-content">
          <div className="flex gap-2 items-center">
            <span className="w-4 h-4 rounded-full bg-[#AEDEFC] inline-block"></span>
            <span>{t("subStat.other")}</span>
          </div>
          <p>${obj?.Other || "0.0"}</p>
        </div>
      </div>
    </div>
  );
};

export default PieChart1;
