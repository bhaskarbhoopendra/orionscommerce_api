import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import CreateAddressDto from "./address.dto";
import userAddressModel from "./address.user.model";

class UserController implements Controller {
  public path = "/user";
  public router = Router();
  public userAddress = userAddressModel;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/add/address/:id`, this.userAddAddress);
  }

  private userAddAddress = async (request: Request, response: Response) => {
    const addressData = request.body;
    const userId = request.params.id;
    try {
      const userAddress = new this.userAddress({
        ...addressData,
        user: userId,
      });
      await userAddress.save();
      response.send(userAddress);
    } catch (error) {
      return error;
    }
  };
}

export default UserController;
