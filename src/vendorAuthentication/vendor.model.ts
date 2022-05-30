import mongoose from "mongoose";
import { addressSchema } from "../user/user.model";
import Ivendor from "./vendor.interface";

const vendorSchema = new mongoose.Schema({
  address: addressSchema,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

vendorSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const VendorModel = mongoose.model<Ivendor & mongoose.Document>(
  "Vendor",
  vendorSchema
);

export default VendorModel;
