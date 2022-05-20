import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import ProductDTO from "../product/Dtos/product.dto";
import IProduct from "../product/product.interface";
import ProductModel from "../product/product.model";
import ICart from "./cart.interface";
import CartModel from "./cart.model";
import CartService from "./cart.service";
import IItem from "./item.interface";

class CartController implements Controller {
  public path = "/cart";
  public router = Router();
  public cart = CartModel;
  public product = ProductModel;
  cartService = new CartService();

  constructor() {
    this.initializeCartRoutes();
  }

  public initializeCartRoutes() {
    this.router.post(`${this.path}/add`, this.addTocart);
  }

  public addTocart = async (request: Request, response: Response) => {
    const { productId } = request.body;
    const quantity = Number.parseInt(request.body.quantity);
    try {
      let cart: ICart = await this.cartService.cartItem();

      let productDetails = await this.product.findById(productId);
      if (!productDetails) {
        return response.status(500).json({
          type: "Not Found",
          msg: "Invalid request",
        });
      }

      //     //--If Cart Exists ----
      //     if (cart) {
      //       //---- Check if index exists ----
      //       const indexFound = cart.items.findIndex(
      //         (item: any): boolean => item.productId._id == productId
      //       );

      //       //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
      //       if (indexFound !== -1 && quantity <= 0) {
      //         cart.items.splice(indexFound, 1);
      //         if (cart.items.length == 0) {
      //           cart.subTotal = 0;
      //         } else {
      //           cart.subTotal = cart.items
      //             .map((item: IItem): number => item.total)
      //             .reduce((acc: number, next: number) => acc + next);
      //         }
      //       }
      //       //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
      //       else if (indexFound !== -1) {
      //         cart.items[indexFound].quantity =
      //           cart.items[indexFound].quantity + quantity;
      //         cart.items[indexFound].total =
      //           cart.items[indexFound].quantity * productDetails.price;
      //         cart.items[indexFound].price = productDetails.price;
      //         cart.subTotal = cart.items
      //           .map((item: IItem): number => item.total)
      //           .reduce((acc: number, next: number) => acc + next);
      //       }
      //       //----Check if quantity is greater than 0 then add item to items array ----
      //       else if (quantity > 0) {
      //         cart.items.push({
      //           productId: productId,
      //           quantity: quantity,
      //           price: productDetails.price,
      //           total: parseInt(productDetails.price * quantity),
      //         });
      //         cart.subTotal = cart.items
      //           .map((item: IItem): number => item.total)
      //           .reduce((acc: number, next: number) => acc + next);
      //       }
      //       //----If quantity of price is 0 throw the error -------
      //       else {
      //         return response.status(400).json({
      //           type: "Invalid",
      //           msg: "Invalid request",
      //         });
      //       }
      //       let data = await cart.save();
      //       response.status(200).json({
      //         type: "success",
      //         mgs: "Process successful",
      //         data: data,
      //       });
      //     }
      //     //------------ This creates a new cart and then adds the item to the cart that has been created------------
      //     else {
      //       const cartData = {
      //         items: [
      //           {
      //             productId: productId,
      //             quantity: quantity,
      //             total: parseInt(productDetails.price * quantity),
      //             price: productDetails.price,
      //           },
      //         ],
      //         subTotal: parseInt(productDetails.price * quantity),
      //       };

      //       const cart = new this.cart({
      //         ...cartData,
      //       });
      //       await cart.save();
      //       // cart = await this.cart.save(cartData);
      //       // let data = await cart.save();
      //       response.json(cart);
      //     }
    } catch (err) {
      console.log(err);
      response.status(400).json({
        type: "Invalid",
        msg: "Something went wrong",
        err: err,
      });
    }
  };
}

export default CartController;
