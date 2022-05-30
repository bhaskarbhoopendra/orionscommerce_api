import mongoose from "mongoose";
import { addressSchema } from "../user/user.model";
import Iwarehouse from "./warehouse.interface";

const warehouseSchema = new mongoose.Schema({
  address: addressSchema,
  warehouseName: String,
  isVerifiedWarehouse: { enum: ["confirmed", "pending"] },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
});

const Warehouse = mongoose.model<Iwarehouse>("Warehouse", warehouseSchema);

export default Warehouse;
