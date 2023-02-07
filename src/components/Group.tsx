import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getGroup, getGroupTransactions } from "../api/group";
import PackManLoading from "./PackManLoading";
import ErrorSpaceShipScreen from "./ErrorSpaceShipScreen";
import TransactionMessage from "../components/Transaction";
import { Transaction, User } from "../types";
import styles from "../css/Group.module.css";

const groupTransactions: Transaction[] = [
  {
    id: 50,
    uuid: "87d9a24f-310e-4256-951e-ad35181b2439",
    amount: 56,
    category: "Food",
    paidWith: "UPI",
    transactionType: "Debit",
    type: "Spend",
    description: "Bread Butter, Brunch",
    date: "2023-01-22T00:00:00.000Z",
    UserId: 1,
    GroupId: null,
    createdAt: "2023-01-22T13:07:55.358Z",
    updatedAt: "2023-01-22T13:07:55.358Z",
    User: {
      id: 1,
      uuid: "6b63ca26-a0a4-44a7-bbaa-8f8a2ba2be7d",
      name: "Darshan Tarsariya",
      email: "darshantarsariya@gmail.com",
      role: "user",
      createdAt: "2022-12-18T10:19:12.597Z",
      updatedAt: "2022-12-18T10:19:12.597Z",
    },
  },
  {
    id: 50,
    uuid: "87d9a24f-310e-4256-951e-ad35181b2439",
    amount: 56,
    category: "Food",
    paidWith: "UPI",
    transactionType: "Credit",
    type: "Spend",
    description: "Bread Butter, Brunch",
    date: "2023-01-22T00:00:00.000Z",
    UserId: 1,
    GroupId: null,
    createdAt: "2023-01-22T13:07:55.358Z",
    updatedAt: "2023-01-22T13:07:55.358Z",
    User: {
      id: 3,
      uuid: "dc51828b-665c-4dc5-90c9-dc72ce0e94db",
      name: "Krutik Gadhiya",
      email: "krutikgadhiya@gmail.com",
      role: "user",
      createdAt: "2022-12-18T10:19:35.821Z",
      updatedAt: "2022-12-18T10:19:35.821Z",
    },
  },
  {
    id: 50,
    uuid: "87d9a24f-310e-4256-951e-ad35181b2439",
    amount: 56,
    category: "Food",
    paidWith: "UPI",
    transactionType: "Debit",
    type: "Spend",
    description: "Bread Butter, Brunch",
    date: "2023-01-22T00:00:00.000Z",
    UserId: 1,
    GroupId: null,
    createdAt: "2023-01-22T13:07:55.358Z",
    updatedAt: "2023-01-22T13:07:55.358Z",
    User: {
      id: 3,
      uuid: "dc51828b-665c-4dc5-90c9-dc72ce0e94db",
      name: "Krutik Gadhiya",
      email: "krutikgadhiya@gmail.com",
      role: "user",
      createdAt: "2022-12-18T10:19:35.821Z",
      updatedAt: "2022-12-18T10:19:35.821Z",
    },
  },
  {
    id: 50,
    uuid: "87d9a24f-310e-4256-951e-ad35181b2439",
    amount: 56,
    category: "Food",
    paidWith: "UPI",
    transactionType: "Credit",
    type: "Spend",
    description: "Bread Butter, Brunch",
    date: "2023-01-22T00:00:00.000Z",
    UserId: 1,
    GroupId: null,
    createdAt: "2023-01-22T13:07:55.358Z",
    updatedAt: "2023-01-22T13:07:55.358Z",
    User: {
      id: 1,
      uuid: "6b63ca26-a0a4-44a7-bbaa-8f8a2ba2be7d",
      name: "Darshan Tarsariya",
      email: "darshantarsariya@gmail.com",
      role: "user",
      createdAt: "2022-12-18T10:19:12.597Z",
      updatedAt: "2022-12-18T10:19:12.597Z",
    },
  },
  {
    id: 50,
    uuid: "87d9a24f-310e-4256-951e-ad35181b2439",
    amount: 56,
    category: "Food",
    paidWith: "UPI",
    transactionType: "Debit",
    type: "Spend",
    description: "Bread Butter, Brunch",
    date: "2023-01-22T00:00:00.000Z",
    UserId: 1,
    GroupId: null,
    createdAt: "2023-01-22T13:07:55.358Z",
    updatedAt: "2023-01-22T13:07:55.358Z",
    User: {
      id: 3,
      uuid: "dc51828b-665c-4dc5-90c9-dc72ce0e94db",
      name: "Krutik Gadhiya",
      email: "krutikgadhiya@gmail.com",
      role: "user",
      createdAt: "2022-12-18T10:19:35.821Z",
      updatedAt: "2022-12-18T10:19:35.821Z",
    },
  },
  {
    id: 50,
    uuid: "87d9a24f-310e-4256-951e-ad35181b2439",
    amount: 56,
    category: "Food",
    paidWith: "UPI",
    transactionType: "Credit",
    type: "Spend",
    description: "Bread Butter, Brunch",
    date: "2023-01-22T00:00:00.000Z",
    UserId: 1,
    GroupId: null,
    createdAt: "2023-01-22T13:07:55.358Z",
    updatedAt: "2023-01-22T13:07:55.358Z",
    User: {
      id: 1,
      uuid: "6b63ca26-a0a4-44a7-bbaa-8f8a2ba2be7d",
      name: "Darshan Tarsariya",
      email: "darshantarsariya@gmail.com",
      role: "user",
      createdAt: "2022-12-18T10:19:12.597Z",
      updatedAt: "2022-12-18T10:19:12.597Z",
    },
  },
];

const Group = () => {
  const { groupId } = useParams();
  const { data, isLoading, error, isError } = useQuery(
    [`group_${groupId}`, { groupId }],
    getGroup,
    { refetchInterval: 30000 }
  );

  const {
    data: transactions,
    isLoading: tnxIsLoading,
    error: tnxError,
    isError: tnxIsError,
  } = useQuery(
    [`group_transactions_${groupId}`, { groupId }],
    getGroupTransactions,
    {
      refetchInterval: 30000,
    }
  );

  if (isLoading) {
    return <PackManLoading />;
  }
  if (isError) {
    return <ErrorSpaceShipScreen error={JSON.stringify(error)} />;
  }

  const group = data?.data;
  const groupTransactions = transactions?.data;

  return (
    <div>
      <h1
        className="text-2xl dark:text-gray-200 flex items-center p-2 bg-white dark:bg-gray-800 sticky top-[68px] z-[1]"
        title={groupId}
      >
        <img
          src={`https://api.dicebear.com/5.x/icons/svg?seed=${group.name}`}
          width={30}
          height={30}
          className="rounded-full my-1 mr-4"
        />{" "}
        {group?.name}
      </h1>
      <div className="mt-2">
        {tnxIsLoading ? (
          <PackManLoading />
        ) : tnxIsError ? (
          <ErrorSpaceShipScreen error={JSON.stringify(tnxError)} />
        ) : (
          <div className="flex flex-col gap-2">
            {groupTransactions.map((tnx: Transaction) => (
              <TransactionMessage transaction={tnx} />
            ))}
          </div>
        )}
      </div>
      {/* <h1 className="text-4xl">Group: {groupId}</h1>
      <br />
      <p className="text-2xl">Owner: {group?.User.name}</p>
      <p className="text-2xl">Name: {group?.name}</p>
      <p className="text-2xl">Description: {group?.description}</p>
      <p className="text-2xl">
        Description: {new Date(group?.createdAt).toUTCString()}
      </p>
      <br />
      <p className="text-2xl">Members: {group?.users.length}</p>
      <div>
        {group?.users.map((user: User, index: number) => {
          return (
            <div key={user.uuid}>
              <p className="text-2xl">
                Name-{index + 1}: {user.name}
              </p>
              <p className="text-2xl">
                Email-{index + 1}: {user.email}
              </p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Group;
