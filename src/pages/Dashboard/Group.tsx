import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Button, Card } from "flowbite-react";
import { AiOutlinePlus } from "react-icons/ai";
import GroupModel from "../../components/GroupModel";
import { UserContext } from "../../context/UserContext";

import { Group } from "../../types";
import { getUserGroups } from "../../api/group";
import PackManLoading from "../../components/PackManLoading";
import ErrorSpaceShipScreen from "../../components/ErrorSpaceShipScreen";
import { Link } from "react-router-dom";

// const groupList: Group[] = [
//   {
//     id: 1,
//     uuid: "cce7d4b1-f68a-4049-a809-ae4e702face3",
//     name: "Vasooli",
//     description: "Paisa vasooli",
//     UserId: 2,
//     users: [
//       {
//         id: 1,
//         uuid: "6b63ca26-a0a4-44a7-bbaa-8f8a2ba2be7d",
//         name: "Darshan Tarsariya",
//         email: "darshantarsariya@gmail.com",
//         role: "user",
//         createdAt: "2022-12-18T10:19:12.597Z",
//         updatedAt: "2022-12-18T10:19:12.597Z",
//       },
//       {
//         id: 2,
//         uuid: "82b01bb8-a8eb-40fd-8b8f-6123de82d88f",
//         name: "Deep Kavar",
//         email: "deepkavar@gmail.com",
//         role: "user",
//         createdAt: "2022-12-18T10:19:25.503Z",
//         updatedAt: "2022-12-18T10:19:25.503Z",
//       },
//     ],
//     createdAt: "2022-12-18T16:01:45.722Z",
//     updatedAt: "2022-12-18T16:01:45.722Z",
//     User: {
//       id: 2,
//       uuid: "82b01bb8-a8eb-40fd-8b8f-6123de82d88f",
//       name: "Deep Kavar",
//       email: "deepkavar@gmail.com",
//       role: "user",
//       createdAt: "2022-12-18T10:19:25.503Z",
//       updatedAt: "2022-12-18T10:19:25.503Z",
//     },
//   },
//   {
//     id: 2,
//     uuid: "fcaa00ff-6d19-4efb-9abf-f78c011ef9d2",
//     name: "Crew",
//     description: "Geeral Group for Crew",
//     UserId: 1,
//     users: [
//       {
//         id: 3,
//         uuid: "360f3c1c-4736-4280-8aab-d699c5712ab9",
//         name: "Krutik Gadhiya",
//         email: "krutikgadhiya@gmail.com",
//         role: "user",
//         createdAt: "2022-12-18T10:19:35.821Z",
//         updatedAt: "2022-12-18T10:19:35.821Z",
//       },
//     ],
//     createdAt: "2023-01-08T06:14:17.823Z",
//     updatedAt: "2023-01-08T06:14:17.823Z",
//     User: {
//       id: 1,
//       uuid: "6b63ca26-a0a4-44a7-bbaa-8f8a2ba2be7d",
//       name: "Darshan Tarsariya",
//       email: "darshantarsariya@gmail.com",
//       role: "user",
//       createdAt: "2022-12-18T10:19:12.597Z",
//       updatedAt: "2022-12-18T10:19:12.597Z",
//     },
//   },
// ];

const Groups = () => {
  const [show, setShow] = useState(false);
  const { id } = useContext(UserContext);
  const { data, isLoading, error, isError } = useQuery(
    ["groups", { userId: id }],
    getUserGroups,
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

  const groupList: Group[] = data?.data;

  return (
    <section className="p-2">
      <div className="flex my-4">
        <h1 className="text-4xl font-bold dark:text-gray-100 flex-1">Groups</h1>
        <Button onClick={() => setShow(true)} pill size="sm">
          <AiOutlinePlus className="mr-2" /> New Group
        </Button>
      </div>
      <div>
        {groupList.map((group) => {
          return (
            <Link key={group.uuid} to={`${group.uuid}`}>
              <Card
                key={group.uuid}
                className="mb-4 cursor-pointer transition hover:shadow-lg dark:hover:shadow-gray-600 "
              >
                <div className="flex">
                  <img
                    src={`https://api.dicebear.com/5.x/icons/svg?seed=${group.name}`}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <h1 className="text-xl font-bold dark:text-gray-100">
                      {group.name}
                    </h1>
                    <p className="text-gray-700 dark:text-gray-400">
                      {group.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-400">
                      Members: {group.users.length + 1}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      <GroupModel
        show={show}
        onClose={() => setShow(false)}
        title="Create Group"
        userId={id}
      />
    </section>
  );
};

export default Groups;
