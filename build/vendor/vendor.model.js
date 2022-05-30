"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const vendorSchema = new mongoose_1.default.Schema({
    address: user_model_1.addressSchema,
    email: String,
    firstName: String,
    lastName: String,
    isVendor: Boolean,
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
const vendorModel = mongoose_1.default.model("Vendor", vendorSchema);
exports.default = vendorModel;
