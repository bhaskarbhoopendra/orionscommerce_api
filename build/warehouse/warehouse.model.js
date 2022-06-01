"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const warehouseSchema = new mongoose_1.default.Schema({
    address: user_model_1.addressSchema,
    warehouseName: String,
    isVerifiedWarehouse: { enum: ["confirmed", "pending"] },
    vendor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Vendor",
    },
});
const Warehouse = mongoose_1.default.model("Warehouse", warehouseSchema);
exports.default = Warehouse;
