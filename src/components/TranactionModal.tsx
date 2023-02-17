import { useContext, useState, useEffect } from "react";
import { Modal, Label, Select, TextInput } from "flowbite-react";
import { toast } from "react-toastify";

import { LoaderContext } from "../context/LoaderContext";
import { Transaction } from "../types";
import { createTransaction, updateTransaction } from "../api/transaction";
import { useParams } from "react-router-dom";

type TransactionModelProps = {
  show: boolean;
  id: string;
  onClose: () => void;
  submit: typeof createTransaction | typeof updateTransaction;
  token: string;
  transactionId?: string;
  title: string;
  selectedTnx?: any;
};

const TransactionModel = ({
  onClose,
  show,
  id,
  submit,
  token,
  selectedTnx,
  title,
}: TransactionModelProps) => {
  const { setIsLoading } = useContext(LoaderContext);
  const [transaction, setTransaction] = useState<Transaction>(selectedTnx);
  const { groupId } = useParams();

  useEffect(() => {
    setTransaction(selectedTnx);
  }, [selectedTnx]);

  useEffect(() => {
    setTransaction({
      ...transaction,
      date: new Date().toISOString().slice(0, 10),
    });
  }, []);

  // console.log(selectedTnx);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value, userId: id });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      transaction?.transactionType === "select" ||
      transaction?.category === "select" ||
      transaction?.type === "select" ||
      transaction?.paidWith === "select"
    ) {
      toast("Please select all the fields", {
        type: "error",
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
      return;
    }
    setIsLoading(true);
    // setTransaction({ ...transaction, userId: id });
    // console.log({ ...transaction, uuid: selectedTnx?.uuid });
    // setIsLoading(false);
    // return;
    const { data, status } = await submit(
      { ...transaction, uuid: selectedTnx?.uuid, groupId },
      token
    );
    if (status !== 200) {
      toast(data.message, {
        type: "error",
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    } else {
      toast("Transaction added successfully", {
        type: "success",
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });

      setTransaction({
        amount: 0,
        category: "select",
        paidWith: "select",
        transactionType: "select",
        type: "select",
        description: "",
        date: new Date(),
        userId: id,
      });

      onClose();
    }
    setIsLoading(false);
  };

  return (
    <Modal
      show={show}
      size="4xl"
      position="center"
      // popup={true}
      onClose={onClose}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="TransactionType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Transaction Type
                </Label>
                <Select
                  id="TransactionType"
                  name="transactionType"
                  onChange={handleChange}
                  required
                  value={transaction?.transactionType}
                  defaultValue="select"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="select">Select Transaction Type</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="Type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </Label>
                <Select
                  id="Type"
                  name="type"
                  onChange={handleChange}
                  value={transaction?.type}
                  required
                  defaultValue="select"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="select">Select Type</option>
                  <option value="Income">Income</option>
                  <option value="Spend">Spend</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Balance">Balance</option>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="paidWith"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Paid With
                </Label>
                <Select
                  name="paidWith"
                  id="paidWith"
                  onChange={handleChange}
                  value={transaction?.paidWith}
                  defaultValue="select"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="select">Select PaidWith</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </Label>
                <Select
                  id="category"
                  name="category"
                  onChange={handleChange}
                  value={transaction?.category}
                  placeholder="Select category"
                  required
                  defaultValue="select"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="select">Select Category</option>
                  <option value="Transport">Transport</option>
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Personal">Personal</option>
                  <option value="Balance">Balance</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </Label>
                <TextInput
                  type="number"
                  name="amount"
                  id="amount"
                  value={transaction?.amount}
                  onChange={handleChange}
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="₹500"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </Label>
                <TextInput
                  type="date"
                  name="date"
                  id="date"
                  onChange={handleChange}
                  value={new Date(transaction?.date || Date())
                    .toISOString()
                    .slice(0, 10)}
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  // placeholder="₹500"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </Label>
                <textarea
                  id="description"
                  rows={4}
                  name="description"
                  onChange={handleChange}
                  value={transaction?.description}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModel;
