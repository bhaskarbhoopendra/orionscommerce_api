import mongoose from "mongoose";
import IProduct from "./product.interface";

const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  discountedPrice: Number,
  productImage: String,
});

const ProductModel = mongoose.model<IProduct & mongoose.Document>(
  "Product",
  productSchema
);

export default ProductModel;
