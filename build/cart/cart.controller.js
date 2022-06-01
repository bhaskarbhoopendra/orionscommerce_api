"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_model_1 = __importDefault(require("../product/product.model"));
const cart_model_1 = __importDefault(require("./cart.model"));
const cart_service_1 = __importDefault(require("./cart.service"));
const ProductNotFoundException_1 = __importDefault(require("../excpetions/ProductNotFoundException"));
const CartNotFoundException_1 = __importDefault(require("../excpetions/CartNotFoundException"));
const product_repository_1 = __importDefault(require("../product/product.repository"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
class CartController {
    constructor() {
        this.path = "/cart";
        this.router = (0, express_1.Router)();
        this.cart = cart_model_1.default;
        this.product = product_model_1.default;
        this.productRepository = new product_repository_1.default();
        this.cartService = new cart_service_1.default();
        this.addTocart = async (request, response) => {
            const userId = request.params.id;
            const productId = request.body.productId;
            const quantity = Number(request.body.quantity);
            try {
                let cart = await this.cartService.cartItem();
                let productDetails = await this.productRepository.productByID(productId);
                if (!productDetails)
                    throw new ProductNotFoundException_1.default(productId);
                const newCartData = await this.cartService.addTocart(cart, productDetails, productId, quantity, userId);
                response.send(newCartData);
            }
            catch (err) {
                console.log(err);
                response.status(400).json({
                    type: "Invalid",
                    msg: "Something went wrong",
                    err: err,
                });
            }
        };
        this.getCart = async (request, response) => {
            try {
                const cart = await this.cart.find();
                if (!cart)
                    throw new CartNotFoundException_1.default();
                response.send(cart);
            }
            catch (error) {
                return error;
            }
        };
        this.initializeCartRoutes();
    }
    initializeCartRoutes() {
        this.router.post(`${this.path}/addtocart/:id`, auth_middleware_1.default, this.addTocart);
        this.router.get(`${this.path}/get`, auth_middleware_1.default, this.getCart);
    }
}
exports.default = CartController;
