"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zoneShema = new mongoose_1.default.Schema({
    zoneName: String,
    minimumDistance: Number,
    maximumDistance: Number,
});
const zoneModel = mongoose_1.default.model("zone", zoneShema);
exports.default = zoneModel;
