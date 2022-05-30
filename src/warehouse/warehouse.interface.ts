import { PopulatedDoc, Types, Document } from "mongoose";

interface Iwarehouse {
  vendor?: Types.ObjectId;
  warehouseName: string;
  execPopulate(): any;
}

export default Iwarehouse;
