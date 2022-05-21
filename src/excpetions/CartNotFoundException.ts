import HttpException from "./HttpException";

class CartNotFoundException extends HttpException {
  constructor() {
    super(404, "Cart not found");
  }
}

export default CartNotFoundException;
