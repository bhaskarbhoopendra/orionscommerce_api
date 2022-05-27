"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dimensionSchema = new mongoose_1.default.Schema({
    weight: Number,
    height: Number,
    width: Number,
});
const availableSchema = new mongoose_1.default.Schema({
    isAreaCalculate: Boolean,
    isCancelable: Boolean,
    isRefundable: Boolean,
    isReturnable: Boolean,
    isCod: Boolean,
    isGst: Boolean,
    isAvailable: Boolean,
    isDeliveryCharges: Boolean,
});
const casualSchema = new mongoose_1.default.Schema({
    stock: Number,
    minimumQaunitity: Number,
    maximumQuantity: Number,
    unitPerBox: Number,
    manufacturer: String,
    madeIn: String,
});
const volumetricSchema = new mongoose_1.default.Schema({
    isVolumetircWeight: Boolean,
    upperBound: Number,
    lowerBound: Number,
});
const productSchema = new mongoose_1.default.Schema({
    productName: String,
    price: Number,
    discountedPrice: Number,
    productImage: String,
    tax: Number,
    sale_in: String,
    dimensions: dimensionSchema,
    availability: availableSchema,
    casuals: casualSchema,
    SKU: Number,
    valumetric: volumetricSchema,
});
const ProductModel = mongoose_1.default.model("Product", productSchema);
exports.default = ProductModel;
