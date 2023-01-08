import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Transport or Food or Rent or Personal or Balance or Other

const ChartBar = ({ data }: any) => {
  const barData = [
    {
      name: "Transport",
      amount: data?.Transport || 0,
    },
    {
      name: "Food",
      amount: data?.Food || 0,
    },
    {
      name: "Rent",
      amount: data?.Rent || 0,
    },
    {
      name: "Personal",
      amount: data?.Personal || 0,
    },
    {
      name: "Balance",
      amount: data?.Balance || 0,
    },
    {
      name: "Other",
      amount: data?.Other || 0,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={400}
        data={barData}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          labelStyle={{ fontSize: "0.8rem" }}
          contentStyle={{ fontSize: "0.8rem" }}
        />
        <Legend
          content={
            <p className="text-center text-gray-900 dark:text-white mt-2 font-semibold">
              Category
            </p>
          }
        />
        <Bar dataKey="amount" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartBar;
