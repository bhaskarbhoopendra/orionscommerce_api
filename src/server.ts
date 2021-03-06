import "dotenv/config";
import AdminController from "./admin/admin.controller";
import AdminAuthenticationController from "./admin/adminAuthentication/adminAuthentication.controller";

import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import CartController from "./cart/cart.controller";
import OrderController from "./order/order.controller";
import PincodeTypeController from "./freightrate/pincodetype/pincodetype.controller";
import ProductController from "./product/product.controller";
import UserController from "./user/user.controller";
import VendorAuthenticationController from "./vendor/vendor.authentication.controller";
import VendorController from "./vendor/vendor.controller";
import ZoneController from "./freightrate/zone/zone.controller";
import FreightRateController from "./freightrate/freightRate.controller";

const app = new App([
  new UserController(),
  new AuthenticationController(),
  new ProductController(),
  new CartController(),
  new VendorAuthenticationController(),
  new AdminAuthenticationController(),
  new AdminController(),
  new VendorController(),
  new OrderController(),
  new ZoneController(),
  new PincodeTypeController(),
  new FreightRateController(),
]);

app.listen();
