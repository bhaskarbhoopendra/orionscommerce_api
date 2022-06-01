"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductNotFoundException_1 = __importDefault(require("../excpetions/ProductNotFoundException"));
const UserNotfoundException_1 = __importDefault(require("../excpetions/UserNotfoundException"));
const order_model_1 = __importDefault(require("./order.model"));
class OrderController {
    constructor() {
        this.path = "/order";
        this.router = (0, express_1.Router)();
        this.orderModel = order_model_1.default;
        this.orderCheck = async (request, response) => {
            const userId = request.params.userId;
            if (!userId)
                throw new UserNotfoundException_1.default(userId);
            const productId = request.params.productId;
            if (!productId)
                throw new ProductNotFoundException_1.default(productId);
            try {
                const newOrder = new this.orderModel({
                    user: userId,
                    product: productId,
                    quantity: request.body.quantity,
                });
                await newOrder.save();
                response.send(newOrder);
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
    // single product route
    initializeRoutes() {
        this.router.get(`${this.path}/checkout/:userId/:productId`, this.orderCheck);
    }
}
exports.default = OrderController;
