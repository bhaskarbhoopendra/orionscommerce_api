import { ParamsDictionary } from "express-serve-static-core";
import FreightRateModel from "./freightRate.model";

class FreightRateRepository {
  public freightRate = FreightRateModel;
  public id: string;
  public data: any;
  constructor() {
    this.createFreightRateChart(this.data);
    this.getAllFreightRate();
    this.freightRateById(this.id);
    this.freightByIDAndUpdate(this.id, this.data);
    this.freightByIDAndDelete(this.id);
  }

  public createFreightRateChart = async (data: any) => {
    return await this.freightRate.create(data);
  };

  public getAllFreightRate = async () => {
    return await this.freightRate.find({});
  };

  public freightRateById = async (id: string) => {
    return await this.freightRate.findById(id);
  };

  public freightByIDAndUpdate = async (id: string, data: any) => {
    return this.freightRate.findByIdAndUpdate(id, data, { new: true });
  };

  public freightByIDAndDelete = async (id: string | ParamsDictionary) => {
    return await this.freightRate.findByIdAndDelete(id);
  };
}

export default FreightRateRepository;
