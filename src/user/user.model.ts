import * as mongoose from "mongoose";
import User from "./user.interface";

export const addressSchema = new mongoose.Schema({
  city: String,
  country: String,
  street: String,
  pincode: Number,
  phoneNumber: Number,
});

const userSchema = new mongoose.Schema(
  {
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAddress",
      },
    ],
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: Number,

    password: {
      type: String,
      get: (): undefined => undefined,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// userSchema.virtual("posts", {
//   ref: "Post",
//   localField: "_id",
//   foreignField: "author",
// });

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
