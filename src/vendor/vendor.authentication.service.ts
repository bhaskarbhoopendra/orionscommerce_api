import UserWithThatEmailAlreadyExistsException from "../excpetions/userWithThatEmailAlreadyExistsException";
import TokenData from "../interfaces/takenData.interface";
import CreatevendorDto from "./createvendor.dto";
import VendorModel from "./vendor.model";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import Ivendor from "./vendor.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";

class VendorAuthenticationService {
  public vendor = VendorModel;
  constructor() {}

  public async register(vendorData: CreatevendorDto) {
    if (await this.vendor.findOne({ email: vendorData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(vendorData.email);
    }
    const hashedPassword = await bcrypt.hash(vendorData.password, 10);
    const vendor = await this.vendor.create({
      ...vendorData,
      password: hashedPassword,
    });
    const tokenData = this.createToken(vendor);
    const cookie = this.createCookie(tokenData);

    return {
      cookie,
      vendor,
    };
  }
  public createCookie(tokenData: TokenData) {
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

export default VendorAuthenticationService;
