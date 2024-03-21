import { axiosInstance } from "@utils";

// Employers & Job Seekers
const getAllCompanies = async (queryParameters) => {
  const response = await axiosInstance(`/companies?${queryParameters}`);
  return response.data;
};

const getCompanyDetails = async (company) => {
  const response = await axiosInstance(`/companies/${company}`);
  return response.data;
};

const getFeaturedCompanies = async () => {
  const response = await axiosInstance("/companies?limit=6");
  return response.data;
};

export const api = {
  getAllCompanies,
  getCompanyDetails,
  getFeaturedCompanies,
};
