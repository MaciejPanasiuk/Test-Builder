import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LoginParams } from "../../common/Interfaces";

export default function Greeting() {
    
    const queryClient = useQueryClient();
    const[userName]=useState<LoginParams|undefined>(queryClient.getQueryData(['user']))
    // const { data} = useQuery(['user'], {
    //   onSuccess: (data) => {
    //     if (data) {
    //       console.log('anything here?')
    //       setUserName(data.userName);
    //     }
    //   },
    // });
  
    return (
      <>
      <span>{`Hello ${userName??' fellow quiz enthusiast'}!`}</span>
      </>
    )
}
