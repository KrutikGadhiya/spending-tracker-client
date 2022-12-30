import React from "react";
import WhiteCard from "../../components/WhiteCard";
import ChartBar from "../../components/ChartBar";
import ChartPie from "../../components/ChartPie";
import ChartRadarBar from "../../components/ChartRadarBar";

const Overview = () => {
  return (
    <div className="grid gap-2">
      <div>
        <WhiteCard>
          <section className="bg-white dark:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
              <dl className="grid grid-cols-2 max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 md:grid-cols-4 dark:text-white">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    73M+
                  </dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Total Transactions
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    1B+
                  </dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Money Spent
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    4M+
                  </dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Money Received
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    Food
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
          <ChartBar />
        </WhiteCard>
        <WhiteCard style={{ minHeight: "400px" }}>
          <ChartPie />
        </WhiteCard>
        <WhiteCard style={{ minHeight: "400px" }}>
          <ChartRadarBar />
        </WhiteCard>
      </div>
    </div>
  );
};

export default Overview;
