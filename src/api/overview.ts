// import axios from "axios";

import { instance } from "./auth";

export const getOverview = async ({ queryKey }: any) => {
  const [_, params] = queryKey;
  const { token, userId } = params;

  const response = await instance.get(`/api/overview/${userId}`);
  return response;
};
