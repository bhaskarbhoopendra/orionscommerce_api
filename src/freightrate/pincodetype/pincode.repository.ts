import { ParamsDictionary } from "express-serve-static-core";
import pincodetypeModel from "./pincode.model";

class PincodeRepository {
  public pincode = pincodetypeModel;
  public id: string;
  public data: any;

  constructor() {
    this.getAllPincodeType();
    this.pincodeById(this.id);
    this.pincodeByIdAndUpdate(this.id, this.data);
    this.pincodeByIdAndDelete(this.id);
  }

  public getAllPincodeType = async () => {
    return await this.pincode.find();
  };

  public pincodeById = async (id: string) => {
    return await this.pincode.findById(id);
  };

  public pincodeByIdAndUpdate = async (id: string, data: any) => {
    return this.pincode.findByIdAndUpdate(id, data, { new: true });
  };

  public pincodeByIdAndDelete = async (id: string | ParamsDictionary) => {
    return await this.pincode.findByIdAndDelete(id);
  };
}

export default PincodeRepository;
