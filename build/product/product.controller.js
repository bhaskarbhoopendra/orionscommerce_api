"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("../util/multer");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const product_service_1 = __importDefault(require("./product.service"));
const ProductNotFoundException_1 = __importDefault(require("../excpetions/ProductNotFoundException"));
const product_repository_1 = __importDefault(require("./product.repository"));
class ProductController {
    constructor() {
        this.path = "/product";
        this.router = (0, express_1.Router)();
        this.multer = multer_1.default;
        this.productService = new product_service_1.default();
        this.productRepository = new product_repository_1.default();
        this.upload = (0, multer_1.default)({ storage: multer_2.fileStorage, fileFilter: multer_2.fileFilter });
        this.getAllProducts = async (request, response) => {
            const products = await this.productRepository.getAllProduct();
            if (!products)
                response.send("Nothing Found");
            response.send(products);
        };
        this.addNewProduct = async (request, response, next) => {
            var _a;
            try {
                const productData = request.body;
                const imagePath = (_a = request.file) === null || _a === void 0 ? void 0 : _a.path;
                if (!productData)
                    response.sendStatus(400).json({ message: "No data in body" });
                if (!imagePath)
                    response.sendStatus(400).json({ message: "No File in body" });
                const newProduct = await this.productService.addProduct(productData, imagePath);
                response.send(newProduct);
            }
            catch (error) {
                return error;
            }
        };
        this.getSingleProduct = async (request, response, next) => {
            const id = request.params.id;
            const foundProduct = await this.productRepository.productByID(id);
            if (!foundProduct)
                next(new ProductNotFoundException_1.default(id));
            response.send(foundProduct);
        };
        this.updateSingleProduct = async (request, response, next) => {
            var _a;
            try {
                const productId = request.params.id;
                const productData = request.body;
                const fileName = (_a = request.file) === null || _a === void 0 ? void 0 : _a.filename;
                if (!productId)
                    throw new ProductNotFoundException_1.default(productId);
                if (!productData)
                    throw new ProductNotFoundException_1.default(productId);
                const updatedProduct = this.productService.updateSingleProduct(productId, productData, fileName);
                if (!updatedProduct)
                    response.send("No updated Product");
                response.send(updatedProduct);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.deleteProduct = async (request, response) => {
            const productId = request.params;
            return this.productRepository.productByIdAndDelete(productId);
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/all`, this.getAllProducts);
        this.router.post(`${this.path}/add`, auth_middleware_1.default, this.upload.single("productImage"), this.addNewProduct);
        this.router.get(`${this.path}/oneproduct/:id`, this.getSingleProduct);
        this.router.put(`${this.path}/update/:id`, this.upload.single("productImage"), this.updateSingleProduct);
        this.router.delete(`${this.path}/delete/:id`, auth_middleware_1.default, this.deleteProduct);
    }
}
exports.default = ProductController;
