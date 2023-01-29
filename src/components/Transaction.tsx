import { Badge } from "flowbite-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Transaction } from "../types";

const icon = (isDebit: boolean) => {
  if (isDebit)
    return (
      // <svg
      //   className="w-full h-full flex items-center gap-1 font-semibold  fill-red-800  dark:fill-red-600 group-hover:bg-red-200 dark:group-hover:bg-red-300 rounded px-2 py-0.5 p-1 text-xs max-w-max"
      //   xmlns="http://www.w3.org/2000/svg"
      //   viewBox="0 0 512 512"
      // >
      //   <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
      // </svg>
      <div
        aria-label="circle"
        className="w-full h-full min-w-[1rem] min-h-[1rem] block bg-red-800 dark:bg-red-600 rounded-full scale-125"
      />
    );

  return (
    // <svg
    //   className="w-full h-full flex items-center gap-1 font-semibold  fill-green-800  dark:fill-green-600 group-hover:bg-green-200 dark:group-hover:bg-green-300 rounded px-2 py-0.5 p-1 text-xs max-w-max"
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 512 512"
    // >
    //   <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
    // </svg>
    <div
      aria-label="circle"
      className="w-full h-full min-w-[1rem] min-h-[1rem] block bg-green-800 dark:bg-green-600 rounded-full scale-125"
    />
  );
};

const TransactionMessage = ({ transaction }: { transaction: Transaction }) => {
  const { id } = useContext(UserContext);
  return (
    <div
      className={`flex gap-2 ${
        id == transaction.User?.uuid ? "flex-row-reverse  " : ""
      } items-start`}
    >
      {id !== transaction.User?.uuid && (
        <img
          src={`https://avatars.dicebear.com/api/initials/${transaction.User?.name}.svg`}
          alt={transaction.User?.name}
          width={30}
          height={30}
          className="rounded-full"
        />
      )}
      <div
        className={`bg-white dark:bg-gray-800 ${
          id == transaction.User?.uuid ? "ml-auto" : ""
        } px-4 py-2 rounded-md w-full sm:max-w-[60%] flex gap-2 relative z-0 overflow-hidden`}
      >
        {/* // <div className="bg-white px-4 py-2 rounded-md max-w-fit flex gap-2"> */}
        <div className="flex items-center gap-2 mr-16">
          <p className="text-2xl dark:text-gray-100">
            ₹<span className="font-semibold">{transaction.amount}</span>
          </p>
          {/* <div className="w-16 absolute top-0 left-[-2rem] z-[-1]"> */}
          {/* <div className="w-16 absolute top-[-1.5rem] left-[-2rem] z-[-1]"> */}
          <div className="w-[55%] max-w-[9rem] h-full absolute top-[50%] translate-y-[-50%] left-[-2.5rem] z-[-1] opacity-20">
            {/* <div className="w-12"> */}
            {icon((transaction.transactionType || "Debit") === "Debit")}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold dark:text-gray-100">
            {transaction.description}
          </p>
          <div className="flex gap-1">
            <Badge title={`Category: ${transaction.category}`}>
              {transaction.category}
            </Badge>
            <Badge title={`Paid with: ${transaction.paidWith}`}>
              {transaction.paidWith}
            </Badge>
            <Badge title={`Type: ${transaction.type}`}>
              {transaction.type}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {transaction.date &&
              new Date(transaction.date).toDateString() +
                " " +
                new Date(transaction.date).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionMessage;
