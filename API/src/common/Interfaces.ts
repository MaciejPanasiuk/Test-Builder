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
    createdAt?:Date;
    updatedAt?:Date;
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
    createdAt?:Date;
    updatedAt?:Date;
  }
  export interface userTokenInfo{
      isAdmin:boolean;
      userName:string;
      accessToken?:string
  }
  export interface LoginResponse{
    _id:string
    userName: string;
    supportQuestion: string;
    supportAnswer: string;
    creationTime?:Date;
    accessToken?:string;
    refreshToken?:string

  }
  export interface AuthRequest extends Request {
    user?: userTokenInfo;
    accessToken?: any;
  }