import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getGroup } from "../api/group";
import PackManLoading from "./PackManLoading";
import ErrorSpaceShipScreen from "./ErrorSpaceShipScreen";
import { User } from "../types";

const Group = () => {
  const { groupId } = useParams();
  const { data, isLoading, error, isError } = useQuery(
    [`group_${groupId}`, { groupId }],
    getGroup,
    { refetchInterval: 30000 }
  );

  if (isLoading) {
    return <PackManLoading />;
  }
  if (isError) {
    return <ErrorSpaceShipScreen error={JSON.stringify(error)} />;
  }

  const group = data?.data;

  return (
    <div className="dark:text-gray-200 p-8">
      <h1 className="text-4xl">Group: {groupId}</h1>
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
      </div>
    </div>
  );
};

export default Group;
