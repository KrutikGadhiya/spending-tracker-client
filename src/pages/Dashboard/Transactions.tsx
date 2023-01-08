import { useContext, useState } from "react";
import { Table, Badge, Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { UserContext } from "../../context/UserContext";
import { LoaderContext } from "../../context/LoaderContext";

import {
  updateTransaction,
  deleteTransaction,
  getTransactions,
} from "../../api/transaction";
import TransactionModel from "../../components/TranactionModal";
import PackManLoading from "../../components/PackManLoading";
import { Transaction } from "../../types";

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
  const { setIsLoading } = useContext(LoaderContext);
  const [show, setShow] = useState(false);
  const [delModel, setDelModel] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [transaction, setTransaction] = useState<Transaction>({
    amount: 0,
    category: "Personal",
    paidWith: "UPI",
    transactionType: "Debit",
    type: "Spend",
    description: "description...",
    date: "",
    userId: id,
  });

  const toggleTransactionModal = (tnx: Transaction) => {
    setShow(!show);
    setTransaction(tnx);
  };

  const toggleDeleteTransactionModal = (tnx: string) => {
    setDelModel(!delModel);
    setTransactionId(tnx);
  };

  const onDelete = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await deleteTransaction(
        transactionId,
        token,
        id
      );
      if (status == 200) {
        toast("Transaction deleted successfully", {
          type: "success",
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    } catch (error: any) {
      toast(error?.response?.message || "Some error occurred", {
        type: "error",
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
    setIsLoading(false);
    setDelModel(false);
  };

  const onClose = () => {
    setShow(false);
  };

  const { data, isLoading, isError } = useQuery(
    ["transactions", { id, token }],
    getTransactions,
    {
      refetchInterval: 30000,
    }
  );

  const transactions = data?.data;

  if (isLoading) {
    return <PackManLoading />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Table className="shadow-md" hoverable={true}>
      <Table.Head className="bg-gray-200 dark:bg-gray-600">
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
            <Table.Cell>
              {new Date(tnx.date).toDateString().slice(4)}
            </Table.Cell>
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
              <Button
                size="xs"
                className="editBtn"
                color="light"
                onClick={() => toggleTransactionModal(tnx)}
              >
                Edit
              </Button>
              <Button
                size="xs"
                className="editBtn"
                color="failure"
                onClick={() => toggleDeleteTransactionModal(tnx.uuid)}
              >
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Modal
        show={delModel}
        size="md"
        popup={true}
        onClose={() => setDelModel(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <svg
              className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 fill-red-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z" />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this transaction?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={onDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setDelModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <TransactionModel
        id={id}
        show={show}
        onClose={onClose}
        token={token}
        submit={updateTransaction}
        title="Edit Transaction"
        selectedTnx={transaction}
      />
    </Table>
  );
};

export default Transactions;
