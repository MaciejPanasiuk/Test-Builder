import { LoginParams, RegisterParams, TestCont } from "../../common/Interfaces";
import { BASE_API_URL } from "../Data/const";
import axios from "axios";

const defaultConfig={
  headers:{"Content-Type": "application/json",}
}

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
  const userInfo = await axios.post(
    BASE_API_URL + `/users/${loginInfo.userName}`,
    reqBody,
    defaultConfig
  );
  localStorage.setItem("accessToken", userInfo.data.accessToken)
  localStorage.setItem("refreshToken", userInfo.data.refreshToken)
  return userInfo.data;
};

export const getRecoveryQuestion=async(userName:string)=>{
  const supportQuestion=await axios.get(BASE_API_URL+`/users/${userName}/recovery`,defaultConfig)
  return supportQuestion;
}
export const verifyAnswer=async(userName:string,recoveryAnswer:string)=>{
  const reqBody = JSON.stringify({ supportAnswer: recoveryAnswer });
  const isVerified=await axios.post(BASE_API_URL+`/users/${userName}/verifyAnswer`,reqBody,defaultConfig)
  return isVerified;
}
export const registerUser = async (
  data: RegisterParams
) => {
  const reqBody = JSON.stringify({ ...data, isAdmin: false });
    const registerRegularUser = await axios.post(
      BASE_API_URL + `/user/register`,
      reqBody,
      defaultConfig
    );
      return registerRegularUser.data;
};
export const updatePassword=async(userName:string,newPassword:string)=>{
  if(userName.length<0){throw Error('cache with user is empty!');
  }
  const reqBody = JSON.stringify({ password: newPassword })
  const updateResponse = await axios.patch(BASE_API_URL + `/users/${userName}/recovery`,reqBody,defaultConfig);
  return updateResponse;
}
export const getTests=async(userName:string):Promise<TestCont[]>=>{
  if(userName.length<0){throw Error('cache with user is empty!');
}
await verifyToken(userName);

const fetchedTests = await axios.get(BASE_API_URL + `/users/${userName}/tests`)
  return fetchedTests.data;
  
}
export const verifyToken=async(userName:string)=>{
  if(userName.length<0){throw Error('cache with user is empty!');}
  const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
  const refreshToken = `Bearer ${localStorage.getItem("refreshToken")}`;
  const reqBody = JSON.stringify({ userName: userName })

  const config={
    headers:{"Content-Type": "application/json",
  "authorization":accessToken,
  "auth_refresh":refreshToken}
  }
  const verifyResponse= await axios.post(BASE_API_URL + `/user/${userName}/verifyToken`,reqBody,config)
  if(localStorage.getItem("accessToken")!==verifyResponse.data.accessToken)
  localStorage.setItem('accessToken',verifyResponse.data.accessToken)

}
export const logOutAPI=async ()=>{
  localStorage.clear();
}