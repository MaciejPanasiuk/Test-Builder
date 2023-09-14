import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../utils/APIcalls";
import { RegisterParams } from "../../common/Interfaces";
import { useState } from "react";
import { AxiosError } from "axios";

export function useRegister() {
  const queryClient = useQueryClient();
  const [showError, setShowError] = useState(false);
  const { mutate: register, isLoading } = useMutation({
    mutationFn: (registerInfo: RegisterParams) => registerUser(registerInfo),
    onSuccess: (registerInfo) => {
      queryClient.setQueryData(["user"], registerInfo);
    },
    onError: (error) => {
      if(error instanceof AxiosError)
      console.log(error?.response?.data);
      setShowError(true);
    },
  });
  return { register, isLoading, showError, setShowError };
}
