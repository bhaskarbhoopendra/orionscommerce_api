import { Response, Router, Request } from "express";
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

  private getProduct = async (req: Request, res: Response) => {
    const productData: ProductDTO = req.body;

    const newProduct = new this.product(productData);

    newProduct.save((err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  };
}

export default ProductController;
