import { Request } from "express";

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
    owner:string;
    questions:Array<QuestionCont>
  }
  export interface TitleType{
    titleText: string;
    isActive: boolean;
  }
  export interface UserAccount {
    _id:string
    isAdmin: boolean;
    userName: string;
    password: string;
    supportQuestion: string;
    supportAnswer: string;
    creationTime?:Date;
    updateTime?:Date;
  }
  export interface userTokenInfo{
      isAdmin:boolean;
      userName:string;
      accessToken?:string
  }
  export interface AuthRequest extends Request {
    user?: userTokenInfo 
  }