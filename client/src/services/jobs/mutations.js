import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

// Employers
export const usePostJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newJobData) => api.postJob(newJobData),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["postedJobs"] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, updatedJobData }) =>
      api.updateJob({ jobId, updatedJobData }),
    onSuccess: () => {
      // queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["postedJobs"]);
    }
  });
};

export const useArchiveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId) => api.archiveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries(["postedJobs"]);
      queryClient.invalidateQueries(["dashboardOverview"]);
      // queryClient.invalidateQueries(["jobs"]);
    }
  });
};

export const useUnarchiveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId) => api.unarchiveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries(["postedJobs"]);
      queryClient.invalidateQueries(["dashboardOverview"]);
      // queryClient.invalidateQueries(["jobs"]);
    }
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId) => api.deleteJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries(["postedJobs"]);
      // queryClient.invalidateQueries(["jobs"]);
    }
  });
};

// Job Seekers
export const useSaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId) => api.saveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["savedJobs"]);
    }
  });
};

export const useUnsaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId) => api.unsaveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["savedJobs"]);
    }
  });
};

export const useApplyJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId) => api.applyJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries(["appliedJobs"]);
      queryClient.invalidateQueries(["jobId"]);
  },
  });
};
