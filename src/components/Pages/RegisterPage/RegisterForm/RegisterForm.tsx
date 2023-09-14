import { Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../../../UI/Inputs/FormInput";
import {
  passwordErrorMessages,
  recoveryErrorMessage,
  userNameErrorMessages,
} from "./customErrorMessages";
import { useNavigate } from "react-router-dom";
import ErrorSnackbar from "../ErrorSnackBar/ErrorSnackBar";
import { RegisterParams } from "../../../../../common/Interfaces";
import { useRegister } from "../../../../hooks/useRegister";
import PasswordInput from "../../../UI/Inputs/PasswordInput";

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
      supportQuestion: "What is your favourite color?",
      supportAnswer: "Blue",
    },
  });
  const{register:RegisterUser, isLoading,showError,setShowError}=useRegister()
  const handleRegisterUser = (data: RegisterParams) => {
    if(!data.password || !data.userName || !data.supportQuestion || !data.supportAnswer) return;
    RegisterUser(data,{onSuccess:()=>{
      console.log('woho we registered!')
      navigate("/Register/Success")
  },onSettled:()=>{
    reset();
  }})
  };
  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleRegisterUser(data))}>
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
        <PasswordInput
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
        {!isLoading? 'Sign in':<CircularProgress />}
        </Button>
        <ErrorSnackbar
          isSnackBarOpen={showError}
          onSetisSnackBarOpen={setShowError}
          errorMessage="User Name already taken"
        />
      </form>
    </div>
  );
}
