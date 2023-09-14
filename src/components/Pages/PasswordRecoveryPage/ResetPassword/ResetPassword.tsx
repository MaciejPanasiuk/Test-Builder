import { useForm } from "react-hook-form";
import PasswordInput from "../../../UI/Inputs/PasswordInput";
import { passwordErrorMessages } from "../../RegisterPage/RegisterForm/customErrorMessages";
import { Button, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useReset } from "../../../../hooks/useReset";
import ErrorSnackbar from "../../RegisterPage/ErrorSnackBar/ErrorSnackBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const queryClient = useQueryClient();
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      repeatPassword: "",
    },
  });
  const { resetPassword, isReseting, showError, errorMessage, setShowError } =
    useReset();
    
    const[cachedUserName]=useState(queryClient.getQueryData(["userToReset"]) ?? "")
  const handleResetPassword = (newPassword: string) => {
    resetPassword(
      { userName: cachedUserName, newPassword },
      {
        onSuccess: () => {
          console.log("you won woho");
          navigate('/PasswordRecovery/Success')
        },
      }
    );
  };
  const arePasswordsMatching = () => {
    return getValues("newPassword") === getValues("repeatPassword");
  };
  return (
    <div>
      <p>Answer Correct! Set a new password below:</p>
      <form
        onSubmit={handleSubmit((data) => handleResetPassword(data.newPassword))}
      >
        <PasswordInput
          registerRequirements={register("newPassword", {
            required: true,
            minLength: 8,
            pattern: /^\S*$/,
            validate: arePasswordsMatching,
          })}
          labelText="New password"
          ValidationError={errors.newPassword}
          customErrorMessages={passwordErrorMessages}
          fieldSize={{ width: 3 / 4 }}
        />
        <PasswordInput
          registerRequirements={register("repeatPassword", {
            required: true,
            minLength: 8,
            pattern: /^\S*$/,
            validate: arePasswordsMatching,
          })}
          labelText="Repeat password"
          ValidationError={errors.newPassword}
          customErrorMessages={passwordErrorMessages}
          fieldSize={{ width: 3 / 4 }}
        />
        <ErrorSnackbar
          isSnackBarOpen={showError}
          onSetisSnackBarOpen={setShowError}
          errorMessage={errorMessage}
        />
        <Button type="submit" variant="contained" sx={{ m: 2 }}>
          {!isReseting ? "Set new password" : <CircularProgress />}
        </Button>
      </form>
    </div>
  );
}
