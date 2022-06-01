"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_user_model_1 = __importDefault(require("./address.user.model"));
class UserController {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.userAddress = address_user_model_1.default;
        this.userAddAddress = async (request, response) => {
            const addressData = request.body;
            const userId = request.params.id;
            try {
                const userAddress = new this.userAddress(Object.assign(Object.assign({}, addressData), { user: userId }));
                await userAddress.save();
                response.send(userAddress);
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/add/address/:id`, this.userAddAddress);
    }
}
exports.default = UserController;
