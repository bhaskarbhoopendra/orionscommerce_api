"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vendor_model_1 = __importDefault(require("./vendor.model"));
class VendorRepository {
    constructor() {
        this.vendor = vendor_model_1.default;
        this.getAllVendor = async () => {
            return await this.vendor.find({});
        };
        this.vendorById = async (id) => {
            return await this.vendor.findById(id);
        };
        this.vendorByIdAndUpdate = async (id, data) => {
            return this.vendor.findByIdAndUpdate(id, data, { new: true });
        };
        this.vendorBydIdAndDelete = async (id) => {
            return await this.vendor.findByIdAndDelete(id);
        };
        this.getAllVendor();
        this.vendorById(this.id);
        this.vendorByIdAndUpdate(this.id, this.data);
        this.vendorBydIdAndDelete(this.id);
    }
}
exports.default = VendorRepository;
