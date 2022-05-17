import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissingException from "../excpetions/authenticationTokenMissingException";
import WrongAuthenticationTokenException from "../excpetions/wrongAuthenticationTokenException";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import userModel from "../user/user.model";

async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  //   const cookies = request.cookies;
  //   console.log("------------");
  //   console.log(request.headers["auth"]);
  //   console.log("------------");
  //   if (cookies && cookies.Authorization) {
  //     const { JWT_SECRET } = process.env;
  //     try {
  //       const verificationResponse = jwt.verify(
  //         cookies.Authorization,
  //         `${JWT_SECRET}`
  //       ) as DataStoredInToken;
  //       const id = verificationResponse._id;
  //       const user = await userModel.findById(id);
  //       if (user) {
  //         request.user = user;
  //         next();
  //       } else {
  //         next(new WrongAuthenticationTokenException());
  //       }
  //     } catch (error) {
  //       next(new WrongAuthenticationTokenException());
  //     }
  //   } else {
  //     next(new AuthenticationTokenMissingException());
  //   }

  //Get the jwt token from the head
  const token = <string>req.headers["auth"];
  let jwtPayload;
  const { JWT_SECRET } = process.env;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, `${JWT_SECRET}`);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  //   const { userId, username } = jwtPayload;
  //   const newToken = jwt.sign({ userId, username }, `${JWT_SECRET}`, {
  //     expiresIn: "1h",
  //   });
  //   res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
}

export default authMiddleware;
