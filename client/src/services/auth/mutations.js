import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { useAppContext } from "@context/appContext";
import toast from "react-hot-toast";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAppContext();

  return useMutation({
    mutationFn: (userData) => api.register(userData),
    onSuccess: (data) => {
      setUser(data.data);
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success(data.message, { loading: 500 });

      setTimeout(() => {
        toast.loading("Navigating to your dashboard...", { duration: 1800 });
      }, 600);
    },
  });
};

export const useLogin = () => {
  const { setUser } = useAppContext();

  return useMutation({
    mutationFn: (userData) => api.login(userData),
    onSuccess: (data) => {
      setUser(data.data);

      toast.success(data.message, { loading: 500 });

      setTimeout(() => {
        toast.loading("Navigating to your dashboard...", { duration: 1800 });
      }, 600);
    },
  });
};

export const useLogout = () => {
  const { logoutUser } = useAppContext();

  return useMutation({
    mutationFn: api.logout,
    onSuccess: (data) => {
      logoutUser();

      toast.success(data.message);
    },
  });
};
