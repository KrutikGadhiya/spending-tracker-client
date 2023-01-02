import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
// console.log("BASE_URL", BASE_URL);

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login`, {
      email,
      password,
    });
    return response;
  } catch (error: any) {
    console.log("error", error);
    return {
      error: error?.response?.data?.message || "Some error occurred!!",
      status: error?.response?.status || 400,
      data: error?.response?.data || {},
    };
  }
};

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user`, {
      email,
      password,
      name,
    });
    return response;
  } catch (error: any) {
    console.log("error", error);
    return {
      error: error?.response?.data?.message || "Some error occurred!!",
      status: error?.response?.status || 400,
      data: error?.response?.data || {},
    };
  }
};
