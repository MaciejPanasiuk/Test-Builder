import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import { getAccountInfo } from "../../DBmanagment/user_account";
import { AuthRequest, userTokenInfo } from "common/Interfaces";


dotenv.config({ path: path.join(__dirname, "../../.env") });
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET ?? "";
const SECRET_REFRESH_KEY = process.env.REFRESH_TOKEN_SECRET ?? "";

const generateAccessToken = (user: userTokenInfo,res:Response) => {
  const token= jwt.sign(
    { userName: user.userName, isAdmin: user.isAdmin },
    SECRET_KEY,
    {
      expiresIn: "15m",
    }
  );
  res.cookie("token", token, {httpOnly: true,});
  return token;
};

const generateRefreshToken = (user: userTokenInfo,res: Response) => {
  const refreshToken = jwt.sign(
    { userName: user.userName, isAdmin: user.isAdmin },
    SECRET_REFRESH_KEY
  );
  res.cookie("refreshToken", refreshToken, {httpOnly: true,});

  return refreshToken;
};
const createToken = async (req: Request, res: Response) => {
  const { userName } = req.body;
  const user = await getAccountInfo(userName);
  if (user) {
    const accInfo = { isAdmin: user.isAdmin, userName: user.userName };
    const accessToken = generateAccessToken(accInfo,res);
    const refreshToken = generateRefreshToken(accInfo,res);
    res.send({ userName: user.userName, isAdmin: user.isAdmin, accessToken,refreshToken });
  } else {
    res.status(400).send(`status ${res.statusCode}username or incorrect`);
  }
};

const refreshToken = async (req: AuthRequest, res: Response) => {
  const refreshToken:string = req.body.token;
  if (!refreshToken) return res.status(401).send(`status ${res.statusCode}you are not authenticated!`);
  if (req.cookies.refreshToken!==refreshToken) {
    return res.status(403).send(`status ${res.statusCode}Refresh token not valid`);
  } 
  else {
    jwt.verify(
    refreshToken,
      SECRET_REFRESH_KEY as string,
      (err: jwt.VerifyErrors | null, user) => {
        if (err || !user) {
            return res.status(403).send(`status ${res.statusCode} Refresh token verification failed`);
          }
        const newAccessToken = generateAccessToken(user as userTokenInfo,res);
        const newRefreshToken = generateRefreshToken(user as userTokenInfo,res);
        res.status(200).send({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      });
  }
};

const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err: jwt.VerifyErrors | null, user:userTokenInfo | string |jwt.JwtPayload | undefined) => {
      if (err) {
        return res.status(403).send(`status ${res.statusCode} Token not valid`);
      }
      req.user  = user as userTokenInfo;
      console.log(` token verified!`);
      next();
    });
  } else {
    res.status(401).send(`status ${res.statusCode}You are not authenticated!`);
  }
};
const logOut = async(_req: AuthRequest, res: Response)=>{
    res.clearCookie("refreshToken")
    res.clearCookie("token")
    console.log(`logged out succesfuly and cleared tokens`)
    res.status(200).send("you logged out succesfuly!")
}
 
export { createToken, verifyToken,refreshToken,logOut };
