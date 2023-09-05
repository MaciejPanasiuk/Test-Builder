// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../Input/FormInput";
// import { useState } from "react";
import {
  passwordErrorMessages,
  recoveryErrorMessage,
  userNameErrorMessages,
} from "./customErrorMessages";
import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "../../../Data/const";

export default function RegisterForm() {
  // const[passworrStrenght,setPasswordStrenght]=useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
      supportQuestion: "What is your favourite color?",
      supportAnswer: "Blue",
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          const reqBody=JSON.stringify({...data,isAdmin:false});
          try {
            const registerRegularUser= await axios.post(BASE_API_URL+`/user/register`,reqBody,{headers:{'Content-Type': 'application/json'}})
            if(registerRegularUser.status===200)
            console.log('user registered succesfuly!')
          } catch (error) {
            if (axios.isAxiosError(error)){
              console.log(error.response? error.response.data:'')
            }
          }
        })}
      >
        <FormInput
          registerRequirements={register("userName", {
            required: true,
            maxLength: 200,
            pattern: /^\S*$/,
          })}
          labelText="User Name"
          ValidationError={errors.userName}
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
