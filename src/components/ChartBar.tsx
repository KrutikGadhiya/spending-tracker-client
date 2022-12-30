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

const data = [
  {
    name: "Transport",
    amount: 4000,
  },
  {
    name: "Food",
    amount: 3000,
  },
  {
    name: "Rent",
    amount: 2000,
  },
  {
    name: "Personal",
    amount: 2780,
  },
  {
    name: "Balance",
    amount: 1890,
  },
  {
    name: "Other",
    amount: 2390,
  },
];

// Transport or Food or Rent or Personal or Balance or Other

const ChartBar = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={400}
        data={data}
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
