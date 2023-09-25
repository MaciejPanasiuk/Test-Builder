import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import { getAccountInfo } from "../../DBmanagment/user_account";
import { AuthRequest, userTokenInfo } from "common/Interfaces";

dotenv.config({ path: path.join(__dirname, "../../.env") });
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET ?? "";
const SECRET_REFRESH_KEY = process.env.REFRESH_TOKEN_SECRET ?? "";

const generateAccessToken = (user: userTokenInfo) => {
  const token = jwt.sign(
    { userName: user.userName, isAdmin: user.isAdmin },
    SECRET_KEY,
    {
      expiresIn: "15m",
    }
  );
  return token;
};

const generateRefreshToken = (user: userTokenInfo) => {
  const refreshToken = jwt.sign(
    { userName: user.userName, isAdmin: user.isAdmin },
    SECRET_REFRESH_KEY,
    {
      expiresIn: "7d",
    }
  );

  return refreshToken;
};

const createTokenMiddleware = async (
  //middleware ver
  req: Request,
  res: Response
) => {
  const { userName } = req.params;
  const user = await getAccountInfo(userName);
  if (user) {
    const accInfo = { isAdmin: user.isAdmin, userName: user.userName };
    generateAccessToken(accInfo);
    generateRefreshToken(accInfo);
    console.log("tokens created");
  } else {
    res.status(400).send(`no user with that username`);
  }
};

const refreshTokenMiddleware = async (req: AuthRequest, res: Response) => {
  //new one
  const authRefresh = req.headers.auth_refresh;
  if (!authRefresh) {
    return res.status(401).send(`you are not authenticated!`);
  }
  const refreshTokenString = authRefresh as string;
  const refreshToken = refreshTokenString.split(" ")[1];
  jwt.verify(
    refreshToken as string,
    SECRET_REFRESH_KEY as string,
    (err: jwt.VerifyErrors | null, user) => {
      if (err || !user) {
        return res.status(403).send(`Refresh token verification failed`);
      } else {
        const newAccessToken = generateAccessToken(user as userTokenInfo);
        res.status(200).send({
          accessToken: newAccessToken,
        });
      }
    }
  );
};


const verifyToken = async (req: AuthRequest, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(
      accessToken as string,
      SECRET_KEY,
      async (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err?.message === "invalid token") {
          console.log(err.message);
          return res.status(401).send(`Token not valid`);
        } else if (err?.message === "jwt expired") {
          console.log(`${err.message}, refreshing Token`);
          await refreshTokenMiddleware(req, res);
        } else {
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
            await refreshTokenMiddleware(req, res);
          } else {
            console.log("no refreshing needed");
            res.send({ accessToken: accessToken });
          }
        }
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
  generateAccessToken,
  generateRefreshToken,
  createTokenMiddleware,
  verifyToken,
  logOut,
};



// const verifyTokenMiddleware = async (//with http only
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authToken = req.cookies.accessToken;
//   console.log(req.cookies)
//   if (authToken) {
//     jwt.verify(
//       authToken,
//       SECRET_KEY,
//       async (err: jwt.VerifyErrors | null, decodedToken: any) => {
//         if (err?.message === "invalid token") {
//           console.log(err.message);
//           return res.status(401).send(`Token not valid`);
//         } else if (err?.message === "jwt expired") {
//           console.log(`${err.message}, refreshing Token`);
//           await refreshToken(req, res);
//         } else {
//           req.user = decodedToken as userTokenInfo;
//           if (req.user.userName !== req.params.userName) {
//             return res.status(403).send("Token doesnt match the user");
//           }
//           console.log(` token verified!`);
//           const tokenExpirationTime = decodedToken?.exp * 1000;
//           const currentTime = Date.now();
//           const refreshTreshhold = 5 * 60 * 1000;
//           console.log(
//             `token time left ${
//               tokenExpirationTime - currentTime
//             }s, \n  refresh treshold: ${refreshTreshhold}s`
//           );
//           if (
//             tokenExpirationTime &&
//             tokenExpirationTime - currentTime <= refreshTreshhold
//           ) {
//             console.log("refreshing Token");
//             await refreshToken(req, res);
//           } else {
//             console.log("no refreshing needed");
//           }
//         }

//         next();
//       }
//     );
//   } else {
//     console.log("token doesnt exist or is incorrect");
//     res.status(401).send(`You are not authenticated!`);
//   }
// };