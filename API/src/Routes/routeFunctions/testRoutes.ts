import { addNewTest, deleteAllUsersTests, deleteTest, getAllTests, getTest, updateTest } from "../../DBmanagment/user_tests";
import { Request, Response } from "express";
import status from "http-status";


const createNewTest=async (req:Request, res:Response) => {
    const userName = req.params.userName;
    const test = req.body;
    const newTest = await addNewTest(test, userName);
    console.log(userName);
    if (newTest) {
      res.send(newTest);
    } else if (newTest === null) {
      console.log("validation failed or account doesnt exist");
      res.statusCode = status.BAD_REQUEST;
      res
        .status(400)
        .send(
          `status ${res.statusCode} missing minimal amount questions or answers`
        );
    }
  }
  const readAllTests=async (req:Request, res:Response) => {
    const masterPassword = (req.headers.password as string) || "";
    const allTests = await getAllTests(masterPassword);
    if (allTests === null) {
      res.statusCode = status.UNAUTHORIZED;
      console.log("Access to all tests denied");
      res
        .status(401)
        .send(` status ${res.statusCode} Access to all test data denied`);
    } else if (allTests.length > 0) {
      res.send(allTests);
    } else {
      res.statusCode = status.NOT_FOUND;
      res.status(404).send(` status ${res.statusCode} no results found`);
    }
  }
  const readAllUserTests=async (req:Request, res:Response) => {
    const userName = req.params.userName;
    try {
      if (userName) {
        const allUserTests = await getAllTests('',userName);
        if (allUserTests) {
          console.log(`get all tests of user ${userName}`);
          res.send(allUserTests);//here it crashes
        } else {
          res.statusCode = status.NOT_FOUND;
          res.status(404).send(` status ${res.statusCode} user has no tests`);
        }
      } else {
        res.statusCode = status.BAD_REQUEST;
        res.status(400).send(`status ${res.statusCode} Incorrect input`);
      }
    } catch (error) {
      res.statusCode = status.INTERNAL_SERVER_ERROR;
      console.log(error);
      res.status(500).send(`${res.statusCode} Internal server Error`);
    }
  }
  const readSpecificTestOfUser=async (req:Request, res:Response) => {
    const testId = req.params.testId;
    const userName = req.params.userName;
    try {
      if (userName) {
        const specificTest = await getTest(userName, testId);
        if (specificTest) {
          console.log(`Test ${specificTest.Id}' of user ${userName}`);
          res.send(specificTest);
        } else {
          res.statusCode = status.NOT_FOUND;
          res.status(404).send(` status ${res.statusCode} Test doesnt exist`);
        }
      } else {
        res.statusCode = status.BAD_REQUEST;
        res.status(400).send(`status ${res.statusCode} Incorrect input`);
      }
    } catch (error) {
      res.statusCode = status.INTERNAL_SERVER_ERROR;
      console.log(error);
      res.status(500).send(`${res.statusCode} Internal server Error`);
    }
  }
  const updateSpecificTestOfUser=async (req:Request, res:Response) => {
    const newTest = req.body;
    const { userName,testId } = req.params;
    const updateInfo = await updateTest(userName,testId, newTest);
    if (updateInfo.matchedCount === 1) {
      if (updateInfo.matchedCount === 1) {
        if (updateInfo.modifiedCount === 1) {
          const updatedTest = await getTest(userName,testId);
          res.statusCode = status.OK;
          console.log(`updated Test: ${testId}`);
          res.send(updatedTest);
        } else {
          console.log("update matches the document,no update needed");
          res.statusCode = status.CONFLICT; //if no need for an update
          res
            .status(409)
            .send(
              `status ${res.statusCode}: update matches the document,no update needed`
            );
        }
      }
    } else {
      res.statusCode = status.NOT_FOUND;
      console.log(` status ${res.statusCode} Test not found`);
      res.status(404).send(` status ${res.statusCode} Test not found`);
    }
  }
  const deleteAllTestsOfUser=async (req:Request, res:Response) => {
    const userName = req.params.userName;
    const deletedAccount = await deleteAllUsersTests(userName);
    if (deletedAccount.deletedCount > 1) {
      res.statusCode = status.OK;
      res
        .status(200)
        .send(
          `status: ${res.statusCode} All user's ${userName} tests deleted`
        );
    } else {
      res.statusCode = status.NOT_FOUND;
      res.status(404).send("No tests found on this account");
    }
  }
  const deleteSpecificTestOfUser=async (req:Request, res:Response) => {
    const Account = req.params.userName;
    const testId = req.params.testId;
    const deletedAccount = await deleteTest(Account, testId);
    if (deletedAccount.deletedCount === 1) {
      res.statusCode = status.OK;
      res
        .status(200)
        .send(`status: ${res.statusCode} Test deleted succesfuly`);
    } else {
      res.statusCode = status.NOT_FOUND;
      res.status(404).send("Test not found and/or already deleted");
    }
  }
  export {createNewTest,readAllTests,readAllUserTests,readSpecificTestOfUser,updateSpecificTestOfUser,deleteAllTestsOfUser,deleteSpecificTestOfUser};