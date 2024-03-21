import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUserData) => api.updateUser(newUserData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};
