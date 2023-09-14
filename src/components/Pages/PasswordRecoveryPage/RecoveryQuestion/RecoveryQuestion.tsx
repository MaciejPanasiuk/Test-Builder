import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../UI/Inputs/FormInput";
import { Button, CircularProgress } from "@mui/material";
import { recoveryErrorMessage, userNameErrorMessages } from "../../RegisterPage/RegisterForm/customErrorMessages";
import { useRecoveryQuestion } from "../../../../hooks/useRecoveryQuestion";
import "./RecoveryQuestion.scss";
import ErrorSnackbar from "../../RegisterPage/ErrorSnackBar/ErrorSnackBar";
import { useAnswerVerify } from "../../../../hooks/useAnswerVerify";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { cachedBasicVar } from "../../../../Interfaces/types";

export default function RecoveryQuestion() {
  const navigate = useNavigate();
  const queryClient= useQueryClient();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userNameRecovery: "",
    },
  });
  const {
    register: registerAnswer,
    handleSubmit: handleSubmitAnswer,
    formState: { errors: answerErrors },
  } = useForm({
    defaultValues: {
      recoveryAnswer: "",
    },
  });

  const { getRecQuestion, isLoading, showError, setShowError } =
    useRecoveryQuestion();
  const {
    answerVerification,
    isVerifying,
    showVerifyError,
    setshowVerifyError,
  } = useAnswerVerify();
  const [showQuestion, setShowQuestion] = useState(false);
  const recoveryQuestion:cachedBasicVar=queryClient.getQueryData(["recoveryQuestion"])
  const handleFetchQuestion = (userNameRec: string) => {
    getRecQuestion(userNameRec
        ,{
        onSuccess:()=>{
            setShowQuestion(true)
        }
    })
  };
  const handleAnswerVerification = (recoveryAnswer: string) => {
    const userName = getValues('userNameRecovery')
    const VerificationParams = { userName, recoveryAnswer };
    answerVerification(VerificationParams, {
      onSuccess: () => {
        queryClient.setQueryData(['userToReset'],userName)
        navigate('/PasswordRecovery/Reset')
      },
    });
  };
  return (
    <>
 {!showQuestion ? <div className={"passwordRecovery"}>
      <p className={"RecoveryInfo"}>
        Please type down your User Name to get your recovery question
      </p>
      <div>
        <form
          onSubmit={handleSubmit((data) =>
            handleFetchQuestion(data.userNameRecovery)
          )}
        >
          <FormInput
            registerRequirements={register("userNameRecovery", {
              required: true,
              maxLength: 200,
              pattern: /^\S*$/,
            })}
            labelText="User Name"
            ValidationError={errors.userNameRecovery}
            customErrorMessages={userNameErrorMessages}
            fieldSize={{ width: 1 }}
          />
          {!isLoading ? (
            <Button type="submit" variant="contained" sx={{ m: 2 }}>
              get recovery Question
            </Button>
          ) : (
            <CircularProgress />
          )}
          <ErrorSnackbar
            isSnackBarOpen={showError}
            onSetisSnackBarOpen={setShowError}
            errorMessage="User Name doesnt exist"
          />
        </form>
      </div>
    </div>:
        <div className="passwordRecovery">
        <p
          className={"RecoveryInfo"}
        >{`Answer the recovery question to reset your password:`}</p>
        <p className={"RecoveryInfo"}>{recoveryQuestion?.data}</p>
        <div>
          <form
            onSubmit={handleSubmitAnswer((data) =>
              handleAnswerVerification(data.recoveryAnswer)
            )}
          >
            <FormInput
              registerRequirements={registerAnswer("recoveryAnswer", {
                required: true,
              })}
              labelText="your answer"
              ValidationError={answerErrors.recoveryAnswer}
              customErrorMessages={recoveryErrorMessage}
              fieldSize={{ width: 1 }}
            />
    { !isVerifying?<Button type="submit" variant="contained" sx={{ m: 2 }}>
    get recovery Question</Button>:<CircularProgress />}
    <ErrorSnackbar
              isSnackBarOpen={showVerifyError}
              onSetisSnackBarOpen={setshowVerifyError}
              errorMessage="Incorrect answer"
            />
          </form>
        </div>
      </div>}

    </>
  );
}
