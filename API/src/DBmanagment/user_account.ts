
import { UserModel } from "../schemas/Schemas";
import { UserAccount } from "common/Interfaces";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path:path.join(__dirname,'../.env')})

async function addNewAccount(loginInput: UserAccount) {
    try {
      const userCount = await UserModel.countDocuments({
        userName: loginInput.userName,
      });
      if (userCount > 0) {
        console.log(`User with username ${loginInput.userName} already exists.`);
        return null;
      }
      const newUser = new UserModel(loginInput);
      const saveNewUser = await newUser.save();
      return saveNewUser;
    } catch (error) {
      if (error) {
        console.log(error);
        return null;
      }
    }
  }
  async function getAllAccounts(password: string) {
    if (password === process.env.DB_USERS_PASSWORD) {
      return await UserModel.find();
    } else return null;
  }
  async function getAccountInfo(loginInput: string) {
    return await UserModel.findOne({ userName: loginInput});
  }
  async function validateAnswer(loginInput: string, supportAnswer:string) {
    const accountInfo= await UserModel.findOne({ userName: loginInput});
    if(accountInfo)
    return accountInfo.supportAnswer===supportAnswer;
  else{
    return null;
  }
  }
  async function patchAccountInfo(loginInput: string,updates:UserAccount){
    return await UserModel.updateOne({ userName: loginInput }, { $set: updates });
  }
  async function deleteAccountFromDB(loginInput: string){
    console.log(`Deleting Account of user : ${loginInput}`);
    return await UserModel.deleteOne({ userName: loginInput });
  }
  export {
    addNewAccount,
    getAllAccounts,
    getAccountInfo,
    patchAccountInfo,
    deleteAccountFromDB,
    validateAnswer,
  };