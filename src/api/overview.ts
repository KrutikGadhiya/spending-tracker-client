import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const getOverview = async ({ queryKey }: any) => {
  const [_, params] = queryKey;
  const { token } = params;

  const response = await axios.get(`${BASE_URL}/api/overview`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
