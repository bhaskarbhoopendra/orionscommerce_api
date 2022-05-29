import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";

class VendorController implements Controller {
  public path = "/vendor";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.rootUser);
  }

  private rootUser = async (req: Request, res: Response) => {
    res.send("Hii");
  };
}

export default VendorController;
