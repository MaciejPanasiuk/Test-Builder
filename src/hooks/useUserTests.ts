import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTests } from "../utils/APIcalls";
import { useState } from "react";
import { LoginParams } from "../../common/Interfaces";
import { AxiosError } from "axios";

export function useUserTests() {
  const queryClient = useQueryClient();
  const [cachedUserInfo] = useState<LoginParams | undefined>(
    queryClient.getQueryData(["user"])
  );
  const { isLoading, data: tests } = useQuery({
    queryKey: ["userTests", cachedUserInfo?.userName],
    queryFn: () => getTests(cachedUserInfo?.userName ?? ""),
    onError:(error:AxiosError)=>{
      console.log(error)
    },
  });
  return { isLoading, tests, cachedUserInfo };
}
