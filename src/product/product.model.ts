import mongoose, { mongo } from "mongoose";
import IProduct from "./product.interface";

const dimensionSchema = new mongoose.Schema({
  weight: Number,
  height: Number,
  width: Number,
});

const availableSchema = new mongoose.Schema({
  isAreaCalculate: Boolean,
  isCancelable: Boolean,
  isRefundable: Boolean,
  isReturnable: Boolean,
  isCod: Boolean,
  isGst: Boolean,
  isAvailable: Boolean,
  isDeliveryCharges: Boolean,
});

const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  discountedPrice: Number,
  productImage: String,
  tax: Number,
  sale_in: String,
  dimensions: dimensionSchema,
  availability: availableSchema,
});

const ProductModel = mongoose.model<IProduct & mongoose.Document>(
  "Product",
  productSchema
);

export default ProductModel;
