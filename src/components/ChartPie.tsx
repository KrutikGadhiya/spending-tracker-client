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
          strokeWidth={2}
          fill="#2563eb"
          label
        >
          <Cell key={"cell-debit"} fill="#2563eb" />
          <Cell key={"cell-credit"} fill="#facc15" />
        </Pie>
        <Legend
          content={
            <p className="text-center mt-2 font-semibold">Transaction Type</p>
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartLine;
