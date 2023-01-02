import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export type Transaction = {
  amount: number;
  category: "Transport" | "Food" | "Rent" | "Personal" | "Balance" | "Other";
  paidWith: "Cash" | "Card" | "UPI" | "Other";
  transactionType: "Credit" | "Debit";
  type: "Income" | "Spend" | "Transfer" | "Balance";
  description: string;
  date: Date;
  userId: string;
};

export const createTransaction = async (
  transaction: Transaction,
  token: string
) => {
  const response = await axios.post(
    `${BASE_URL}/api/transaction`,
    transaction,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getTransactions = async ({ queryKey }: any) => {
  const [_, params] = queryKey;
  // console.log(params);
  const { id: userId, token } = params;
  console.log(`${BASE_URL}/api/transaction/${userId}`);

  const response = await axios.get(`${BASE_URL}/api/transaction/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

  return response;
};
