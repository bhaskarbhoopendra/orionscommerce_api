import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissingException from "../excpetions/authenticationTokenMissingException";
import WrongAuthenticationTokenException from "../excpetions/wrongAuthenticationTokenException";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import { Role } from "../user/roles.enum";
import userModel from "../user/user.model";

async function authMiddleware(
  request: RequestWithUser | any,
  response: Response,
  next: NextFunction
): Promise<void> {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const { JWT_SECRET } = process.env;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        `${JWT_SECRET}`
      ) as DataStoredInToken;
      const id = verificationResponse._id;

      const user = await userModel.findById(id);
      if (user && user.role == "ADMIN") {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;

// export function isAdmin(
//   request: RequestWithUser | any,
//   response: Response,
//   next: NextFunction
// ) {
//   if (request.user.role == "ADMIN") {
//     next();
//   }
// }
