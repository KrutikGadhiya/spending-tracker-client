import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
// console.log("BASE_URL", BASE_URL);

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/api/user/login`, {
    email,
    password,
  });
  return response;
};
