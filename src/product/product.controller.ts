import { Response, Router, Request, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";
import ProductDTO from "./product.dto";
import ProductModel from "./product.model";

class ProductController implements Controller {
  public path = "/product";
  public router = Router();
  public product = ProductModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/addnew`, authMiddleware, this.getProduct);
  }

  private getProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const productData: ProductDTO = request.body;

    const newProduct = new this.product(productData);

    newProduct.save((err, result) => {
      if (err) console.log(err);
      response.send(result);
    });
  };
}

export default ProductController;
