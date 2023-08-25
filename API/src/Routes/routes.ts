import {
  AuthMiddleware,
  OwnerExistenceCheckMiddleware,
  isBodyEmptyMiddleware,
} from "../Middlewares/middlewares";
import express from "express";
import status from "http-status";
import path from "path";
import dotenv from "dotenv";
import {
  createNewUser,
  deleteAccount,
  readAccountInfo,
  readAllAccountsInfo,
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
import { createToken,logOut,refreshToken,verifyToken } from "./routeFunctions/authentication";
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
  app.post("/user/logOut",verifyToken,logOut)
  app.post(
    "/users/:userName/tests",
    isBodyEmptyMiddleware,
    OwnerExistenceCheckMiddleware,
    createNewTest
  );
  app.get("/tests", readAllTests);
  app.get("/users", readAllAccountsInfo);
  app.get(`/users/:userName`,verifyToken, readAccountInfo);
  app.get(`/users/:userName/tests/`, readAllUserTests);
  app.get(`/users/:userName/tests/:testId`, readSpecificTestOfUser);
  app.patch(
    `/users/:userName`,
    isBodyEmptyMiddleware,
    AuthMiddleware,
    updateAccountInfo
  );
  app.patch(
    `/users/:userName/tests/:testId`,
    isBodyEmptyMiddleware,
    updateSpecificTestOfUser
  );
  // app.delete(`/users/:userName`, AuthMiddleware, deleteAccount);  
  app.delete(`/users/:userName`, verifyToken, deleteAccount);
  app.delete(`/users/:userName/tests`, AuthMiddleware, deleteAllTestsOfUser);
  app.delete(`/users/:userName/tests/:testId`, deleteSpecificTestOfUser);
  app.get("/", async (_, res) => {
    res.send("Welcome to our Test API!");
  });
  app.all("*", async (_, res) => {
    console.log("404 error, page doesnt exist");
    res.status(status.NOT_FOUND).send("404 Not Found");
  });
}
