import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../utils/APIcalls";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { PasswordResetProps } from "../Interfaces/types";

export function useReset() {
  const [showError, setShowError] = useState(false);
  const[errorMessage,setErrorMessage]=useState('')
  const { mutate: resetPassword, isLoading:isReseting } = useMutation({
    mutationFn: ({userName,newPassword}:PasswordResetProps) => updatePassword(userName,newPassword),
    onSuccess: (response:AxiosResponse) => {
        console.log(response.data)
    },
    onError: (error:AxiosError) => {
      if(error.response?.status===304){
        setErrorMessage('New password cannot be the same as your current password')
        setShowError(true);
      }
      if(error.response?.status===404)
{      setErrorMessage('Internal Error, user not found')
      setShowError(true);}
    },
  });
  return { resetPassword, isReseting, showError,errorMessage, setShowError };
}
