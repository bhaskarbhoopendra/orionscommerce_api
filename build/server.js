"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const admin_controller_1 = __importDefault(require("./admin/admin.controller"));
const adminAuthentication_controller_1 = __importDefault(require("./admin/adminAuthentication/adminAuthentication.controller"));
const app_1 = __importDefault(require("./app"));
const authentication_controller_1 = __importDefault(require("./authentication/authentication.controller"));
const cart_controller_1 = __importDefault(require("./cart/cart.controller"));
const order_controller_1 = __importDefault(require("./order/order.controller"));
const pincodetype_controller_1 = __importDefault(require("./freightrate/pincodetype/pincodetype.controller"));
const product_controller_1 = __importDefault(require("./product/product.controller"));
const user_controller_1 = __importDefault(require("./user/user.controller"));
const vendor_authentication_controller_1 = __importDefault(require("./vendor/vendor.authentication.controller"));
const vendor_controller_1 = __importDefault(require("./vendor/vendor.controller"));
const zone_controller_1 = __importDefault(require("./freightrate/zone/zone.controller"));
const freightRate_controller_1 = __importDefault(require("./freightrate/freightRate.controller"));
const warehouse_controller_1 = __importDefault(require("./warehouse/warehouse.controller"));
const app = new app_1.default([
    new user_controller_1.default(),
    new authentication_controller_1.default(),
    new product_controller_1.default(),
    new cart_controller_1.default(),
    new vendor_authentication_controller_1.default(),
    new adminAuthentication_controller_1.default(),
    new admin_controller_1.default(),
    new vendor_controller_1.default(),
    new order_controller_1.default(),
    new zone_controller_1.default(),
    new pincodetype_controller_1.default(),
    new freightRate_controller_1.default(),
    new warehouse_controller_1.default()
]);
app.listen();
