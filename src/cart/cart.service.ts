import CartModel from "./cart.model";

class CartService {
  public cart = CartModel;
  constructor() {}

  public cartItem = async () => {
    const carts = await this.cart.find();
    return carts[0];
  };
}

export default CartService;
