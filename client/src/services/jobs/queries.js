import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "./api";

// Employers
export const useGetPostedJobs = () => {
  return useQuery({
    queryKey: ["postedJobs"],
    queryFn: api.getPostedJobs,
    staleTime: 500,
    gcTime: 500
  });
};

export const useGetArchivedJobs = () => {
  return useQuery({
    queryKey: ["archivedJobs"],
    queryFn: api.getArchivedJobs,
    staleTime: 500,
    gcTime: 500
  });
};

// Employers & Job Seekers
export const useGetAllJobs = (queryParameters) => {
  return useQuery({
    queryKey: ["jobs", queryParameters],
    queryFn: () => api.getAllJobs(queryParameters),
    placeholderData: keepPreviousData
  });
};

export const useGetJobDetails = (jobId) => {
  return useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => api.getJobDetails(jobId),
  });
};

export const useGetFeaturedJobs = () => {
  return useQuery({
    queryKey: ["featuredJobs"],
    queryFn: api.getFeaturedJobs,
  });
};

// Job Seekers
export const useGetSavedJobs = () => {
  return useQuery({
    queryKey: ["savedJobs", "jobs"],
    queryFn: api.getSavedJobs,
    staleTime: 500,
    gcTime: 500
  });
};

export const useGetAppliedJobs = () => {
  return useQuery({
    queryKey: ["appliedJobs"],
    queryFn: api.getAppliedJobs,
    staleTime: 500,
    gcTime: 500
  });
};
