import { LoginParams, RegisterParams } from "../../common/Interfaces";
import { BASE_API_URL } from "../Data/const";
import axios from "axios";

export const refreshToken = async (userName: string) => {
  try {
    const reqBody = JSON.stringify({ userName: userName });
    const JWTtokens = await axios.post(
      BASE_API_URL + `/user/refreshToken`,
      reqBody,
      {
        headers: { "Content-Type": "application/json", token: "ManualRefresh" },
      }
    );
    console.log("token created");
    return JWTtokens.data;
  } catch (error) {
    console.log("token refresh failed");
  }
};
export const logInUser = async (loginInfo:LoginParams) => {
  const reqBody = JSON.stringify({ password: loginInfo.password });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const userInfo = await axios.post(
    BASE_API_URL + `/users/${loginInfo.userName}`,
    reqBody,
    config
  );
  return userInfo.data;
};

export const getRecoveryQuestion=async(userName:string)=>{
  const config={
    headers:{
      "Content-Type": "application/json",
    },
  }
  const supportQuestion=await axios.get(BASE_API_URL+`/users/${userName}/recovery`,config)
  return supportQuestion;
}
export const verifyAnswer=async(userName:string,recoveryAnswer:string)=>{
  const reqBody = JSON.stringify({ supportAnswer: recoveryAnswer });
  const config={
    headers:{
      "Content-Type": "application/json",
    },
  }
  const isVerified=await axios.post(BASE_API_URL+`/users/${userName}/verifyAnswer`,reqBody,config)
  return isVerified;
}
export const registerUser = async (
  data: RegisterParams
) => {
  const reqBody = JSON.stringify({ ...data, isAdmin: false });
    const registerRegularUser = await axios.post(
      BASE_API_URL + `/user/register`,
      reqBody,
      { headers: { "Content-Type": "application/json" } }
    );
      return registerRegularUser.data;
};
export const updatePassword=async(userName:string,newPassword:string)=>{
  if(userName.length<0){throw Error('cache with user is empty!');
  }
  console.log(userName);
  const reqBody = JSON.stringify({ password: newPassword })
  const config={
    headers:{"Content-Type": "application/json",}
  }
  const updateResponse = await axios.patch(BASE_API_URL + `/users/${userName}/recovery`,reqBody,config);
  return updateResponse;
}