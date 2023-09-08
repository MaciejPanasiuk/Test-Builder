import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../Input/FormInput";
import {
  passwordErrorMessages,
  recoveryErrorMessage,
  userNameErrorMessages,
} from "./customErrorMessages";
import axios from "axios";
import { BASE_API_URL } from "../../../../Data/const";
import { registerParams } from "../../../../../common/Interfaces";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJWTTokens, logInUser } from "../../../../hooks/useLogin";

export default function RegisterForm() {
  const navigate = useNavigate();

  const registerUser= async(data:registerParams)=>{
    const reqBody=JSON.stringify({...data,isAdmin:false});
    try {
      const registerRegularUser= await axios.post(BASE_API_URL+`/user/register`,reqBody,{headers:{'Content-Type': 'application/json'}})
      if(registerRegularUser.status===200)
      console.log('user registered succesfuly!')
      navigate("/Account/Success")

    } catch (error) {
      if (axios.isAxiosError(error)){
        if(error.response?.status===400){
          setError('serverError', {
            type: 'server',
            message: error.response.data,
          });
        }
      }
      return;
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
      supportQuestion: "What is your favourite color?",
      supportAnswer: "Blue",
      serverError: "",
    },
  });

  logInUser('123','12341234')
  return (
    <div>
      <form onSubmit={handleSubmit((data) => registerUser(data))}>
        <FormInput
          registerRequirements={register("userName", {
            required: true,
            maxLength: 200,
            pattern: /^\S*$/,
          })}
          labelText="User Name"
          ValidationError={errors.userName}
          serverError={errors.serverError}
          customErrorMessages={userNameErrorMessages}
          fieldSize={{ width: 1 / 2 }}
        />
        <FormInput
          registerRequirements={register("password", {
            required: true,
            minLength: 8,
            pattern: /^\S*$/,
          })}
          labelText="Password"
          ValidationError={errors.password}
          customErrorMessages={passwordErrorMessages}
          fieldSize={{ width: 1 / 2 }}
        />
        <FormInput
          registerRequirements={register("supportQuestion", {
            required: true,
            maxLength: 200,
          })}
          labelText="Support Question"
          ValidationError={errors.supportQuestion}
          customErrorMessages={recoveryErrorMessage}
          fieldSize={{ width: 3 / 4 }}
        />
        <FormInput
          registerRequirements={register("supportAnswer", {
            required: true,
            maxLength: 200,
          })}
          labelText="Answer to Support Question"
          ValidationError={errors.supportAnswer}
          customErrorMessages={recoveryErrorMessage}
          fieldSize={{ width: 3 / 4 }}
        />
        <Button type="submit" variant="contained" sx={{ m: 2 }}>
          Register
        </Button>
      </form>
    </div>
  );
}
