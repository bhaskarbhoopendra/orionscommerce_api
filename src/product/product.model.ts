import mongoose from "mongoose";
import Product from "./product.interface";

const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  discountedPrice: Number,
});

const ProductModel = mongoose.model<Product & mongoose.Document>(
  "Product",
  productSchema
);

export default ProductModel;
