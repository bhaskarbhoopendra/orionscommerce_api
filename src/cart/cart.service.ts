import CartModel from "./cart.model";

class CartService {
  public cart = CartModel;
  constructor() {}

  public cartItem = async () => {
    const carts = await this.cart.find().populate({
      path: "items.productId",
      select: " price total",
    });
    // console.log(carts[0]);
    return carts[0];
  };
}

export default CartService;
