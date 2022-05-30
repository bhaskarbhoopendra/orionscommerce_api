import { Router, Request, Response, NextFunction } from "express";
import LogInDto from "../authentication/login.dto";
import Controller from "../interfaces/controller.interface";
import CreatevendorDto from "./createvendor.dto";
import VendorAuthenticationService from "./vendor.authentication.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import VendorModel from "./vendor.model";
import WrongCredentialsException from "../excpetions/wrongCredentialsException";
import TokenData from "../interfaces/takenData.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import Ivendor from "./vendor.interface";

class VendorAuthenticationController implements Controller {
  public path = "/vendor";
  public router = Router();
  public vendor = VendorModel;
  public vendorAuthenticationService = new VendorAuthenticationService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.vendorRegister);
    this.router.post(`${this.path}/login`, this.vendorLogin);
  }

  private vendorRegister = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const vendorData: CreatevendorDto = request.body;
    try {
      const { cookie, vendor } =
        await this.vendorAuthenticationService.register(vendorData);
      response.setHeader("Set-Cookie", [cookie]);
      response.send(vendor);
    } catch (error) {
      next(error);
    }
  };

  private vendorLogin = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const logInData: LogInDto = request.body;
    const vendor = await this.vendor.findOne({ email: logInData.email });
    if (vendor) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        vendor.get("password", null, { getters: false })
      );
      if (isPasswordMatching) {
        const tokenData = this.createToken(vendor);
        response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
        response.send({ tokenData, user: vendor });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public createToken(vendor: Ivendor): TokenData {
    const expiresIn = 60 * 60; // an hour
    const { JWT_SECRET } = process.env;
    const dataStoredInToken: DataStoredInToken = {
      _id: vendor._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
    };
  }
}

export default VendorAuthenticationController;
