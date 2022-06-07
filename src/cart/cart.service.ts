import ICart from "./cart.interface";
import CartModel from "./cart.model";
import IItem from "./item.interface";

class CartService {
  public cart = CartModel;
  constructor() { }

  public cartItem = async (): Promise<ICart> => {
    const carts = await this.cart.find().populate({
      path: "items.productId",
      select: " price total",
    });
    return carts[0];
  };



  public addTocart = async (
    cart: ICart,
    productDetails: any,
    productId: string,
    quantity: number,
    userId: string
  ) => {
    if (cart) {
      const productIdExistInCart = (item: any): void => {
        item.productId._id == productId;
      };

      const productFoundIndex: number =
        cart.items.findIndex(productIdExistInCart);
      console.log({ productFoundIndex });
      // if product exists
      if (productFoundIndex !== -1) {
        console.log("No erro");

        cart.items[productFoundIndex].quantity =
          cart.items[productFoundIndex].quantity + quantity;
        cart.items[productFoundIndex].total =
          cart.items[productFoundIndex].quantity * productDetails.price;
        cart.items[productFoundIndex].price = productDetails.price;
        cart.user = userId;
      } else if (quantity > 0) {
        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          total: productDetails.price * quantity,
        });
        cart.subTotal = cart.items
          .map((item: IItem): number => item.total)
          .reduce((acc: number, next: number) => acc + next);
        cart.user = userId;
      } else {
        return "Invalid Request";
      }
      let data = await cart.save();
      console.log({ data });
      return data;
    } else {
      const updatedCart = {
        items: [
          {
            productId: productId,
            quantity: quantity,
            price: productDetails.price,
            total: productDetails.price * quantity,
          },
        ],
        subTotal: productDetails.price * quantity,
        user: userId,
      };
      // console.log(updatedCart);
      const newCartData = new this.cart({ ...updatedCart });
      return newCartData;
    }
  };
}

export default CartService;
