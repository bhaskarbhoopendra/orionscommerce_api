import { Request, Response, Router } from "express";
import { request } from "http";
import Controller from "../interfaces/controller.interface";
import Iwarehouse from "../warehouse/warehouse.interface";
import WarehouseDTo from "./warehouse.dto";
import warehouseTestModel from "./warehouseTest.model";
import WarehouseTestRepository from "./warehouseTest.repository";

class WarehouseTestController implements Controller {
    public path = "/warehousetest";
    public router = Router();
    public warehouseRepository = new WarehouseTestRepository()
    public warehouseModel = warehouseTestModel

    constructor() {
        this.initializeRoutes();
      }
      private initializeRoutes() {   
        this.router.post(`${this.path}/create`,this.createWarehouse)
        this.router.put(`${this.path}/:warehosueId`,this.updateWarehouse)
        this.router.get(`${this.path}`,this.getAllWarehouse)
        this.router.delete( `${this.path}/:warehouseId`,this.deleteWarehouse)
      }
      

      private createWarehouse = async (request: Request, response: Response) => {
        try{
         const warehouseData:WarehouseDTo = request.body
        const createWareHouse = new this.warehouseModel({
          ...warehouseData
        })
        await createWareHouse.save();
        response.send({createWareHouse})
      }catch(error){
        return error;
      }

      }

      private updateWarehouse = async (request: Request, response: Response) => {
        try {
          const warehouseTestId:string = request.params.warehosueId;
          if (warehouseTestId == undefined) response.send("Id not found");
          const updateData:WarehouseDTo = request.body
          const updatedWareHouse = await this.warehouseRepository.warehouseByIDAndUpdate(warehouseTestId,updateData)
          response.send(updatedWareHouse)
          
        } catch (error) {
          return error;
        }
      }

     private getAllWarehouse = async (request: Request, response: Response) => {
       try {
        const warehouse = await this.warehouseRepository.getAllWarehouse();
        if(!warehouse) response.send("No warehouse found")
        response.send(warehouse);
       } catch (error) {
         return error;
       }
     }
     
     private deleteWarehouse = async (request: Request, response: Response) => {
      const warehouseTestId: string = request.params.warehouseId;
      if(!warehouseTestId) response.send("Id not found")
      try {
        await this.warehouseRepository.warehouseByIDAndDelete(warehouseTestId);
        response.send("Deleted");
      } catch (error) {
        return error;
      }
    }
}
export default WarehouseTestController;

