import { ParamsDictionary } from "express-serve-static-core";
import warehouseTestModel from "./warehouseTest.model";


class WarehouseTestRepository{
    public warehouseTest = warehouseTestModel;
    public id: string;
    public data: any;
    constructor() {
      this.getAllWarehouse();
      this.warehouseByID(this.id);
      this.warehouseByIDAndUpdate(this.id, this.data);
      this.warehouseByIDAndDelete(this.id);
    }

  
    public getAllWarehouse = async () => {
      return await this.warehouseTest.find({});
    };
  
    public warehouseByID = async (id: string) => {
      return await this.warehouseTest.findById(id);
    };
  
    public warehouseByIDAndUpdate = async (id: string, data: any) => {
      return this.warehouseTest.findByIdAndUpdate(id, data, { new: true });
    };
  
    public warehouseByIDAndDelete = async (id: string | ParamsDictionary) => {
      return await this.warehouseTest.findByIdAndDelete(id);
    };
  }
  
  export default WarehouseTestRepository;
      
