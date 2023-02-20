export type Transaction = {
  id?: number;
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
  UserId?: number;
  userId?: string;
  uuid?: string;
  GroupId?: number | null | undefined;
  createdAt?: string;
  updatedAt?: string;
  User?: User;
  groupId?: string;
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
  id?: number;
  uuid?: string;
  name: string;
  description: string;
  UserId?: number;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  users: User[] | string[];
  User?: User;
};

export type GroupModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  userId: string;
};
