"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pincode_model_1 = __importDefault(require("./pincode.model"));
class PincodeRepository {
    constructor() {
        this.pincode = pincode_model_1.default;
        this.getAllPincodeType = async () => {
            return await this.pincode.find();
        };
        this.pincodeById = async (id) => {
            return await this.pincode.findById(id);
        };
        this.pincodeByIdAndUpdate = async (id, data) => {
            return this.pincode.findByIdAndUpdate(id, data, { new: true });
        };
        this.pincodeByIdAndDelete = async (id) => {
            return await this.pincode.findByIdAndDelete(id);
        };
        this.getAllPincodeType();
        this.pincodeById(this.id);
        this.pincodeByIdAndUpdate(this.id, this.data);
        this.pincodeByIdAndDelete(this.id);
    }
}
exports.default = PincodeRepository;
