import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getRecoveryQuestion } from "../utils/APIcalls";
import { AxiosError } from "axios";

export function useRecoveryQuestion(){
  const queryClient = useQueryClient();const [showError, setShowError] = useState(false);
  const { mutate: getRecQuestion, isLoading } = useMutation({
    mutationFn: (userName: string) => getRecoveryQuestion(userName),
    onSuccess: (userName) => {
      queryClient.setQueryData(["recoveryQuestion"], userName);
    },
    onError: (error) => {
      if(error instanceof AxiosError)
      console.log(error?.response?.data);
      setShowError(true);
    },
  });
  return { getRecQuestion, isLoading, showError, setShowError };
}