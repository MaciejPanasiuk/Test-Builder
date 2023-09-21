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
    _id?:string;
    Id?: string;
    title:TitleType;
    createdAt?:Date;
    updatedAt?:Date;
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
    createdAt?:Date;
    updatedAt?:Date;
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
