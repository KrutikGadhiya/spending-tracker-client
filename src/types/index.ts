export type Transaction = {
  amount?: number;
  category?:
    | "Transport"
    | "Food"
    | "Rent"
    | "Personal"
    | "Balance"
    | "Other"
    | "select";
  paidWith?: "Cash" | "Card" | "UPI" | "Other" | "select";
  transactionType?: "Credit" | "Debit" | "select";
  type?: "Income" | "Spend" | "Transfer" | "Balance" | "select";
  description?: string;
  date?: Date | string;
  userId: string;
  uuid?: string;
};

export type User = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type Group = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  UserId: number;
  createdAt: string;
  updatedAt: string;
  users: User[];
  User: User;
};
