"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("./product.model"));
class ProductRepository {
    constructor() {
        this.product = product_model_1.default;
        this.getAllProduct = async () => {
            return await this.product.find();
        };
        this.productByID = async (id) => {
            return await this.product.findById(id);
        };
        this.productByIdAndUpdate = async (id, data) => {
            return await this.product.findByIdAndUpdate(id, data);
        };
        this.productByIdAndDelete = async (id) => {
            return await this.product.deleteOne({ id: id });
        };
        this.getAllProduct();
        this.productByID(this.id);
        this.productByIdAndUpdate(this.id, this.data);
        this.productByIdAndDelete(this.id);
    }
}
exports.default = ProductRepository;
