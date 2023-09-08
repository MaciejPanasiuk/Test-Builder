import { Dispatch, SetStateAction } from "react";
import { AnswerCont, QuestionCont, TestCont, TitleType } from "../../common/Interfaces";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { SxProps, Theme } from "@mui/material";



export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
export type SpanEvent = React.MouseEvent<HTMLSpanElement>;

export type QuestionProps = {
    currentQuestion: QuestionCont;
    selectedQuestion:QuestionCont;
    onQuestionSelect: Dispatch<SetStateAction<QuestionCont>>;
    onQuestionUpdate: Dispatch<SetStateAction<QuestionCont[]>>;
  };

export type AnswerProps = {
  currentAnswer: AnswerCont;
  selectedAnswer: AnswerCont;
  currentQuestion: QuestionCont;
  onAnswerSelect: Dispatch<SetStateAction<AnswerCont>>;
  onAnswerListUpdate: Dispatch<SetStateAction<AnswerCont[]>>;
  };
  export type titleProps={
    title:TitleType;
    onTitleUpdate:Dispatch<SetStateAction<TitleType>>;
  }
  export type ButtonProps={
    btn_size?: 'small' | 'medium' | 'large';
    btn_label?:string
    tooltip?:string;
  }
  export interface DeleteProps  {
    currItem: AnswerCont|QuestionCont;
    onSetItem: Dispatch<SetStateAction<AnswerCont[]>>| Dispatch<SetStateAction<QuestionCont[]>>;
  }
  export type EditProps = {
    currentQuestion: QuestionCont;
    selectedQuestion:QuestionCont;
    onSetTest: Dispatch<SetStateAction<QuestionCont[]>>;
    onAnswerSelect: Dispatch<SetStateAction<AnswerCont>>;
    onQuestionSelect: Dispatch<SetStateAction<QuestionCont>>;
    onAnswersListSelect: Dispatch<SetStateAction<AnswerCont[]>>;
  };
  export type AddProps={
    listItemIndex:number;
    onSetItem: Dispatch<SetStateAction<AnswerCont[]>>| Dispatch<SetStateAction<QuestionCont[]>>;
    getSampleData: () => AnswerCont | QuestionCont;
  }
  export type TestProps={
    currentTest:TestCont;
    isSubmitted:boolean;
    onSetIsSubmitted:Dispatch<SetStateAction<boolean>>;
  }
  export type LoaderProps={
    TestToLoad:TestCont;
  }
  export type ConvertProps={
    TestToConvert:TestCont
  }
  export type TestOptionsProps={
    currentTest:TestCont;
    isSubmitted:boolean;
    onSetTest: Dispatch<SetStateAction<QuestionCont[]>>;
    onSetTitle:Dispatch<SetStateAction<TitleType>>;
    onSetSelectedQuestion:Dispatch<SetStateAction<QuestionCont>>;
    onSetselectedAnswerList:Dispatch<SetStateAction<AnswerCont[]>>;
    onSetSelectedAnswer:Dispatch<SetStateAction<AnswerCont>>;
    onSetIsSubmitted:Dispatch<SetStateAction<boolean>>;
  }
  export type InputProps={
    registerRequirements:UseFormRegisterReturn<"userName"| "password"| "supportQuestion"| "supportAnswer">
    labelText:string;
  ValidationError:FieldError | undefined;
  serverError?:FieldError;
  customErrorMessages:any;//resolve this
  fieldSize?: SxProps<Theme> | undefined;
  }
  // export type TestOptionsProps={
  //   currentTest:TestCont;
  //   isSubmitted:boolean;
  //   onSetTest: Dispatch<SetStateAction<TestCont>>;
  //   onSetIsSubmitted:Dispatch<SetStateAction<boolean>>;
  // }
  export type inputData=AnswerCont|QuestionCont;