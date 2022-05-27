"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoId_1 = __importDefault(require("../util/nanoId"));
const product_model_1 = __importDefault(require("./product.model"));
const product_repository_1 = __importDefault(require("./product.repository"));
class ProductService {
    constructor() {
        this.product = product_model_1.default;
        this.nanoId = (0, nanoId_1.default)();
        this.productRepository = new product_repository_1.default();
        this.addProduct = async (productData, imagePath) => {
            const productAvailability = productData.availability;
            const casuals = productData.casuals;
            const productDimensions = productData.dimensions;
            const productVolumetric = productData.valumetric;
            const productName = productData.productName;
            console.log(productName.toString);
            console.log(this.nanoId);
            let newProduct = new this.product({
                productName: productName,
                price: productData.price,
                discountedPrice: productData.discountedPrice,
                productImage: imagePath,
                dimensions: productDimensions,
                availability: productAvailability,
                casuals: casuals,
                SKU: this.nanoId,
                valumetric: productVolumetric,
            });
            const product = await newProduct.save();
            return product;
        };
        this.updateSingleProduct = async (productId, productData, filePath) => {
            const productAvailability = productData.availability;
            const casuals = productData.casuals;
            const productDimensions = productData.dimensions;
            const productVolumetric = productData.valumetric;
            if (!filePath)
                return "No path";
            const upDatedProduct = {
                productName: productData.productName,
                price: productData.price,
                discountedPrice: productData.discountedPrice,
                productImage: filePath,
                dimensions: productDimensions,
                availability: productAvailability,
                casuals: casuals,
                SKU: productData.SKU,
                valumetric: productVolumetric,
            };
            await this.productRepository.productByIdAndUpdate(productId, {
                $set: upDatedProduct,
            });
            return "Product Updated";
        };
    }
}
exports.default = ProductService;
