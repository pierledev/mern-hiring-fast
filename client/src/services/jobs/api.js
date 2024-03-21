import { axiosInstance } from "@utils";

// Only employers
const postJob = async (newJob) => {
  const response = await axiosInstance.post("/jobs", newJob);
  return response.data;
};

const getPostedJobs = async () => {
  const response = await axiosInstance("/jobs/posted");
  return response.data;
};

const updateJob = async ({ jobId, updatedJobData }) => {
  const response = await axiosInstance.patch(`/jobs/${jobId}`, updatedJobData);
  return response.data;
};

const archiveJob = async (jobId) => {
  const response = await axiosInstance.patch(`/jobs/${jobId}/archive`);
  return response.data;
};

const getArchivedJobs = async () => {
  const response = await axiosInstance("/jobs/archived");
  return response.data;
};

const unarchiveJob = async (jobId) => {
  const response = await axiosInstance.patch(`/jobs/${jobId}/unarchive`);
  return response.data;
};

const deleteJob = async (jobId) => {
  const response = await axiosInstance.delete(`/jobs/${jobId}`);
  return response.data;
};

// Employers & Job Seekers
const getAllJobs = async (queryParameters) => {
  const response = await axiosInstance(`/jobs?${queryParameters}`);
  return response.data;
};

const getJobDetails = async (jobId) => {
  const response = await axiosInstance(`/jobs/${jobId}`);
  return response.data;
};

const getFeaturedJobs = async () => {
  const response = await axiosInstance("/jobs?featured=true");
  return response.data;
};

// Job Seekers
const saveJob = async (jobId) => {
  const response = await axiosInstance.patch(`/jobs/${jobId}/save`);
  return response.data;
};

const getSavedJobs = async () => {
  const response = await axiosInstance("/jobs/saved");
  return response.data;
};

const unsaveJob = async (jobId) => {
  const response = await axiosInstance.patch(`/jobs/${jobId}/unsave`);
  return response.data;
};

const applyJob = async (jobId) => {
  const response = await axiosInstance.patch(`/jobs/${jobId}/apply`);
  return response.data;
};

const getAppliedJobs = async () => {
  const response = await axiosInstance("/jobs/applied");
  return response.data;
};

export const api = {
  postJob,
  getPostedJobs,
  updateJob,
  archiveJob,
  getArchivedJobs,
  unarchiveJob,
  deleteJob,
  getAllJobs,
  getJobDetails,
  getFeaturedJobs,
  saveJob,
  getSavedJobs,
  unsaveJob,
  applyJob,
  getAppliedJobs,
};
