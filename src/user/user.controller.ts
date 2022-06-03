import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";
import CreateAddressDto from "./address.dto";
import userAddressModel from "./address.user.model";
import userModel from "./user.model";

class UserController implements Controller {
  public path = "/user";
  public router = Router();
  public userAddress = userAddressModel;
  user = userModel;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/add/address/:id`,
      authMiddleware,
      this.userAddAddress
    );
    this.router.post(
      `${this.path}/checkout/:userId/:productId`,
      authMiddleware,
      this.userCheckoutWithBuyNow
    );
  }

  private userAddAddress = async (request: Request, response: Response) => {
    const addressData = request.body;
    const userId = request.params.id;

    try {
      const user = await this.user.findById(userId);
      const userAddress = new this.userAddress({
        ...addressData,
        user: userId,
      });
      await userAddress.save();
      user?.address?.push(userAddress);
      await user?.save();
      response.send(userAddress);
    } catch (error) {
      return error;
    }
  };

  private userCheckoutWithBuyNow = async (
    request: Request,
    response: Response
  ) => {};
}

export default UserController;
