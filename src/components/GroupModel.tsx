import { useState, useContext } from "react";
import { Modal, Label, TextInput } from "flowbite-react";
import Select from "react-select";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { LoaderContext } from "../context/LoaderContext";
import { Group, GroupModalProps, User } from "../types";
import { createGroup } from "../api/group";
import { getAllUsers } from "../api/users";

const GroupModel = ({
  show,
  onClose: closeModal,
  title,
  userId,
}: GroupModalProps) => {
  const { setIsLoading } = useContext(LoaderContext);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [group, setGroup] = useState<Group>({
    name: "",
    description: "",
    userId: userId,
    users: [],
  });

  const { data, isLoading, error, isError } = useQuery(
    ["allUsers"],
    getAllUsers,
    {
      refetchInterval: 30000,
    }
  );

  if (isLoading) {
    return <></>;
  }

  const users: User[] = data?.data;
  // console.log(users);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const onClose = () => {
    setGroup({
      name: "",
      description: "",
      userId,
      users: [],
    });
    setSelectedUsers([]);
    closeModal();
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!group.name || !group.description || selectedUsers.length == 0) {
      toast("Please select all the fields", {
        type: "error",
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
      return;
    }
    setIsLoading(true);

    const { data, status } = await createGroup({
      ...group,
      userId,
      users: selectedUsers.map(
        (user: { label: string; value: string }) => user.value
      ),
    });

    if (status !== 200) {
      toast(data.message, {
        type: "error",
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    } else {
      toast(`Group: ${data?.name} Created Successfully 🎉`, {
        type: "success",
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });

      setGroup({
        name: "",
        description: "",
        userId,
        users: [],
      });

      onClose();
    }
    setIsLoading(false);
  };

  return (
    <Modal
      show={show}
      className="min-h-screen"
      position="center"
      onClose={onClose}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label
                  htmlFor="groupName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Group Name
                </Label>
                <TextInput
                  type="text"
                  name="name"
                  id="groupName"
                  value={group?.name}
                  onChange={handleChange}
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Vasooli"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </Label>
                <textarea
                  id="description"
                  rows={4}
                  name="description"
                  onChange={handleChange}
                  value={group?.description}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="users"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Users
                </Label>
                <Select
                  id="users"
                  isMulti
                  isLoading={isLoading}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={users
                    .filter((user) => user.uuid != userId)
                    .map((user) => ({
                      value: user.uuid,
                      label: user.name,
                    }))}
                  value={selectedUsers}
                  onChange={setSelectedUsers}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GroupModel;
