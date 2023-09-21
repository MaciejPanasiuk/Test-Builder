import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logOutAPI } from "../utils/APIcalls";
import { AxiosError } from "axios";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: ()=>logOutAPI(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/LogIn/Form");
    },
    onError: (error:AxiosError) => {
        console.log(error?.response?.data);
      },
  });
  return { logout };
}
