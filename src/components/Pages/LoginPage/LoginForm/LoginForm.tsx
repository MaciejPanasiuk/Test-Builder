import { useForm } from "react-hook-form"
import FormInput from "../../../UI/Inputs/FormInput";
import { passwordErrorMessages, userNameErrorMessages } from "../../RegisterPage/RegisterForm/customErrorMessages";
import Button from "@mui/material/Button";
import { LoginParams } from "../../../../../common/Interfaces";
import { useLogin } from "../../../../hooks/useLogin";
import { CircularProgress } from "@mui/material";
import ErrorSnackbar from "../../RegisterPage/ErrorSnackBar/ErrorSnackBar";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import PasswordInput from "../../../UI/Inputs/PasswordInput";


export default function LoginForm() {
    const navigate=useNavigate()
    const queryClient= useQueryClient();
    const defaultValues={            
    userName:'',
    password:''}
const{
    register,
    handleSubmit,
    reset,
    formState:{errors}}=useForm({
        defaultValues
    });

const{login,isLoading,showError,setShowError}=useLogin()
const handleLoginUser=(loginInfo:LoginParams)=>{
    if(!loginInfo.password || !loginInfo.userName)
    return;
    login(loginInfo,{onSuccess:()=>{
        {queryClient.setQueryData(['user'],loginInfo)}
        navigate("/")
        reset();
    },onSettled:()=>{
      reset();
    },});
    
}


  return (
    <div>
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit((data)=>handleLoginUser(data))}>
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
          disabled={isLoading}
        />
        <Link to="../../PasswordRecovery/Question"> Dont remember password?</Link>
                <PasswordInput
          registerRequirements={register("password", {
            required: true,
            maxLength: 200,
            pattern: /^\S*$/,
          })}
          labelText="Password"
          ValidationError={errors.password}
          customErrorMessages={passwordErrorMessages}
          fieldSize={{ width: 1 / 2 }}
          disabled={isLoading}
        />
                <div>
          {/* <Checkbox id="To-Remember-Checkbox" {...register('isRememberData')}/><span>Remember me</span> */}
        </div>
        <Button type="submit" variant="contained" sx={{ m: 2 }}>
         {!isLoading? 'Log In':<CircularProgress />}
        </Button>
        <ErrorSnackbar
          isSnackBarOpen={showError}
          onSetisSnackBarOpen={setShowError}
          errorMessage="User Name or Password incorrect"
        />
        </form>
    </div>
  )

}