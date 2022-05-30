"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const authentication_controller_1 = __importDefault(require("./authentication/authentication.controller"));
const cart_controller_1 = __importDefault(require("./cart/cart.controller"));
const product_controller_1 = __importDefault(require("./product/product.controller"));
const user_controller_1 = __importDefault(require("./user/user.controller"));
const vendor_authentication_controller_1 = __importDefault(require("./vendorAuthentication/vendor.authentication.controller"));
const app = new app_1.default([
    new user_controller_1.default(),
    new authentication_controller_1.default(),
    new product_controller_1.default(),
    new cart_controller_1.default(),
    new vendor_authentication_controller_1.default(),
]);
app.listen();
