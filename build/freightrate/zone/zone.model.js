"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zoneSchema = new mongoose_1.default.Schema({
    zoneName: { type: String, unique: true },
    minimumDistance: Number,
    maximumDistance: Number,
});
const zoneModel = mongoose_1.default.model("zone", zoneSchema);
exports.default = zoneModel;
