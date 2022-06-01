"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const addressSchema = new mongoose_1.default.Schema({
    addressType: { enum: ["billing", "shipping"] },
    city: String,
    country: String,
    street: String,
    pincode: Number,
    phoneNumber: Number,
});
const vendorSchema = new mongoose_1.default.Schema({
    address: addressSchema,
    firstName: String,
    lastName: String,
    email: String,
    organization: String,
    company: String,
    isVendor: Boolean,
    isConfirmedVendor: { enum: ["confirmed", "pending"] },
    password: {
        type: String,
        get: () => undefined,
    },
    warehouse: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Warehouse",
        },
    ],
});
const VendorModel = mongoose_1.default.model("Vendor", vendorSchema);
exports.default = VendorModel;
