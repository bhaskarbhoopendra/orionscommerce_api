import VendorModel from "./vendor.model";
import { ParamsDictionary } from "express-serve-static-core";
import Ivendor from "./vendor.interface";

class VendorRepository {
  public vendor = VendorModel;
  public id: string;
  public data: any;

  constructor() {
    this.getAllVendor();
    this.vendorById(this.id);
    this.vendorByIdAndUpdate(this.id, this.data);
    this.vendorBydIdAndDelete(this.id);
  }

  public getAllVendor = async () => {
    return await this.vendor.find({});
  };

  public vendorById = async (id: string) => {
    return await this.vendor.findById(id);
  };

  public vendorByIdAndUpdate = async (id: string, data: any) => {
    return this.vendor.findByIdAndUpdate(id, data, { new: true });
  };

  public vendorBydIdAndDelete = async (id: string | ParamsDictionary) => {
    return await this.vendor.findByIdAndDelete(id);
  };
}

export default VendorRepository;
