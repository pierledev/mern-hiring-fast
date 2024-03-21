import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

export const useGetDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboardOverview"],
    queryFn: api.getDashboardOverview,
    staleTime: 500,
    gcTime: 500
  });
};
