import { AuthRequest, LoginResponse } from "common/Interfaces";
import {
  addNewAccount,
  deleteAccountFromDB,
  getAccountInfo,
  getAllAccounts,
  patchAccountInfo,
  validateAnswer,
} from "../../DBmanagment/user_account";
import { Request, Response } from "express";
import status from "http-status";
import bcrypt from "bcrypt";
import pick from 'lodash.pick'
import { generateAccessToken, generateRefreshToken } from "./authentication";

const createNewUser = async (req: Request, res: Response) => {
  const newAccountInfo = req.body;
  const saltRounds = 10;
  newAccountInfo.password = await bcrypt.hash(
    newAccountInfo.password,
    saltRounds
  );
  const newAccount = await addNewAccount(newAccountInfo);
  if (newAccount) {
    const responseInfo=pick(newAccount,'_id','userName','supportQuestion','supportAnswer','creationTime')
    res.send(responseInfo);
  } else if (newAccount === null) {
    console.log("validation failed");
    res.statusCode = status.BAD_REQUEST;
    res.status(400).send(`User name taken`);
  }
};
const validateRecoveryAnswer = async (req: Request, res: Response) => {
  const userName = req.params.userName;
  const { supportAnswer } = req.body;
  const isAnswerValidated = await validateAnswer(userName,supportAnswer);
  if(isAnswerValidated===null){
    res.statusCode = status.NOT_FOUND;
    res.status(404).send(`account doesnt exist`);}
    else if (isAnswerValidated) {
    res.send('answer correct');
  } else 
{    console.log("validation failed");
    res.statusCode = status.UNAUTHORIZED;
    res.status(401).send(`answer incorrect`);}
  };
const readAllAccountsInfo = async (req: Request, res: Response) => {
  const masterPassword = (req.headers.password as string) || "";
  const users = await getAllAccounts(masterPassword);
  if (users === null) {
    res.statusCode = status.UNAUTHORIZED;
    console.log("Access to all data denied");
    res.status(401).send(`Access to all data denied`);
  } else if (users.length > 0) {
    res.send(users);
  } else {
    res.statusCode = status.NOT_FOUND;
    res.status(404).send(`no results found`);
  }
};
// const readAccountInfo = async (req: Request, res: Response) => {//jwt cookies ver
//   try {
//     const userName = req.params.userName;
//     const { password } = req.body;
//     if (userName) {
//       const accountInfo = await getAccountInfo(userName);
//       if (accountInfo) {
//         const isPassCorrect = bcrypt.compareSync(
//           password,
//           accountInfo.password
//         );
//         if (isPassCorrect) {
//           console.log(`password correct`);
//           const responseInfo=pick(accountInfo,'_id','userName','supportQuestion','supportAnswer','creationTime')
//           res.send(responseInfo);
//         } else {
//           console.log(`password incorrect`);
//           res.status(401).send(`incorrect password`);
//         }
//       } else {
//         res.statusCode = status.NOT_FOUND;
//         res.status(404).send(`account doesnt exist`);
//       }
//     } else {
//       res.statusCode = status.BAD_REQUEST;
//       res.status(400).send(`Incorrect input`);
//     }
//   } catch (error) {
//     res.statusCode = status.INTERNAL_SERVER_ERROR;
//     console.log(error);
//     res.status(500).send(`Internal server Error`);
//   }
// };
const readAccountInfo = async (req: Request, res: Response) => {//jwt cookies ver
  try {
    const userName = req.params.userName;
    const { password } = req.body;
    if (userName) {
      const accountInfo = await getAccountInfo(userName);
      if (accountInfo) {
        const isPassCorrect = bcrypt.compareSync(
          password,
          accountInfo.password
        );
        if (isPassCorrect) {
          console.log(`password correct`);
          const accessToken=generateAccessToken(accountInfo);
          const refreshToken=generateRefreshToken(accountInfo);
          const responseInfo:LoginResponse=pick(accountInfo,'_id','userName','supportQuestion','supportAnswer','createdAt','updatedAt')
          responseInfo.accessToken=accessToken;
          responseInfo.refreshToken=refreshToken;
          res.send(responseInfo);
        } else {
          console.log(`password incorrect`);
          res.status(401).send(`incorrect password`);
        }
      } else {
        res.statusCode = status.NOT_FOUND;
        res.status(404).send(`account doesnt exist`);
      }
    } else {
      res.statusCode = status.BAD_REQUEST;
      res.status(400).send(`Incorrect input`);
    }
  } catch (error) {
    res.statusCode = status.INTERNAL_SERVER_ERROR;
    console.log(error);
    res.status(500).send(`Internal server Error`);
  }
};
const readRecoveryQuestion = async (req: Request, res: Response) => {
  try {
    const userName = req.params.userName;
    if (userName) {
      const accountInfo = await getAccountInfo(userName);
      if (accountInfo) {
        res.send(accountInfo.supportQuestion)
      } else {
        res.statusCode = status.NOT_FOUND;
        res.status(404).send(`account doesnt exist`);
      }
    } else {
      res.statusCode = status.BAD_REQUEST;
      res.status(400).send(`Incorrect input`);
    }
  } catch (error) {
    res.statusCode = status.INTERNAL_SERVER_ERROR;
    console.log(error);
    res.status(500).send(`Internal server Error`);
  }
};

const updateAccountInfo = async (req: Request, res: Response) => {
  const newAccountInfo = req.body;
  const { userName } = req.params;
  if(newAccountInfo.password){
    const saltRounds = 10;
    newAccountInfo.password = await bcrypt.hash(
      newAccountInfo.password,
      saltRounds
    );
  }
  const updatedInfo = await patchAccountInfo(userName, newAccountInfo);
  if (updatedInfo.matchedCount === 1) {
    if (updatedInfo.matchedCount === 1) {
      //powinien na początku sprawdzić czy filtrowanie znalazło doc, jeżeli nie rzucić błędem 404, ew poinformować statusem o braku potrzeby modyfikacji
      if (updatedInfo.modifiedCount === 1) {
        const updatedUserInfo = await getAccountInfo(userName);
        res.statusCode = status.OK;
        console.log(`updated user: ${userName}`);
        const responseInfo=pick(updatedUserInfo,'_id','userName','supportQuestion','supportAnswer','creationTime')
        res.send(responseInfo);
      } else {
        console.log("update matches the document,no update needed");
        // res.statusCode = status.CONFLICT; //if no need for an update
        res.status(304).send(`update matches the document,no update needed`);
      }
    }
  } else {
    res.statusCode = status.NOT_FOUND;
    console.log(`User not found`);
    res.status(404).send(` User not found`);
  }
};
const deleteAccount = async (req: AuthRequest, res: Response) => {
  const userName = req.params.userName;
  if (req.user && (userName === req.user.userName || req.user.isAdmin)) {
    //quick authentication comparing to the token
    const deletedAccount = await deleteAccountFromDB(userName);
    if (deletedAccount.deletedCount === 1) {
      res.statusCode = status.OK;
      res
        .status(200)
        .send(`Account deleted succesfuly`);
    } else {
      res.statusCode = status.NOT_FOUND;
      res.status(404).send("Account not found and/or already deleted");
    }
  } else {
    res.status(403).send("modification prohibited");
  }
};
export {
  createNewUser,
  validateRecoveryAnswer,
  readAllAccountsInfo,
  readAccountInfo,
  updateAccountInfo,
  deleteAccount,
  readRecoveryQuestion
};

