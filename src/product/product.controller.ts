import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import ProductModel from "./product.model";
import multer from "multer";
import { fileStorage, fileFilter } from "../util/multer";
import authMiddleware from "../middleware/auth.middleware";
import ProductService from "./product.service";
import ProductDTO from "./DTO/product.dto";

class ProductController implements Controller {
  public path = "/product";
  public router = Router();
  public product = ProductModel;
  public multer = multer;
  public productService = new ProductService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.getAllProducts);
    this.router.post(
      `${this.path}/add`,
      authMiddleware,
      this.upload.single("productImage"),
      this.addNewProduct
    );
  }

  public upload = multer({ storage: fileStorage, fileFilter: fileFilter });

  private getAllProducts = async (request: Request, response: Response) => {
    const products = await this.product.find();
    if (!products) response.send("Nothing Found");
    response.send(products);
  };

  private addNewProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const productData: ProductDTO = request.body;
      const imagePath = request.file?.path;
      if (!productData)
        response.sendStatus(400).json({ message: "No data in body" });
      if (!imagePath)
        response.sendStatus(400).json({ message: "No File in body" });
      const newProduct = await this.productService.addProduct(
        productData,
        imagePath
      );
      response.send(newProduct);
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductController;
