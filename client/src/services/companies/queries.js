import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

export const useGetAllCompanies = (queryParameters) => {
  return useQuery({
    queryKey: ["companies", queryParameters],
    queryFn: () => api.getAllCompanies(queryParameters),
  });
};

export const useGetCompanyDetails = (company) => {
  return useQuery({
    queryKey: ["companies", company],
    queryFn: () => api.getCompanyDetails(company),
  });
};

export const useGetFeaturedCompanies = () => {
  return useQuery({
    queryKey: ["featuredCompanies"],
    queryFn: api.getFeaturedCompanies,
  });
};
