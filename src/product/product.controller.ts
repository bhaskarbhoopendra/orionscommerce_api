import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
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
    this.router.get(`${this.path}/all`, this.getAllProducts);
    this.router.post(`${this.path}/add`, this.addNewProduct);
  }

  private getAllProducts = async (request: Request, response: Response) => {
    const products = await this.product.find();
    if (!products) response.send("Nothing Found");
    response.send(products);
  };

  private addNewProduct = async (request: Request, response: Response) => {
    console.log(request.body);

    const product = request.body;
    const newProduct = new this.product(product);
    response.send(newProduct);
  };
}

export default ProductController;
