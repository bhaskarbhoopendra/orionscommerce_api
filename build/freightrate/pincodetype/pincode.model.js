"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pincodeTypeSchema = new mongoose_1.default.Schema({
    pincodeTypeName: { type: String, unique: true, required: true },
    isSpecialState: Boolean,
});
const pincodetypeModel = mongoose_1.default.model("pincodetype", pincodeTypeSchema);
exports.default = pincodetypeModel;
