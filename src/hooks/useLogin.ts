import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../Data/const";
import axios from "axios";

export const getJWTTokens = async (userName: string) => {
  const reqBody = JSON.stringify({ userName: userName });
  const JWTtokens = await axios.post(
    BASE_API_URL + `/user/createToken`,
    reqBody,
    { headers: { "Content-Type": "application/json" } }
  );
  console.log('token created')
  return JWTtokens.data;
};
export const logInUser= async(userName:string,password:string)=>{
  const JWTtokens=await getJWTTokens(userName);
  const reqBody = JSON.stringify({password:password})
  const config={headers: { 
    'authorization': `Bearer ${JWTtokens.accessToken}`, 
    'Content-Type': 'application/json'
  },
  }
  const userInfo = await axios.post(BASE_API_URL + `/users/${userName}`,reqBody,config)
  console.log(`login succesful`)
  return userInfo.data;
}
