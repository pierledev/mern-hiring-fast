import { axiosInstance } from "@utils";

// Employers
const postArticle = async (newArticle) => {
  const response = await axiosInstance.post("/articles", newArticle);
  return response.data;
};

const getPostedArticles = async () => {
  const response = await axiosInstance("/articles/posted");
  return response.data;
};

const updateArticle = async ({ articleId, updatedArticle }) => {
  const response = await axiosInstance.patch(
    `/articles/${articleId}`,
    updatedArticle,
  );
  return response.data;
};

const deleteArticle = async (articleId) => {
  const response = await axiosInstance.delete(`/articles/${articleId}`);
  return response.data;
};

// Employers & Job Seekers
const getAllArticles = async () => {
  const response = await axiosInstance("/articles");
  return response.data;
};

const getArticleDetails = async (articleId) => {
  const response = await axiosInstance(`/articles/${articleId}`);
  return response.data;
};

// Job Seekers
const saveArticle = async (articleId) => {
  const response = await axiosInstance.patch(`/articles/${articleId}/save`);
  return response.data;
};

const unsaveArticle = async (articleId) => {
  const response = await axiosInstance.patch(`/articles/${articleId}/unsave`);
  return response.data;
};

const getSavedArticles = async () => {
  const response = await axiosInstance("/articles/saved");
  return response.data;
};

const likeArticle = async (articleId) => {
  const response = await axiosInstance.patch(`/articles/${articleId}/like`);
  return response.data;
};

const unlikeArticle = async (articleId) => {
  const response = await axiosInstance.patch(`/articles/${articleId}/unlike`);
  return response.data;
};

export const api = {
  postArticle,
  getPostedArticles,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getArticleDetails,
  saveArticle,
  unsaveArticle,
  getSavedArticles,
  likeArticle,
  unlikeArticle,
};
