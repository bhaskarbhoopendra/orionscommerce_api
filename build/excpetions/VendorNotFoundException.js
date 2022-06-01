"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class VendorNotFoundException extends HttpException_1.default {
    constructor(id) {
        super(400, `Vendor with that ${id} does not exist`);
    }
}
exports.default = VendorNotFoundException;
