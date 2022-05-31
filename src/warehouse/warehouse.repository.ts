import { ParamsDictionary } from "express-serve-static-core";
import Warehouse from "./warehouse.model";

class WarehouseRepository {
  public warehouse = Warehouse;
  public id: string;
  public data: any;
  constructor() {
    this.getAllWarehouse();
    this.warehouseByID(this.id);
    this.warehouseByIDAndUpdate(this.id, this.data);
    this.warehouseByIDAndDelete(this.id);
  }

  public getAllWarehouse = async () => {
    return await this.warehouse.find({});
  };

  public warehouseByID = async (id: string) => {
    return await this.warehouse.findById(id);
  };

  public warehouseByIDAndUpdate = async (id: string, data: any) => {
    return this.warehouse.findByIdAndUpdate(id, data, { new: true });
  };

  public warehouseByIDAndDelete = async (id: string | ParamsDictionary) => {
    return await this.warehouse.findByIdAndDelete(id);
  };
}

export default WarehouseRepository;
