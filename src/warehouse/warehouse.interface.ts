import { PopulatedDoc, Types, Document } from "mongoose";

interface Iwarehouse {
  vendor?: Types.ObjectId;
  isVerifiedWarehouse: string;
  warehouseName: string;
  execPopulate(): any;
  populate(): any;
}

export default Iwarehouse;
