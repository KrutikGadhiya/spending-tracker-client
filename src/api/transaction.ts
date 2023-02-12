// import axios from "axios";
import { instance } from "./main";

import { Transaction } from "../types";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const createTransaction = async (
  transaction: Transaction,
  token: string
) => {
  const response = await instance.post(
    `${BASE_URL}/api/transaction`,
    transaction
  );
  return response;
};

export const updateTransaction = async (
  transaction: Transaction,
  token: string
) => {
  const response = await instance.put(
    `${BASE_URL}/api/transaction/${transaction.uuid}`,
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
    `${BASE_URL}/api/transaction/${userId}?page=${page - 1}`
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
    `${BASE_URL}/api/transaction/?uuid=${uuid}&userId=${userId}`
  );
  return response;
};
