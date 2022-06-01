"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_user_model_1 = __importDefault(require("./address.user.model"));
const user_model_1 = __importDefault(require("./user.model"));
class UserController {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.userAddress = address_user_model_1.default;
        this.user = user_model_1.default;
        this.userAddAddress = async (request, response) => {
            var _a;
            const addressData = request.body;
            const userId = request.params.id;
            try {
                const user = await this.user.findById(userId);
                const userAddress = new this.userAddress(Object.assign(Object.assign({}, addressData), { user: userId }));
                await userAddress.save();
                (_a = user === null || user === void 0 ? void 0 : user.address) === null || _a === void 0 ? void 0 : _a.push(userAddress);
                await (user === null || user === void 0 ? void 0 : user.save());
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
