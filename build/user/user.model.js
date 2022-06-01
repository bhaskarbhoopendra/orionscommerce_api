"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = void 0;
const mongoose = __importStar(require("mongoose"));
exports.addressSchema = new mongoose.Schema({
    city: String,
    country: String,
    street: String,
    pincode: Number,
    phoneNumber: Number,
});
const userSchema = new mongoose.Schema({
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAddress",
        },
    ],
    email: String,
    firstName: String,
    lastName: String,
    password: {
        type: String,
        get: () => undefined,
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
});
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
// userSchema.virtual("posts", {
//   ref: "Post",
//   localField: "_id",
//   foreignField: "author",
// });
const userModel = mongoose.model("User", userSchema);
exports.default = userModel;
