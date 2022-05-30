import "dotenv/config";

import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import CartController from "./cart/cart.controller";
import ProductController from "./product/product.controller";
import UserController from "./user/user.controller";
import VendorAuthenticationController from "./vendorAuthentication/vendor.authentication.controller";

const app = new App([
  new UserController(),
  new AuthenticationController(),
  new ProductController(),
  new CartController(),
  new VendorAuthenticationController(),
]);

app.listen();
