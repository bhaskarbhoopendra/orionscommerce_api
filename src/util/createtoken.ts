import * as jwt from "jsonwebtoken";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import TokenData from "../interfaces/takenData.interface";
import User from "../user/user.interface";

const createCookie = (tokenData: TokenData) => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}

const createToken = (user:User):TokenData => {
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

export default createToken
