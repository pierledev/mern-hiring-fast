import { axiosInstance } from "@utils";

const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
};

const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const api = {
  register,
  login,
  logout,
};
