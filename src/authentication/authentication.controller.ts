import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction, Router } from "express";
import * as jwt from "jsonwebtoken";
import WrongCredentialsException from "../excpetions/wrongCredentialsException";
import Controller from "../interfaces/controller.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import TokenData from "../interfaces/takenData.interface";
// import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "../user/user.dto";
import User from "../user/user.interface";
import userModel from "../user/user.model";
import AuthenticationService from "./authentication.service";
import LogInDto from "./login.dto";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = Router();
  public authenticationService = new AuthenticationService();
  public user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      // validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      // validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private registration = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = request.body;
    try {
      const { cookie, user } = await this.authenticationService.register(
        userData
      );
      response.setHeader("Set-Cookie", [cookie]);
      response.send(user);
    } catch (error) {
      next(error);
    }
  };

  private loggingIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.get("password", null, { getters: false })
      );
      if (isPasswordMatching) {
        const tokenData = this.createToken(user);
        response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
        response.send({ tokenData, user });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private loggingOut = (request: Request, response: Response) => {
    response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
    response.sendStatus(200).send("Logged Out");
  };

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const { JWT_SECRET } = process.env;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
    };
  }
}

export default AuthenticationController;
