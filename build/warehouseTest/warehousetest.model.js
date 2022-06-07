"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const warehouseTestSchema = new mongoose_1.default.Schema({
    warehouseName: String,
    address: String,
    city: String,
    street: String,
    pincode: Number,
});
const warehouseTestModel = mongoose_1.default.model("warehouseTest", warehouseTestSchema);
exports.default = warehouseTestModel;
