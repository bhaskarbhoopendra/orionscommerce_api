import UserWithThatEmailAlreadyExistsException from "../../excpetions/userWithThatEmailAlreadyExistsException";
import TokenData from "../../interfaces/takenData.interface";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import DataStoredInToken from "../../interfaces/dataStoredInToken.interface";
import AdminModel from "./admin.model";
import CreateAdminDto from "./createAdmin.dto";
import Iadmin from "./admin.interface";

class AdminauthenticateService {
  public admin = AdminModel;
  constructor() {}

  public async register(adminData: CreateAdminDto) {
    if (await this.admin.findOne({ email: adminData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(adminData.email);
    }
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const admin = await this.admin.create({
      ...adminData,
      password: hashedPassword,
    });
    const tokenData = this.createToken(admin);
    const cookie = this.createCookie(tokenData);

    return {
      cookie,
      admin,
    };
  }
  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(admin: Iadmin): TokenData {
    const expiresIn = 60 * 60; // an hour
    const { JWT_SECRET } = process.env;
    const dataStoredInToken: DataStoredInToken = {
      _id: admin._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
    };
  }
}

export default AdminauthenticateService;
