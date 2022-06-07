import mongoose, { mongo } from "mongoose";
import IwarehouseTest from "./warehousetest.interface";

const warehouseTestSchema = new mongoose.Schema({
    warehouseName: String,
    address: String,
    city: String,
    street: String,
    pincode : Number,
})

const warehouseTestModel = mongoose.model<IwarehouseTest & mongoose.Document>("warehouseTest", warehouseTestSchema)

export default warehouseTestModel