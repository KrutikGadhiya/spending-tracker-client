export type Transaction = {
  amount?: number;
  category?: "Transport" | "Food" | "Rent" | "Personal" | "Balance" | "Other";
  paidWith?: "Cash" | "Card" | "UPI" | "Other";
  transactionType?: "Credit" | "Debit";
  type?: "Income" | "Spend" | "Transfer" | "Balance";
  description?: string;
  date?: Date;
  userId: string;
  uuid?: string;
};
