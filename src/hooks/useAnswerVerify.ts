import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { verifyAnswer } from "../utils/APIcalls";
import { AxiosError } from "axios";
import { RecAnswerProps } from "../Interfaces/types";

export function useAnswerVerify(){
//   const queryClient = useQueryClient();
  const [showVerifyError, setshowVerifyError] = useState(false);
  const { mutate: answerVerification, isLoading:isVerifying } = useMutation({
    mutationFn: ({userName,recoveryAnswer}:RecAnswerProps) => verifyAnswer(userName,recoveryAnswer),
    onSuccess: (res) => {
      console.log(res.data)
    },
    onError: (error:AxiosError) => {
      console.log(error?.response?.data);
      setshowVerifyError(true);
    },
  });
  return { answerVerification, isVerifying, showVerifyError, setshowVerifyError };
}