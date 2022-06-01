import mongoose from "mongoose";
import Ivendor from "./vendor.interface";

const addressSchema = new mongoose.Schema({
  addressType: { enum: ["billing", "shipping"] },
  city: String,
  country: String,
  street: String,
  pincode: Number,
  phoneNumber: Number,
});

const vendorSchema = new mongoose.Schema({
  address: addressSchema,
  firstName: String,
  lastName: String,
  email: String,
  organization: String,
  company: String,
  isVendor: Boolean,
  isConfirmedVendor: { enum: ["confirmed", "pending"] }, //confirmed from admin
  password: {
    type: String,
    get: (): undefined => undefined,
  },
  warehouse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
  ],
});

const VendorModel = mongoose.model<Ivendor & mongoose.Document>(
  "Vendor",
  vendorSchema
);

export default VendorModel;
