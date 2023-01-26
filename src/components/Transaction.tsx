import { Badge } from "flowbite-react";
import React from "react";
import { Transaction } from "../types";

const icon = (isDebit: boolean) => {
  if (isDebit)
    return (
      <svg
        className="w-full h-full flex items-center gap-1 font-semibold  fill-red-800  dark:fill-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300 rounded px-2 py-0.5 p-1 text-xs max-w-max"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
      </svg>
    );

  return (
    <svg
      className="w-full h-full flex items-center gap-1 font-semibold  fill-green-800  dark:fill-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-300 rounded px-2 py-0.5 p-1 text-xs max-w-max"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
    </svg>
  );
};

const TransactionMessage = ({ transaction }: { transaction: Transaction }) => {
  return (
    <div className="bg-white px-4 py-2 rounded-md max-w-fit flex gap-2 relative z-0 overflow-hidden">
      {/* // <div className="bg-white px-4 py-2 rounded-md max-w-fit flex gap-2"> */}
      <div className="flex items-center gap-2 mr-4">
        <p className="text-2xl">
          ₹<span className="font-semibold">{transaction.amount}</span>
        </p>
        {/* <div className="w-16 absolute top-0 left-[-2rem] z-[-1]"> */}
        {/* <div className="w-16 absolute top-[-1.5rem] left-[-2rem] z-[-1]"> */}
        <div className="w-[55%] absolute top-[50%] translate-y-[-50%] left-[-2rem] z-[-1] opacity-20">
          {/* <div className="w-12"> */}
          {icon((transaction.transactionType || "Debit") === "Debit")}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">{transaction.description}</p>
        <div className="flex gap-1">
          <Badge title={`Category: ${transaction.category}`}>
            {transaction.category}
          </Badge>
          <Badge title={`Paid with: ${transaction.paidWith}`}>
            {transaction.paidWith}
          </Badge>
          <Badge title={`Type: ${transaction.type}`}>{transaction.type}</Badge>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {transaction.date &&
            new Date(transaction.date).toDateString() +
              " " +
              new Date(transaction.date).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default TransactionMessage;
