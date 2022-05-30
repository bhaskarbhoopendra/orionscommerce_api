import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissingException from "../excpetions/authenticationTokenMissingException";
import WrongAuthenticationTokenException from "../excpetions/wrongAuthenticationTokenException";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import StatusOfVendorEnum from "../vendor/enums.vendor";
import VendorModel from "../vendor/vendor.model";

async function adminMiddleware(
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

      const user = await VendorModel.findById(id);
      if (user && user.isConfirmedvendor == StatusOfVendorEnum.CONFIRMED) {
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

export default adminMiddleware;
