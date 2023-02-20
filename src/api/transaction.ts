// import axios from "axios";
import { instance } from "./main";

import { Transaction } from "../types";

export const createTransaction = async (transaction: Transaction) => {
  console.log(transaction);
  // return { data: {}, status: 200 };

  const response = await instance.post(`/api/transaction`, transaction);
  return response;
};

export const updateTransaction = async (transaction: Transaction) => {
  const response = await instance.put(
    `/api/transaction/${transaction.uuid}`,
    transaction
  );
  return response;
};

export const getTransactions = async ({ queryKey }: any) => {
  const [_, params] = queryKey;
  // console.log(params);
  const { id: userId, page } = params;
  console.log(page);

  // console.log(`${BASE_URL}/api/transaction/${userId}`);

  const response = await instance.get(
    `/api/transaction/${userId}?page=${page - 1}`
  );
  // console.log(response);

  return response;
};

export const deleteTransaction = async (
  uuid: string,
  token: string,
  userId: string
) => {
  const response = await instance.delete(
    `/api/transaction/?uuid=${uuid}&userId=${userId}`
  );
  return response;
};
