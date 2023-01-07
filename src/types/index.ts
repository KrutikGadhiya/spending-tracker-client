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
