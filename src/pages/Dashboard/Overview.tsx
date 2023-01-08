import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import WhiteCard from "../../components/WhiteCard";
import ChartBar from "../../components/ChartBar";
import ChartPie from "../../components/ChartPie";
import ChartRadarBar from "../../components/ChartRadarBar";

import { useQuery } from "react-query";
import PackManLoading from "../../components/PackManLoading";
import { getOverview } from "../../api/overview";

function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e5, symbol: "L" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

const Overview = () => {
  const { token, id } = useContext(UserContext);
  const { data, isLoading, isError } = useQuery(
    ["transactions", { token, userId: id }],
    getOverview,
    {
      refetchInterval: 30000,
    }
  );

  if (isLoading) {
    return <PackManLoading />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const overview = data?.data;
  console.log(overview);

  const totalTransactions =
    Number.parseInt(overview?.transactions?.Debit?.count || 0) +
    Number.parseInt(overview?.transactions?.Credit?.count || 0);
  const totalMoneyReceived =
    Number.parseInt(overview?.transactions?.Credit?.total) || 0;
  const totalMoneySpent =
    Number.parseInt(overview?.transactions?.Debit?.total) || 0;
  const mostSpendOn = overview?.mostSpendOn[0]?.category || "-";

  const barData = {
    Other: 0,
    Rent: 0,
    Balance: 0,
    Food: 0,
    Transport: 0,
    Personal: 0,
  };
  overview?.mostSpendOn?.forEach(
    (item: { category: string; total: string; count: string }) => {
      switch (item?.category) {
        case "Other":
          barData.Other = Number.parseInt(item.total);
          break;
        case "Rent":
          barData.Rent = Number.parseInt(item.total);
          break;
        case "Balance":
          barData.Balance = Number.parseInt(item.total);
          break;
        case "Food":
          barData.Food = Number.parseInt(item.total);
          break;
        case "Transport":
          barData.Transport = Number.parseInt(item.total);
          break;
        case "Personal":
          barData.Personal = Number.parseInt(item.total);
          break;
        default:
          break;
      }
    }
  );

  return (
    <div className="grid gap-2">
      <div>
        <WhiteCard>
          <section className="bg-white dark:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
              <dl className="grid grid-cols-2 max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 md:grid-cols-4 dark:text-white">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    {nFormatter(totalTransactions, 0)}
                  </dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Total Transactions
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    ₹{nFormatter(totalMoneySpent, 2)}
                  </dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Money Spent
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    ₹{nFormatter(totalMoneyReceived, 2)}
                  </dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Money Received
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    {mostSpendOn}
                  </dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Most Spend On
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </WhiteCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <WhiteCard style={{ minHeight: "400px" }}>
          {/* <p className="text-center">Category</p> */}
          <ChartBar data={barData} />
        </WhiteCard>
        <WhiteCard style={{ minHeight: "400px" }}>
          <ChartPie
            data={{ Debit: totalMoneySpent, Credit: totalMoneyReceived }}
          />
        </WhiteCard>
        <WhiteCard style={{ minHeight: "400px" }}>
          <ChartRadarBar />
        </WhiteCard>
      </div>
    </div>
  );
};

export default Overview;
