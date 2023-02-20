import axios from "axios";

const isProd = import.meta.env.ENV === "production";
const BASE_URL = isProd
  ? import.meta.env.VITE_SERVER_URL
  : import.meta.env.VITE_DEV_SERVER_URL;
console.log("isProd", isProd);
console.log("BASE_URL", BASE_URL);

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (error?.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const rs = await refreshToken();
        const { token } = rs.data;
        window.localStorage.setItem("accessToken", token);
        instance.defaults.headers.common["x-access-token"] = token;

        return instance(originalConfig);
      } catch (_error: any) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }

        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    // console.log("getLocalRefreshToken()", getLocalRefreshToken());

    const response = await axios.post(`${BASE_URL}/api/user/refresh`, {
      refreshToken: getLocalRefreshToken(),
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

function getLocalAccessToken() {
  const accessToken =
    window.localStorage.getItem("accessToken") ||
    window.sessionStorage.getItem("accessToken") ||
    "";
  // console.log("User: ", user);
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken =
    window.localStorage.getItem("refreshToken") ||
    window.sessionStorage.getItem("refreshToken") ||
    "";
  // console.log(user);
  return refreshToken;
}
