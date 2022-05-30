"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    isAdmin: Boolean,
    vendorRequests: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Vendor",
        },
    ],
});
const AdminModel = mongoose_1.default.model("Admin", adminSchema);
exports.default = AdminModel;
