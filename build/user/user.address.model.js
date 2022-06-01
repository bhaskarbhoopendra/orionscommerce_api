"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userAddressSchema = new mongoose_1.default.Schema({
    city: String,
    country: String,
    street: String,
    pincode: Number,
    phoneNumber: Number,
});
const userAddressModel = mongoose_1.default.model("UserAddress", userAddressSchema);
exports.default = userAddressModel;
