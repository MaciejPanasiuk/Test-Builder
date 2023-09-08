import { TestModel } from "../schemas/Schemas";
import { TestCont } from "common/Interfaces";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path:path.join(__dirname,'../.env')})

async function addNewTest(testInput: TestCont, loginInput: string) {
    const newTest=new TestModel({...testInput,owner:loginInput})
  try{
    const saveResult = await newTest.save();
      console.log(`added new Test to DB ${saveResult.Id}`);
      return saveResult;
  } catch (error:any) {
    if (error.errors) {
      console.log(error.errors);
      return null;
    }
  }
  }
  async function getAllTests(password='',loginInput='') {
    if (password === process.env.DB_USERS_PASSWORD) {
      return await TestModel.find();
    } 
    else if(loginInput){
      return await TestModel.find({owner:loginInput});
    }
    else return null;
  }
  async function getTest(loginInput: string,testId:string){
    return await TestModel.findOne({ owner: loginInput,Id:testId });
  }
  async function updateTest(loginInput: string,testId:string,updates:TestCont){//nested things dont update
    const updateclone=structuredClone(updates)
    // return await TestModel.updateOne({ owner: loginInput },updateclone);
    return await TestModel.updateOne({ owner: loginInput ,Id:testId },{$set:updateclone});
  }
  async function deleteTest(loginInput: string,testId:string){
    console.log(`Deleting Test of user : ${loginInput}`);
    return await TestModel.deleteOne({Id:testId });
  }
  async function deleteAllUsersTests(loginInput:string){
    return await TestModel.deleteMany({ owner: loginInput});
  }
  export {
    getAllTests,
    getTest,
    addNewTest,
    updateTest,
    deleteTest,
    deleteAllUsersTests,
  };