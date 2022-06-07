import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import ProductModel from "../product/product.model";
import CartModel from "./cart.model";
import CartService from "./cart.service";
import ICart from "./cart.interface";
import ProdutNotFoundException from "../excpetions/ProductNotFoundException";

import CartNotFoundException from "../excpetions/CartNotFoundException";
import ProductRepository from "../product/product.repository";
import authMiddleware from "../middleware/auth.middleware";

class CartController implements Controller {

  public path = "/cart";
  public router = Router();
  public cart = CartModel;
  public product = ProductModel;
  public productRepository = new ProductRepository();
  cartService = new CartService();

  constructor() {
    this.initializeCartRoutes();
  }

  public initializeCartRoutes() {
    this.router.post(
      `${this.path}/addtocart/:id`,
      authMiddleware,
      this.addTocart
    );
    this.router.get(`${this.path}/get`, authMiddleware, this.getCart);
  }

  public addTocart = async (request: Request, response: Response) => {
    const userId: string = request.params.id;
    const productId: string = request.body.productId;
    const quantity: number = Number(request.body.quantity);
    try {
      let cart: ICart = await this.cartService.cartItem();
      let productDetails = await this.productRepository.productByID(productId);
      if (!productDetails) throw new ProdutNotFoundException(productId);

      const newCartData = await this.cartService.addTocart(
        cart,
        productDetails,
        productId,
        quantity,
        userId
      );
      response.send(newCartData);
    } catch (err) {
      console.log(err);
      response.status(400).json({
        type: "Invalid",
        msg: "Something went wrong",
        err: err,
      });
    }
  };

  public getCart = async (request: Request, response: Response) => {
    try {
      const cart = await this.cart.find();
      if (!cart) throw new CartNotFoundException();
      response.send(cart);
    } catch (error) {
      return error;
    }
  };
}

export default CartController;
