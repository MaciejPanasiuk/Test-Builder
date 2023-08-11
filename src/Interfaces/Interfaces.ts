

export interface AnswerCont {
    Id: string;
    answerText: string;
  }
  export interface QuestionCont {
    Id: string;
    isActive?:boolean
    questionText: string;
    answers: Array<AnswerCont>;
  }
  export interface TestCont{
    Id: string;
    titleText:string;
    questions:QuestionCont
  }
  export interface TitleType{
    titleText: string;
    isActive: boolean;
  }