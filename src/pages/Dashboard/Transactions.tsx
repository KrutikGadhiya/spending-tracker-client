import { useContext, useState } from "react";
import { Table, Badge } from "flowbite-react";
import { useQuery } from "react-query";
import { getTransactions } from "../../api/transaction";
import { UserContext } from "../../context/UserContext";

// const transactions = [
//   {
//     uuid: "1",
//     amount: 500,
//     category: "Food",
//     transactionType: "Credit",
//     type: "Spend",
//     description: "Bought a pizza",
//     date: "2021-01-01",
//   },
//   {
//     uuid: "2",
//     amount: 126,
//     category: "Transport",
//     transactionType: "Debit",
//     type: "Spend",
//     description: "BRTS to Meditab",
//     date: "2021-01-02",
//   },
//   {
//     uuid: "4",
//     amount: 126,
//     category: "Transport",
//     transactionType: "Debit",
//     type: "Spend",
//     description: "BRTS to Meditab",
//     date: "2021-01-02",
//   },
//   {
//     uuid: "3",
//     amount: 500,
//     category: "Food",
//     transactionType: "Credit",
//     type: "Spend",
//     description: "Bought a pizza",
//     date: "2021-01-01",
//   },
//   {
//     uuid: "5",
//     amount: 500,
//     category: "Food",
//     transactionType: "Credit",
//     type: "Spend",
//     description: "Bought a pizza",
//     date: "2021-01-01",
//   },
//   {
//     uuid: "6",
//     amount: 126,
//     category: "Transport",
//     transactionType: "Debit",
//     type: "Spend",
//     description: "BRTS to Meditab",
//     date: "2021-01-02",
//   },
//   {
//     uuid: "7",
//     amount: 126,
//     category: "Transport",
//     transactionType: "Debit",
//     type: "Spend",
//     description: "BRTS to Meditab",
//     date: "2021-01-02",
//   },
//   {
//     uuid: "8",
//     amount: 126,
//     category: "Transport",
//     transactionType: "Debit",
//     type: "Spend",
//     description: "BRTS to Meditab",
//     date: "2021-01-02",
//   },
//   {
//     uuid: "9",
//     amount: 500,
//     category: "Food",
//     transactionType: "Credit",
//     type: "Spend",
//     description: "Bought a pizza",
//     date: "2021-01-01",
//   },
//   {
//     uuid: "10",
//     amount: 500,
//     category: "Food",
//     transactionType: "Credit",
//     type: "Spend",
//     description: "Bought a pizza",
//     date: "2021-01-01",
//   },
// ];

const reduceCharacters = (str: string) => {
  if (str.length > 30) {
    return str.slice(0, 30) + "...";
  }
  return str;
};

const Transactions = () => {
  const { id, token } = useContext(UserContext);
  // console.log(id, token);

  const { data, isLoading, isError } = useQuery(
    ["transactions", { id, token }],
    getTransactions,
    {
      refetchInterval: 10000,
    }
  );

  const transactions = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Table className="shadow-md" hoverable={true}>
      <Table.Head className="bg-gray-100 dark:bg-gray-600">
        <Table.HeadCell className="font-extrabold py-4">Sr. No.</Table.HeadCell>
        <Table.HeadCell className="font-extrabold py-4">
          Category
        </Table.HeadCell>
        <Table.HeadCell className="font-extrabold py-4">Type</Table.HeadCell>
        <Table.HeadCell className="font-extrabold py-4">
          Description
        </Table.HeadCell>
        <Table.HeadCell className="font-extrabold py-4">Date</Table.HeadCell>
        <Table.HeadCell className="font-extrabold py-4">
          Transaction Type
        </Table.HeadCell>
        <Table.HeadCell className="font-extrabold py-4">Amount</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {transactions?.map((tnx: any, i: number) => (
          <Table.Row
            key={tnx.uuid}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>{tnx.category}</Table.Cell>
            <Table.Cell>{tnx.type}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {reduceCharacters(tnx.description)}
            </Table.Cell>
            <Table.Cell>{tnx.date}</Table.Cell>
            <Table.Cell>
              {tnx.transactionType === "Credit" ? (
                <Badge className="max-w-max" color="success">
                  Credit
                </Badge>
              ) : (
                <Badge className="max-w-max" color="failure">
                  Debit
                </Badge>
              )}
            </Table.Cell>
            <Table.Cell className="text-gray-900 dark:text-white">
              ₹{tnx.amount}
            </Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Transactions;
