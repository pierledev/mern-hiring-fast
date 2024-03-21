import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

// Employers
export const useGetPostedArticles = () => {
  return useQuery({
    queryKey: ["postedArticles"],
    queryFn: api.getPostedArticles,
    staleTime: 500,
    gcTime: 500
  });
};

// Employers & Job Seekers
export const useGetAllArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: api.getAllArticles,
    staleTime: 500,
    gcTime: 500
  });
};

export const useGetArticleDetails = (articleId) => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => api.getArticleDetails(articleId),
    staleTime: 500,
    gcTime: 500
  });
};

// Job Seekers
export const useGetSavedArticles = () => {
  return useQuery({
    queryKey: ["savedArticles"],
    queryFn: api.getSavedArticles,
    staleTime: 500,
    gcTime: 500
  });
};
