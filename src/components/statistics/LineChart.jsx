import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

//windowsize
import useWindowSize from "../../hooks/useWindowSize";

export default function LineChart1({ collectionData }) {
  const { width } = useWindowSize();
  const months = [
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
  const oylar = [];

  const now = new Date();
  now.setDate(1); // oy boshidan boshlaymiz (MUHIM)

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);

    oylar.push({
      year: d.getFullYear(),
      month: d.getMonth(), // 0-11
      key: `${d.getFullYear()}-${d.getMonth() + 1}`, // qulay kalit
    });
  }
  const obj = {};
  oylar.forEach((oy) => {
    const filter = collectionData.filter(
      (collection) => collection.month == oy.month && collection.year == oy.year
    );

    if (!filter || filter?.length == 0) {
      obj[oy.month] = 0;
    } else {
      let sum = 0;
      filter.forEach((fil) => {
        sum += Number(fil.amaunt);
      });

      obj[oy.month] = sum;
    }
  });

  const data = [
    { month: months[oylar[0]?.month], income: obj[oylar[0]?.month] },
    { month: months[oylar[1]?.month], income: obj[oylar[1]?.month] },
    { month: months[oylar[2]?.month], income: obj[oylar[2]?.month] },
    { month: months[oylar[3]?.month], income: obj[oylar[3]?.month] },
    { month: months[oylar[4]?.month], income: obj[oylar[4]?.month] },
    { month: months[oylar[5]?.month], income: obj[oylar[5]?.month] },
  ];
  return (
    <div className="w-full h-[200px] bg-base-100 rounded-xl ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -10 }}>
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />

          {/* X o‘qi */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: width < 600 ? 10 : width < 800 ? 12 : 15 }}
          />

          {/* Y o‘qi */}
          <YAxis
            tick={{ fontSize: width < 600 ? 10 : width < 800 ? 12 : 15 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />

          {/* Tooltip */}
          <Tooltip formatter={(value) => `${value.toLocaleString()} so'm`} />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
