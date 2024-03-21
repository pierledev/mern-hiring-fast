import { axiosInstance } from "@utils";

const updateUser = async (newUserData) => {
  const response = await axiosInstance.patch("/users/update", newUserData);
  return response.data;
};

const getDashboardOverview = async () => {
  const response = await axiosInstance("/users/dashboard-overview");
  return response.data;
};

export const api = {
  updateUser,
  getDashboardOverview,
};
