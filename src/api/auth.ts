import { instance } from "./main";

export const login = async (email: string, password: string) => {
  try {
    const response = await instance.post("/api/user/login", {
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
    const response = await instance.post("/api/user", {
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
