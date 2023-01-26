import { instance } from "./main";

export const getAllUsers = async () => {
  const response = await instance.get("/api/user");
  return response;
};
