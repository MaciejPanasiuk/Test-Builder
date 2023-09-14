import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import { getAccountInfo } from "../../DBmanagment/user_account";
import { AuthRequest, userTokenInfo } from "common/Interfaces";

dotenv.config({ path: path.join(__dirname, "../../.env") });
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET ?? "";
const SECRET_REFRESH_KEY = process.env.REFRESH_TOKEN_SECRET ?? "";

const generateAccessToken = (user: userTokenInfo, res: Response) => {
  const token = jwt.sign(
    { userName: user.userName, isAdmin: user.isAdmin },
    SECRET_KEY,
    {
      expiresIn: "20m",
    }
  );
  res.cookie("accessToken", token, { httpOnly: true });
  return token;
};

const generateRefreshToken = (user: userTokenInfo, res: Response) => {
  const refreshToken = jwt.sign(
    { userName: user.userName, isAdmin: user.isAdmin },
    SECRET_REFRESH_KEY
  );
  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  return refreshToken;
};
const createToken = async (req: Request, res: Response) => {
  const { userName } = req.body;
  const user = await getAccountInfo(userName);
  if (user) {
    const accInfo = { isAdmin: user.isAdmin, userName: user.userName };
    const accessToken = generateAccessToken(accInfo, res);
    const refreshToken = generateRefreshToken(accInfo, res);
    return res.send({
      userName: user.userName,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } else {
    return res.status(400).send(`no user with that username`);
  }
};
const createTokenMiddleware = async (
  //middleware ver
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName } = req.params;
  const user = await getAccountInfo(userName);
  if (user) {
    const accInfo = { isAdmin: user.isAdmin, userName: user.userName };
    generateAccessToken(accInfo, res);
    generateRefreshToken(accInfo, res);
    console.log("tokens created");
    next();
  } else {
    res.status(400).send(`no user with that username`);
  }
};

const refreshToken = async (req: AuthRequest, res: Response) => {
  //new one

  const refreshToken: string = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send(`you are not authenticated!`);
  }
  jwt.verify(
    refreshToken,
    SECRET_REFRESH_KEY as string,
    (err: jwt.VerifyErrors | null, user) => {
      if (err || !user) {
        return res.status(403).send(`Refresh token verification failed`);
      }
      generateAccessToken(user as userTokenInfo, res);
      generateRefreshToken(user as userTokenInfo, res);
      if (req.headers.token === "ManualRefresh") {
        console.log("refreshing tokens manualy");
        return res.send("Tokens refreshed succesfuly");
      }
    }
  );
};

const verifyTokenMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies.accessToken;
  if (authToken) {
    jwt.verify(
      authToken,
      SECRET_KEY,
      async (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
          return res.status(403).send(`Token not valid`);
        }
        req.user = decodedToken as userTokenInfo;
        if (req.user.userName !== req.params.userName) {
          return res.status(403).send("Token doesnt match the user");
        }
        console.log(` token verified!`);
        const tokenExpirationTime = decodedToken?.exp * 1000;
        const currentTime = Date.now();
        const refreshTreshhold = 5 * 60 * 1000;
        console.log(
          `token time left ${
            tokenExpirationTime - currentTime
          }s, \n  refresh treshold: ${refreshTreshhold}s`
        );
        if (
          tokenExpirationTime &&
          tokenExpirationTime - currentTime <= refreshTreshhold
        ) {
          console.log("refreshing Token");
          await refreshToken(req, res);
        } else {
          console.log("no refreshing needed");
        }

        next();
      }
    );
  } else {
    console.log("token doesnt exist or is incorrect");
    res.status(401).send(`You are not authenticated!`);
  }
};
const logOut = async (_req: AuthRequest, res: Response) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  console.log(`logged out succesfuly and cleared tokens`);
  return res.status(200).send("you logged out succesfuly!");
};

export {
  createToken,
  createTokenMiddleware,
  verifyTokenMiddleware,
  refreshToken,
  logOut,
};
// const refreshToken = async (req: AuthRequest, res: Response) => {
//   const refreshToken:string = req.body.token;
//   if (!refreshToken) return res.status(401).send(`status ${res.statusCode}you are not authenticated!`);
//   if (req.cookies.refreshToken!==refreshToken) {
//     return res.status(403).send(`status ${res.statusCode}Refresh token not valid`);
//   }
//   else {
//     jwt.verify(
//     refreshToken,
//       SECRET_REFRESH_KEY as string,
//       (err: jwt.VerifyErrors | null, user) => {
//         if (err || !user) {
//             return res.status(403).send(`status ${res.statusCode} Refresh token verification failed`);
//           }
//         const newAccessToken = generateAccessToken(user as userTokenInfo,res);
//         const newRefreshToken = generateRefreshToken(user as userTokenInfo,res);
//         res.status(200).send({
//           accessToken: newAccessToken,
//           refreshToken: newRefreshToken,
//         });
//       });
//   }
// };
// const verifyToken = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(
//       token,
//       SECRET_KEY,
//       (
//         err: jwt.VerifyErrors | null,
//         user: userTokenInfo | string | jwt.JwtPayload | undefined
//       ) => {
//         if (err) {
//           return res
//             .status(403)
//             .send(`status ${res.statusCode} Token not valid`);
//         }
//         req.user = user as userTokenInfo;
//         console.log(` token verified!`);
//         next();
//       }
//     );
//   } else {
//     res.status(401).send(`status ${res.statusCode}You are not authenticated!`);
//   }
// };
