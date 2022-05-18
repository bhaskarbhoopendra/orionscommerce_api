import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import ProductDTO from "./product.dto";
import ProductModel from "./product.model";
import multer from "multer";
import { fileStorage, fileFilter } from "../util/multer";
class ProductController implements Controller {
  public path = "/product";
  public router = Router();
  public product = ProductModel;
  public multer = multer;

  constructor() {
    // public product = ProductModel;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.getAllProducts);
    this.router.post(
      `${this.path}/add`,
      this.upload.single("productImage"),
      this.addNewProduct
    );
  }

  // public upload = this.multer({ dest: "./public/uploads/" });

  private getAllProducts = async (request: Request, response: Response) => {
    const products = await this.product.find();
    if (!products) response.send("Nothing Found");
    response.send(products);
  };

  // public upload = multer();
  public upload = multer({ storage: fileStorage, fileFilter: fileFilter });

  private addNewProduct = async (request: Request, response: Response) => {
    // console.log(request.body);
    console.log(request.file);

    const newProduct = new this.product({
      productName: request.body.productName,
      price: request.body.price,
      discountedPrice: request.body.discountedPrice,
      productImage: request.file?.path,
    });
    await newProduct.save();
    response.send(newProduct);
  };
}

export default ProductController;
