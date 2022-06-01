import { Request, Router, Response } from "express";
import ProdutNotFoundException from "../excpetions/ProductNotFoundException";
import UserNotFoundException from "../excpetions/UserNotfoundException";
import Controller from "../interfaces/controller.interface";
import orderModel from "./order.model";

class OrderController implements Controller {
  public path = "/order";
  public router = Router();
  orderModel = orderModel;
  constructor() {
    this.initializeRoutes();
  }
  // single product route
  private initializeRoutes() {
    this.router.get(
      `${this.path}/checkout/:userId/:productId`,
      this.orderCheck
    );
  }

  private orderCheck = async (request: Request, response: Response) => {
    const userId = request.params.userId;
    if (!userId) throw new UserNotFoundException(userId);
    const productId = request.params.productId;
    if (!productId) throw new ProdutNotFoundException(productId);
    try {
      const newOrder = new this.orderModel({
        user: userId,
        product: productId,
        quantity: request.body.quantity,
      });
      await newOrder.save();
      response.send(newOrder);
    } catch (error) {
      return error;
    }
  };
}

export default OrderController;
