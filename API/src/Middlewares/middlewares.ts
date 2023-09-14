import { doesUserExist, isPasswordCorrect } from "../DBmanagment/DBprimary";
import status from "http-status";
import { NextFunction, Request, Response } from "express";
import { getAccountInfo } from "../DBmanagment/user_account";
import bcrypt from "bcrypt";


const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization ?? "";
  const userNameFromParams = req.params.userName;
  if (token) {
    const [userName, password] = token.split(":");
    if (userNameFromParams !== userName) {
      res.status(400).send(` status ${res.statusCode} params dont match auth`);
    } else {
      const isUserVerified = await isPasswordCorrect(userName, password);

      if (isUserVerified === null) {
        res.statusCode = status.UNAUTHORIZED;
        console.log(`User not found, auth failed`);
        res
          .status(401)
          .send(
            ` status ${res.statusCode} modification/deleting prohibited, you must be a registered user`
          );
      } else if (isUserVerified) {
        console.log(`access granted! `);
        next();
      } else {
        res.statusCode = status.UNAUTHORIZED;
        console.log(`Auth failed ${token}`);
        res
          .status(401)
          .send(
            `status:${res.statusCode} Credentials invalid, modification/deleting prohibited`
          );
      }
    }
  } else {
    res.statusCode = status.UNAUTHORIZED;
    console.log("Auth failed");
    res.status(401).send(`status:${res.statusCode} Missing token`);
  }
};
const isBodyEmptyMiddleware  = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Object.keys(req.body).length !== 0){
    next();
  }
  else{
    console.log("request body empty");
    res.statusCode = status.BAD_REQUEST;
    res
      .status(400)
      .send(`request body is empty`);
  }
}
const OwnerExistenceCheckMiddleware=async(  req: Request,
  res: Response,
  next: NextFunction)=>{
  const ownerInput=req.params.userName;
  const ownerCheck=await  doesUserExist(ownerInput);
  if(ownerCheck===null){
    res.statusCode = status.NOT_FOUND;
      console.log("User not found");
      res.status(404).send(`User doesnt exist`);
  }else if (ownerCheck) {
    next();}


}
const isOldAndNewTheSameMiddleware=async(  req: Request,
  res: Response,
  next: NextFunction)=>{
    const {password}=req.body;
    const { userName } = req.params;
    const oldAccountInfo=await getAccountInfo(userName)
    if(oldAccountInfo){
      const doPasswordsMatch=bcrypt.compareSync(
        password,
        oldAccountInfo.password
      );
      if(doPasswordsMatch)
{      console.log('old and new passwords match')
      res.status(304)
      res.send('new password cannot be the same as old password')}
      else{
        next()
      }
    }
    else{
      res.statusCode = status.NOT_FOUND;
      res.status(404).send(`account doesnt exist`);
    }
    
  }

export { AuthMiddleware,isBodyEmptyMiddleware,OwnerExistenceCheckMiddleware,isOldAndNewTheSameMiddleware };
