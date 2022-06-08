import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import WarehouseDTo from "./warehouse.dto";
import warehouseModel from "./warehouse.model";
import WarehouseRepository from "./warehouse.repository";

class WarehouseController implements Controller {
    public path = "/warehouse"
    public router = Router()
    public warehouseRepository = new WarehouseRepository()
    public warehouseModel = warehouseModel

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}/create`,adminMiddleware,this.createWarehouse)
        this.router.put(`${this.path}/update/:warehouseId`,adminMiddleware,this.updateWarehouse)
        this.router.get(`${this.path}`,adminMiddleware,this.getAllWarehouse)
        this.router.delete(`${this.path}/delete/:warehouseId`,adminMiddleware,this.deleteWarehouse)
    }

    private createWarehouse = async (request: Request, response: Response) => {
     try {
         const warehouseData: WarehouseDTo = request.body
         const createWarehouse = new this.warehouseModel({
             ...warehouseData
         })
         await createWarehouse.save()
         response.send({createWarehouse})
     } catch (error) {
         return error
     }        
    }

    private updateWarehouse = async (request: Request, response: Response) => {
        try {
            const warehouseId: string = request.params.warehouseId;
            if (warehouseId == undefined) response.send("Id not found")
            const updateData: WarehouseDTo = request.body
            const updatedWarehouse = await this.warehouseRepository.warehouseByIDAndUpdate(warehouseId,updateData)
            response.send(updatedWarehouse)
        } catch (error) {
            return error
        }
    }

    private getAllWarehouse = async (request: Request, response: Response) => {
        try {
            const warehouse = await this.warehouseRepository.getAllWarehouse()
            if (!warehouse) response.send("No Warehouse Found")
            response.send(warehouse)
        } catch (error) {
            return error
        }
    }

    private deleteWarehouse = async (request: Request, response: Response) => {
        try {
            const warehouseId: string = request.params.warehouseId
            if (!warehouseId) response.send("Id not found")
            await this.warehouseRepository.warehouseByIDAndDelete(warehouseId)
            response.send("Deleted")
        } catch (error) {
            return error
        }
    }
}

export default WarehouseController