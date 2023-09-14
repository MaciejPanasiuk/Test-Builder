import {useQueryClient } from "@tanstack/react-query"
import { LoginParams } from "../../../common/Interfaces";
import { useState } from "react";


function Header() {
  const queryClient = useQueryClient();
  const[userName,setUserName]=useState<LoginParams|undefined>(queryClient.getQueryData(['user']))
  // const { data} = useQuery(['user'], {
  //   onSuccess: (data) => {
  //     if (data) {
  //       console.log('anything here?')
  //       setUserName(data.userName);
  //     }
  //   },
  // });

  return (
    <><h1>TEST BUILDER</h1>
    <h3>Basic Functionalities</h3>
    <h3>{`Hello ${userName??' fellow quiz enthusiast'}!`}</h3>
    </>
  )
}

export default Header
