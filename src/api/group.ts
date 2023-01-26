import { instance } from "./main";
import { Group } from "../types";

export const createGroup = async (data: Group) => {
  const response = await instance.post("/api/group", data);
  return response;
};

export const getUserGroups = async ({ queryKey }: any) => {
  const [_, params] = queryKey;
  const { userId } = params;

  const response = await instance.get(`/api/group/?userId=${userId}`);
  return response;
};

export const getGroup = async ({ queryKey }: any) => {
  const [_, params] = queryKey;
  const { groupId } = params;

  const response = await instance.get(`/api/group/${groupId}`);
  return response;
};
