import mongoose from "mongoose";
import IZone from "./zone.interface";

const zoneSchema = new mongoose.Schema({
  zoneName: { type: String, unique: true },
  minimumDistance: Number,
  maximumDistance: Number,
});

const zoneModel = mongoose.model<IZone & mongoose.Document>("zone", zoneSchema);

export default zoneModel;
