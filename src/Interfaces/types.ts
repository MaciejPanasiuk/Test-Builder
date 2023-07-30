import { Dispatch, SetStateAction } from "react";
import { AnswerCont, QuestionCont } from "./Interfaces";

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
  export type DeleteProps = {
    currItem: AnswerCont|QuestionCont;
    onSetItem: Dispatch<SetStateAction<AnswerCont[]>>| Dispatch<SetStateAction<QuestionCont[]>>;
    btn_size?: 'small' | 'medium' | 'large';
  };
  export type EditProps = {
    currentQuestion: QuestionCont;
    selectedQuestion:QuestionCont;
    onSetTest: Dispatch<SetStateAction<QuestionCont[]>>;
    onAnswerSelect: Dispatch<SetStateAction<AnswerCont>>;
    onQuestionSelect: Dispatch<SetStateAction<QuestionCont>>;
    onAnswersListSelect: Dispatch<SetStateAction<AnswerCont[]>>;
    btn_size?: 'small' | 'medium' | 'large';
  };
  export type AddProps={
    listItemIndex:number;
    onSetItem: Dispatch<SetStateAction<AnswerCont[]>>| Dispatch<SetStateAction<QuestionCont[]>>;
    getSampleData: () => AnswerCont | QuestionCont;
    btn_size?: 'small' | 'medium' | 'large';
    btn_label?:string
  }
  export type inputData=AnswerCont|QuestionCont;