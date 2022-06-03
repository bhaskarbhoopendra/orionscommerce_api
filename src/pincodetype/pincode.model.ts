import mongoose from "mongoose";
import IPincodeType from "./pincode.interface";

const pincodeTypeSchema = new mongoose.Schema({
  pincodeTypeName: { type: String, unique: true, required: true },
  isSpecialState: Boolean,
});

const pincodetypeModel = mongoose.model<IPincodeType & mongoose.Document>(
  "pincodetype",
  pincodeTypeSchema
);

export default pincodetypeModel;
