import {
  AuthMiddleware,
  OwnerExistenceCheckMiddleware,
  isBodyEmptyMiddleware,
  isOldAndNewTheSameMiddleware,
} from "../Middlewares/middlewares";
import express from "express";
import status from "http-status";
import path from "path";
import dotenv from "dotenv";
import {
  createNewUser,
  deleteAccount,
  validateRecoveryAnswer,
  readAccountInfo,
  readAllAccountsInfo,
  readRecoveryQuestion,
  updateAccountInfo,
} from "./routeFunctions/userRoutes";
import {
  createNewTest,
  deleteAllTestsOfUser,
  deleteSpecificTestOfUser,
  readAllTests,
  readAllUserTests,
  readSpecificTestOfUser,
  updateSpecificTestOfUser,
} from "./routeFunctions/testRoutes";
import { createToken,createTokenMiddleware,logOut,refreshToken, verifyTokenMiddleware } from "./routeFunctions/authentication";
dotenv.config({ path: path.join(__dirname, "../.env") });

// app.use(express.json());
export async function serverRoutes(app: express.Application) {
  app.get("/heartbeat", (_, res) => {
    const currentTime = new Date().toLocaleString();
    res.send(`Our local time is: ${currentTime}`);
  });
  app.post("/user/register", isBodyEmptyMiddleware, createNewUser);
  app.post("/user/createToken",createToken)
  app.post("/user/refreshToken",refreshToken)
  app.post("/user/logOut",verifyTokenMiddleware,logOut)
  app.post(
    "/users/:userName/tests",
    isBodyEmptyMiddleware,
    verifyTokenMiddleware,
    createNewTest
  );
  app.post(`/users/:userName`,OwnerExistenceCheckMiddleware, readAccountInfo,createTokenMiddleware);
  app.post('/users/:userName/verifyAnswer',validateRecoveryAnswer)
  app.get("/tests", readAllTests);
  app.get("/users", readAllAccountsInfo);
  app.get('/users/:userName/recovery',readRecoveryQuestion)
  app.get(`/users/:userName/tests/`,verifyTokenMiddleware, readAllUserTests);
  app.get(`/users/:userName/tests/:testId`,verifyTokenMiddleware, readSpecificTestOfUser);
  app.patch(
    `/users/:userName`,
    isBodyEmptyMiddleware,
    verifyTokenMiddleware,
    AuthMiddleware,
    updateAccountInfo
  );
  app.patch('/users/:userName/recovery',
  isBodyEmptyMiddleware,
  isOldAndNewTheSameMiddleware,
  updateAccountInfo
  )
  app.patch(
    `/users/:userName/tests/:testId`,
    isBodyEmptyMiddleware,
    updateSpecificTestOfUser
  );
  // app.delete(`/users/:userName`, AuthMiddleware, deleteAccount);  
  app.delete(`/users/:userName`, verifyTokenMiddleware, deleteAccount);
  app.delete(`/users/:userName/tests`, AuthMiddleware,verifyTokenMiddleware, deleteAllTestsOfUser);
  app.delete(`/users/:userName/tests/:testId`,verifyTokenMiddleware, deleteSpecificTestOfUser);
  app.get("/", async (_, res) => {
    res.send("Welcome to our Test API!");
  });
  app.all("*", async (_, res) => {
    console.log("404 error, page doesnt exist");
    res.status(status.NOT_FOUND).send("404 Not Found");
  });
}
//TODO
//add verify to every http req DONE
//refresh should get tokens from cookies DONE
//verify should get tokens from cookies DONE
//token endpoint should be called from the frontend during login ENDPOINT DONE
//tokens need to be unique for the user