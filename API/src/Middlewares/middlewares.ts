import { doesUserExist, isPasswordCorrect } from "../DBmanagment/DBprimary";
import status from "http-status";
import { NextFunction, Request, Response } from "express";


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
      .send(`status ${res.statusCode} Cannot create an empty Test or Account`);
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
      res.status(404).send(`Status ${res.statusCode} Saving failed. User doesnt exist`);
  }else if (ownerCheck) {
    next();}


}

export { AuthMiddleware,isBodyEmptyMiddleware,OwnerExistenceCheckMiddleware };
