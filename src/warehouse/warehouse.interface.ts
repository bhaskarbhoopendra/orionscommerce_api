import { PopulatedDoc, Types, Document } from "mongoose";

interface Iwarehouse {
  vendor?: Types.ObjectId;
  isVerifiedWarehouse: string;
  warehouseName: string;
  execPopulate(): any;
}

export default Iwarehouse;
