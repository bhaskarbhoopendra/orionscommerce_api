import mongoose from "mongoose";
import IuserAddress from "./address.user.interface";

const userAddressSchema = new mongoose.Schema({
  addressType: { enum: ["billing", "shipping"] },
  city: String,
  country: String,
  street: String,
  pincode: Number,
  phoneNumber: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const userAddressModel = mongoose.model<IuserAddress & mongoose.Document>(
  "UserAddress",
  userAddressSchema
);

export default userAddressModel;
