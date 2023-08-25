

import mongoose, { ConnectOptions } from "mongoose";
import { UserModel } from "../schemas/Schemas";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path:path.join(__dirname,'../.env')})
const connectionString: string = process.env.CONNECTION_STRING ?? "";

async function initDB() {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  } as ConnectOptions);
}
async function isPasswordCorrect(loginInput: string, passwordInput: string) {
  const user = await UserModel.findOne({ userName: loginInput });
  if (user) {
    return user.password === passwordInput;
  } else {
    return null; //when user is not registered
  }
}
async function doesUserExist(loginInput:string){
  const doesExist=await UserModel.findOne({ userName: loginInput })
  if(doesExist)
  return doesExist;
else return null;//to avoid saving Test with non-existant owner
}

export {
  initDB,
  isPasswordCorrect,
  doesUserExist,
};
