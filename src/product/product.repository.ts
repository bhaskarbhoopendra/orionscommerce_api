import { ParamsDictionary } from "express-serve-static-core";
import ProductModel from "./product.model";

class ProductRepository {
  public product = ProductModel;
  private id: string;
  private data: any;
  constructor() {
    this.getAllProduct();
    this.productByID(this.id);
    this.productByIdAndUpdate(this.id, this.data);
    this.productByIdAndDelete(this.id);
  }

  public getAllProduct = async () => {
    return await this.product.find();
  };

  public productByID = async (id: string) => {
    return await this.product.findById(id);
  };

  public productByIdAndUpdate = async (id: string, data: any) => {
    return await this.product.findByIdAndUpdate(id, data);
  };

  public productByIdAndDelete = async (id: string | ParamsDictionary) => {
    return await this.product.deleteOne({ id: id });
  };
}

export default ProductRepository;
