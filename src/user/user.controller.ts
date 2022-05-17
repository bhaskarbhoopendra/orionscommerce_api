import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";

class UserController implements Controller {
  public path = "/user";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.rootUser);
  }

  private rootUser = async (req: Request, res: Response) => {
    console.log("------------");

    console.log(req.headers["authorization"]);

    console.log("------------");

    res.send("Hello Hii");
  };
}

export default UserController;
