import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logInUser } from "../utils/APIcalls";
import { LoginParams } from "../../common/Interfaces";
import { useState } from "react";
import { AxiosError } from "axios";

export function useLogin() {
  const queryClient = useQueryClient();
  const [showError, setShowError] = useState(false);
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (loginInfo: LoginParams) => logInUser(loginInfo),
    onSuccess: (userInfo) => {
      queryClient.setQueryData(["user"], userInfo);
    },
    onError: (error) => {
      if(error instanceof AxiosError)
      console.log(error?.response?.data);
      setShowError(true);
    },
  });
  return { login, isLoading, showError, setShowError };
}
