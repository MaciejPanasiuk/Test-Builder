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
    Id?: string;
    title:TitleType;
    creationTime?:Date;
    updateTime?:Date;
    owner?:string;
    questions:Array<QuestionCont>
  }
  export interface TitleType{
    titleText: string;
    isActive: boolean;
  }
  export interface UserAccount {
    Id: string;
    userName: string;
    password: string;
    supportQuestion: string;
    supportAnswer: string;
    creationTime?:Date;
    updateTime?:Date;
  }
export interface Validators{
    required?: string;
    maxLength?: string;
    pattern?: string;
}
export interface RegisterParams{
  userName: string;
  password: string;
  supportQuestion: string;
  supportAnswer: string;
}
export interface LoginParams{
  userName:string;
  password:string;
}
