import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";

class AdminController implements Controller {
  public path = "/admin/process";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.verifyVendor);
  }

  private verifyVendor = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    response.send("Hello from admin");
  };
}

export default AdminController;
