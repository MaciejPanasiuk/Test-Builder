import mongoose, { Schema } from "mongoose";
import {
  UserAccount,
  AnswerCont,
  QuestionCont,
  TitleType,
  TestCont,
} from "../common/Interfaces";
// import "dotenv/config";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path:path.join(__dirname,'../.env')})

const TitleTypeSchema = new Schema<TitleType>(
  {
    titleText: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
  { _id: false }
);
const AnswerSchema = new Schema<AnswerCont>(
  {
    Id: { type: String, required: true },
    answerText: { type: String, required: true },
  },
  { _id: false }
);

const QuestionSchema = new Schema<QuestionCont>(
  {
    Id: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    questionText: { type: String, required: true },
    answers: [AnswerSchema],
  },
  { _id: false }
);

export const TestSchema = new Schema<TestCont>({
  Id: { type: String, required: true },
  owner: { type: String, required: true },
  title: TitleTypeSchema,
  questions: [QuestionSchema],
},{timestamps: true});
export const UserSchema = new Schema<UserAccount>({
  isAdmin: {
    type: Boolean,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  supportQuestion: {
    type: String,
    required: true,
  },
  supportAnswer: {
    type: String,
    required: true,
  },
  // creationTime: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updateTime: {
  //   type: Date,
  // }
},{timestamps: true});
const userCollection: string = process.env.DB_USERS_COLLECTION_NAME ?? "";
const testsCollection: string = process.env.DB_TESTS_COLLECTION_NAME ?? "";
export const UserModel = mongoose.model(userCollection, UserSchema);
export const TestModel = mongoose.model(testsCollection, TestSchema);
