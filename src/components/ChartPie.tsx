import {
  Pie,
  PieChart,
  CartesianGrid,
  Legend,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartLine = () => {
  const data = [
    { name: "Credit", amount: 4000 },
    { name: "Debit", amount: 3000 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={500} height={400}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Pie
          data={data}
          type="monotone"
          dataKey="amount"
          // strokeWidth={2}
          fill="#2563eb"
          label
          outerRadius={120}
        >
          <Cell key={"cell-debit"} fill="#32B14A" />
          <Cell key={"cell-credit"} fill="#F1592A" />
        </Pie>
        <Legend
          content={
            <p className="text-center text-gray-900 dark:text-white mt-2 font-semibold">
              Transaction Type
            </p>
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartLine;
