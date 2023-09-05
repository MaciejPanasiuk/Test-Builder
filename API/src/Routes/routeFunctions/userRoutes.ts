import { AuthRequest } from "common/Interfaces";
import {
  addNewAccount,
  deleteAccountFromDB,
  getAccountInfo,
  getAllAccounts,
  patchAccountInfo,
} from "../../DBmanagment/user_account";
import { Request, Response } from "express";
import status from "http-status";
import bcrypt from "bcrypt";

const createNewUser = async (req: Request, res: Response) => {
  const newAccountInfo = req.body;
  const saltRounds = 10;
  newAccountInfo.password = await bcrypt.hash(
    newAccountInfo.password,
    saltRounds
  );
  const newAccount = await addNewAccount(newAccountInfo);
  if (newAccount) {
    res.send(newAccount);
  } else if (newAccount === null) {
    console.log("validation failed");
    res.statusCode = status.BAD_REQUEST;
    res.status(400).send(`status ${res.statusCode} userName taken`);
  }
};
const readAllAccountsInfo = async (req: Request, res: Response) => {
  const masterPassword = (req.headers.password as string) || "";
  const users = await getAllAccounts(masterPassword);
  if (users === null) {
    res.statusCode = status.UNAUTHORIZED;
    console.log("Access to all data denied");
    res.status(401).send(` status ${res.statusCode} Access to all data denied`);
  } else if (users.length > 0) {
    res.send(users);
  } else {
    res.statusCode = status.NOT_FOUND;
    res.status(404).send(` status ${res.statusCode} no results found`);
  }
};
const readAccountInfo = async (req: Request, res: Response) => {
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
          res.send(accountInfo);
        } else {
          console.log(`password incorrect`);
          res.status(401).send(` status ${res.statusCode} incorrect password`);
        }
      } 
      else {
        res.statusCode = status.NOT_FOUND;
        res.status(404).send(` status ${res.statusCode} account doesnt exist`);
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
};
const updateAccountInfo = async (req: Request, res: Response) => {
  const newAccountInfo = req.body;
  const { userName } = req.params;
  const updatedInfo = await patchAccountInfo(userName, newAccountInfo);
  if (updatedInfo.matchedCount === 1) {
    if (updatedInfo.matchedCount === 1) {
      //powinien na początku sprawdzić czy filtrowanie znalazło doc, jeżeli nie rzucić błędem 404, ew poinformować statusem o braku potrzeby modyfikacji
      if (updatedInfo.modifiedCount === 1) {
        const updatedUserInfo = await getAccountInfo(userName);
        res.statusCode = status.OK;
        console.log(`updated user: ${userName}`);
        res.send(updatedUserInfo);
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
    console.log(` status ${res.statusCode} User not found`);
    res.status(404).send(` status ${res.statusCode} User not found`);
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
        .send(`status: ${res.statusCode} Account deleted succesfuly`);
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
  readAllAccountsInfo,
  readAccountInfo,
  updateAccountInfo,
  deleteAccount,
};
