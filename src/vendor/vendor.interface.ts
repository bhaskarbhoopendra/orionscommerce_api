import { PopulatedDoc, Types, Document } from "mongoose";
import User from "../user/user.interface";

interface Ivendor extends User {
  organization?: string;
  company?: string;
  isVendor: boolean;
  isConfirmedVendor?: string;
  warehouse?: Types.ObjectId;
  execPopulate(): any;
}

export default Ivendor;
