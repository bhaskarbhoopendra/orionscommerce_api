import mongoose from "mongoose";
import IfreightRate from "./freightRate.interface";

const freightRateChartSchema = new mongoose.Schema({
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "zone",
  },
  zoneName: String,
  pincodeTypeName: String,
  pincodeType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pincodetype",
  },
  weightType: String,
  lowerBound: {
    type: Number,
    required: true,
  },
  upperBound: {
    type: Number,
    required: true,
  },
  rate: Number,
});

const FreightRateModel = mongoose.model<IfreightRate & mongoose.Document>(
  "freightRate",
  freightRateChartSchema
);

export default FreightRateModel;
