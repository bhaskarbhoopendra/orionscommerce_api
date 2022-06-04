"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const freightRateChartSchema = new mongoose_1.default.Schema({
    zone: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "zone",
    },
    zoneName: String,
    pincodeTypeName: String,
    pincodeType: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "pincodetype",
    },
    weightType: String,
    lowerBound: {
        type: Number,
        required: true,
    },
    upperBound: {
        type: Number,
        required: true,
    },
    rate: Number,
});
const FreightRateModel = mongoose_1.default.model("freightRate", freightRateChartSchema);
exports.default = FreightRateModel;
