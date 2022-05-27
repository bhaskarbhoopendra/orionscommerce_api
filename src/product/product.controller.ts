import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import multer from "multer";
import { fileStorage, fileFilter } from "../util/multer";
import authMiddleware from "../middleware/auth.middleware";
import ProductService from "./product.service";
import ProductDTO from "./Dtos/product.dto";
import ProdutNotFoundException from "../excpetions/ProductNotFoundException";
import ProductRepository from "./product.repository";

class ProductController implements Controller {
  public path = "/product";
  public router = Router();
  public multer = multer;
  public productService = new ProductService();
  public productRepository = new ProductRepository();

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

    this.router.get(`${this.path}/oneproduct/:id`, this.getSingleProduct);

    this.router.put(
      `${this.path}/update/:id`,
      this.upload.single("productImage"),
      this.updateSingleProduct
    );

    this.router.delete(
      `${this.path}/delete/:id`,
      authMiddleware,
      this.deleteProduct
    );
  }

  public upload = multer({ storage: fileStorage, fileFilter: fileFilter });

  private getAllProducts = async (request: Request, response: Response) => {
    const products = await this.productRepository.getAllProduct();
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
      return error;
    }
  };

  public getSingleProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const foundProduct = await this.productRepository.productByID(id);
    if (!foundProduct) next(new ProdutNotFoundException(id));
    response.send(foundProduct);
  };

  public updateSingleProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const productId = request.params.id;
      const productData: ProductDTO = request.body;
      const fileName = request.file?.filename;
      if (!productId) throw new ProdutNotFoundException(productId);
      if (!productData) throw new ProdutNotFoundException(productId);
      const updatedProduct = this.productService.updateSingleProduct(
        productId,
        productData,
        fileName
      );
      if (!updatedProduct) response.send("No updated Product");
      response.send(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  public deleteProduct = async (request: Request, response: Response) => {
    const productId = request.params;
    return this.productRepository.productByIdAndDelete(productId);
  };
}

export default ProductController;
