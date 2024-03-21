import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

// Employers
export const usePostArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newArticle) => api.postArticle(newArticle),
    onSuccess: () => {
      queryClient.invalidateQueries(["postedArticles"]);
      queryClient.invalidateQueries(["articles"]);
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, updatedArticle }) =>
      api.updateArticle({ articleId, updatedArticle }),
    onSuccess: () => {
      queryClient.invalidateQueries(["postedArticles"]);
    }
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId) => api.deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries(["postedArticles"]);
    }
  });
};

// Job Seekers
export const useSaveArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId) => api.saveArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
      queryClient.invalidateQueries(["savedArticles"]);
    }
  });
};

export const useUnsaveArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId) => api.unsaveArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
      queryClient.invalidateQueries(["savedArticles"]);
    }
  });
};

export const useLikeArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId) => api.likeArticle(articleId),
    onSuccess: () => queryClient.invalidateQueries(["articles"]),
  });
};

export const useUnlikeArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId) => api.unlikeArticle(articleId),
    onSuccess: () => queryClient.invalidateQueries(["articles"]),
  });
};
